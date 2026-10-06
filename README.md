# CollegeHub - College Projects & Academic Portal

A minimal, modern student portal and college project management system built with **Python Flask**, **HTML5**, **CSS3**, and **MySQL (XAMPP)**.

---

## 📌 Project Overview

**CollegeHub** provides a centralized platform for college students and faculty to:
- **College Projects Repository:** Showcase semester capstone projects, tech stacks, GitHub source links, and submit proposals for faculty supervisor review.
- **Student Dashboard:** Personalized student space with real-time attendance rate tracking, assignment deadlines, and upcoming events.
- **Assignments Tracker:** Monitor due dates and mark coursework submissions.
- **Notes Library:** Browse, preview, and download peer-reviewed academic notes (IOT, Web Development, Data Structures, DBMS).
- **Upload Notes:** Contribute study material and lecture summaries for other students.
- **Campus Events Timeline:** Explore seminars, workshops, and hackathons with instant RSVP tracking.
- **Authentication:** Secure student session login and registration with password hashing.

---

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, Jinja2 Templates (No heavy frameworks required)
- **Backend:** Python 3.x, Flask
- **Database:** MySQL / MariaDB via XAMPP (`collegehub_db`)
- **Database Connector:** `mysql-connector-python`
- **Security:** `werkzeug.security` (Scrypt / PBKDF2 password hashing)

---

## 📁 Directory Structure

```text
my_project/
│
├── app.py                  # Main Flask application (routes, sessions, MySQL queries)
├── requirements.txt        # Python package dependencies
├── schema.sql              # MySQL schema & sample seed data for XAMPP phpMyAdmin
├── README.md               # Project documentation & setup instructions
│
├── templates/              # HTML templates (Jinja2)
│   ├── base.html           # Master layout (sidebar, topbar, flash alerts)
│   ├── index.html          # Entry redirect
│   ├── login.html          # Student sign-in page (with quick Demo login)
│   ├── signup.html         # Student registration page
│   ├── dashboard.html      # 3-section student dashboard & metrics
│   ├── assignments.html    # Coursework deadline tracker
│   ├── notes.html          # Approved class notes repository
│   ├── upload.html         # Share class notes form
│   ├── events.html         # Campus events timeline & RSVP
│   ├── projects.html       # College project submissions & gallery
│   └── profile.html        # Student ID & credentials view
│
└── static/
    └── css/
        └── style.css       # Clean minimal stylesheet (Forest green #1B5E38)
```

---

## 🚀 Getting Started (Step-by-Step Setup)

### Prerequisites
- [Python 3.8+](https://www.python.org/downloads/) installed
- [XAMPP](https://www.apachefriends.org/) installed (for Apache & MySQL)
- Git (optional)

---

### Step 1: Start XAMPP Services
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **Apache**.
3. Click **Start** next to **MySQL**.
> Ensure both show green running status.

---

### Step 2: Set Up MySQL Database in phpMyAdmin
1. Open your web browser and navigate to:
   ```text
   http://localhost/phpmyadmin
   ```
2. Click on the **Databases** tab.
3. Enter database name: `collegehub_db` and click **Create** (Collation: `utf8mb4_unicode_ci`).
4. Click on the newly created `collegehub_db` database on the left sidebar.
5. Go to the **Import** tab at the top.
6. Click **Choose File**, select `schema.sql` from your project folder, and click **Import** (or paste the contents of `schema.sql` into the **SQL** query tab and click **Go**).

*This will automatically create all tables (`users`, `assignments`, `notes`, `projects`, `campus_events`) and populate initial seed data.*

---

### Step 3: Set Up Python Virtual Environment
Open your terminal or command prompt inside the project folder:

```bash
# Navigate to project directory
cd my_project

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

---

### Step 4: Install Dependencies
Install all required libraries using `pip`:

```bash
pip install -r requirements.txt
```

---

### Step 5: Run the Flask Application
Start the development server:

```bash
python app.py
```

You should see output similar to:
```text
============================================================
CollegeHub Flask Application
Frontend: HTML & CSS (Jinja Templates)
Backend : Python Flask
Database: XAMPP MySQL (collegehub_db)
Running on: http://127.0.0.1:5000
============================================================
 * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)
```

---

### Step 6: Access the Application
Open your browser and navigate to:
```text
http://127.0.0.1:5000
```

---

## 🔑 Default Test Credentials

You can use the built-in **"Demo Login"** button on the login page, or log in manually with:

| Field | Credentials |
|---|---|
| **Email** | `krishna.v@college.edu` |
| **Password** | `student123` |
| **Student Name** | KRISHNA KAMALA PRASAD VISHWAKARMA |
| **Roll Number** | `IT-2023-042` |
| **Department** | Information Technology |
| **Semester** | Year 3, Semester 5 |

You can also register a new account on the `/signup` page.

---

## ⚙️ Database Configuration

By default, the connection in `app.py` uses standard XAMPP settings:

```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',          # Default XAMPP has no password
    'database': 'collegehub_db',
    'port': 3306,
    'autocommit': True
}
```

If your MySQL instance has a root password, modify `DB_CONFIG` in `app.py` or set environment variables:
- `DB_HOST`
- `DB_USER`
- `DB_PASS`
- `DB_NAME`
- `DB_PORT`

---

## 🎨 Color Palette & UI Guidelines

- **Primary Brand / Action Button:** Forest Green (`#1B5E38` / `#14472B`)
- **Primary Background:** Clean Minimal White (`#FBFBFA` / `#FFFFFF`)
- **Primary Text:** Dark Charcoal (`#1E1E1E`)
- **Muted Text:** Cool Gray (`#6B7280`)
- **Borders & Dividers:** Subtle Stone (`#E5E7EB`)

---

## 📄 License
This project is open-source and intended for academic and educational purposes.
