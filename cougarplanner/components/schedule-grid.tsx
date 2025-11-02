"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

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

interface ScheduleGridProps {
  courses: ScheduleCourse[]
  onRemoveCourse: (courseId: string) => void
}

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
]

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

export function ScheduleGrid({ courses, onRemoveCourse }: ScheduleGridProps) {
  const getCourseForSlot = (day: string, time: string) => {
    return courses.find(course => {
      if (!course.days.includes(day)) return false
      
      const courseStart = parseTime(course.startTime)
      const courseEnd = parseTime(course.endTime)
      const slotTime = parseTime(time)
      
      return slotTime >= courseStart && slotTime < courseEnd
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-1 text-sm">
          <div className="p-2 font-medium">Time</div>
          {days.map(day => (
            <div key={day} className="p-2 font-medium text-center">
              {day.slice(0, 3)}
            </div>
          ))}
          
          {timeSlots.map(time => (
            <>
              <div key={time} className="p-2 text-muted-foreground border-r">
                {time}
              </div>
              {days.map(day => {
                const course = getCourseForSlot(day, time)
                return (
                  <div key={`${day}-${time}`} className="p-1 border border-border min-h-[60px]">
                    {course && (
                      <div className={`${course.color} text-white p-2 rounded text-xs relative group`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute -top-1 -right-1 h-4 w-4 p-0 opacity-0 group-hover:opacity-100 bg-destructive hover:bg-destructive/90"
                          onClick={() => onRemoveCourse(course.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="font-medium">{course.code}</div>
                        <div className="truncate">{course.name}</div>
                        <div className="text-xs opacity-90">{course.instructor}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function parseTime(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}