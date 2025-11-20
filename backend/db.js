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


// Reset sequences to ensure consistent IDs
await client.query(`
      DROP SEQUENCE IF EXISTS student_seq CASCADE;
      DROP SEQUENCE IF EXISTS course_seq CASCADE;
      DROP SEQUENCE IF EXISTS section_seq CASCADE;
      DROP SEQUENCE IF EXISTS semester_seq CASCADE;
      DROP SEQUENCE IF EXISTS schedule_seq CASCADE;
      DROP SEQUENCE IF EXISTS instructor_seq CASCADE;
      DROP SEQUENCE IF EXISTS payment_seq CASCADE;
      
      CREATE SEQUENCE student_seq START 1;
      CREATE SEQUENCE course_seq START 1;
      CREATE SEQUENCE section_seq START 1;
      CREATE SEQUENCE semester_seq START 1;
      CREATE SEQUENCE schedule_seq START 1;
      CREATE SEQUENCE instructor_seq START 1;
      CREATE SEQUENCE payment_seq START 1;
    `);

    // 1/ Student test table

     await client.query(`
      DROP TABLE IF EXISTS Student CASCADE;
      CREATE TABLE IF NOT EXISTS Student (
        StudentID CHAR(10) PRIMARY KEY DEFAULT 'S' || LPAD(NEXTVAL('student_seq')::text, 3, '0'),
        StudentName CHAR(100),
   	    Password CHAR(8),
	      Total_Credits INT DEFAULT 0,
	      GPA DECIMAL(4,3) DEFAULT 0.000
      );
    `);

    await client.query(`
      INSERT INTO Student (StudentName, Password)
      VALUES
      ('Alice Blue', 'AB123456'),
      ('Brian Lee', 'BL654321'),
      ('Jessi Kim', 'JK111222'),
      ('David Brown', 'DB333444'),
      ('Emma Johnson', 'EJ555666'),
      ('Frank Houston', 'FH777888')
      ON CONFLICT DO NOTHING;
    `);

    // 2. BankAccount table
    await client.query(`
    DROP TABLE IF EXISTS BankAccount CASCADE;
    CREATE TABLE IF NOT EXISTS BankAccount (
	StudentID CHAR(10) PRIMARY KEY REFERENCES Student(StudentID),
  Balance DECIMAL(10,2) DEFAULT 0,
  CardNo CHAR(16)
);

INSERT INTO BankAccount (StudentID, Balance, CardNo)
SELECT s.StudentID, b.Balance, b.CardNo
FROM (VALUES 
  ('Alice Blue', 12704.50, '4000123412341234'),
  ('Brian Lee', 8503.75, '4000567856785678'),
  ('Jessi Kim', 25050.30, '4000987698769876'),
  ('David Brown', 15032.00, '4000432143214321'),
  ('Emma Johnson', 23874.00, '4000876587658765'),
  ('Frank Houston', 1200.00, '4000654309876543')
) AS b(StudentName, Balance, CardNo)
JOIN Student s ON s.StudentName = b.StudentName
ON CONFLICT DO NOTHING;
    `);

// 3. Semester
await client.query(`
DROP TABLE IF EXISTS Semester CASCADE;
CREATE TABLE IF NOT EXISTS Semester (
	SemesterID CHAR(10) PRIMARY KEY DEFAULT 'SEM' || LPAD(NEXTVAL('semester_seq')::text, 2, '0'),
	Term CHAR(20),
	Year INT
);

INSERT INTO Semester (Term, Year) VALUES
('Spring', 2026),
('Summer', 2026),
('Fall', 2026);

  `);

    // 4. Schedule
await client.query(`
DROP TABLE IF EXISTS Schedule CASCADE;
CREATE TABLE IF NOT EXISTS Schedule (
	ScheduleID CHAR(10) PRIMARY KEY DEFAULT 'SCH' || LPAD(NEXTVAL('schedule_seq')::text, 2, '0'),
	DayOfWeek CHAR(10) NOT NULL,
	StartTime TIME NOT NULL,
	EndTime TIME NOT NULL,
	CONSTRAINT chk_time CHECK (EndTime > StartTime)
);

INSERT INTO Schedule(DayOfWeek, StartTime, EndTime) VALUES
('Mon','09:00','10:30'),  -- SCH01
('Wed','09:00','10:30'),  -- SCH02
('Tue','09:00','10:30'),  -- SCH03
('Thu','09:00','10:30'),  -- SCH04
('Mon','10:30','12:00'),  -- SCH05
('Wed','10:30','12:00'),  -- SCH06
('Tue','10:30','12:00'),  -- SCH07
('Thu','10:30','12:00'),  -- SCH08
('Mon','13:00','14:30'),  -- SCH09
('Wed','13:00','14:30'),  -- SCH10
('Tue','13:00','14:30'),  -- SCH11
('Thu','13:00','14:30'), -- SCH12
('Fri','09:00','12:00'),  -- SCH13
('Fri','12:30','15:30');  -- SCH14
`);


