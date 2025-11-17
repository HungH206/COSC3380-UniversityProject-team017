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
  FileText,
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
  id: string
  code: string
  name: string
  instructor: string
  schedule: string
  semester: string
  enrolled: number
  capacity: number
  credits: number
  price: number
  available: boolean
}

interface Transaction {
  id: string
  amount: number
  status: string
  date: string
  paymentMethod: string
  courses: Course[]
  invoiceNumber: string
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

  // Fetch courses and transactions
  useEffect(() => {
    fetchCourses()
    fetchTransactions()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses")
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.error("[v0] Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/transactions")
      const data = await response.json()
      setTransactions(data.transactions || [])
    } catch (error) {
      console.error("[v0] Error fetching transactions:", error)
    }
  }

  const toggleCourseStatus = async (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    if (!course) return

    const updatedCourse = { ...course, available: !course.available }
    setCourses(courses.map((c) => (c.id === courseId ? updatedCourse : c)))

    console.log(`[v0] Course ${course.code} status changed to ${updatedCourse.available ? "Open" : "Closed"}`)
  }

  const deleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return

    setCourses(courses.filter((c) => c.id !== courseId))
    console.log(`[v0] Course ${courseId} deleted`)
  }

  const openGradeDialog = (course: Course) => {
    setSelectedCourse(course)
    setGradeDialogOpen(true)
  }

  const postGrade = () => {
    if (!selectedStudent || !selectedGrade) {
      alert("Please select a student and grade")
      return
    }

    console.log(`[v0] Grade posted: ${selectedGrade} for student ${selectedStudent} in course ${selectedCourse?.code}`)
    alert(`Grade ${selectedGrade} posted successfully for student ${selectedStudent}`)
    setGradeDialogOpen(false)
    setSelectedStudent("")
    setSelectedGrade("")
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate stats
  const stats = {
    totalCourses: courses.length,
    openCourses: courses.filter((c) => c.available).length,
    totalTransactions: transactions.length,
    totalRevenue: transactions.reduce((sum, t) => sum + t.amount, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isAdmin />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground text-pretty">Manage courses, view transactions, and post grades</p>
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
                <TrendingUp className="h-5 w-5 text-chart-3" />
                <CardDescription>Transactions</CardDescription>
              </div>
              <CardTitle className="text-3xl">{stats.totalTransactions}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-chart-4" />
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
                            Enrolled: {course.enrolled}/{course.capacity} • {course.credits} credits • ${course.price}
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
                              <DropdownMenuItem className="text-destructive" onClick={() => deleteCourse(course.id)}>
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
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="rounded-lg border border-border p-4">
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{transaction.id}</span>
                              <Badge variant="default">{transaction.status}</Badge>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {new Date(transaction.date).toLocaleString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">${transaction.amount.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{transaction.paymentMethod}</div>
                          </div>
                        </div>

                        <div className="space-y-2 border-t border-border pt-3">
                          <div className="text-sm font-medium">Courses Enrolled:</div>
                          {transaction.courses.map((course: Course, idx: number) => (
                            <div key={idx} className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>
                                {course.code} - {course.name}
                              </span>
                              <span className="font-medium">${course.price}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Invoice: {transaction.invoiceNumber}</span>
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
            <DialogDescription>{selectedCourse ? `${selectedCourse.code} - ${selectedCourse.name}` : ''}</DialogDescription>
           </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="student">Student</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger id="student">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1234344">Hung (1234344)</SelectItem>
                  <SelectItem value="STU001">John Doe (STU001)</SelectItem>
                  <SelectItem value="STU002">Jane Smith (STU002)</SelectItem>
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
