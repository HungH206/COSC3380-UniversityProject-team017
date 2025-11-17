"use client"

import { Navigation } from "@/components/navigation"
import { CourseCard } from "@/components/course-card"
import { CourseFilters } from "@/components/course-filters"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"

interface ScheduleItem {
  day: string
  start: string
  end: string
}

interface Prerequisite {
  courseId: string
}

interface Course {
  id: string
  name: string
  department: string
  credits: number
  description: string
  cost: number

  sectionid: string
  semester: string
  instructor: string
  location: string
  capacity: number
  enrolled: number
  available: boolean

  schedule: ScheduleItem[]
  prerequisites: Prerequisite[]
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [selectedSemester, setSelectedSemester] = useState<string>("all")
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load courses from backend
  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (selectedDepartment !== "all") params.append("department", selectedDepartment)
        if (selectedSemester !== "all") params.append("semester", selectedSemester)

        const response = await fetch(`/api/courses?${params.toString()}`)
        if (!response.ok) throw new Error("Failed to fetch courses")

        const data = await response.json()
        setCourses(data)
      } catch (err) {
        console.error("[Catalog] Error fetching courses:", err)
        setError(err instanceof Error ? err.message : "Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [selectedDepartment, selectedSemester])

  // Search filtering
  const filteredCourses = courses.filter((course) => {
    const search = searchQuery.toLowerCase()
    const matches =
      course.name.toLowerCase().includes(search) ||
      course.id.toLowerCase().includes(search) ||
      course.instructor.toLowerCase().includes(search)

    if (showAvailableOnly && !course.available) return false

    return matches
  })

  // Add section to cart
  const handleAddToCart = async (sectionId: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: "S001",
          section_id: sectionId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add to cart")
      }

      alert("Course section added to cart!")
    } catch (err) {
      console.error("Add-to-cart error:", err)
      alert("Failed to add section.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Course Catalog</h1>
          <p className="mt-2 text-muted-foreground">
            Browse available courses and register for a section
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses by name, code, or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">

          {/* Sidebar Filters */}
          <aside className="lg:w-64">
            <CourseFilters
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
              showAvailableOnly={showAvailableOnly}
              onAvailableOnlyChange={setShowAvailableOnly}
              showEligibleOnly={false}
              onEligibleOnlyChange={() => {}}
            />
          </aside>

          {/* Course List */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading courses...</span>
              </div>
            ) : error ? (
              <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
                <p className="text-destructive">{error}</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredCourses.length} of {courses.length} sections
                </div>

                <div className="grid gap-4">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.sectionid}
                      course={{
                        course_id: course.id,
                        name: course.name,
                        credits: course.credits,
                        department: course.department,
                        cost: course.cost,
                        description: course.description,
                        sectionId: course.sectionid,

                        semester: course.semester,
                        instructor: course.instructor,
                        schedule: course.schedule,
                        location: course.location,

                        capacity: course.capacity,
                        enrolled: course.enrolled,
                        available: course.available,

                        prerequisites: course.prerequisites?.map((p) => p.courseId) || [],
                      }}
                      isEligible={true}
                      isAvailable={course.available}
                      completedCourses={[]}
                      onAddToCart={() => handleAddToCart(course.sectionid)}
                    />
                  ))}

                  {filteredCourses.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border p-12 text-center">
                      <p className="text-muted-foreground">No matching courses</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
