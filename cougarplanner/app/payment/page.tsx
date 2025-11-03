"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, DollarSign, Calendar, CheckCircle, ShoppingCart } from "lucide-react"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CartItem {
  id: string
  code: string
  name: string
  credits: number
  price: number
  instructor: string
  schedule: string
}

interface Transaction {
  id: string
  invoiceNumber: string
  date: string
  amount: number
  paymentMethod: string
  status: string
  courses: CartItem[]
}

export default function PaymentPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/cart")
      if (!response.ok) throw new Error("Failed to fetch cart")

      const data = await response.json()
      setCartItems(data.items)
    } catch (error) {
      console.error("[v0] Error fetching cart:", error)
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMakePayment = async () => {
    setIsProcessing(true)

    try {
      const tuitionTotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0)
      const fees = 450
      const total = tuitionTotal + fees

      const transactionResponse = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          total,
          paymentMethod: "Credit Card",
        }),
      })

      if (!transactionResponse.ok) throw new Error("Payment failed")

      const transactionData = await transactionResponse.json()
      setLastTransaction(transactionData.transaction)

      await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courses: cartItems,
        }),
      })

      await fetch("/api/cart", {
        method: "DELETE",
      })

      console.log("[v0] Payment successful, courses enrolled")

      setShowSuccessDialog(true)
      setCartItems([])
    } catch (error) {
      console.error("[v0] Error processing payment:", error)
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownloadInvoice = () => {
    if (!lastTransaction) {
      toast({
        title: "No Invoice Available",
        description: "Please complete a payment first.",
        variant: "destructive",
      })
      return
    }

    const invoiceContent = `
INVOICE
Invoice Number: ${lastTransaction.invoiceNumber}
Transaction ID: ${lastTransaction.id}
Date: ${new Date(lastTransaction.date).toLocaleDateString()}

COURSES:
${lastTransaction.courses
  .map(
    (course) =>
      `${course.code} - ${course.name}
  Credits: ${course.credits} | Price: $${course.price}`,
  )
  .join("\n\n")}

TOTAL: $${lastTransaction.amount.toLocaleString()}
Payment Method: ${lastTransaction.paymentMethod}
Status: ${lastTransaction.status.toUpperCase()}

Thank you for your payment!
    `.trim()

    const blob = new Blob([invoiceContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `invoice-${lastTransaction.invoiceNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Invoice Downloaded",
      description: "Your invoice has been downloaded successfully.",
    })
  }

  const tuitionTotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0)
  const fees = 450
  const total = tuitionTotal + fees
  const paid = 0
  const due = total
  const percentagePaid = total > 0 ? (paid / total) * 100 : 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-lg text-muted-foreground">Loading payment information...</div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Payment Portal</h1>
          <p className="mt-2 text-muted-foreground text-pretty">Review your course selections and complete payment</p>
        </div>

        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Payment Successful
              </DialogTitle>
              <DialogDescription>Courses added to your profile</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Your payment has been processed successfully and the courses have been added to your profile.
              </p>
              <div className="flex gap-2">
                <Button onClick={handleDownloadInvoice} variant="outline" className="flex-1 bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/profile">View Profile</Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {cartItems.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No courses selected</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add courses from the catalog to view payment information
            </p>
            <Button className="mt-4" asChild>
              <Link href="/catalog">Browse Course Catalog</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Current Balance</CardTitle>
                  <CardDescription>Fall 2025 Semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-3xl font-bold">
                      <span>Amount Due</span>
                      <span className="text-destructive">${due.toLocaleString()}</span>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Payment Progress</span>
                        <span className="font-medium">
                          ${paid.toLocaleString()} / ${total.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-background">
                        <div className="h-full bg-accent transition-all" style={{ width: `${percentagePaid}%` }} />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{percentagePaid.toFixed(0)}% paid</p>
                    </div>

                    <div className="space-y-2 border-t border-border pt-4">
                      <div className="mb-3 font-medium">Course Tuition</div>
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.code} - {item.name} ({item.credits} credits)
                          </span>
                          <span className="font-medium">${item.price?.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between border-t border-border pt-2 text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${tuitionTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fees</span>
                        <span className="font-medium">${fees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-2 font-bold">
                        <span>Total</span>
                        <span>${total.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>
                        Payment due by <strong>December 15, 2025</strong>
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1" onClick={handleMakePayment} disabled={isProcessing}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        {isProcessing ? "Processing..." : "Make Payment"}
                      </Button>
                      <Button variant="outline" onClick={handleDownloadInvoice} disabled={!lastTransaction}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Invoice
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Selected Courses</CardTitle>
                  <CardDescription>Review your course selections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4"
                      >
                        <div>
                          <div className="font-medium">
                            {item.code}: {item.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.instructor} • {item.schedule}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${item.price?.toLocaleString()}</div>
                          <Badge variant="secondary" className="mt-1">
                            {item.credits} credits
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Courses</div>
                      <div className="text-lg font-bold">{cartItems.length}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Total Credits</div>
                      <div className="text-lg font-bold">{cartItems.reduce((sum, item) => sum + item.credits, 0)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Credit/Debit Card</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Instant processing</p>
                  </div>

                  <div className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Bank Transfer</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">2-3 business days</p>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}