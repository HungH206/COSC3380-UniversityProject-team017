"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, Users } from "lucide-react"

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
}

interface ScheduleCourseListProps {
  availableCourses: ScheduleCourse[]
  selectedCourses: ScheduleCourse[]
  onAddCourse: (course: ScheduleCourse) => void
  onRemoveFromCart?: (courseId: string) => Promise<void>
}

export function ScheduleCourseList({ 
  availableCourses, 
  selectedCourses, 
  onAddCourse,
  onRemoveFromCart
}: ScheduleCourseListProps) {
  const isSelected = (courseId: string) => {
    return selectedCourses.some(course => course.id === courseId)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Courses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {availableCourses.map(course => (
          <div key={course.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{course.code}</h3>
                <p className="text-sm text-muted-foreground">{course.name}</p>
              </div>
              <Badge variant="secondary">{course.credits} credits</Badge>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{course.days.join(", ")} {course.startTime}-{course.endTime}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1"
                disabled={isSelected(course.id)}
                onClick={() => onAddCourse(course)}
              >
                <Plus className="mr-2 h-4 w-4" />
                {isSelected(course.id) ? "Added" : "Add to Schedule"}
              </Button>
              {onRemoveFromCart && (
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => onRemoveFromCart(course.id)}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}