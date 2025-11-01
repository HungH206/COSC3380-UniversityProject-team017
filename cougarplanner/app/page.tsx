import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, CheckCircle, CreditCard } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo.png"
              alt="Academic mascot with graduation cap"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Plan Your Academic Journey
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Choose courses intelligently with our prerequisite checker, build conflict-free schedules, and manage your
            academic progress all in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/catalog">Browse Courses</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/schedule">Build Schedule</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">Course Catalog</CardTitle>
              <CardDescription>Browse all available courses by department, semester, and time slots</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="h-8 w-8 text-accent" />
              <CardTitle className="mt-4">Prerequisite Checker</CardTitle>
              <CardDescription>Automatically verify eligibility and prerequisites before registration</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-primary" />
              <CardTitle className="mt-4">Schedule Builder</CardTitle>
              <CardDescription>Create conflict-free schedules with visual time slot management</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CreditCard className="h-8 w-8 text-accent" />
              <CardTitle className="mt-4">Payment Portal</CardTitle>
              <CardDescription>Manage tuition payments and view billing information securely</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-20">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h2 className="text-2xl font-bold">Ready to get started?</h2>
                <p className="mt-2 text-primary-foreground/90">
                  View your profile to see grades, GPA, and course eligibility
                </p>
              </div>
              <Button asChild size="lg" variant="secondary">
                <Link href="/profile">View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
