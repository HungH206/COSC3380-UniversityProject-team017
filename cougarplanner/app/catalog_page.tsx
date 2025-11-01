//dummy chatgpt code
// "use client";

// import * as React from "react";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// // Course Schedule
// interface Course {
//   coursename: string;
//   instructor: string;
//   mode: string;
//   room: number;
//   status: string
// }

// // declare studentid
// const STUDENT_ID = number;

// export default function CatalogPage() {
//   const [courses, setCourses] = React.useState<Course[]>([]);
//   const [loading, setLoading] = React.useState(false);

//   // Fetch courses from your backend
//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/courses"); // Create API
//       const data = await res.json();
//       setCourses(data);
//     } catch (err) {
//       console.error("Failed to fetch courses:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   React.useEffect(() => {
//     fetchCourses();
//   }, []);

//   // Enroll transaction
//   const enrollStudent = async (studentId: number, scheduleId: number) => {
//     try {
//       const res = await fetch("/api/enroll", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ studentId, scheduleId }),
//       });
//       const result = await res.json();
//       if (!res.ok) throw new Error(result.error);
//       alert(result.message);

//       // Refresh courses to update enrolledcount
//       fetchCourses();
//     } catch (err: any) {
//       alert(`Enrollment failed: ${err.message}`);
//     }
//   };

//   return (
//     <div className="min-h-screen mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">Course Catalog</h1>

//       {loading ? (
//         <p>Loading courses...</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {courses.map((course) => (
//             <Card key={course.scheduleId}>
//               <CardHeader>
//                 <CardTitle>{course.name}</CardTitle>
//                 <CardDescription>
//                   {course.instructor} — {course.time}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p>
//                   Enrolled: {course.enrolledcount} / {course.capacity}
//                 </p>
//                 <Button
//                   disabled={course.enrolledcount >= course.capacity}
//                   onClick={() => enrollStudent(STUDENT_ID, course.scheduleId)}
//                   className="mt-2"
//                 >
//                   {course.enrolledcount >= course.capacity ? "Full" : "Enroll"}
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
