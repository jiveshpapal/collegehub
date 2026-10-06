import { Assignment, AttendanceRecord, CampusEvent, CollegeProject, NoteItem, User } from '../types';

export const DEFAULT_USER: User = {
  id: 'usr_krishna_01',
  name: 'KRISHNA KAMALA PRASAD VISHWAKARMA',
  studentId: 'IT-2023-042',
  email: 'krishna.v@college.edu',
  department: 'Information Technology',
  yearSemester: 'Year 3, Semester 5',
  avatarInitials: 'KV',
  phone: '+91 98765 43210',
  bio: 'Third-year Information Technology student interested in full-stack web applications, distributed systems, and open-source software.',
};

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-01',
    title: 'Internet of Things: Smart Campus Sensor Simulation',
    subject: 'Internet of Things (IOT)',
    subjectCode: 'IT-501',
    dueDate: '2026-10-12',
    dueDateFormatted: 'Monday, 12 Oct',
    daysRemaining: 6,
    isSubmitted: false,
    totalPoints: 100,
    description: 'Implement a simulated MQTT sensor node using Python to publish telemetry packets (temperature, humidity, light) to a local broker, visualizing data with a dashboard.',
    submissionFormat: 'ZIP Archive (.py + report PDF)',
    professor: 'Dr. A. Sharma',
  },
  {
    id: 'asg-02',
    title: 'Advanced Web Programming: RESTful API with Flask & MySQL',
    subject: 'Advanced Web Programming (AWP)',
    subjectCode: 'IT-502',
    dueDate: '2026-10-15',
    dueDateFormatted: 'Thursday, 15 Oct',
    daysRemaining: 9,
    isSubmitted: false,
    totalPoints: 50,
    description: 'Design and test relational endpoints for Student Management using Python Flask, SQLAlchemy or MySQL connector, complete with CRUD operations and unit tests.',
    submissionFormat: 'GitHub Repository link + Postman collection',
    professor: 'Prof. S. Kulkarni',
  },
  {
    id: 'asg-03',
    title: 'Data Structures: AVL Tree Balancing & Red-Black Tree Analysis',
    subject: 'Data Structures & Algorithms',
    subjectCode: 'CS-301',
    dueDate: '2026-10-09',
    dueDateFormatted: 'Friday, 09 Oct',
    daysRemaining: 3,
    isSubmitted: true,
    submittedAt: '2026-10-05 16:30',
    totalPoints: 100,
    description: 'Implement self-balancing AVL binary search trees in C++/Java with LL, RR, LR, and RL rotation test suites.',
    submissionFormat: 'Source Code + Execution Report',
    professor: 'Prof. R. Mehta',
  },
  {
    id: 'asg-04',
    title: 'Database Management Systems: Normalization & Query Tuning',
    subject: 'Database Systems (DBMS)',
    subjectCode: 'IT-503',
    dueDate: '2026-10-18',
    dueDateFormatted: 'Sunday, 18 Oct',
    daysRemaining: 12,
    isSubmitted: false,
    totalPoints: 75,
    description: 'Convert unnormalized university records to 3NF/BCNF. Provide execution plans using EXPLAIN ANALYZE on indexed queries.',
    submissionFormat: 'PDF Schema Diagram + SQL Script',
    professor: 'Dr. V. Patil',
  },
  {
    id: 'asg-05',
    title: 'Cloud Computing: Microservices Deployment on Docker Containers',
    subject: 'Cloud & Distributed Systems',
    subjectCode: 'IT-504',
    dueDate: '2026-10-04',
    dueDateFormatted: 'Sunday, 04 Oct',
    daysRemaining: 0,
    isSubmitted: true,
    submittedAt: '2026-10-03 21:14',
    totalPoints: 100,
    description: 'Containerize multi-tier architecture with Docker Compose and nginx reverse proxy.',
    submissionFormat: 'docker-compose.yml + Architecture Doc',
    professor: 'Prof. N. Deshmukh',
  },
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'note-01',
    title: 'Unit 3: MQTT Protocol & Edge Node Architecture',
    subject: 'Internet of Things (IOT)',
    subjectCode: 'IT-501',
    semester: 'Semester 5',
    authorName: 'KRISHNA KAMALA PRASAD VISHWAKARMA',
    uploadDate: '02 Oct 2026',
    fileSize: '2.4 MB',
    fileType: 'PDF Document',
    pagesCount: 18,
    downloadsCount: 142,
    summary: 'Comprehensive notes covering MQTT publish/subscribe model, QoS 0/1/2 levels, Last Will and Testament (LWT), and Arduino/ESP32 WiFi integration.',
    contentMarkdown: `## Unit 3: MQTT Protocol & Edge Node Architecture

### 1. Overview of MQTT
- **MQTT (Message Queuing Telemetry Transport)** is an extremely lightweight publish/subscribe network protocol.
- Transport: TCP/IP. Port: 1883 (unencrypted), 8883 (SSL/TLS).
- Designed for low-bandwidth, high-latency, or unreliable networks with battery-constrained microcontrollers (ESP8266, ESP32, STM32).

### 2. Architecture: Broker vs Client
- **Broker**: Central server receiving all messages, filtering them by topic, and dispatching them to interested subscribers. (e.g., Mosquitto, EMQX, HiveMQ).
- **Publishers**: Sensor nodes that capture environmental telemetry and emit to \`sensors/roomA/temp\`.
- **Subscribers**: Dashboards, database recorders, or actuators listening on wildcard topics like \`sensors/#\`.

### 3. Quality of Service (QoS) Levels
1. **QoS 0 (At most once)**: "Fire and forget". No acknowledgement required. Lowest overhead.
2. **QoS 1 (At least once)**: Guaranteed delivery, but potential duplicates. Acknowledged via \`PUBACK\`.
3. **QoS 2 (Exactly once)**: Highest reliability via 4-step handshake (\`PUBLISH\`, \`PUBREC\`, \`PUBREL\`, \`PUBCOMP\`).

### 4. Code Sample: Python Paho-MQTT Client
\`\`\`python
import paho.mqtt.client as mqtt
import json, time

client = mqtt.Client(client_id="campus_temp_sensor_01")
client.connect("broker.hivemq.com", 1883, 60)

while True:
    payload = json.dumps({"temp": 24.5, "unit": "C", "status": "OK"})
    client.publish("collegehub/campus/lab204", payload, qos=1)
    time.sleep(5)
\`\`\``,
  },
  {
    id: 'note-02',
    title: 'Unit 2: Flask Routing, Blueprints & MySQL XAMPP Integration',
    subject: 'Advanced Web Programming (AWP)',
    subjectCode: 'IT-502',
    semester: 'Semester 5',
    authorName: 'Prof. S. Kulkarni (Approved Faculty)',
    uploadDate: '28 Sep 2026',
    fileSize: '3.1 MB',
    fileType: 'PDF Document',
    pagesCount: 24,
    downloadsCount: 389,
    summary: 'Official faculty guide on connecting Flask micro-framework with local XAMPP MySQL servers, managing sessions, and implementing password hashing with Werkzeug.',
    contentMarkdown: `## Unit 2: Flask Routing, Blueprints & MySQL XAMPP Integration

### 1. Flask Application Structure
A clean production college project requires separated concerns:
- \`app.py\` - Server entry point and database pool.
- \`templates/\` - Jinja2 server-rendered views.
- \`static/css/\` - Modern stylesheet and UI assets.

### 2. Configuring MySQL Connection in XAMPP
By default, XAMPP sets MySQL credentials to:
- **Host**: \`localhost\`
- **Port**: \`3306\`
- **User**: \`root\`
- **Password**: \`""\` (empty string)
- **Database**: \`collegehub_db\`

### 3. Essential Security Practices
- Always hash passwords before storing in MySQL table using \`werkzeug.security.generate_password_hash\`.
- Use parameterized queries with \`cursor.execute(sql, (val1, val2))\` to prevent SQL Injection attacks.
- Store session secret key in environment variable.`,
  },
  {
    id: 'note-03',
    title: 'Data Structures: Tree Rotations, Heaps & Graph Traversals',
    subject: 'Data Structures & Algorithms',
    subjectCode: 'CS-301',
    semester: 'Semester 3',
    authorName: 'Ananya S. (Dept Topper)',
    uploadDate: '15 Sep 2026',
    fileSize: '4.8 MB',
    fileType: 'PDF Document',
    pagesCount: 32,
    downloadsCount: 512,
    summary: 'Handwritten annotated diagrams of AVL single/double rotations, Dijkstra shortest path algorithm, and Minimum Spanning Trees (Kruskal & Prim).',
    contentMarkdown: `## Data Structures: Tree Rotations, Heaps & Graph Traversals

### 1. AVL Tree Balance Factor
- **Balance Factor (BF)** = Height(Left Subtree) - Height(Right Subtree)
- Condition: BF must be in \`{-1, 0, +1}\` for every node.
- **Rotations**:
  - Right Rotation (LL Imbalance)
  - Left Rotation (RR Imbalance)
  - Left-Right Rotation (LR Imbalance)
  - Right-Left Rotation (RL Imbalance)

### 2. Dijkstra's Algorithm Complexity
- Time Complexity with Min-Heap Priority Queue: \`O((V + E) log V)\`
- Edge restriction: No negative edge weights.`,
  },
  {
    id: 'note-04',
    title: 'Relational Database Schema Design & 3NF Normalization',
    subject: 'Database Systems (DBMS)',
    subjectCode: 'IT-503',
    semester: 'Semester 4',
    authorName: 'KRISHNA KAMALA PRASAD VISHWAKARMA',
    uploadDate: '20 Sep 2026',
    fileSize: '1.9 MB',
    fileType: 'PDF Document',
    pagesCount: 15,
    downloadsCount: 204,
    summary: 'Step-by-step breakdown of eliminating insertion, update, and deletion anomalies. Functional dependency decomposition into BCNF.',
    contentMarkdown: `## Relational Database Schema Design & Normalization

### Normal Forms Checklist
1. **1NF**: Atomic attributes, no repeating groups.
2. **2NF**: In 1NF and no partial dependencies (every non-prime attribute fully functionally dependent on candidate key).
3. **3NF**: In 2NF and no transitive dependencies ($X \to Y$, $Y \to Z$ where $Z$ is non-prime).
4. **BCNF**: For every functional dependency $X \to Y$, $X$ is a super key.`,
  },
];

