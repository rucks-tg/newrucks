"use client"

import { useState, useEffect } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import Link from "next/link"

interface EntryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (amount: number) => void
  initialAmount?: number
  ticketCost: number
  userTickets: number
}

export function EntryModal({ isOpen, onClose, onSubmit, initialAmount = 1, ticketCost, userTickets }: EntryModalProps) {
  const [amount, setAmount] = useState(initialAmount)

  // Reset amount when modal opens
  useEffect(() => {
    if (isOpen) {
      setAmount(initialAmount)
    }
  }, [isOpen, initialAmount])

  const totalCost = amount * ticketCost
  const canAfford = userTickets >= totalCost

  const incrementAmount = () => {
    setAmount((prev) => prev + 1)
  }

  const decrementAmount = () => {
    setAmount((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (canAfford) {
      onSubmit(amount)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl border-ios-gray5 p-0 overflow-hidden">
        <DialogHeader className="bg-ios-gray6 p-4 border-b border-ios-gray5">
          <DialogTitle className="text-center">Add Entries</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-ios-gray">Current balance:</p>
            <p className="font-medium">
              <span className="text-ios-yellow">{userTickets} ★</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-[2.5rem] w-[2.5rem] rounded-full"
              onClick={decrementAmount}
              disabled={amount <= 1}
            >
              <Minus className="h-[1rem] w-[1rem]" />
              <span className="sr-only">Decrease</span>
            </Button>

            <div className="w-[5rem]">
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value)
                  if (!isNaN(value) && value > 0) {
                    setAmount(value)
                  }
                }}
                className="w-full text-center text-2xl font-bold bg-transparent border border-input rounded-md px-[0.5rem] py-[0.25rem]"
                min="1"
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-[2.5rem] w-[2.5rem] rounded-full"
              onClick={incrementAmount}
            >
              <Plus className="h-[1rem] w-[1rem]" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>

          <div className="flex items-center justify-between border-t border-ios-gray5 pt-4">
            <p className="text-sm text-ios-gray">Total cost:</p>
            <p className="font-medium">
              <span className="text-ios-yellow">{totalCost} ★</span>
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-3 p-4 border-t border-ios-gray5 bg-ios-gray6">
          {!canAfford ? (
            <>
              <p className="text-xs text-ios-red text-center">
                You need {totalCost - userTickets} more tickets to enter
              </p>
              <Link href="/tickets" className="w-full" onClick={onClose}>
                <Button className="w-full ios-button-primary bg-ios-blue py-[0.75rem] rounded-none">
                  Buy More Tickets
                </Button>
              </Link>
            </>
          ) : (
            <Button className="w-full ios-button-primary bg-ios-blue py-[0.75rem] rounded-none" onClick={handleSubmit}>
              Add {amount} {amount === 1 ? "Entry" : "Entries"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
