export interface Student {
  name: string
  studentId: string
  email: string
  major?: string
  minor?: string
  currentStatus: string
  degreeProgress: number
  gpa: number
  achievements?: string[]
}

export function getDefaultStudent(): Student {
  return {
    name: "Will Hoang",
    studentId: "STU123456",
    email: "will.hoang@central.uh.edu",
    major: "Computer Science",
    minor: "Mathematics",
    currentStatus: "Full-time",
    degreeProgress: 45,
    gpa: 3.75,
    achievements: [
      "Dean's List Fall 2025",
    ]
  }
}