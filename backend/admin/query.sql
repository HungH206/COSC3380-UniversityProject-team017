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
-- 2025-11-21T01:53:32.588Z
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

-- 2025-11-21T01:53:35.876Z
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

-- 2025-11-21T01:54:10.177Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-21T01:54:22.362Z
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

-- 2025-11-21T01:54:53.678Z
SELECT * FROM Section
-- params: []

-- 2025-11-25T16:42:29.386Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-25T16:43:05.908Z
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

-- 2025-11-25T16:44:45.129Z
SELECT * FROM Section
-- params: []

-- 2025-11-25T16:44:55.079Z
SELECT * FROM bankaccount
-- params: []

-- 2025-11-25T16:50:40.688Z
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

-- 2025-11-25T16:50:48.391Z
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

-- 2025-11-25T16:52:41.146Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-25T16:53:46.784Z
SELECT * FROM course
-- params: []

-- 2025-11-25T16:54:08.098Z
SELECT * FROM section
-- params: []

-- 2025-11-25T17:47:19.970Z
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

-- 2025-11-25T17:47:21.569Z
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

-- 2025-11-25T18:40:14.910Z
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

-- 2025-11-25T18:40:16.062Z
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

-- 2025-11-25T18:40:17.310Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-25T18:40:23.672Z
SELECT * FROM Section LIMIT 10
-- params: []

-- 2025-11-25T18:56:23.178Z
SELECT * FROM enrollments
-- params: []

-- 2025-11-25T18:56:56.829Z
SELECT * FROM enrollments where studentid = 'S001'
-- params: []

-- 2025-11-25T18:57:08.989Z
SELECT * FROM enrollments where studentid = 'S005'
-- params: []

-- 2025-11-25T18:57:12.972Z
SELECT * FROM enrollments where studentid = 'S001'
-- params: []

-- 2025-11-25T19:00:34.407Z
SELECT * FROM enrollments where studentid = 'S002'
-- params: []

-- 2025-11-25T19:00:41.522Z
SELECT * FROM enrollments where studentid = 'S004'
-- params: []

-- 2025-11-25T19:01:02.509Z
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

-- 2025-11-25T19:01:06.693Z
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

-- 2025-11-25T19:01:07.640Z
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

-- 2025-11-25T19:01:14.606Z
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

-- 2025-11-25T19:01:15.922Z
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

-- 2025-11-25T19:01:23.787Z
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

-- 2025-11-25T19:01:24.494Z
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

-- 2025-11-25T19:01:52.213Z
SELECT * FROM enrollments where studentid = 'S004'
-- params: []

-- 2025-11-25T19:10:34.237Z
SELECT 
          studentid,
          studentname AS name,
          gpa,
          total_credits
       FROM Student
       WHERE studentid = $1
-- params: []

-- 2025-11-25T19:10:41.236Z
SELECT 
          studentid,
          studentname AS name,
          gpa,
          total_credits
       FROM Student
       WHERE studentid = 2
-- params: []

-- 2025-11-25T19:10:51.640Z
SELECT 
          studentid,
          studentname AS name,
          gpa,
          total_credits
       FROM Student
       WHERE studentid = 'S001'
-- params: []

-- 2025-11-25T19:10:56.168Z
SELECT 
          studentid,
          studentname AS name,
          gpa,
          total_credits
       FROM Student
       WHERE studentid = 'S002'
-- params: []

-- 2025-11-25T19:11:43.490Z
SELECT 
          COALESCE(b.balance, 0) AS balance,
          COALESCE(p.amount_due, 0) AS amount_due
       FROM BankAccount b
       LEFT JOIN Payment p ON p.studentid = b.studentid
       WHERE b.studentid = 'S002'
-- params: []

-- 2025-11-25T19:11:58.519Z
SELECT 
          studentid,
          studentname AS name,
          gpa,
          total_credits
       FROM Student
       WHERE studentid = 'S002'
-- params: []

-- 2025-11-25T19:19:16.494Z
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

-- 2025-11-25T19:19:17.263Z
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

-- 2025-11-25T19:19:23.217Z
SELECT 
          studentid,
          studentname AS name,
          gpa,
          total_credits
       FROM Student
       WHERE studentid = 'S002'
-- params: []

-- 2025-11-25T19:23:28.663Z
SELECT 
          studentid,
          studentname AS name,
          gpa,
          total_credits
       FROM Student
       WHERE studentid = 'S002'
-- params: []

-- 2025-11-25T19:23:49.264Z
SELECT 
          studentid,
          studentname AS name,
          gpa,
          total_credits
       FROM Student
       WHERE studentid = $1
-- params: []

-- 2025-11-25T19:24:02.296Z
SELECT 
          studentid,
          studentname AS name,
          gpa,
          total_credits
       FROM Student
       WHERE studentid = 'S001'
-- params: []

-- 2025-11-25T19:28:44.835Z
SELECT * FROM Section LIMIT 50;
-- params: []

-- 2025-11-25T22:36:41.802Z
SELECT * FROM Section LIMIT 50;
-- params: []

-- 2025-11-25T22:37:31.716Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-11-25T22:37:38.881Z
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

