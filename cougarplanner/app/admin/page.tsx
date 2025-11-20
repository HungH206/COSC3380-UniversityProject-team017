/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  TrendingUp,
  DollarSign,
  Search,
  MoreVertical,
  Trash2,
  Lock,
  LockOpen,
  GraduationCap,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Course {
  // This is the *course* id (CourseID from DB or a derived key)
  id: string
  // This is the *section* id (SectionID from DB) – used for open/close + capacity
  sectionid?: string

  code: string
  name: string
  instructor: string
  schedule: string
  semester: string
  enrolled: number
  capacity: number
  credits: number
  price: number
  available: boolean // true if status = 'Open'
}

interface Transaction {
  studentid: string
  studentname: string
  courseid: string
  coursename: string
  credits: number
  amount_paid: number
  pay_date: string
  enrollment_status: string
}

export default function AdminPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("")
  const [loading, setLoading] = useState(true)
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [studentsInSection, setStudentsInSection] = useState<any[]>([])

  // ------------------------------------------------------------------
  // Fetch courses + transactions
  // ------------------------------------------------------------------
  useEffect(() => {
    fetchCourses()
    fetchTransactions()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/course") // Next.js API, not backend directly
      const data = await response.json()

      // Normalize shape so admin can rely on consistent fields
      const normalized: Course[] = data.map((row: any) => {
        const code =
          row.code ??
          (row.department && row.course
            ? `${row.department} ${row.course}`
            : row.id ?? "")

        // Build a readable schedule if we only have days + times from backend
        const schedule =
          row.schedule ??
          (row.days && row.starttime && row.endtime
            ? `${row.days} ${String(row.starttime).slice(0, 5)}–${String(row.endtime).slice(0, 5)}`
            : "")

        return {
          id: row.id, // CourseID (from backend query alias)
          sectionid: row.sectionid ?? row.sectionId ?? row.id, // SectionID – critical for admin updates
          code,
          name: row.name,
          instructor: row.instructor ?? row.instructorname ?? "",
          schedule,
          semester: row.semester,
          enrolled: Number(row.enrolled ?? row.enrolledcount ?? 0),
          capacity: Number(row.capacity ?? 0),
          credits: Number(row.credits ?? 0),
          price: Number(row.price ?? row.cost ?? 0),
          available:
            typeof row.available === "boolean"
              ? row.available
              : (row.status ?? "").trim().toLowerCase() === "open",
        }
      })

      setCourses(normalized)
    } catch (error) {
      console.error("[admin] Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/admin/transactions")
      const data = await response.json()
      setTransactions(data.transactions || [])
    } catch (error) {
      console.error("[admin] Error fetching transactions:", error)
    }
  }

  // ------------------------------------------------------------------
  // Toggle course open/closed (ACID-safe via backend transaction)
  // ------------------------------------------------------------------
  const toggleCourseStatus = async (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    if (!course) return

    // Use SectionID for the admin API
    const sectionId = course.sectionid || course.id
    const newStatus = course.available ? "Closed" : "Open"

    try {
      const response = await fetch("http://localhost:3001/api/admin/sections/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionId,
          status: newStatus,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to update section")

      console.log("[admin] Updated section:", data)

      // Optimistic UI update: flip the 'available' flag
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId ? { ...c, available: newStatus === "Open" } : c,
        ),
      )
    } catch (err) {
      console.error("[admin] Toggle status error:", err)
      alert("Failed to update section status. Check console.")
    }
  }

  const deleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return

    // (Optional) You could also call a backend route here to actually delete.
    setCourses(courses.filter((c) => c.id !== courseId))
    console.log(`[admin] Course ${courseId} deleted (frontend only)`)
  }

  const openGradeDialog = async (course: Course) => {
  setSelectedCourse(course)
  setGradeDialogOpen(true)
  setSelectedStudent("")
  setSelectedGrade("")

  const sectionId = course.sectionid || course.id
  setLoadingStudents(true)

  try {
    const res = await fetch(
      `http://localhost:3001/api/admin/students?sectionId=${sectionId}`
    )
    const data = await res.json()

    setStudentsInSection(data.students || [])
  } catch (err) {
    console.error("[admin] Failed to fetch students:", err)
    setStudentsInSection([])
  } finally {
    setLoadingStudents(false)
  }
}


  const postGrade = async () => {
    if (!selectedCourse || !selectedStudent || !selectedGrade) {
      alert("Please select a student and grade")
      return
    }

    const sectionId = selectedCourse.sectionid || selectedCourse.id

    try {
      const response = await fetch("http://localhost:3001/api/admin/grades/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionId,
          grades: [
            {
              studentId: selectedStudent,
              grade: selectedGrade,
            },
          ],
        }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Grade post failed")

      alert("Grade posted successfully!")

      setGradeDialogOpen(false)
      setSelectedStudent("")
      setSelectedGrade("")
    } catch (err) {
      console.error("[admin] Grade post error:", err)
      alert("Failed to post grade. Check console.")
    }
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Stats
  const stats = {
    totalCourses: courses.length,
    openCourses: courses.filter((c) => c.available).length,
    totalTransactions: transactions.length,
    totalRevenue: transactions.reduce((sum, t) => sum + (Number(t.amount_paid) || 0), 0),
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAdmin />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground text-pretty">
            Manage courses, view transactions, and post grades
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardDescription>Total Courses</CardDescription>
              </div>
              <CardTitle className="text-3xl">{stats.totalCourses}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <LockOpen className="h-5 w-5 text-accent" />
                <CardDescription>Open Courses</CardDescription>
              </div>
              <CardTitle className="text-3xl">{stats.openCourses}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <CardDescription>Transactions</CardDescription>
              </div>
              <CardTitle className="text-3xl">{stats.totalTransactions}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <CardDescription>Total Revenue</CardDescription>
              </div>
              <CardTitle className="text-3xl">${stats.totalRevenue.toLocaleString()}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="courses">Course Management</TabsTrigger>
            <TabsTrigger value="transactions">Transaction Log</TabsTrigger>
            <TabsTrigger value="grades">Post Grades</TabsTrigger>
          </TabsList>

          {/* Course Management Tab */}
          <TabsContent value="courses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Open/close courses and manage course offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {loading ? (
                  <div className="py-8 text-center text-muted-foreground">Loading courses...</div>
                ) : (
                  <div className="space-y-3">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {course.code}: {course.name}
                            </span>
                            <Badge variant={course.available ? "default" : "secondary"}>
                              {course.available ? "Open" : "Closed"}
                            </Badge>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {course.instructor} • {course.schedule} • {course.semester}
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            Enrolled: {course.enrolled}/{course.capacity} • {course.credits} credits • $
                            {course.price}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={course.available ? "outline" : "default"}
                            onClick={() => toggleCourseStatus(course.id)}
                          >
                            {course.available ? (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Close
                              </>
                            ) : (
                              <>
                                <LockOpen className="mr-2 h-4 w-4" />
                                Open
                              </>
                            )}
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openGradeDialog(course)}>
                                <GraduationCap className="mr-2 h-4 w-4" />
                                Post Grades
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => deleteCourse(course.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Course
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transaction Log Tab */}
          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Transaction Log</CardTitle>
                <CardDescription>View all course registration payments from students</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    No transactions yet. Transactions will appear here when students make payments.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction, idx) => (
                      <div key={idx} className="rounded-lg border border-border p-4">
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{transaction.studentname}</span>
                              <Badge variant="default">{transaction.enrollment_status}</Badge>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {transaction.pay_date
                                ? new Date(transaction.pay_date).toLocaleString()
                                : "No date"}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">
                              ${(Number(transaction.amount_paid) || 0).toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Student ID: {transaction.studentid}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 border-t border-border pt-3">
                          <div className="text-sm font-medium">Course Enrolled:</div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>
                              {transaction.courseid} - {transaction.coursename}
                            </span>
                            <span className="font-medium">{transaction.credits} credits</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Post Grades Tab */}
          <TabsContent value="grades" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Student Grades</CardTitle>
                <CardDescription>Select a course to post grades for enrolled students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <div className="font-medium">
                          {course.code}: {course.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {course.instructor} • {course.enrolled} students enrolled
                        </div>
                      </div>

                      <Button size="sm" onClick={() => openGradeDialog(course)}>
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Post Grades
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Grade Posting Dialog */}
      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post Grade</DialogTitle>
            <DialogDescription>
              {selectedCourse ? `${selectedCourse.code} - ${selectedCourse.name}` : ""}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="student">Student</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger id="student">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
  {loadingStudents ? (
    <SelectItem value="loading">Loading...</SelectItem>
  ) : studentsInSection.length === 0 ? (
    <SelectItem value="none">No students enrolled</SelectItem>
  ) : (
    studentsInSection.map((stu) => (
      <SelectItem key={stu.studentid} value={stu.studentid}>
        {stu.studentname.trim()} ({stu.studentid})
      </SelectItem>
    ))
  )}
</SelectContent>

              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A (4.0)</SelectItem>
                  <SelectItem value="A-">A- (3.7)</SelectItem>
                  <SelectItem value="B+">B+ (3.3)</SelectItem>
                  <SelectItem value="B">B (3.0)</SelectItem>
                  <SelectItem value="B-">B- (2.7)</SelectItem>
                  <SelectItem value="C+">C+ (2.3)</SelectItem>
                  <SelectItem value="C">C (2.0)</SelectItem>
                  <SelectItem value="C-">C- (1.7)</SelectItem>
                  <SelectItem value="D">D (1.0)</SelectItem>
                  <SelectItem value="F">F (0.0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setGradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={postGrade}>Post Grade</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}