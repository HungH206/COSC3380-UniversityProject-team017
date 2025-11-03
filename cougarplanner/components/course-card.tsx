interface CourseCardProps {
  course: {
    course_id: number
    course_code: string
    course_name: string
    department: string
    credits: number
    semester: string
    instructor: string
    schedule: string
    location: string
    capacity: number
    enrolled: number
    prerequisites: string[]
    description: string
  }
  isEligible: boolean
  isAvailable: boolean
  completedCourses: string[]
  onAddToCart?: (courseId: number) => void
}

export function CourseCard({ course, isEligible, isAvailable, onAddToCart }: CourseCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{course.course_code}</h3>
          <p className="text-sm text-muted-foreground">{course.course_name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{course.credits} credits</p>
          <p className="text-sm text-muted-foreground">{course.department}</p>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <p className="text-sm"><strong>Instructor:</strong> {course.instructor}</p>
        <p className="text-sm"><strong>Schedule:</strong> {course.schedule}</p>
        <p className="text-sm"><strong>Location:</strong> {course.location}</p>
        <p className="text-sm"><strong>Capacity:</strong> {course.enrolled}/{course.capacity}</p>
      </div>

      {course.prerequisites.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium">Prerequisites:</p>
          <p className="text-sm text-muted-foreground">{course.prerequisites.join(", ")}</p>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        {isEligible ? (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Eligible</span>
        ) : (
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">Not Eligible</span>
        )}
        {isAvailable ? (
          <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">Available</span>
        ) : (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">Full</span>
        )}
        
        {onAddToCart && (
          <button
            className="ml-auto rounded bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
            onClick={() => onAddToCart(course.course_id)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}