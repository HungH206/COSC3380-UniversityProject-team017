"use client"

import * as React from "react"

interface DropdownMenuProps {
  children: React.ReactNode
}

interface DropdownMenuTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

interface DropdownMenuContentProps {
  align?: "start" | "center" | "end"
  children: React.ReactNode
}

interface DropdownMenuItemProps {
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

const DropdownMenuContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({ open: false, setOpen: () => {} })

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)
  
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

export function DropdownMenuTrigger({ asChild, children }: DropdownMenuTriggerProps) {
  const { setOpen } = React.useContext(DropdownMenuContext)
  
  return (
    <div onClick={() => setOpen(true)}>
      {children}
    </div>
  )
}

export function DropdownMenuContent({ align = "start", children }: DropdownMenuContentProps) {
  const { open, setOpen } = React.useContext(DropdownMenuContext)
  
  if (!open) return null
  
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      <div className={`absolute z-20 mt-2 w-56 rounded-md border bg-popover p-1 shadow-md ${align === "end" ? "right-0" : "left-0"}`}>
        {children}
      </div>
    </>
  )
}

export function DropdownMenuItem({ className = "", onClick, children }: DropdownMenuItemProps) {
  const { setOpen } = React.useContext(DropdownMenuContext)
  
  return (
    <div
      className={`flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground ${className}`}
      onClick={() => {
        onClick?.()
        setOpen(false)
      }}
    >
      {children}
    </div>
  )
}