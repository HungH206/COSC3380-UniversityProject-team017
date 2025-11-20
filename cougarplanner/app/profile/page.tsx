"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Course {
  code: string
  name: string
  credits: number
  grade?: string | null
}

interface CoursesBySemester {
  [semester: string]: Course[]
}

export default function ProfilePage() {
  const [studentInfo, setStudentInfo] = useState({
    studentId: "",
    name: "",
    gpa: 0,
    totalCredits: 0
  })

  const [bankInfo, setBankInfo] = useState({
    balance: 0,
    amount_due: 0
  })

  const [currentCourses, setCurrentCourses] = useState<Course[]>([])
  const [nextCourses, setNextCourses] = useState<Course[]>([])
  const [completedCourses, setCompletedCourses] = useState<CoursesBySemester>({})

  const [currentSemester, setCurrentSemester] = useState("Fall 2025")
  const [nextSemester, setNextSemester] = useState("Spring 2026")

  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadProfile("S001")
  }, [])

  async function loadProfile(studentId: string) {
    try {
      const res = await fetch(`http://localhost:3001/api/profile/${studentId}`)
      if (!res.ok) throw new Error("Failed to load profile")

      const data = await res.json()

      setStudentInfo({
        studentId: data.student.studentid,
        name: data.student.name,
        gpa: Number(data.student.gpa) || 0,
        totalCredits: data.student.total_credits
      })

      setBankInfo({
        balance: data.bank.balance,
        amount_due: data.bank.amount_due
      })

      // these contain grade fields
      setCurrentSemester(data.currentSemester)
      setNextSemester(data.nextSemester)

      setCurrentCourses(data.currentCourses)
      setNextCourses(data.upcomingCourses)
      setCompletedCourses(data.completedCourses)

    } catch (err) {
      console.error("[Profile] Load error:", err)
      toast({ title: "Error", description: "Failed to load profile", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const completionPercentage = (studentInfo.totalCredits / 120) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold">Student Profile</h1>
        <p className="text-muted-foreground mt-1">Your academic and financial overview</p>

        <div className="grid gap-6 mt-6 lg:grid-cols-3">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Student Info */}
            <Card>
              <CardHeader>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">{studentInfo.name.charAt(0)}</span>
                </div>
                <CardTitle className="mt-4">{studentInfo.name}</CardTitle>
                <CardDescription>ID: {studentInfo.studentId}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* GPA */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cumulative GPA</span>
                    <span className="font-bold text-lg">{studentInfo.gpa.toFixed(2)}</span>
                  </div>
                </div>

                {/* Credits */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Credits Completed</span>
                    <span>{studentInfo.totalCredits}/120</span>
                  </div>
                  <Progress value={completionPercentage} />
                  <p className="text-xs text-muted-foreground mt-2">
                    {completionPercentage.toFixed(0)}% degree progress
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bank Account Box */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bank Account</CardTitle>
                <CardDescription>Your university financials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Balance</span>
                  <span className="font-medium">${bankInfo.balance.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount Due</span>
                  <span className="font-medium text-destructive">
                    ${bankInfo.amount_due.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2">

            <Tabs defaultValue="current">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="next">Next</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              {/* CURRENT SEMESTER */}
              <TabsContent value="current" className="mt-4">
                {isLoading ? (
                  <Card><CardContent className="p-6 text-center">Loading...</CardContent></Card>
                ) : currentCourses.length === 0 ? (
                  <Card><CardContent className="p-6 text-center">No current courses.</CardContent></Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>{currentSemester}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {currentCourses.map((c, i) => (
                        <div key={i} className="border rounded-lg p-4 mb-3">
                          <div className="font-medium">{c.code} — {c.name}</div>

                          <div className="text-sm text-muted-foreground mb-1">
                            {c.credits} credits
                          </div>

                          <div className="text-sm">
                            <span className="font-semibold">Grade:</span>{" "}
                            {c.grade ? (
                              <span className="text-green-700">{c.grade}</span>
                            ) : (
                              <span className="text-muted-foreground">Not Posted</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* NEXT SEMESTER */}
              <TabsContent value="next" className="mt-4">
                {nextCourses.length === 0 ? (
                  <Card><CardContent className="p-6 text-center">No courses next semester.</CardContent></Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>{nextSemester}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {nextCourses.map((c, i) => (
                        <div key={i} className="border rounded-lg p-4 mb-3">
                          <div className="font-medium">{c.code} — {c.name}</div>
                          <div className="text-sm text-muted-foreground">{c.credits} credits</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* COURSE HISTORY */}
              <TabsContent value="history" className="mt-4">
                {Object.keys(completedCourses).length === 0 ? (
                  <Card><CardContent className="p-6 text-center">No completed courses.</CardContent></Card>
                ) : (
                  Object.keys(completedCourses).map((semester) => (
                    <Card key={semester} className="mb-4">
                      <CardHeader>
                        <CardTitle>{semester}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {completedCourses[semester].map((c, i) => (
                          <div key={i} className="border rounded-lg p-4 mb-2">
                            <div className="font-medium">{c.code} — {c.name}</div>
                            <div className="text-sm text-muted-foreground">{c.credits} credits</div>

                            <div className="text-sm mt-1">
                              <span className="font-semibold">Grade:</span>{" "}
                              <span className="text-green-700">{c.grade ?? "N/A"}</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