//5. Instructor
    await client.query(`
DROP TABLE IF EXISTS Instructor CASCADE;
CREATE TABLE IF NOT EXISTS instructor (
  instructorid SERIAL PRIMARY KEY,
  instructorname VARCHAR(100)
);

INSERT INTO Instructor (InstructorName) VALUES
('Dr. Kate Hudson'),      -- I001 will teach both college algebra and statistic
('Dr. John Smith'),      
('Dr. Scott Nguyen'),    
('Dr. Jennifer Lee'),    
('Dr. Carlos Ordonez'),  
('Dr. Maria Lopez'),     
('Dr. David Brown'),     
('Dr. Emily Johnson'),   
('Dr. Anna Kim'); 

    `);

    //6. Courses table
    await client.query(`
DROP TABLE IF EXISTS course CASCADE;
CREATE TABLE IF NOT EXISTS course (
  CourseID CHAR(10) PRIMARY KEY DEFAULT 'C' || LPAD(NEXTVAL('course_seq')::text, 3, '0'),
	CourseName CHAR(100) NOT NULL,
	Credits INT,
	Dept CHAR(20),
	Course CHAR(20),
	Cost DECIMAL(10,2),
	Description CHAR(500)
);

INSERT INTO Course (CourseID, CourseName, Credits, Dept, Course, Cost, Description) VALUES
('C001', 'English Composition I', 3, 'ENGL', '1301', 450, 'Introduction to college-level writing and composition.'),
('C002', 'Public Speaking', 3, 'COMM', '1315', 450, 'Basics of effective oral communication and presentation skills.'),
('C003', 'U.S. History I', 3, 'HIST', '1301', 450, 'Survey of U.S. history from colonization to Reconstruction.'),
('C004', 'Introduction to Psychology', 3, 'PSYC', '2301', 450, 'Overview of human behavior and mental processes.'),
('C005', 'College Algebra', 3, 'MATH', '1314', 450, 'Fundamentals of algebra and problem-solving skills.'),
('C006', 'Introduction to Programming', 3, 'COSC', '1436', 450, 'Basic concepts of computing and programming.'),
('C007', 'Principles of Microeconomics', 3, 'ECON', '2301', 450, 'Study of individual economic decision-making and markets.'),
('C008', 'Introduction to Philosophy', 3, 'PHIL', '1301', 450, 'Introduction to philosophical thinking and major topics.'),
('C009', 'Art Appreciation', 3, 'ARTS', '1301', 450, 'Fundamentals of art analysis and visual culture.'),
('C010', 'Statistics', 3, 'MATH', '3339', 450, 'Introduction to descriptive and inferential statistics.');

 `);

 //7. Course Prerequisite
 await client.query(`
DROP TABLE IF EXISTS Prerequisite CASCADE;
CREATE TABLE IF NOT EXISTS Prerequisite (
	CourseID CHAR(10),
	PrereCourseID CHAR(10),
	PRIMARY KEY (CourseID, PrereCourseID),
	FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
	FOREIGN KEY (PrereCourseID) REFERENCES Course(CourseID)
);

INSERT INTO Prerequisite (CourseID, PrereCourseID) VALUES
('C010', 'C005'), -- Statistics requires College Algebra
('C006', 'C005'), -- Introduction to Computing requires College Algebra
('C004', 'C001'), -- Intro to Psychology could require English Composition I
('C007', 'C005'), -- Microeconomics requires College Algebra
('C008', 'C001'); -- Introduction to Philosophy requires English Composition I
`);

// 8. Section 
 await client.query(`
DROP TABLE IF EXISTS Section CASCADE;
CREATE TABLE IF NOT EXISTS Section (
	SectionID CHAR(10) PRIMARY KEY,
	CourseID CHAR(10),
	SemesterID CHAR(10),
	Mode CHAR(20),
	RoomID CHAR(10),
	InstructorID INT,
	EnrolledCount INT DEFAULT 0,
	Status CHAR(20),
	Capacity INT
);

INSERT INTO Section 
(SectionID, CourseID, SemesterID, Mode, RoomID, InstructorID, EnrolledCount, Status, Capacity)
VALUES
('SEC04', 'C004', 'SEM01', 'Online',     NULL,   5, 0, 'Open', 200),
('SEC01', 'C001', 'SEM01', 'In-Person', 'R101', 2, 0, 'Open', 3),
('SEC02', 'C002', 'SEM01', 'In-Person', 'R102', 3, 0, 'Open', 125),
('SEC03', 'C003', 'SEM01', 'In-Person', 'R103', 4, 0, 'Open', 90),
('SEC05', 'C005', 'SEM01', 'In-Person', 'R105', 1, 0, 'Open', 50),
('SEC06', 'C006', 'SEM01', 'In-Person', 'R106', 6, 0, 'Open', 80),
('SEC07', 'C007', 'SEM01', 'In-Person', 'R107', 7, 0, 'Open', 110),
('SEC08', 'C008', 'SEM01', 'In-Person', 'R108', 8, 0, 'Open', 75),
('SEC09', 'C009', 'SEM01', 'In-Person', 'R109', 9, 0, 'Open', 115),
('SEC10','C010', 'SEM01', 'In-Person', 'R110', 1, 0, 'Open', 100);

`);

