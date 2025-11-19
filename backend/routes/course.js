import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { department, semester } = req.query;

  try {
    const result = await pool.query(
      `
SELECT
  c.CourseID AS id,
  c.CourseName AS name,
  c.Dept AS department,
  c.Credits AS credits,
  c.Description AS description,
  c.Cost AS cost,

  s.SectionID AS sectionid,
  s.Mode,
  s.RoomID AS location,
  s.Capacity AS capacity,
  s.EnrolledCount AS enrolled,
  s.Status AS status,
  sm.Term || ' ' || sm.Year AS semester,
  i.InstructorName AS instructor,

  schagg.days,
  schagg.starttime,
  schagg.endtime,

  COALESCE(json_agg(DISTINCT jsonb_build_object('courseId', p.PrereCourseID))
           FILTER (WHERE p.PrereCourseID IS NOT NULL), '[]') AS prerequisites

FROM Section s
JOIN Course c          ON c.CourseID = s.CourseID
JOIN Semester sm       ON sm.SemesterID = s.SemesterID

-- FIXED INSTRUCTOR JOIN
JOIN Instructor i      ON i.instructorid = s.InstructorID

LEFT JOIN (
    SELECT 
        ss.SectionID,
        STRING_AGG(sch.DayOfWeek, '/') AS days,
        MIN(sch.StartTime) AS starttime,
        MAX(sch.EndTime) AS endtime
    FROM SectionSchedule ss
    JOIN Schedule sch ON ss.ScheduleID = sch.ScheduleID
    GROUP BY ss.SectionID
) schagg ON schagg.SectionID = s.SectionID

LEFT JOIN Prerequisite p ON p.CourseID = c.CourseID

WHERE ($1::text IS NULL OR c.Dept = $1::text)
  AND ($2::text IS NULL OR sm.Term = $2::text)

GROUP BY 
  c.CourseID, c.CourseName, c.Dept, c.Credits, c.Description, c.Cost,
  s.SectionID, s.Mode, s.RoomID, s.Capacity, s.EnrolledCount, s.Status,
  sm.Term, sm.Year, i.InstructorName,
  schagg.days, schagg.starttime, schagg.endtime

ORDER BY c.CourseID, s.SectionID;
      `,
      [
        department === "all" ? null : department,
        semester === "all" ? null : semester,
      ]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching catalog:", err);
    res.status(500).json({ error: "Failed to load courses" });
  }
});

export default router;
