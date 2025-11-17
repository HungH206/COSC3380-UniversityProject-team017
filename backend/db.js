// backend/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "finaluniversitydb",  // or your custom DB (coursedb)
  user: "postgres",
  password: "2006hung",
});

// --- auto create tables on first run ---
async function initSchema() {
  const client = await pool.connect();
  try {
    console.log("🗄️  Checking database tables...");


// Initialize sequences
await client.query(`
      CREATE SEQUENCE IF NOT EXISTS student_seq START 1;
      CREATE SEQUENCE IF NOT EXISTS course_seq START 1;
      CREATE SEQUENCE IF NOT EXISTS section_seq START 1;
      CREATE SEQUENCE IF NOT EXISTS semester_seq START 1;
      CREATE SEQUENCE IF NOT EXISTS schedule_seq START 1;
      CREATE SEQUENCE IF NOT EXISTS instructor_seq START 1;
      CREATE SEQUENCE IF NOT EXISTS payment_seq START 1;
    `);

    // 1/ Student test table

     await client.query(`
      CREATE TABLE IF NOT EXISTS Student (
        StudentID CHAR(10) PRIMARY KEY DEFAULT 'S' || LPAD(NEXTVAL('student_seq')::text, 3, '0'),
        StudentName VARCHAR(100),
        Password VARCHAR(20)
      );
    `);

    await client.query(`
      INSERT INTO Student (StudentName, Password)
      VALUES
      ('Alice Blue', 'AB123456'),
      ('Brian Lee', 'BL654321'),
      ('Jessi Kim', 'JK111222'),
      ('David Brown', 'DB333444'),
      ('Emma Johnson', 'EJ555666')
      ON CONFLICT DO NOTHING;
    `);

    // 2. BankAccount table
    await client.query(`
    CREATE TABLE IF NOT EXISTS BankAccount (
	StudentID CHAR(10) PRIMARY KEY REFERENCES Student(StudentID),
  Balance DECIMAL(10,2) DEFAULT 0,
  CardNo CHAR(16)
);
    `);

// 3. Semester
await client.query(`
CREATE TABLE IF NOT EXISTS Semester (
	SemesterID CHAR(10) PRIMARY KEY DEFAULT 'SEM' || LPAD(NEXTVAL('semester_seq')::text, 2, '0'),
	Term CHAR(20),
	Year INT
);
  `);

    // 4. Schedule
await client.query(`
CREATE TABLE IF NOT EXISTS Schedule (
	ScheduleID CHAR(10) PRIMARY KEY DEFAULT 'SCH' || LPAD(NEXTVAL('schedule_seq')::text, 2, '0'),
	DayOfWeek CHAR(10) NOT NULL,
	StartTime TIME NOT NULL,
	EndTime TIME NOT NULL,
	CONSTRAINT chk_time CHECK (EndTime > StartTime)
);
`);


//5. Instructor
    await client.query(`
CREATE TABLE IF NOT EXISTS instructor (
  instructorid SERIAL PRIMARY KEY,
  instructorname VARCHAR(100)
);
    `);

    //6. Courses table
    await client.query(`
CREATE TABLE IF NOT EXISTS course (
  CourseID CHAR(10) PRIMARY KEY DEFAULT 'C' || LPAD(NEXTVAL('course_seq')::text, 3, '0'),
	CourseName CHAR(100) NOT NULL,
	Credits INT,
	Dept CHAR(20),
	Course CHAR(20),
	Cost DECIMAL(10,2),
	Description CHAR(500)
);
 `);

 //7. Course Prerequisite
 await client.query(`
CREATE TABLE IF NOT EXISTS Prerequisite (
	CourseID CHAR(10),
	PrereCourseID CHAR(10),
	PRIMARY KEY (CourseID, PrereCourseID),
	FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
	FOREIGN KEY (PrereCourseID) REFERENCES Course(CourseID)
);
`);

// 8. Section 
 await client.query(`
CREATE TABLE IF NOT EXISTS Section (
	SectionID CHAR(10) PRIMARY KEY,
	CourseID CHAR(10),
	SemesterID CHAR(10),
	Mode CHAR(20),
	RoomID CHAR(10),
	InstructorID CHAR(10),
	EnrolledCount INT DEFAULT 0,
	Status CHAR(20),
	Capacity INT
);
`);

// 9. Sectionschedule
 await client.query(`
CREATE TABLE IF NOT EXISTS SectionSchedule (
	SectionID CHAR(10) REFERENCES Section(SectionID),
	ScheduleID CHAR(10)  REFERENCES Schedule(ScheduleID),
	PRIMARY KEY (SectionID, ScheduleID)
);
  `);

  // 10. Enrollments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Enrollments (
        EnrollmentID SERIAL PRIMARY KEY,
        StudentID CHAR(10) REFERENCES Student(StudentID),
        SectionID CHAR(10) REFERENCES Section(SectionID),
        Enrollment_status VARCHAR(20) DEFAULT 'enrolled',
        Enroll_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        Grade CHAR(2)
      );
    `);


 // 11. Transactions table
await client.query(`
      CREATE TABLE IF NOT EXISTS Payment (
        PaymentID CHAR(10) PRIMARY KEY DEFAULT 'P' || LPAD(NEXTVAL('payment_seq')::text, 3, '0'),
        StudentID CHAR(10) REFERENCES Student(StudentID),
        Amount_due DECIMAL(10,2),
        Pay_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);


    // 12. Cart table
    await client.query(`
    CREATE TABLE IF NOT EXISTS Cart (
        CartID SERIAL PRIMARY KEY,
        StudentID CHAR(10) REFERENCES Student(StudentID),
        CourseID CHAR(10) REFERENCES Course(CourseID),
        Added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `);


    console.log("✅ All tables verified / created successfully.");
  } catch (err) {
    console.error("❌ Error initializing database schema:", err);
  } finally {
    client.release();
  }
}

// Run automatically on backend start
initSchema();