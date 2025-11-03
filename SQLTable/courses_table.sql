DROP TABLE IF EXISTS courses;

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20),
  name VARCHAR(100),
  department VARCHAR(50),
  credits INT,
  semester VARCHAR(20),
  instructor VARCHAR(100),
  schedule VARCHAR(50),
  location VARCHAR(100),
  capacity INT,
  enrolled INT,
  prerequisites TEXT,
  description TEXT,
  available BOOLEAN DEFAULT TRUE
);


INSERT INTO courses 
(code, name, department, credits, semester, instructor, schedule, location, capacity, enrolled, prerequisites, description, available)
VALUES
('COSC1336', 'Intro to Python Programming', 'Computer Science', 3, 'Spring 2026', 'Prof. Dan Biediger', 'MW 16:00-17:30', 'SR2 130', 100, 25, NULL, 'Fundamentals of programming and logic', TRUE),

('COSC1437', 'Intro to C++ Programming', 'Computer Science', 4, 'Spring 2026', 'Prof. Dan Biediger', 'MWF 09:00-10:00', 'SR2 130', 100, 25, 'COSC1336', 'Fundamental concepts of structured programming; procedures and elementary data structures with a focus on problem solving strategies and implementation; computer organization, structured procedural programming, C/C++ programming language, and algorithm design.', TRUE),

('COSC2436', 'Programming and Data Structures', 'Computer Science', 4, 'Fall 2025', 'Prof. Dan Biediger', 'TTh 10:30-12:00', 'SR2 130', 25, 25, 'COSC1437', 'Introduction to fundamental data structures: arrays, lists, stacks, queues, hash tables, trees; sorting and searching; graph algorithms; design, analysis, and comparison of algorithms. Correctness verification techniques such as assertions and invariants. Review program specification, unit testing, and debugging.', FALSE),

('COSC3380', 'Database Systems', 'Computer Science', 4, 'Fall 2025', 'Prof. Carlos Ordonez', 'MW 8:30-10:00', 'PGH 232', 100, 95, 'COSC2436', 'Database design with ER model, relational model and normalization up to 3NF/BCNF normal forms. Relational algebra and basic SQL queries combining filters, joins and aggregations. SQL transaction processing. Overview of DBMS internal subsystems including: storage, indexing, query optimizer, locking, recovery manager, security mechanisms. Database application development.', FALSE),

('MATH2413', 'Calculus I', 'Mathematics', 4, 'Fall 2025', 'Prof. Emily Rodriguez', 'MWF 11:00-12:00', 'Math Building 150', 40, 35, 'MATH Entrance Exam', 'Calculus of rational functions, limits, derivatives, applications of the derivative, antiderivatives, the definite integral with applications, mean value theorem, fundamental theorem of calculus, and numerical integration.', TRUE),

('MATH2414', 'Calculus II', 'Mathematics', 4, 'Spring 2026', 'Prof. Emily Rodriguez', 'MWF 11:00-12:00', 'Math Building 150', 40, 35, 'MATH2413', 'Calculus of transcendental functions: additional techniques and applications of integration, indeterminate forms, improper integrals, Taylor''s formula, and infinite series.', TRUE),

('PHYS2325', 'University Physics I', 'Physics', 4, 'Spring 2026', 'Prof. Israel P. Vazquez', 'TTh 13:00-14:30', 'SR116', 30, 22, 'MATH2413', 'Mechanics, waves, and thermodynamics', TRUE),

('PHYS2326', 'University Physics II', 'Physics', 4, 'Spring 2026', 'Dr. James Wilson', 'TTh 10:00-11:30', 'SR117', 30, 22, 'MATH2414', 'Electricity, magnetism, and optics', TRUE),

('ENG1301', 'First Year Writing I', 'English', 3, 'Spring 2026', 'Prof. Amanda Lee', 'MWF 09:00-10:00', 'C 125', 25, 20, 'A TSI placement score of at least 340', 'Advanced writing and analysis', TRUE),

('COSC3360', 'Operating Systems', 'Computer Science', 3, 'Spring 2026', 'Prof. Carlos Rincon', 'TTh 14:30-16:00', 'SEC 102', 25, 18, 'COSC2436', 'Operating systems: sequential processes, concurrent processes, deadlock, mutual exclusion, semaphores; memory management, processor management, peripheral device management.', TRUE);
