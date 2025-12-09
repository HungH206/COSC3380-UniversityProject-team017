-- 2025-11-19T22:45:01.645Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-19T23:04:28.143Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-19T23:04:28.149Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-19T23:04:28.151Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-19T23:04:28.153Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-11-19T23:04:33.423Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-19T23:11:36.134Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-19T23:11:36.152Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-19T23:11:36.155Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-19T23:11:36.175Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-11-19T23:13:21.091Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-19T23:14:48.903Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

<<<<<<< Updated upstream
-- 2025-11-20T00:33:29.110Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-20T00:33:29.144Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-20T00:33:29.150Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-20T00:33:29.160Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-11-20T00:33:41.804Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T00:33:46.941Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-20T00:33:46.944Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-20T00:33:46.947Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-20T00:33:46.948Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-11-20T02:18:20.963Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T02:18:20.980Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T02:18:28.317Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T02:18:34.969Z
=======
-- 2025-11-20T00:31:14.119Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T00:31:15.808Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T00:31:16.020Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T00:35:33.179Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T00:45:13.852Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T00:53:39.048Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T00:53:40.813Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-20T01:24:13.449Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-20T01:24:13.468Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-20T01:24:13.474Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-20T01:24:13.482Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-11-20T01:25:03.971Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-20T01:25:03.978Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-20T01:25:03.982Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-20T01:25:03.985Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-11-20T01:25:07.410Z
>>>>>>> Stashed changes
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-21T01:48:48.558Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-21T01:48:48.595Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-21T01:48:48.598Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-21T01:48:48.601Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-11-21T01:54:01.401Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-25T16:40:25.698Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-25T19:00:58.547Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-25T22:38:18.896Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-25T22:38:26.280Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-25T22:42:09.215Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-25T22:42:09.223Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-25T22:42:09.225Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-25T22:42:09.229Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-11-25T22:43:04.744Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-25T22:44:04.406Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-25T22:44:04.409Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-25T22:44:04.410Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-25T22:44:04.411Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-11-25T22:44:09.108Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-25T22:44:55.942Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-25T22:44:55.946Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-25T22:44:55.948Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-25T22:44:55.949Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-11-25T22:45:22.809Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-11-25T22:45:49.356Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-25T22:45:49.361Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-11-25T22:45:49.362Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-11-25T22:45:49.364Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-08T23:22:05.434Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-08T23:24:15.493Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T01:41:50.179Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T01:41:50.182Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T01:41:50.184Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T01:41:50.186Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T01:41:58.137Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T01:41:58.142Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T01:41:58.143Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T01:41:58.144Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T01:42:00.013Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T01:56:19.287Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T01:56:19.427Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T01:56:19.447Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T01:56:19.458Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T01:56:21.053Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:11:19.435Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:16:50.585Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:16:50.596Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:16:50.614Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T02:16:50.618Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T02:16:55.933Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:19:34.545Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:19:34.603Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:19:34.610Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T02:19:34.623Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T02:19:37.731Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:19:37.734Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:19:37.735Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T02:19:37.737Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T02:19:53.528Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:32:04.244Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:32:04.271Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:32:04.277Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T02:32:04.287Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T02:32:06.278Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:32:06.280Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:32:06.282Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T02:32:06.283Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T02:32:11.812Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:33:17.295Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:33:17.312Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:33:17.320Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T02:33:17.322Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T02:33:23.922Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:33:23.951Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:33:28.483Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:33:28.488Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:33:28.490Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T02:33:28.491Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T02:33:29.753Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:35:25.441Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:35:25.446Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:35:25.448Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T02:35:25.449Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T02:35:26.671Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:42:14.909Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:42:14.920Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:42:14.921Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T02:42:14.924Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T02:42:23.841Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:45:41.212Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:45:41.222Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T02:45:41.228Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T02:45:41.234Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T02:45:48.579Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T02:48:21.636Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T03:06:31.096Z
TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T03:06:31.108Z
TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;
-- params: []

-- 2025-12-09T03:06:31.111Z
UPDATE Section SET EnrolledCount = 0, Status = 'Open';
-- params: []

-- 2025-12-09T03:06:31.114Z
UPDATE Student SET GPA = 0.000, Total_Credits = 0;
-- params: []

-- 2025-12-09T03:07:10.393Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

-- 2025-12-09T03:07:10.434Z
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
-- params: []

