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

<<<<<<< Updated upstream
-- 2025-11-20T00:33:37.620Z
SELECT * FROM Section LIMIT 10
-- params: []

-- 2025-11-20T02:18:04.580Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-20T02:18:06.273Z
=======
-- 2025-11-20T00:30:17.001Z
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

-- 2025-11-20T00:30:18.552Z
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

-- 2025-11-20T00:30:19.733Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-20T00:30:25.709Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-20T00:30:29.627Z
SELECT * FROM Section LIMIT 50;
-- params: []

-- 2025-11-20T00:30:33.541Z
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
-- 2025-11-20T02:18:08.371Z
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

-- 2025-11-20T02:18:40.051Z
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

-- 2025-11-20T02:19:54.699Z
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

-- 2025-11-20T02:19:55.725Z
=======
-- 2025-11-20T00:30:37.956Z
SELECT * FROM Semester LIMIT 50;
-- params: []

-- 2025-11-20T00:30:39.823Z
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
-- 2025-11-20T02:21:59.881Z
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

-- 2025-11-20T02:22:01.973Z
=======
-- 2025-11-20T00:31:08.222Z
SELECT * FROM Semester LIMIT 50;
-- params: []

-- 2025-11-20T00:32:31.077Z
SELECT * FROM Semester LIMIT 50;
-- params: []

-- 2025-11-20T00:32:35.091Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-20T00:32:36.348Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-20T00:32:36.557Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-20T00:35:16.007Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-20T00:35:30.768Z
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
-- 2025-11-20T00:45:16.053Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-20T00:45:18.085Z
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

-- 2025-11-20T00:45:18.983Z
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

-- 2025-11-20T00:53:43.547Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-20T00:53:44.579Z
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

-- 2025-11-20T00:53:45.412Z
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

-- 2025-11-20T01:00:05.958Z
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

-- 2025-11-20T01:00:06.812Z
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

-- 2025-11-20T01:00:06.997Z
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

-- 2025-11-20T01:00:07.160Z
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

-- 2025-11-20T01:00:07.377Z
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

-- 2025-11-20T01:00:13.172Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-20T01:13:39.743Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-20T01:17:44.437Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-20T01:17:54.641Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-20T01:21:15.082Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-20T01:24:18.855Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-20T01:33:58.209Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-20T02:18:16.679Z
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

-- 2025-11-20T02:18:18.088Z
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

-- 2025-11-20T02:21:22.559Z
SELECT * FROM Student LIMIT 50;
-- params: []

>>>>>>> Stashed changes
