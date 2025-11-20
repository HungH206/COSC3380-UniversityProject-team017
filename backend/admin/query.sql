-- 2025-11-19T22:44:56.330Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-11-19T22:45:06.678Z
SELECT * FROM Enrollments LIMIT 50;
-- params: []

-- 2025-11-19T22:45:11.094Z
SELECT
      c.CourseID,
      c.CourseName,
      sec.SectionID,
      sec.Status,
      sec.Capacity,
      sec.EnrolledCount,
      sem.Term || ' ' || sem.Year AS Semester
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    ORDER BY Semester, c.CourseID, sec.SectionID;
-- params: []

-- 2025-11-19T23:00:32.519Z
SELECT * FROM Section
-- params: []

-- 2025-11-19T23:00:44.069Z
SELECT * FROM Student
-- params: []

-- 2025-11-19T23:02:23.704Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-19T23:02:39.471Z
SELECT * FROM Section LIMIT 50;
-- params: []

-- 2025-11-19T23:02:50.755Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-19T23:11:42.204Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-19T23:11:58.855Z
SELECT
      c.CourseID,
      c.CourseName,
      sec.SectionID,
      sec.Status,
      sec.Capacity,
      sec.EnrolledCount,
      sem.Term || ' ' || sem.Year AS Semester
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    ORDER BY Semester, c.CourseID, sec.SectionID;
-- params: []

-- 2025-11-19T23:12:00.736Z
SELECT
      sem.Term || ' ' || sem.Year AS Semester,
      c.CourseID,
      c.CourseName,
      COUNT(DISTINCT e.StudentID) AS NumStudents,
      SUM(c.Cost) AS TuitionCharged,
      SUM(COALESCE(p.Amount_paid, 0)) AS AmountPaid
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    JOIN Enrollments e ON e.SectionID = sec.SectionID
    LEFT JOIN Payment p ON p.StudentID = e.StudentID
    WHERE e.Enrollment_status = 'Enrolled'
    GROUP BY sem.Term, sem.Year, c.CourseID, c.CourseName
    ORDER BY Semester, c.CourseID;
-- params: []

-- 2025-11-19T23:14:21.459Z
SELECT * FROM Section LIMIT 50;
-- params: []

-- 2025-11-19T23:14:41.322Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-19T23:15:05.323Z
SELECT
      c.CourseID,
      c.CourseName,
      sec.SectionID,
      sec.Status,
      sec.Capacity,
      sec.EnrolledCount,
      sem.Term || ' ' || sem.Year AS Semester
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    ORDER BY Semester, c.CourseID, sec.SectionID;
-- params: []

-- 2025-11-19T23:15:31.421Z
SELECT * FROM Semester LIMIT 50;
-- params: []

-- 2025-11-19T23:15:36.585Z
SELECT * FROM Prerequisite LIMIT 50;
-- params: []

-- 2025-11-19T23:15:40.603Z
SELECT
      c.CourseID,
      c.CourseName,
      sec.SectionID,
      sec.Status,
      sec.Capacity,
      sec.EnrolledCount,
      sem.Term || ' ' || sem.Year AS Semester
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    ORDER BY Semester, c.CourseID, sec.SectionID;
-- params: []

-- 2025-11-19T23:15:41.308Z
SELECT
      sem.Term || ' ' || sem.Year AS Semester,
      c.CourseID,
      c.CourseName,
      COUNT(DISTINCT e.StudentID) AS NumStudents,
      SUM(c.Cost) AS TuitionCharged,
      SUM(COALESCE(p.Amount_paid, 0)) AS AmountPaid
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    JOIN Enrollments e ON e.SectionID = sec.SectionID
    LEFT JOIN Payment p ON p.StudentID = e.StudentID
    WHERE e.Enrollment_status = 'Enrolled'
    GROUP BY sem.Term, sem.Year, c.CourseID, c.CourseName
    ORDER BY Semester, c.CourseID;
-- params: []

-- 2025-11-19T23:15:42.702Z
SELECT
      c.CourseID,
      c.CourseName,
      sec.SectionID,
      sec.Status,
      sec.Capacity,
      sec.EnrolledCount,
      sem.Term || ' ' || sem.Year AS Semester
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    ORDER BY Semester, c.CourseID, sec.SectionID;
-- params: []

-- 2025-11-19T23:15:44.352Z
SELECT
      sem.Term || ' ' || sem.Year AS Semester,
      c.CourseID,
      c.CourseName,
      COUNT(DISTINCT e.StudentID) AS NumStudents,
      SUM(c.Cost) AS TuitionCharged,
      SUM(COALESCE(p.Amount_paid, 0)) AS AmountPaid
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    JOIN Enrollments e ON e.SectionID = sec.SectionID
    LEFT JOIN Payment p ON p.StudentID = e.StudentID
    WHERE e.Enrollment_status = 'Enrolled'
    GROUP BY sem.Term, sem.Year, c.CourseID, c.CourseName
    ORDER BY Semester, c.CourseID;
-- params: []

-- 2025-11-19T23:16:03.921Z
SELECT * FROM Enrollments LIMIT 50;
-- params: []

-- 2025-11-19T23:16:12.322Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-19T23:16:16.637Z
SELECT
      sem.Term || ' ' || sem.Year AS Semester,
      c.CourseID,
      c.CourseName,
      COUNT(DISTINCT e.StudentID) AS NumStudents,
      SUM(c.Cost) AS TuitionCharged,
      SUM(COALESCE(p.Amount_paid, 0)) AS AmountPaid
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    JOIN Enrollments e ON e.SectionID = sec.SectionID
    LEFT JOIN Payment p ON p.StudentID = e.StudentID
    WHERE e.Enrollment_status = 'Enrolled'
    GROUP BY sem.Term, sem.Year, c.CourseID, c.CourseName
    ORDER BY Semester, c.CourseID;
-- params: []

-- 2025-11-19T23:17:34.290Z
SELECT * FROM Section
-- params: []

-- 2025-11-19T23:18:12.824Z
SELECT * FROM Section LIMIT 50;
-- params: []