// 9. Sectionschedule
 await client.query(`
DROP TABLE IF EXISTS SectionSchedule;
CREATE TABLE IF NOT EXISTS SectionSchedule (
	SectionID CHAR(10) REFERENCES Section(SectionID),
	ScheduleID CHAR(10)  REFERENCES Schedule(ScheduleID),
	PRIMARY KEY (SectionID, ScheduleID),
  FOREIGN KEY (SectionID) REFERENCES Section(SectionID),
  FOREIGN KEY (ScheduleID) REFERENCES Schedule(ScheduleID)
);

-- SEC01 - Mon/Wed 09:00-10:30
INSERT INTO SectionSchedule(SectionID, ScheduleID) VALUES
('SEC01','SCH01'),
('SEC01','SCH02');
 
-- SEC02 - Tue/Thu 09:00-10:30
INSERT INTO SectionSchedule(SectionID, ScheduleID) VALUES
('SEC02','SCH03'),
('SEC02','SCH04');
 
-- SEC03 - Mon/Wed 10:30-12:00
INSERT INTO SectionSchedule(SectionID, ScheduleID) VALUES
('SEC03','SCH05'),
('SEC03','SCH06');
 
-- SEC04 - Friday 3 hours
INSERT INTO SectionSchedule(SectionID, ScheduleID) VALUES
('SEC04','SCH13');
 
-- SEC05 - Tue/Thu 10:30-12:00
INSERT INTO SectionSchedule(SectionID, ScheduleID) VALUES
('SEC05','SCH07'),
('SEC05','SCH08');
 
-- SEC06 - Mon/Wed 13:00-14:30
INSERT INTO SectionSchedule(SectionID, ScheduleID) VALUES
('SEC06','SCH09'),
('SEC06','SCH10');
 
-- SEC07 - Tue/Thu 13:00-14:30
INSERT INTO SectionSchedule(SectionID, ScheduleID) VALUES
('SEC07','SCH11'), -- Tue 13:00-14:30
('SEC07','SCH12'); -- Thu 13:00-14:30
 
-- SEC08 - Mon/Wed 10:30-12:00
INSERT INTO SectionSchedule(SectionID, ScheduleID) VALUES
('SEC08','SCH05'),
('SEC08','SCH06');
 
-- SEC09 - Mon/Wed 09:00-10:30
INSERT INTO SectionSchedule(SectionID, ScheduleID) VALUES
('SEC09','SCH01'),
('SEC09','SCH02');
 
-- SEC10 - Tue/Thu 13:00-14:30
INSERT INTO SectionSchedule(SectionID, ScheduleID) VALUES
('SEC10','SCH11'),
('SEC10','SCH12');

  `);

  // 10. Enrollments table
    await client.query(`
      DROP TABLE IF EXISTS Enrollments CASCADE;
      CREATE TABLE IF NOT EXISTS Enrollments (
        EnrollmentID SERIAL PRIMARY KEY,
        StudentID CHAR(10) REFERENCES Student(StudentID),
        SectionID CHAR(10) REFERENCES Section(SectionID),
        Enrollment_status VARCHAR(20) DEFAULT 'enrolled',
        Enroll_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        Grade CHAR(2)
      );

    `);


 // 11. Payment (Transactions) table
await client.query(`
  DROP TABLE IF EXISTS Payment CASCADE;
      CREATE TABLE IF NOT EXISTS Payment (
        PaymentID CHAR(10) PRIMARY KEY DEFAULT 'P' || LPAD(NEXTVAL('payment_seq')::text, 3, '0'),
        StudentID CHAR(10) REFERENCES Student(StudentID),
        Amount_due DECIMAL(10,2),
        Amount_paid DECIMAL(10, 2),
        Pay_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);


    // 12. Cart table
   /* await client.query(`
      DROP TABLE IF EXISTS Cart CASCADE;
    CREATE TABLE IF NOT EXISTS Cart (
        CartID SERIAL PRIMARY KEY,
        StudentID CHAR(10) REFERENCES Student(StudentID),
        CourseID CHAR(10) REFERENCES Course(CourseID),
        Added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `);

*/
    console.log("All tables verified / created successfully.");
  } catch (err) {
    console.error("Error initializing database schema:", err);
  } finally {
    client.release();
  }
}

// Run automatically on backend start
initSchema();