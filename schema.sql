-- ========================================================
-- CollegeHub Database Schema (MySQL / MariaDB for XAMPP)
-- Import this file in phpMyAdmin (http://localhost/phpmyadmin)
-- ========================================================

CREATE DATABASE IF NOT EXISTS collegehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE collegehub_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    department VARCHAR(100) DEFAULT 'Information Technology',
    year_semester VARCHAR(50) DEFAULT 'Year 3, Semester 5',
    phone VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Assignments Table
CREATE TABLE IF NOT EXISTS assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NULL,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    due_date DATE NOT NULL,
    is_submitted TINYINT(1) DEFAULT 0,
    submitted_at DATETIME NULL,
    points INT DEFAULT 100,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Notes Library Table
CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    semester VARCHAR(50) NOT NULL,
    author_name VARCHAR(150) NOT NULL,
    file_size VARCHAR(20) DEFAULT '2.4 MB',
    summary TEXT,
    downloads_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. College Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    domain VARCHAR(100) NOT NULL,
    abstract TEXT NOT NULL,
    tech_stack VARCHAR(255) NOT NULL,
    student_id INT NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    supervisor VARCHAR(100) NOT NULL,
    github_url VARCHAR(255) NULL,
    demo_url VARCHAR(255) NULL,
    status ENUM('Approved', 'Under Review', 'Needs Revision') DEFAULT 'Under Review',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Campus Events Table
CREATE TABLE IF NOT EXISTS campus_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    day_badge VARCHAR(10) NOT NULL,
    month_badge VARCHAR(10) NOT NULL,
    event_time VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) DEFAULT 'Academic',
    organizer VARCHAR(100) DEFAULT 'College Council',
    attendees_count INT DEFAULT 0
) ENGINE=InnoDB;

-- Seed Default Test Student (Password: 'student123')
INSERT INTO users (full_name, student_id, email, password_hash, department, year_semester)
VALUES (
    'KRISHNA KAMALA PRASAD VISHWAKARMA',
    'IT-2023-042',
    'krishna.v@college.edu',
    'scrypt:32768:8:1$7XhB9x1oVlYQhU8B$c5ad2231ffc2f5d16f8efb94236b28038d5854bcfb2bba6898d9adfcba8382d3ca65d140e6fe9897087612f11100366110f00bf75402ad77da1c8fa5da780827',
    'Information Technology',
    'Year 3, Semester 5'
) ON DUPLICATE KEY UPDATE full_name=full_name;

-- Seed Sample Assignments
INSERT INTO assignments (title, subject, subject_code, due_date, is_submitted, points, description)
VALUES 
('Smart Campus Sensor Simulation', 'Internet of Things (IOT)', 'IT-501', '2026-10-12', 0, 100, 'Implement simulated MQTT sensor telemetry nodes with Python.'),
('RESTful API with Flask & MySQL', 'Advanced Web Programming (AWP)', 'IT-502', '2026-10-15', 0, 50, 'Build relational student portal CRUD endpoints and MySQL queries.'),
('AVL Tree Balancing & Rotations', 'Data Structures & Algorithms', 'CS-301', '2026-10-09', 1, 100, 'Self-balancing AVL tree implementation in C++.');

-- Seed Sample Notes
INSERT INTO notes (title, subject, subject_code, semester, author_name, summary, file_size)
VALUES
('Unit 3: MQTT Protocol & Edge Node Architecture', 'Internet of Things (IOT)', 'IT-501', 'Semester 5', 'KRISHNA KAMALA PRASAD VISHWAKARMA', 'Comprehensive notes on MQTT broker QoS levels, edge architecture, and ESP32 telemetry.', '2.4 MB'),
('Unit 2: Flask Routing, Sessions & MySQL XAMPP', 'Advanced Web Programming (AWP)', 'IT-502', 'Semester 5', 'Prof. S. Kulkarni', 'Official faculty guide connecting Python Flask to local MySQL database with Werkzeug hashing.', '3.1 MB');

-- Seed Sample Projects
INSERT INTO projects (title, domain, abstract, tech_stack, student_id, student_name, supervisor, status, github_url)
VALUES
('CollegeHub - Academic Portal & Project Repository', 'Full-Stack Web Application', 'A centralized portal for college students to coordinate assignments, access notes, and archive senior capstone projects.', 'Python, Flask, MySQL, HTML5, CSS3', 1, 'KRISHNA KAMALA PRASAD VISHWAKARMA', 'Prof. S. Kulkarni', 'Approved', 'https://github.com/collegehub/portal');

-- Seed Sample Events
INSERT INTO campus_events (title, event_date, day_badge, month_badge, event_time, location, description, category, attendees_count)
VALUES
('Library Research & Capstone Paper Hour', '2026-10-08', '08', 'OCT', '14:00 - 16:30', 'CENTRAL LIBRARY', 'Access IEEE Xplore digital archives and consult mentors.', 'Academic', 46),
('Technology Club: Python Flask Workshop', '2026-10-11', '11', 'OCT', '16:00 - 18:30', 'INNOVATION LAB', 'Hands-on session connecting Flask to XAMPP MySQL.', 'Tech Club', 92),
('Industry Speaker: Modern IoT Edge Protocols', '2026-10-14', '14', 'OCT', '11:00 - 13:00', 'ROOM 0204', 'Guest lecture on high-throughput MQTT pipelines.', 'Workshops', 68);
