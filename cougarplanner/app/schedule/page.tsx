/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Navigation } from "@/components/navigation"
import { ScheduleGrid } from "@/components/schedule-grid"
import { ScheduleCourseList } from "@/components/schedule-course-list"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Download, Save, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export interface ScheduleCourse {
  id: string
  code: string
  name: string
  instructor: string
  credits: number
  days: string[]
  startTime: string
  endTime: string
  color: string
  price?: number
}

export default function SchedulePage() {
  const [cartCourses, setCartCourses] = useState<ScheduleCourse[]>([])
  const [selectedCourses, setSelectedCourses] = useState<ScheduleCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchCartCourses()
  }, [])

  const fetchCartCourses = async () => {
    try {
      const response = await fetch("/api/cart")
      if (!response.ok) throw new Error("Failed to fetch cart")

      const data = await response.json()

      // Transform cart items to schedule format
      const scheduleCourses = data.items.map((course: any, index: number) => ({
        id: course.id,
        code: course.code,
        name: course.name,
        instructor: course.instructor,
        credits: course.credits,
        days: parseScheduleDays(course.schedule),
        startTime: parseScheduleTime(course.schedule, "start"),
        endTime: parseScheduleTime(course.schedule, "end"),
        color: getColorForIndex(index),
        price: course.price,
      }))

      setCartCourses(scheduleCourses)
    } catch (error) {
      console.error("[v0] Error fetching cart:", error)
      toast({
        title: "Error",
        description: "Failed to load courses from cart",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addCourse = (course: ScheduleCourse) => {
    // Check for time conflicts
    const hasConflict = selectedCourses.some((selected) => {
      const hasCommonDay = selected.days.some((day) => course.days.includes(day))
      if (!hasCommonDay) return false

      const selectedStart = parseTime(selected.startTime)
      const selectedEnd = parseTime(selected.endTime)
      const courseStart = parseTime(course.startTime)
      const courseEnd = parseTime(course.endTime)

      return (
        (courseStart >= selectedStart && courseStart < selectedEnd) ||
        (courseEnd > selectedStart && courseEnd <= selectedEnd) ||
        (courseStart <= selectedStart && courseEnd >= selectedEnd)
      )
    })

    if (hasConflict) {
      toast({
        title: "Schedule Conflict",
        description: "This course conflicts with your current schedule!",
        variant: "destructive",
      })
      return
    }

    setSelectedCourses([...selectedCourses, course])
    toast({
      title: "Course Added",
      description: `${course.code} added to your schedule`,
    })
  }

  const removeCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId))
  }

  const removeFromCart = async (courseId: string) => {
    try {
      const response = await fetch(`/api/cart?id=${courseId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to remove from cart")

      toast({
        title: "Course Removed",
        description: "Course has been removed from your cart",
      })

      // Refresh cart courses
      await fetchCartCourses()

      // Also remove from selected courses if it was selected
      setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId))
    } catch (error) {
      console.error("[v0] Error removing from cart:", error)
      toast({
        title: "Error",
        description: "Failed to remove course from cart",
        variant: "destructive",
      })
    }
  }

  const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-lg text-muted-foreground">Loading your courses...</div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">Schedule Builder</h1>
            <p className="mt-2 text-muted-foreground text-pretty">
              Build your course schedule with automatic conflict detection
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/catalog">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Browse Courses
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Schedule
            </Button>
          </div>
        </div>

        {cartCourses.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No courses in cart</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add courses from the catalog to start building your schedule
            </p>
            <Button className="mt-4" asChild>
              <Link href="/catalog">Browse Course Catalog</Link>
            </Button>
          </Card>
        ) : (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Courses</CardDescription>
                  <CardTitle className="text-3xl">{selectedCourses.length}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Credits</CardDescription>
                  <CardTitle className="text-3xl">{totalCredits}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Status</CardDescription>
                  <CardTitle className="text-3xl">
                    {totalCredits >= 12 ? (
                      <span className="text-accent">Full-time</span>
                    ) : (
                      <span className="text-muted-foreground">Part-time</span>
                    )}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div>
                <ScheduleGrid courses={selectedCourses} onRemoveCourse={removeCourse} />
              </div>

              <div>
                <ScheduleCourseList
                  availableCourses={cartCourses}
                  selectedCourses={selectedCourses}
                  onAddCourse={addCourse}
                  onRemoveFromCart={removeFromCart}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

function parseTime(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

function parseScheduleDays(schedule: string): string[] {
  const dayMap: { [key: string]: string } = {
    M: "Monday",
    T: "Tuesday",
    W: "Wednesday",
    R: "Thursday",
    F: "Friday",
  }

  const match = schedule.match(/([MTWRF]+)/)
  if (!match) return []

  return match[1]
    .split("")
    .map((d) => dayMap[d])
    .filter(Boolean)
}

function parseScheduleTime(schedule: string, type: "start" | "end"): string {
  const match = schedule.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/)
  if (!match) return type === "start" ? "09:00" : "10:00"

  if (type === "start") {
    return `${match[1].padStart(2, "0")}:${match[2]}`
  } else {
    return `${match[3].padStart(2, "0")}:${match[4]}`
  }
}

function getColorForIndex(index: number): string {
  const colors = ["bg-primary", "bg-accent", "bg-chart-3", "bg-chart-4", "bg-chart-5"]
  return colors[index % colors.length]
}
