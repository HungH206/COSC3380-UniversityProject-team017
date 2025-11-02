import { useState } from "react"

interface Toast {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant = "default" }: Toast) => {
    console.log(`Toast: ${title}${description ? ` - ${description}` : ""}`)
    // In a real app, this would show a toast notification
    // For now, we'll just log to console
  }

  return { toast, toasts }
}