export const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'ev-01',
    day: '08',
    month: 'OCT',
    location: 'CENTRAL LIBRARY',
    title: 'Library Research & Capstone Paper Hour',
    time: '14:00 - 16:30',
    description: 'Access IEEE Xplore, ScienceDirect digital archives, and meet faculty mentors to refine your final year project literature review.',
    category: 'Academic',
    organizer: 'Academic Affairs Committee',
    attendeesCount: 46,
    isRsvp: true,
  },
  {
    id: 'ev-02',
    day: '11',
    month: 'OCT',
    location: 'INNOVATION LAB',
    title: 'Technology Club: Full-Stack Flask & Python Workshop',
    time: '16:00 - 18:30',
    description: 'Hands-on session building clean micro-services with Python Flask, Jinja templating, and relational MySQL schemas.',
    category: 'Tech Club',
    organizer: 'Developer Student Club',
    attendeesCount: 92,
    isRsvp: true,
  },
  {
    id: 'ev-03',
    day: '14',
    month: 'OCT',
    location: 'ROOM 0204',
    title: 'Industry Speaker: Edge Computing & Modern IoT Protocols',
    time: '11:00 - 13:00',
    description: 'Guest lecture by Senior Architect on MQTT edge gateways, telemetry security, and high-throughput ingestion pipelines.',
    category: 'Workshops',
    organizer: 'Dept. of Information Technology',
    attendeesCount: 68,
    isRsvp: false,
  },
  {
    id: 'ev-04',
    day: '20',
    month: 'OCT',
    location: 'AUDITORIUM B',
    title: 'Annual Campus Hackathon & Project Expo 2026',
    time: '09:00 - 21:00',
    description: '36-hour sprint where student teams showcase capstone projects to alumni judges and venture partners.',
    category: 'Tech Club',
    organizer: 'Engineering Council',
    attendeesCount: 154,
    isRsvp: false,
  },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-01',
    subject: 'Internet of Things (IOT)',
    code: 'IT-501',
    attended: 28,
    total: 32,
    professor: 'Dr. A. Sharma',
    recentStatus: ['P', 'P', 'P', 'A', 'P'],
  },
  {
    id: 'att-02',
    subject: 'Advanced Web Programming (AWP)',
    code: 'IT-502',
    attended: 30,
    total: 34,
    professor: 'Prof. S. Kulkarni',
    recentStatus: ['P', 'P', 'P', 'P', 'P'],
  },
  {
    id: 'att-03',
    subject: 'Database Systems (DBMS)',
    code: 'IT-503',
    attended: 27,
    total: 30,
    professor: 'Dr. V. Patil',
    recentStatus: ['P', 'A', 'P', 'P', 'P'],
  },
  {
    id: 'att-04',
    subject: 'Data Structures & Algorithms',
    code: 'CS-301',
    attended: 33,
    total: 36,
    professor: 'Prof. R. Mehta',
    recentStatus: ['P', 'P', 'A', 'P', 'P'],
  },
];

