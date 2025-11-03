🎓 University Enrollment & Management System

Built with Next.js, TypeScript, and PostgreSQL

A full-stack database-driven web application that simulates a university enrollment system, allowing students to browse the course catalog, register for classes (with prerequisite validation), view their enrolled courses, and process tuition transactions.

This project was developed as part of University of Houston’s COSC 3380 – Database Systems (Team 017) to demonstrate relational database design, normalization, and system integration with a web interface.

🧠 Purpose

The goal of this project is to replicate the functionality of a real university registration portal — such as PeopleSoft or UH Access — in a simplified, academic form.

The system helps students:

- Browse the university course catalog

- Check course prerequisites before enrolling

- Enroll classes

- Make payments and track transactions for enrolled courses

- View their academic summary (total credits, enrolled hours, etc.)

Meanwhile, it demonstrates:

Proper database normalization (BCNF)

Use of foreign keys and referential integrity

Integration between a PostgreSQL backend and a Next.js frontend

🗂️ Core Database Design

The backend database follows a relational schema designed to handle multiple entities and relationships in a university system.

Main Entities and Entity Description
Student: Stores student details and IDs
Course:	Contains course information such as title, credits, and department
Prerequisite: Defines prerequisite relationships between courses
ClassSection: Represents individual course offerings per semester
Enrollment: Tracks which students are enrolled in which sections
Payment: Records tuition and transaction history per student

The schema was designed using ER modeling, normalized up to BCNF, and implemented in PostgreSQL to ensure data consistency and efficient queries.

⚙️ Key Features

Course Catalog:
Students can view all available courses, credits, prerequisites and departments.

Prerequisite Validation:
When enrolling, the system checks if required courses are completed.

Enrollment Management:
Students can enroll, drop, or update their class selections.

Transaction System:
Automatically generates tuition charges based on enrolled credits and stores payments.

Student Dashboard:
Displays enrolled classes, total credits, and payment summary.

🛠️ Tech Stack
Layer	Tools
Frontend	Next.js (App Router), TypeScript, React Components
Backend	Node.js API routes, PostgreSQL
Database Design	ERD → BCNF normalization → SQL DDL & DML
Styling	TailwindCSS, shadcn/ui
Deployment	Vercel
Version Control	Git & GitHub PR workflow

🚀 Getting Started
Clone and install dependencies:
git clone https://github.com/yourusername/COSC3380-UniversityProject-team017.git
cd COSC3380-UniversityProject-team017
npm install

Start the development server:
npm run dev

Visit http://localhost:3000
 to access the web interface.


📚 Learning Outcomes

This project demonstrates:

Designing a relational database schema for real-world business rules

Implementing foreign keys, joins, and referential integrity

Creating dynamic front-end interfaces linked to SQL queries

Performing end-to-end testing between client and database layers

Understanding transactional workflows in web systems