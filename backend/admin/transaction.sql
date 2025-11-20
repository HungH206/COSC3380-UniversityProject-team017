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

