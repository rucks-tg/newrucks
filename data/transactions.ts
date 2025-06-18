export interface Transaction {
  id: string
  date: string
  action: string
  amount: number
  type: "deposit" | "purchase" | "entry" | "refund" | "bonus"
}

export const transactionHistory: Transaction[] = [
  {
    id: "tx25",
    date: "2025-01-18",
    action: "Ticket Purchase",
    amount: +2500,
    type: "deposit",
  },
  {
    id: "tx24",
    date: "2025-01-17",
    action: "MacBook Pro Entry",
    amount: -250,
    type: "entry",
  },
  {
    id: "tx23",
    date: "2025-01-17",
    action: "PlayStation 5 Entry",
    amount: -75,
    type: "entry",
  },
  {
    id: "tx22",
    date: "2025-01-16",
    action: "Daily Login Bonus",
    amount: +25,
    type: "bonus",
  },
  {
    id: "tx21",
    date: "2025-01-15",
    action: "Amazon Gift Card Entry",
    amount: -50,
    type: "entry",
  },
  {
    id: "tx20",
    date: "2025-01-14",
    action: "Ticket Purchase",
    amount: +1000,
    type: "deposit",
  },
  {
    id: "tx19",
    date: "2025-01-13",
    action: "Luxury Getaway Entry",
    amount: -300,
    type: "entry",
  },
  {
    id: "tx18",
    date: "2025-01-12",
    action: "Referral Bonus",
    amount: +100,
    type: "bonus",
  },
  {
    id: "tx17",
    date: "2025-01-11",
    action: "iPhone 16 Pro Entry",
    amount: -90,
    type: "entry",
  },
  {
    id: "tx16",
    date: "2025-01-10",
    action: "Task Completion Bonus",
    amount: +50,
    type: "bonus",
  },
  {
    id: "tx15",
    date: "2025-01-09",
    action: "Gaming PC Entry",
    amount: -180,
    type: "entry",
  },
  {
    id: "tx14",
    date: "2025-01-08",
    action: "Ticket Purchase",
    amount: +500,
    type: "deposit",
  },
  {
    id: "tx13",
    date: "2025-01-07",
    action: "Tesla Model 3 Entry",
    amount: -400,
    type: "entry",
  },
  {
    id: "tx12",
    date: "2025-01-06",
    action: "Weekly Challenge Bonus",
    amount: +75,
    type: "bonus",
  },
  {
    id: "tx11",
    date: "2025-01-05",
    action: "DJI Drone Entry",
    amount: -120,
    type: "entry",
  },
  {
    id: "tx10",
    date: "2025-01-04",
    action: "Social Media Share Bonus",
    amount: +20,
    type: "bonus",
  },
  {
    id: "tx9",
    date: "2025-01-03",
    action: "Cash Prize Entry",
    amount: -225,
    type: "entry",
  },
  {
    id: "tx8",
    date: "2025-01-02",
    action: "Ticket Purchase",
    amount: +1500,
    type: "deposit",
  },
  {
    id: "tx7",
    date: "2025-01-01",
    action: "New Year Bonus",
    amount: +200,
    type: "bonus",
  },
  {
    id: "tx6",
    date: "2024-12-31",
    action: "Samsung TV Entry",
    amount: -135,
    type: "entry",
  },
  {
    id: "tx5",
    date: "2024-12-30",
    action: "Bose Headphones Entry",
    amount: -45,
    type: "entry",
  },
  {
    id: "tx4",
    date: "2024-12-29",
    action: "Nintendo Switch Entry",
    amount: -60,
    type: "entry",
  },
  {
    id: "tx3",
    date: "2024-12-28",
    action: "Ticket Purchase",
    amount: +800,
    type: "deposit",
  },
  {
    id: "tx2",
    date: "2024-12-27",
    action: "iPad Pro Entry",
    amount: -105,
    type: "entry",
  },
  {
    id: "tx1",
    date: "2024-12-26",
    action: "Welcome Bonus",
    amount: +500,
    type: "bonus",
  },
]

export const getTransactionHistory = () => {
  return transactionHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
