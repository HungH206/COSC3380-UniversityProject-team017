/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Course {
  course_id: number;
  course_code: string;
  course_name: string;
  department: string;
  credits: number;
  semester: string;
  instructor: string;
  schedule: string;
  location: string;
  capacity: number;
  enrolled: number;
  prerequisites: string | null;
  description: string;
}

export default function SchedulePage() {
  const [pendingCourses, setPendingCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const studentId = localStorage.getItem("studentId"); // from login or mock

  // Load pending courses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedCourses");
    if (saved) setPendingCourses(JSON.parse(saved));
  }, []);

  // Load enrolled courses from backend
  useEffect(() => {
    async function fetchEnrolled() {
      try {
        if (!studentId) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule/${studentId}`);
        if (!res.ok) throw new Error("Failed to fetch enrolled courses");
        const data = await res.json();
        setEnrolledCourses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEnrolled();
  }, [studentId]);

  // Remove a pending course before enrolling
  const removePendingCourse = (id: number) => {
    const updated = pendingCourses.filter((c) => c.course_id !== id);
    setPendingCourses(updated);
    localStorage.setItem("selectedCourses", JSON.stringify(updated));
  };

  // Confirm enrollment (send to backend)
  const confirmEnrollment = async () => {
    if (!pendingCourses.length) {
      alert("No courses to enroll.");
      return;
    }

    if (!studentId) {
      alert("You must log in first.");
      return;
    }

    for (const course of pendingCourses) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enroll`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId,
            scheduleId: course.course_id, // adjust if your DB uses scheduleid instead
          }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to enroll");
      } catch (err: any) {
        alert(`sFailed to enroll in ${course.course_name}: ${err.message}`);
      }
    }

    alert("✅ Enrollment confirmed!");
    localStorage.removeItem("selectedCourses");
    window.location.reload();
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">My Schedule</h1>
        <Link href="/catalog">
          <Button variant="secondary">Back to Catalog</Button>
        </Link>
      </div>

      {/* Pending Courses Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🕓 Pending (Not Enrolled Yet)</h2>
        {pendingCourses.length === 0 ? (
          <p className="text-muted-foreground">No pending courses added.</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pendingCourses.map((course) => (
                <Card key={course.course_id}>
                  <CardHeader>
                    <CardTitle>{course.course_name}</CardTitle>
                    <CardDescription>
                      {course.instructor} — {course.schedule}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Location: {course.location}</p>
                    <p>Credits: {course.credits}</p>
                    <Button
                      variant="destructive"
                      className="mt-3"
                      onClick={() => removePendingCourse(course.course_id)}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button className="mt-6" onClick={confirmEnrollment}>
              ✅ Confirm Enrollment
            </Button>
          </>
        )}
      </section>

      {/* Enrolled Courses Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📚 Enrolled Courses</h2>
        {loading ? (
          <p>Loading enrolled courses...</p>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : enrolledCourses.length === 0 ? (
          <p className="text-muted-foreground">You have no enrolled classes yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card key={course.course_id}>
                <CardHeader>
                  <CardTitle>{course.course_name}</CardTitle>
                  <CardDescription>
                    {course.instructor} — {course.schedule}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Location: {course.location}</p>
                  <p>Department: {course.department}</p>
                  <p>
                    Enrolled: {course.enrolled}/{course.capacity}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
