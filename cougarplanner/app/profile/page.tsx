"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { getDefaultStudent, Student } from "@/lib/default-student"

interface Course {
  id?: string
  code: string
  name: string
  credits: number
  grade?: string
  gradePoints?: number
  instructor?: string
  schedule?: string
  price?: number
}

interface EnrolledCourses {
  [semester: string]: Course[]
}

export default function ProfilePage() {
  const [studentInfo, setStudentInfo] = useState<Student>(getDefaultStudent())
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourses>({})
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const student = getDefaultStudent()
    setStudentInfo(student)
    fetchEnrolledCourses()
  }, [])

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/enrollments")
      if (!response.ok) throw new Error("Failed to fetch enrollments")

      const data = await response.json()
      setEnrolledCourses(data.enrollments)
      console.log("[v0] Enrolled courses loaded:", Object.keys(data.enrollments).length, "semesters")
    } catch (error) {
      console.error("[v0] Error fetching enrollments:", error)
      toast({
        title: "Error",
        description: "Failed to load enrolled courses",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const creditsCompleted = studentInfo.degreeProgress || 0
  const creditsRequired = 120
  const completionPercentage = (creditsCompleted / creditsRequired) * 100

  const currentSemester = "Fall 2025"
  const nextSemester = "Spring 2026"
  const currentCourses = enrolledCourses[currentSemester] || []
  const nextCourses = enrolledCourses[nextSemester] || []

  const courseHistory = [
    {
      semester: "Fall 2024",
      courses: [
        { code: "CS101", name: "Intro to Computer Science", credits: 3, grade: "A", gradePoints: 4.0 },
        { code: "MATH101", name: "Calculus I", credits: 4, grade: "A-", gradePoints: 3.7 },
        { code: "ENG101", name: "English Composition", credits: 3, grade: "B+", gradePoints: 3.3 },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Student Profile</h1>
          <p className="mt-2 text-muted-foreground text-pretty">View your academic progress and course history</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Student Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">{studentInfo.name.charAt(0)}</span>
                </div>
                <CardTitle className="mt-4">{studentInfo.name}</CardTitle>
                <CardDescription>{studentInfo.studentId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{studentInfo.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Major:</span>
                    <span className="font-medium">{studentInfo.major || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minor:</span>
                    <span className="font-medium">{studentInfo.minor || "None"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{studentInfo.currentStatus}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Degree Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {creditsCompleted}/{creditsRequired} credits
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">{completionPercentage.toFixed(0)}% complete</p>
                </div>
              </CardContent>
            </Card>

            {studentInfo.achievements && studentInfo.achievements.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-base">Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {studentInfo.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <Award className="h-5 w-5" />
                      </div>
                      <div className="text-sm font-medium">{achievement}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Courses */}
          <div className="lg:col-span-2">
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <CardDescription>Cumulative GPA</CardDescription>
                  </div>
                  <CardTitle className="text-4xl">{(studentInfo.gpa || 0).toFixed(2)}</CardTitle>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <CardDescription>Credits Earned</CardDescription>
                  </div>
                  <CardTitle className="text-4xl">{creditsCompleted}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Tabs defaultValue="current" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="current">Current Semester</TabsTrigger>
                <TabsTrigger value="next">Next Semester</TabsTrigger>
                <TabsTrigger value="history">Course History</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="mt-6">
                {isLoading ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <div className="text-muted-foreground">Loading courses...</div>
                    </CardContent>
                  </Card>
                ) : currentCourses.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">No Current Courses</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        You are not enrolled in any courses this semester.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{currentSemester}</CardTitle>
                          <CardDescription>
                            {currentCourses.reduce((sum: number, course: Course) => sum + course.credits, 0)} credits
                          </CardDescription>
                        </div>
                        <Badge variant="default">In Progress</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {currentCourses.map((course: Course) => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between rounded-lg border border-border p-4"
                          >
                            <div>
                              <div className="font-medium">
                                {course.code}: {course.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {course.instructor} • {course.schedule}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary">{course.credits} credits</Badge>
                              <div className="mt-1 text-sm text-muted-foreground">
                                ${course.price?.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="next" className="mt-6">
                {isLoading ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <div className="text-muted-foreground">Loading courses...</div>
                    </CardContent>
                  </Card>
                ) : nextCourses.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">No Courses for Next Semester</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Visit the course catalog to register for next semester.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{nextSemester}</CardTitle>
                          <CardDescription>
                            {nextCourses.reduce((sum: number, course: Course) => sum + course.credits, 0)} credits
                          </CardDescription>
                        </div>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {nextCourses.map((course: Course) => (
                          <div
                            key={course.id}
                            className="flex items-center justify-between rounded-lg border border-border p-4"
                          >
                            <div>
                              <div className="font-medium">
                                {course.code}: {course.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {course.instructor} • {course.schedule}
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary">{course.credits} credits</Badge>
                              <div className="mt-1 text-sm text-muted-foreground">
                                ${course.price?.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history" className="mt-6 space-y-4">
                {courseHistory.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">No Course History</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Your completed courses will appear here.</p>
                    </CardContent>
                  </Card>
                ) : (
                  courseHistory.map((semester) => {
                    const semesterGPA =
                      semester.courses.reduce((sum, course) => sum + course.gradePoints * course.credits, 0) /
                      semester.courses.reduce((sum, course) => sum + course.credits, 0)

                    return (
                      <Card key={semester.semester}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle>{semester.semester}</CardTitle>
                              <CardDescription>
                                {semester.courses.reduce((sum, course) => sum + course.credits, 0)} credits
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Semester GPA</div>
                              <div className="text-2xl font-bold">{semesterGPA.toFixed(2)}</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {semester.courses.map((course) => (
                              <div
                                key={course.code}
                                className="flex items-center justify-between rounded-lg border border-border p-3"
                              >
                                <div>
                                  <div className="font-medium">
                                    {course.code}: {course.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{course.credits} credits</div>
                                </div>
                                <Badge
                                  variant={
                                    course.gradePoints >= 3.7
                                      ? "default"
                                      : course.gradePoints >= 3.0
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {course.grade}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
