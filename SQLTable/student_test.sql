DROP TABLE IF EXISTS student;

-- Student test table
CREATE TABLE student (
    StudentID CHAR(10) PRIMARY KEY,
    StudentName CHAR(100) --optional
);

INSERT INTO student (Studentid, Studentname) VALUES ('S001', 'Will Hoang');
