
      SELECT 
        p.StudentID,
        s.StudentName,
        p.Amount_paid AS totalamount,
        p.Pay_date,
        'Completed' AS status,
        json_agg(
          json_build_object(
            'courseid', c.CourseID,
            'coursename', c.CourseName,
            'credits', c.Credits,
            'price', c.Cost,
            'sectionid', e.SectionID
          )
        ) AS courses
      FROM Payment p
      JOIN Student s ON s.StudentID = p.StudentID
      JOIN Enrollments e ON e.StudentID = p.StudentID AND e.Enrollment_status = 'Enrolled'
      JOIN Section sec ON sec.SectionID = e.SectionID
      JOIN Course c ON c.CourseID = sec.CourseID
      WHERE p.Amount_paid > 0
      GROUP BY 
        p.StudentID,
        s.StudentName,
        p.Amount_paid,
        p.Pay_date
      ORDER BY p.Pay_date DESC;
    \
 --  2. GET STUDENTS ENROLLED IN A SECTION (FOR ADMIN GRADE UI)


      SELECT DISTINCT
        s.StudentID AS studentId,
        s.StudentName AS name
      FROM Enrollments e
      JOIN Section sec ON sec.SectionID = e.SectionID
      JOIN Course c ON c.CourseID = sec.CourseID
      JOIN Student s ON s.StudentID = e.StudentID
      WHERE c.CourseID = $1
        AND e.Enrollment_status = 'Enrolled'
      ORDER BY s.StudentName;
    


--   3. UPDATE SECTION (Open/Close + Add Seats)


      SELECT 
        e.studentid,
        s.studentname,
        e.grade
      FROM Enrollments e
      JOIN Student s ON s.studentid = e.studentid
      WHERE e.sectionid = $1
      ORDER BY s.studentname;
     



  -- 3. CONCURRENCY SAFE SECTION UPDATE


   BEGIN;


      SELECT * FROM Section WHERE SectionID = $1 FOR UPDATE

    if (secRes.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Section not found" });
    }

    const section = secRes.rows[0];
    let newStatus = section.status;
    let newCapacity = section.capacity;

    if (capacity !== undefined) newCapacity = capacity;
    if (status !== undefined) newStatus = status;

    if (section.enrolledcount >= newCapacity) {
      newStatus = "Closed";
    }

    if (section.enrolledcount < newCapacity && status !== "Closed") {
      newStatus = "Open";
    }

    await client.query(
      `
      UPDATE Section
      SET Capacity = $1,
          Status = $2
      WHERE SectionID = $3
      `,
      [newCapacity, newStatus, sectionId]
    );

    await client.query("COMMIT");

    res.json({
      success: true,
      message: "Section updated with concurrency control",
      updated: { sectionId, capacity: newCapacity, status: newStatus }
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[ADMIN] Section Update Error:", err);
    res.status(500).json({ error: err.message });

  } finally {
    client.release();
  }
});


/* ======================================================================
   4. POST GRADES + GPA + CREDITS UPDATE (FULL FEATURE)
 
"BEGIN");

    // Lock to prevent enrollment changes while grading
    await client.query(
      `SELECT 1 FROM Section WHERE SectionID = $1 FOR UPDATE`,
      [sectionId]
    );

    // Update each grade
    for (const g of grades) {
      await client.query(
        `
        UPDATE Enrollments
        SET grade = $1
        WHERE studentid = $2 AND sectionid = $3
        `,
        [g.grade, g.studentId, sectionId]
      );
    }

    /* ------------------------------------------------------
       GPA + Total Credits recompute for every student graded
    ------------------------------------------------------- */
    
      UPDATE Student s
      SET 
        Total_Credits = sub.total_credits,
        GPA = sub.gpa
      FROM (
        SELECT 
          e.StudentID,
          SUM(c.Credits) FILTER (WHERE e.Grade IS NOT NULL) AS total_credits,
          CASE
            WHEN SUM(c.Credits) = 0 THEN 0
            ELSE ROUND(
              SUM(
                c.Credits *
                CASE e.Grade
                  WHEN 'A'  THEN 4.0
                  WHEN 'A-' THEN 3.7
                  WHEN 'B+' THEN 3.3
                  WHEN 'B'  THEN 3.0
                  WHEN 'B-' THEN 2.7
                  WHEN 'C+' THEN 2.3
                  WHEN 'C'  THEN 2.0
                  WHEN 'C-' THEN 1.7
                  WHEN 'D'  THEN 1.0
                  WHEN 'F'  THEN 0.0
                  ELSE 0
                END
              ) 
              / SUM(c.Credits), 3
            )
          END AS gpa
        FROM Enrollments e
        JOIN Section s2 ON s2.SectionID = e.SectionID
        JOIN Course c ON c.CourseID = s2.CourseID
        GROUP BY e.StudentID
      ) AS sub
      WHERE s.StudentID = sub.StudentID;
    

    COMMIT;

