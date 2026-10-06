"""
CollegeHub - College Projects & Academic Portal
===============================================
Backend: Python Flask
Frontend: Pure HTML & CSS (Jinja2 Templates)
Database: MySQL (XAMPP localhost)
"""

from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'collegehub_super_secret_key_2026')

# -------------------------------------------------------------
# DATABASE CONFIGURATION (XAMPP MySQL)
# -------------------------------------------------------------
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'localhost'),
    'user': os.environ.get('DB_USER', 'root'),
    'password': os.environ.get('DB_PASS', ''),
    'database': os.environ.get('DB_NAME', 'collegehub_db'),
    'port': int(os.environ.get('DB_PORT', 3306)),
    'autocommit': True
}

def get_db():
    """Connects to MySQL database (XAMPP)."""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        return connection
    except mysql.connector.Error as err:
        print(f"[XAMPP MySQL Connection Error]: {err}")
        return None

# -------------------------------------------------------------
# AUTHENTICATION ROUTES
# -------------------------------------------------------------

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()

        if not email or not password:
            flash('Please enter both email address and password.', 'error')
            return render_template('login.html')

        conn = get_db()
        if not conn:
            # Fallback demo login if XAMPP is not yet started by user
            if email == 'krishna.v@college.edu' and (password == 'student123' or password == 'demo'):
                session['user_id'] = 1
                session['user_name'] = 'KRISHNA KAMALA PRASAD VISHWAKARMA'
                session['student_id'] = 'IT-2023-042'
                session['email'] = email
                session['department'] = 'Information Technology'
                session['year_semester'] = 'Year 3, Semester 5'
                flash('Logged in as demo student (offline mode).', 'success')
                return redirect(url_for('dashboard'))
            flash('Cannot connect to XAMPP MySQL. Please ensure MySQL is running in XAMPP.', 'error')
            return render_template('login.html')

        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        if user and check_password_hash(user['password_hash'], password):
            session['user_id'] = user['id']
            session['user_name'] = user['full_name']
            session['student_id'] = user['student_id']
            session['email'] = user['email']
            session['department'] = user['department']
            session['year_semester'] = user.get('year_semester', 'Year 3, Semester 5')
            flash(f"Welcome back, {user['full_name']}!", 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email address or password.', 'error')

    return render_template('login.html')

@app.route('/demo-login')
def demo_login():
    """Quick demo login as Krishna Kamala Prasad Vishwakarma."""
    session['user_id'] = 1
    session['user_name'] = 'KRISHNA KAMALA PRASAD VISHWAKARMA'
    session['student_id'] = 'IT-2023-042'
    session['email'] = 'krishna.v@college.edu'
    session['department'] = 'Information Technology'
    session['year_semester'] = 'Year 3, Semester 5'
    flash('Logged in as test student: KRISHNA KAMALA PRASAD VISHWAKARMA', 'success')
    return redirect(url_for('dashboard'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        full_name = request.form.get('full_name', '').strip()
        student_id = request.form.get('student_id', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '').strip()
        department = request.form.get('department', 'Information Technology').strip()
        year_semester = request.form.get('year_semester', 'Year 3, Semester 5').strip()

        if not all([full_name, student_id, email, password]):
            flash('All required fields must be filled.', 'error')
            return render_template('signup.html')

        conn = get_db()
        if not conn:
            # Local session fallback
            session['user_id'] = 99
            session['user_name'] = full_name
            session['student_id'] = student_id
            session['email'] = email
            session['department'] = department
            session['year_semester'] = year_semester
            flash('Account created! (Local session mode)', 'success')
            return redirect(url_for('dashboard'))

        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id FROM users WHERE email = %s OR student_id = %s", (email, student_id))
        if cursor.fetchone():
            flash('Student ID or Email already registered. Please sign in.', 'error')
            cursor.close()
            conn.close()
            return redirect(url_for('login'))

        pwd_hash = generate_password_hash(password)
        cursor.execute("""
            INSERT INTO users (full_name, student_id, email, password_hash, department, year_semester)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (full_name, student_id, email, pwd_hash, department, year_semester))
        user_id = cursor.lastrowid
        cursor.close()
        conn.close()

        session['user_id'] = user_id
        session['user_name'] = full_name
        session['student_id'] = student_id
        session['email'] = email
        session['department'] = department
        session['year_semester'] = year_semester
        flash('Registration successful! Welcome to CollegeHub.', 'success')
        return redirect(url_for('dashboard'))

    return render_template('signup.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Signed out successfully.', 'info')
    return redirect(url_for('login'))

# -------------------------------------------------------------
# STUDENT PORTAL & PROJECTS ROUTES
# -------------------------------------------------------------

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = get_db()
    assignments = []
    events = []
    attendance = 88.0

    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM assignments ORDER BY is_submitted ASC, due_date ASC LIMIT 4")
        assignments = cursor.fetchall()

        cursor.execute("SELECT * FROM campus_events ORDER BY event_date ASC LIMIT 3")
        events = cursor.fetchall()
        cursor.close()
        conn.close()
    else:
        # Default mock items if database connection not active yet
        assignments = [
            {'id': 1, 'subject': 'Internet of Things (IOT)', 'title': 'Smart Campus Sensor Simulation', 'due_date': '2026-10-12', 'is_submitted': 0, 'points': 100},
            {'id': 2, 'subject': 'Advanced Web Programming (AWP)', 'title': 'RESTful API with Flask & MySQL', 'due_date': '2026-10-15', 'is_submitted': 0, 'points': 50},
            {'id': 3, 'subject': 'Data Structures & Algorithms', 'title': 'AVL Tree Rotations Implementation', 'due_date': '2026-10-09', 'is_submitted': 1, 'points': 100},
        ]
        events = [
            {'id': 1, 'day_badge': '08', 'month_badge': 'OCT', 'location': 'CENTRAL LIBRARY', 'title': 'Library Research & Capstone Paper Hour', 'time': '14:00 - 16:30'},
            {'id': 2, 'day_badge': '11', 'month_badge': 'OCT', 'location': 'INNOVATION LAB', 'title': 'Technology Club Meetup: Python Flask', 'time': '16:00 - 18:30'},
        ]

    pending_count = sum(1 for a in assignments if not a.get('is_submitted'))
    submitted_count = sum(1 for a in assignments if a.get('is_submitted'))

    today_str = datetime.now().strftime("%A, %d %B %Y")

    return render_template(
        'dashboard.html',
        user=session,
        today=today_str,
        assignments=assignments,
        events=events,
        pending_count=pending_count,
        submitted_count=submitted_count,
        attendance=attendance
    )

@app.route('/assignments')
def assignments():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = get_db()
    items = []
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM assignments ORDER BY due_date ASC")
        items = cursor.fetchall()
        cursor.close()
        conn.close()
    else:
        items = [
            {'id': 1, 'subject': 'Internet of Things (IOT)', 'subject_code': 'IT-501', 'title': 'Smart Campus Sensor Simulation', 'due_date': '2026-10-12', 'is_submitted': 0, 'points': 100, 'description': 'Implement simulated MQTT sensor telemetry packet sender using Python.'},
            {'id': 2, 'subject': 'Advanced Web Programming (AWP)', 'subject_code': 'IT-502', 'title': 'RESTful API with Flask & MySQL', 'due_date': '2026-10-15', 'is_submitted': 0, 'points': 50, 'description': 'Build student portal routes, MySQL schemas, and CRUD views.'},
            {'id': 3, 'subject': 'Data Structures & Algorithms', 'subject_code': 'CS-301', 'title': 'AVL Tree Rotations Implementation', 'due_date': '2026-10-09', 'is_submitted': 1, 'points': 100, 'description': 'Self-balancing binary tree rotations.'},
            {'id': 4, 'subject': 'Database Systems (DBMS)', 'subject_code': 'IT-503', 'title': 'Database Normalization & Indexing', 'due_date': '2026-10-18', 'is_submitted': 0, 'points': 75, 'description': 'Decompose unnormalized relations into 3NF/BCNF.'},
        ]

    return render_template('assignments.html', assignments=items)

@app.route('/assignments/toggle/<int:assignment_id>', methods=['POST'])
def toggle_assignment(assignment_id):
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = get_db()
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT is_submitted FROM assignments WHERE id = %s", (assignment_id,))
        row = cursor.fetchone()
        if row:
            new_status = 0 if row['is_submitted'] else 1
            cursor.execute("UPDATE assignments SET is_submitted = %s WHERE id = %s", (new_status, assignment_id))
        cursor.close()
        conn.close()

    flash('Assignment status updated.', 'success')
    return redirect(request.referrer or url_for('assignments'))

@app.route('/notes')
def notes():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = get_db()
    items = []
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM notes ORDER BY created_at DESC")
        items = cursor.fetchall()
        cursor.close()
        conn.close()
    else:
        items = [
            {'id': 1, 'subject': 'Internet of Things (IOT)', 'subject_code': 'IT-501', 'title': 'Unit 3: MQTT Protocol & Edge Node Architecture', 'author_name': 'KRISHNA KAMALA PRASAD VISHWAKARMA', 'semester': 'Semester 5', 'file_size': '2.4 MB', 'summary': 'Comprehensive notes on MQTT broker QoS levels, edge architecture, and ESP32 telemetry.'},
            {'id': 2, 'subject': 'Advanced Web Programming (AWP)', 'subject_code': 'IT-502', 'title': 'Unit 2: Flask Routing, Sessions & MySQL XAMPP', 'author_name': 'Prof. S. Kulkarni', 'semester': 'Semester 5', 'file_size': '3.1 MB', 'summary': 'Official guide connecting Python Flask to local MySQL database with Werkzeug hashing.'},
            {'id': 3, 'subject': 'Data Structures & Algorithms', 'subject_code': 'CS-301', 'title': 'Data Structures: Tree Rotations & Dijkstra Algorithm', 'author_name': 'Ananya S.', 'semester': 'Semester 3', 'file_size': '4.8 MB', 'summary': 'Annotated diagrams of AVL balance factors, heaps, and shortest path graph algorithms.'},
        ]

    return render_template('notes.html', notes=items)

@app.route('/upload', methods=['GET', 'POST'])
def upload_notes():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        title = request.form.get('title')
        subject = request.form.get('subject')
        semester = request.form.get('semester', 'Year 3, Semester 5')
        summary = request.form.get('summary', '')

        conn = get_db()
        if conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO notes (title, subject, subject_code, semester, author_name, summary, file_size)
                VALUES (%s, %s, %s, %s, %s, %s, '2.5 MB')
            """, (title, subject, 'IT-GEN', semester, session.get('user_name', 'Student'), summary))
            cursor.close()
            conn.close()

        flash(f'Notes "{title}" published to library successfully!', 'success')
        return redirect(url_for('notes'))

    return render_template('upload.html', user=session)

@app.route('/events')
def events():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = get_db()
    items = []
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM campus_events ORDER BY event_date ASC")
        items = cursor.fetchall()
        cursor.close()
        conn.close()
    else:
        items = [
            {'id': 1, 'day_badge': '08', 'month_badge': 'OCT', 'location': 'CENTRAL LIBRARY', 'title': 'Library Research & Capstone Paper Hour', 'time': '14:00 - 16:30', 'category': 'Academic', 'description': 'Refine literature review and consult mentors.', 'attendees_count': 46},
            {'id': 2, 'day_badge': '11', 'month_badge': 'OCT', 'location': 'INNOVATION LAB', 'title': 'Technology Club: Python Flask Workshop', 'time': '16:00 - 18:30', 'category': 'Tech Club', 'description': 'Hands-on session with Flask and MySQL schemas.', 'attendees_count': 92},
            {'id': 3, 'day_badge': '14', 'month_badge': 'OCT', 'location': 'ROOM 0204', 'title': 'Industry Speaker: Edge Computing & IoT', 'time': '11:00 - 13:00', 'category': 'Workshops', 'description': 'Guest lecture on high-throughput MQTT pipelines.', 'attendees_count': 68},
        ]

    return render_template('events.html', events=items)

@app.route('/projects', methods=['GET', 'POST'])
def projects():
    if 'user_id' not in session:
        return redirect(url_for('login'))

    conn = get_db()
    if request.method == 'POST':
        title = request.form.get('title')
        domain = request.form.get('domain')
        abstract = request.form.get('abstract')
        tech_stack = request.form.get('tech_stack')
        supervisor = request.form.get('supervisor')
        github_url = request.form.get('github_url')

        if conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO projects (title, domain, abstract, tech_stack, student_id, student_name, supervisor, github_url, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'Under Review')
            """, (title, domain, abstract, tech_stack, session['user_id'], session['user_name'], supervisor, github_url))
            cursor.close()
            conn.close()

        flash(f'Project "{title}" submitted successfully for faculty review!', 'success')
        return redirect(url_for('projects'))

    projects_list = []
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM projects ORDER BY created_at DESC")
        projects_list = cursor.fetchall()
        cursor.close()
        conn.close()
    else:
        projects_list = [
            {'id': 1, 'title': 'CollegeHub - Academic Portal & Project Repository', 'domain': 'Full-Stack Web Application', 'abstract': 'Centralized portal for college students to coordinate assignments, notes, and senior capstone projects.', 'tech_stack': 'Python, Flask, MySQL, HTML, CSS', 'student_name': 'KRISHNA KAMALA PRASAD VISHWAKARMA', 'supervisor': 'Prof. S. Kulkarni', 'status': 'Approved', 'github_url': 'https://github.com/collegehub/portal'},
            {'id': 2, 'title': 'Smart Campus Air Quality Monitoring Network', 'domain': 'Internet of Things (IoT) & Cloud', 'abstract': 'Distributed mesh network of ESP32 sensor modules streaming environmental data.', 'tech_stack': 'C++, ESP32, MQTT, Python', 'student_name': 'Aarav Patel & Neha Rao', 'supervisor': 'Dr. A. Sharma', 'status': 'Under Review', 'github_url': 'https://github.com/smartcampus/mesh'},
        ]

    return render_template('projects.html', projects=projects_list)

@app.route('/profile')
def profile():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('profile.html', user=session)

if __name__ == '__main__':
    print("=" * 60)
    print("CollegeHub Flask Application")
    print("Frontend: HTML & CSS (Jinja Templates)")
    print("Backend : Python Flask")
    print("Database: XAMPP MySQL (collegehub_db)")
    print("Running on: http://127.0.0.1:5000")
    print("=" * 60)
    app.run(debug=True, host='0.0.0.0', port=5000)
