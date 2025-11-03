CREATE TABLE enrollments (
  enrollmentid SERIAL PRIMARY KEY,
  studentid CHAR(10) REFERENCES student(studentid),
  courseid INT REFERENCES courses(id),
  semester VARCHAR(20) DEFAULT 'Spring 2026',
  status VARCHAR(20) DEFAULT 'enrolled',
  enrolledat TIMESTAMP DEFAULT NOW()
);