-- 2025-11-25T22:37:57.650Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-25T22:39:55.630Z
SELECT * FROM enrollments where sectionid = 'SEC01'
-- params: []

-- 2025-11-25T22:40:17.929Z
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

-- 2025-11-25T22:40:33.679Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-11-25T22:40:46.847Z
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

-- 2025-11-25T22:40:57.511Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-25T22:41:13.677Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-11-25T22:41:47.295Z
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

-- 2025-11-25T22:42:15.296Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-11-25T22:42:36.028Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-25T22:43:22.544Z
SELECT * FROM Student where studentid = 'S003'
-- params: []

-- 2025-11-25T22:43:26.161Z
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

-- 2025-11-25T22:43:32.545Z
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

-- 2025-11-25T22:43:41.158Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-11-25T22:44:06.126Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-11-25T22:44:10.675Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-11-25T22:44:59.776Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-11-25T22:45:06.443Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-11-25T22:45:36.075Z
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

-- 2025-11-25T22:45:37.327Z
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

-- 2025-11-25T22:45:38.494Z
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

-- 2025-11-25T22:46:17.011Z
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

-- 2025-11-25T22:46:24.193Z
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

-- 2025-11-25T22:46:36.376Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-11-25T22:48:50.429Z
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

-- 2025-11-25T22:48:51.191Z
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

-- 2025-12-08T23:12:28.106Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-08T23:12:33.705Z
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

-- 2025-12-08T23:12:34.935Z
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

-- 2025-12-08T23:12:34.979Z
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

-- 2025-12-08T23:12:39.728Z
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

-- 2025-12-08T23:12:40.888Z
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

-- 2025-12-08T23:12:40.934Z
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

-- 2025-12-08T23:13:03.882Z
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

-- 2025-12-08T23:13:05.016Z
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

-- 2025-12-08T23:13:09.255Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-12-08T23:13:09.299Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-12-08T23:21:50.929Z
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

-- 2025-12-08T23:21:50.975Z
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

-- 2025-12-08T23:21:56.029Z
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

-- 2025-12-08T23:21:56.070Z
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

-- 2025-12-09T00:51:35.285Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-09T00:53:18.192Z
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

-- 2025-12-09T00:53:46.981Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-12-09T00:54:26.137Z
SELECT studentid, balance FROM BankAccount where studentid = 'S004'
-- params: []

-- 2025-12-09T00:54:26.174Z
SELECT studentid, balance FROM BankAccount where studentid = 'S004'
-- params: []

-- 2025-12-09T01:14:59.567Z
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

-- 2025-12-09T01:18:34.489Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-09T01:18:34.534Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-09T01:56:37.400Z
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

-- 2025-12-09T02:16:32.015Z
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

-- 2025-12-09T02:16:54.166Z
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

-- 2025-12-09T02:16:54.218Z
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

-- 2025-12-09T02:16:57.129Z
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

-- 2025-12-09T02:17:00.638Z
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

-- 2025-12-09T02:17:04.914Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-09T02:17:04.967Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-09T02:17:08.193Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-09T02:17:08.246Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-09T02:17:16.034Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-12-09T02:17:16.078Z
SELECT * FROM Course LIMIT 50;
-- params: []

-- 2025-12-09T02:17:20.451Z
SELECT * FROM Section LIMIT 50;
-- params: []

-- 2025-12-09T02:17:31.329Z
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

-- 2025-12-09T02:19:39.933Z
SELECT * FROM Section LIMIT 50;
-- params: []

-- 2025-12-09T02:20:57.155Z
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

-- 2025-12-09T02:20:57.292Z
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

-- 2025-12-09T02:32:13.527Z
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

-- 2025-12-09T02:32:14.223Z
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

-- 2025-12-09T02:32:14.908Z
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

-- 2025-12-09T02:33:32.642Z
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

-- 2025-12-09T02:33:33.590Z
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

-- 2025-12-09T02:33:34.228Z
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

-- 2025-12-09T02:42:10.856Z
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

-- 2025-12-09T02:42:10.899Z
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

-- 2025-12-09T02:42:15.948Z
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

-- 2025-12-09T02:42:16.395Z
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

-- 2025-12-09T02:42:16.791Z
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

-- 2025-12-09T02:45:44.302Z
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

-- 2025-12-09T02:45:44.704Z
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

-- 2025-12-09T02:45:45.534Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-09T03:07:00.736Z
SELECT * FROM BankAccount LIMIT 50;
-- params: []

-- 2025-12-09T03:07:05.176Z
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

-- 2025-12-09T03:07:05.218Z
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

-- 2025-12-09T03:09:33.648Z
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

-- 2025-12-09T03:09:33.755Z
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

-- 2025-12-09T03:09:34.757Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-09T03:09:34.805Z
SELECT * FROM Student LIMIT 50;
-- params: []

-- 2025-12-09T03:14:08.140Z
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

-- 2025-12-09T03:14:08.245Z
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

-- 2025-12-09T04:13:11.802Z
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

-- 2025-12-09T04:18:00.075Z
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

-- 2025-12-09T04:18:31.118Z
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

-- 2025-12-09T04:18:43.963Z
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

-- 2025-12-09T04:19:07.012Z
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

-- 2025-12-09T04:19:07.064Z
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

-- 2025-12-09T04:19:08.172Z
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

