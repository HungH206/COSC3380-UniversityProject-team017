"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BookOpen, Calendar, CreditCard, LayoutDashboard, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const studentNavItems = [
  { href: "/catalog", label: "Course Catalog", icon: BookOpen },
 // { href: "/schedule", label: "Schedule Builder", icon: Calendar },
  { href: "/payment", label: "Payment", icon: CreditCard },
]

const adminNavItems = [{ href: "/admin", label: "Admin Dashboard", icon: LayoutDashboard }]

export function Navigation({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const navItems = isAdmin ? adminNavItems : studentNavItems

  const handleLogout = () => {
    localStorage.removeItem("student")
    localStorage.removeItem("userType")
    router.push("/login")
  }

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">StudyPlanner</span>
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

          <div className="flex items-center gap-4">
            <Link
              href={isAdmin ? "/catalog" : "/admin"}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {isAdmin ? "Student View" : "Admin View"}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <User className="h-4 w-4" />
                My Profile
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => router.push(isAdmin ? "/profile" : "/profile")}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}