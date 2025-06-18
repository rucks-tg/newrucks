"use client"

import { useState } from "react"
import { Ticket, Plus, Minus, Gift, Trophy, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { userData } from "@/data/user"
import { getTransactionHistory } from "@/data/transactions"

export default function TicketsPage() {
  const [ticketAmount, setTicketAmount] = useState(1000)
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const transactions = getTransactionHistory()

  // Handle custom amount increment/decrement
  const incrementAmount = () => {
    setTicketAmount((prev) => Math.min(prev + 5, 20000))
  }

  const decrementAmount = () => {
    setTicketAmount((prev) => Math.max(prev - 5, 100))
  }

  // Handle deposit
  const handleDeposit = () => {
    alert(`Deposit successful! You bought ${ticketAmount.toLocaleString()} tickets`)
    setIsDepositOpen(false)
  }

  // Handle withdraw
  const handleWithdraw = () => {
    if (userData.tickets < ticketAmount) {
      alert("Insufficient balance for withdrawal")
      return
    }
    alert(`Withdrawal successful! You withdrew ${ticketAmount.toLocaleString()} tickets`)
    setIsWithdrawOpen(false)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Centered header without back button */}
      <header className="sticky top-0 z-50 flex items-center justify-center p-4 bg-ios-gray6 border-b border-ios-gray5">
        <h1 className="ios-heading text-foreground">Buy Tickets</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 space-y-6">
        {/* Current ticket balance with action buttons */}
        <div className="p-4 bg-ios-gray6 rounded-2xl border border-ios-gray5 space-y-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-ios-blue" />
              <span className="text-2xl font-bold text-foreground">{userData.tickets.toLocaleString()}</span>
            </div>
            <span className="text-ios-gray text-sm">Current Balance</span>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setIsDepositOpen(true)} className="flex-1 ios-button-primary bg-ios-blue rounded-lg">
              Deposit
            </Button>
            <Button
              onClick={() => setIsWithdrawOpen(true)}
              variant="outline"
              className="flex-1 border-ios-gray4 text-foreground rounded-lg"
            >
              Withdraw
            </Button>
          </div>
        </div>

        {/* Transaction History */}
        <Card className="ios-card">
          <CardHeader className="p-4">
            <CardTitle className="ios-heading text-foreground">Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {transactions.map((transaction, index) => {
                // Determine icon based on transaction type
                let IconComponent = CreditCard
                if (transaction.type === "entry") IconComponent = Trophy
                else if (transaction.type === "bonus") IconComponent = Gift
                else if (transaction.type === "refund") IconComponent = Plus
                else if (transaction.type === "deposit" || transaction.type === "purchase") IconComponent = CreditCard

                return (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between p-4 ${
                      index !== transactions.length - 1 ? "border-b border-ios-gray5" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${transaction.amount > 0 ? "bg-ios-green/10" : "bg-ios-red/10"}`}
                      >
                        <IconComponent
                          className={`h-4 w-4 ${transaction.amount > 0 ? "text-ios-green" : "text-ios-red"}`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{transaction.action}</p>
                        <p className="text-xs text-ios-gray">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-medium ${transaction.amount > 0 ? "text-ios-green" : "text-ios-red"}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-ios-gray">
                        <span className="text-ios-yellow">★</span>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Deposit Dialog */}
      <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl border-ios-gray5 p-0 overflow-hidden">
          <DialogHeader className="bg-ios-gray6 p-4 border-b border-ios-gray5">
            <DialogTitle className="text-center">Deposit Tickets</DialogTitle>
          </DialogHeader>

          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={decrementAmount}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-ios-gray5 text-foreground"
                aria-label="Decrease ticket amount"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center">
                <input
                  type="number"
                  value={ticketAmount}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value, 10)
                    if (!isNaN(value)) {
                      setTicketAmount(Math.max(100, Math.min(value, 20000)))
                    }
                  }}
                  className="w-28 text-2xl font-bold text-foreground bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-ios-blue rounded-md"
                  min={100}
                  max={20000}
                />
                <div className="text-ios-gray text-sm">tickets</div>
              </div>
              <button
                type="button"
                onClick={incrementAmount}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-ios-gray5 text-foreground"
                aria-label="Increase ticket amount"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <Slider
              value={[ticketAmount]}
              min={100}
              max={20000}
              step={5}
              onValueChange={(value) => {
                setTicketAmount(value[0])
              }}
              className="py-4"
            />
          </div>

          <DialogFooter className="p-4 border-t border-ios-gray5 bg-ios-gray6">
            <Button onClick={handleDeposit} className="w-full ios-button-primary bg-ios-blue py-3 rounded-none">
              Deposit {ticketAmount.toLocaleString()} Tickets
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl border-ios-gray5 p-0 overflow-hidden">
          <DialogHeader className="bg-ios-gray6 p-4 border-b border-ios-gray5">
            <DialogTitle className="text-center">Withdraw Tickets</DialogTitle>
          </DialogHeader>

          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-ios-gray">Available balance:</p>
              <p className="font-medium">
                <span className="text-ios-yellow">{userData.tickets.toLocaleString()} ★</span>
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={decrementAmount}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-ios-gray5 text-foreground"
                aria-label="Decrease ticket amount"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center">
                <input
                  type="number"
                  value={ticketAmount}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value, 10)
                    if (!isNaN(value)) {
                      setTicketAmount(Math.max(1, Math.min(value, userData.tickets)))
                    }
                  }}
                  className="w-28 text-2xl font-bold text-foreground bg-transparent text-center focus:outline-none focus:ring-1 focus:ring-ios-blue rounded-md"
                  min={1}
                  max={userData.tickets}
                />
                <div className="text-ios-gray text-sm">tickets</div>
              </div>
              <button
                type="button"
                onClick={incrementAmount}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-ios-gray5 text-foreground"
                aria-label="Increase ticket amount"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <Slider
              value={[ticketAmount]}
              min={1}
              max={userData.tickets}
              step={1}
              onValueChange={(value) => {
                setTicketAmount(value[0])
              }}
              className="py-4"
            />
          </div>

          <DialogFooter className="p-4 border-t border-ios-gray5 bg-ios-gray6">
            <Button
              onClick={handleWithdraw}
              variant="outline"
              className="w-full border-ios-gray4 text-foreground py-3 rounded-none"
              disabled={ticketAmount > userData.tickets}
            >
              Withdraw {ticketAmount.toLocaleString()} Tickets
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
