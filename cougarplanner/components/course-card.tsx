interface ScheduleItem {
  day: string
  start: string
  end: string
}

interface CourseCardProps {
  course: {
    course_id: string
    name: string
    department: string
    credits: number
    cost: number
    description: string

    // Section-specific fields
    sectionId: string
    instructor: string
    semester: string
    schedule: ScheduleItem[]
    location: string
    capacity: number
    enrolled: number
    available: boolean

    prerequisites: string[]
  }
  isEligible: boolean
  isAvailable: boolean
  completedCourses: string[]
  onAddToCart?: (sectionId: string) => void
}

export function CourseCard({
  course,
  isEligible,
  isAvailable,
  onAddToCart,
}: CourseCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      
      {/* Title */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{course.course_id}</h3>
          <p className="text-sm text-muted-foreground">{course.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{course.credits} credits</p>
          <p className="text-sm text-muted-foreground">{course.department}</p>
        </div>
      </div>

      {/* Section Info */}
      <div className="mt-4 space-y-2">
        <p className="text-sm">
          <strong>Section:</strong> {course.sectionId}
        </p>
        <p className="text-sm">
          <strong>Instructor:</strong> {course.instructor}
        </p>

        <div>
          <strong className="text-sm">Schedule:</strong>
          <ul className="ml-4 mt-1 list-disc text-sm text-muted-foreground">
            {course.schedule.map((sch, idx) => (
              <li key={idx}>
                {sch.day} — {sch.start}–{sch.end}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm">
          <strong>Location:</strong> {course.location}
        </p>

        <p className="text-sm">
          <strong>Seats:</strong> {course.enrolled}/{course.capacity}
        </p>
      </div>

      {/* Prerequisites */}
      {course.prerequisites.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium">Prerequisites:</p>
          <p className="text-sm text-muted-foreground">
            {course.prerequisites.join(", ")}
          </p>
        </div>
      )}

      {/* Badges & Button */}
      <div className="mt-4 flex gap-2">

        {isEligible ? (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
            Eligible
          </span>
        ) : (
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
            Not Eligible
          </span>
        )}

        {isAvailable ? (
          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
            Available
          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
            Full
          </span>
        )}

        {onAddToCart && (
          <button
            className="ml-auto rounded bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
            onClick={() => onAddToCart(course.sectionId)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}
