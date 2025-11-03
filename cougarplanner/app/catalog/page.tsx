"use client"

import { Navigation } from "@/components/navigation"
import { CourseCard } from "@/components/course-card"
import { CourseFilters } from "@/components/course-filters"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, Loader2 } from "lucide-react"

interface Course {
  id: string
  code: string
  name: string
  department: string
  credits: number
  semester: string
  instructor: string
  schedule: string
  location: string
  capacity: number
  enrolled: number
  prerequisites: Array<{ code: string; name: string }>
  description: string
  available: boolean
}

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [selectedSemester, setSelectedSemester] = useState<string>("all")
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [showEligibleOnly, setShowEligibleOnly] = useState(false)

  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (selectedDepartment !== "all") params.append("department", selectedDepartment)
        if (selectedSemester !== "all") params.append("semester", selectedSemester)

        const response = await fetch(`/api/courses?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }

        const data = await response.json()
        setCourses(data)
      } catch (err) {
        console.error("[v0] Error fetching courses:", err)
        setError(err instanceof Error ? err.message : "Failed to load courses")
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [selectedDepartment, selectedSemester])

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  const handleAddToCart = async (courseId: number) => {
  try {
    const response = await fetch("http://localhost:3001/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: 1, course_id: courseId }),
    });
    
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add course to cart")
      }

      alert("✅ Course added to cart!")
    } catch (err) {
      console.error("Add to cart error:", err)
      alert("❌ Could not add course to cart")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Course Catalog</h1>
          <p className="mt-2 text-muted-foreground text-pretty">Browse available courses and add them to your cart</p>
        </div>

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
          <aside className="lg:w-64">
            <CourseFilters
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
              showAvailableOnly={showAvailableOnly}
              onAvailableOnlyChange={setShowAvailableOnly}
              showEligibleOnly={showEligibleOnly}
              onEligibleOnlyChange={setShowEligibleOnly}
            />
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading courses...</span>
              </div>
            ) : error ? (
              <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
                <p className="text-destructive">{error}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Make sure your NEON_DATABASE_URL environment variable is set correctly
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredCourses.length} of {courses.length} courses
                </div>

                <div className="grid gap-4">
                  {filteredCourses.map((course) => {
                    const prerequisiteCodes = Array.isArray(course.prerequisites) 
                      ? course.prerequisites.map((p) => p.code)
                      : []
                    const isAvailable = course.available

                    return (
                      <CourseCard
                        key={course.id}
                        course={{
                          course_id: parseInt(course.id),
                          course_code: course.code,
                          course_name: course.name,
                          department: course.department,
                          credits: course.credits,
                          semester: course.semester,
                          instructor: course.instructor,
                          schedule: course.schedule,
                          location: course.location,
                          capacity: course.capacity,
                          enrolled: course.enrolled,
                          prerequisites: prerequisiteCodes,
                          description: course.description,
                        }}
                        isEligible={true}
                        isAvailable={isAvailable}
                        completedCourses={[]}
                        onAddToCart={() => handleAddToCart(parseInt(course.id))}
                      />
                    )
                  })}

                  {filteredCourses.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border p-12 text-center">
                      <p className="text-muted-foreground">No courses found matching your criteria</p>
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