export const INITIAL_PROJECTS: CollegeProject[] = [
  {
    id: 'proj-01',
    title: 'CollegeHub - Academic Portal & Project Repository',
    domain: 'Full-Stack Web Application',
    abstract: 'A centralized portal for college students to coordinate assignments, access peer-reviewed notes, monitor attendance rates, and archive senior capstone projects.',
    techStack: ['Python', 'Flask', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    studentName: 'KRISHNA KAMALA PRASAD VISHWAKARMA',
    studentId: 'IT-2023-042',
    department: 'Information Technology',
    supervisor: 'Prof. S. Kulkarni',
    year: '2026',
    githubUrl: 'https://github.com/collegehub/project-portal',
    demoUrl: 'https://collegehub.internal.edu',
    status: 'Approved',
    submittedDate: '2026-10-01',
  },
  {
    id: 'proj-02',
    title: 'Smart Campus Air Quality & Noise Monitoring Network',
    domain: 'Internet of Things (IoT) & Cloud',
    abstract: 'Distributed mesh network of ESP32 sensor modules deployed across lecture halls and laboratories, streaming environmental data over MQTT to an anomaly detection engine.',
    techStack: ['C++', 'ESP32', 'MQTT', 'Python', 'InfluxDB', 'Grafana'],
    studentName: 'Aarav Patel & Neha Rao',
    studentId: 'IT-2023-018',
    department: 'Information Technology',
    supervisor: 'Dr. A. Sharma',
    year: '2026',
    githubUrl: 'https://github.com/smartcampus/sensor-mesh',
    status: 'Under Review',
    submittedDate: '2026-09-28',
  },
  {
    id: 'proj-03',
    title: 'Automated Timetable Generator using Genetic Algorithms',
    domain: 'Artificial Intelligence & Operations',
    abstract: 'Heuristic optimization solver that resolves faculty overlaps, room capacities, and laboratory time slots to produce collision-free semester schedules.',
    techStack: ['Python', 'Flask', 'NumPy', 'SQLite', 'Bootstrap'],
    studentName: 'Rohan Deshpande',
    studentId: 'CS-2023-089',
    department: 'Computer Science',
    supervisor: 'Prof. R. Mehta',
    year: '2026',
    githubUrl: 'https://github.com/rohand/timetable-gen',
    status: 'Approved',
    submittedDate: '2026-09-20',
  },
];
