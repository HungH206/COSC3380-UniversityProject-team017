"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface CourseFiltersProps {
  selectedDepartment: string
  onDepartmentChange: (value: string) => void
  selectedSemester: string
  onSemesterChange: (value: string) => void
  showAvailableOnly: boolean
  onAvailableOnlyChange: (value: boolean) => void
  showEligibleOnly: boolean
  onEligibleOnlyChange: (value: boolean) => void
}

const departments = [
  { value: "all", label: "All Departments" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Physics", label: "Physics" },
  { value: "English", label: "English" },
]

const semesters = [
  { value: "all", label: "All Semesters" },
  { value: "Fall 2025", label: "Fall 2025" },
  { value: "Spring 2026", label: "Spring 2026" },
]

export function CourseFilters({
  selectedDepartment,
  onDepartmentChange,
  selectedSemester,
  onSemesterChange,
  showAvailableOnly,
  onAvailableOnlyChange,
  showEligibleOnly,
  onEligibleOnlyChange,
}: CourseFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Department</Label>
          <RadioGroup value={selectedDepartment} onValueChange={onDepartmentChange}>
            {departments.map((dept) => (
              <div key={dept.value} className="flex items-center space-x-2">
                <RadioGroupItem value={dept.value} id={dept.value} />
                <Label htmlFor={dept.value} className="font-normal cursor-pointer">
                  {dept.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Semester</Label>
          <RadioGroup value={selectedSemester} onValueChange={onSemesterChange}>
            {semesters.map((sem) => (
              <div key={sem.value} className="flex items-center space-x-2">
                <RadioGroupItem value={sem.value} id={sem.value} />
                <Label htmlFor={sem.value} className="font-normal cursor-pointer">
                  {sem.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3 border-t border-border pt-4">
          <Label className="text-sm font-medium">Availability</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="available"
                checked={showAvailableOnly}
                onCheckedChange={(checked) => onAvailableOnlyChange(checked === true)}
              />
              <Label htmlFor="available" className="font-normal cursor-pointer">
                Show available only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="eligible"
                checked={showEligibleOnly}
                onCheckedChange={(checked) => onEligibleOnlyChange(checked === true)}
              />
              <Label htmlFor="eligible" className="font-normal cursor-pointer">
                Show eligible only
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
