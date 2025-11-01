"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Calendar, User, CreditCard, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

const studentNavItems = [
  { href: "/catalog", label: "Course Catalog", icon: BookOpen },
  { href: "/schedule", label: "Schedule Builder", icon: Calendar },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/payment", label: "Payment", icon: CreditCard },
]

const adminNavItems = [{ href: "/admin", label: "Admin Dashboard", icon: LayoutDashboard }]

export function Navigation({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  const navItems = isAdmin ? adminNavItems : studentNavItems

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">CougarPlanner</span>
            </Link>

            <div className="hidden md:flex md:gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={isAdmin ? "/catalog" : "/admin"}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {isAdmin ? "Student View" : "Admin View"}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
