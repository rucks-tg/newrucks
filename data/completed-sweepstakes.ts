import type { Sweepstake, Winner } from "@/types"

// Separate interface for completed sweepstakes with required winner field
export interface CompletedSweepstake extends Omit<Sweepstake, "winner"> {
  winner: Winner
}

export const completedSweepstakesData: CompletedSweepstake[] = [
  {
    id: "sw10",
    title: 'Samsung 85" OLED TV',
    description: "Ultra-thin OLED TV with 8K resolution and smart features.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-03-01",
    ticketCost: 45,
    participants: 2341,
    status: "completed",
    prizeValue: 3499,
    winner: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      userId: "user1",
    },
  },
  {
    id: "sw11",
    title: "Bose QuietComfort Ultra Headphones",
    description: "Premium noise-cancelling headphones with spatial audio.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-03-03",
    ticketCost: 15,
    participants: 4532,
    status: "completed",
    prizeValue: 429,
    winner: {
      name: "Michael Thompson",
      avatar: "/placeholder.svg?height=32&width=32",
      userId: "user2",
    },
  },
  {
    id: "sw12",
    title: "Nintendo Switch OLED Bundle",
    description: "Nintendo Switch OLED with 3 games and accessories.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-03-05",
    ticketCost: 20,
    participants: 3218,
    status: "completed",
    prizeValue: 399,
    winner: {
      name: "Jessica Kim",
      avatar: "/placeholder.svg?height=32&width=32",
      userId: "user3",
    },
  },
  {
    id: "sw13",
    title: 'iPad Pro 13" M4',
    description: "Latest iPad Pro with M4 chip, 1TB storage, and Apple Pencil.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-03-08",
    ticketCost: 35,
    participants: 1876,
    status: "completed",
    prizeValue: 1299,
    winner: {
      name: "David Lee",
      avatar: "/placeholder.svg?height=32&width=32",
      userId: "user4",
    },
  },
  {
    id: "sw14",
    title: "Dyson V15 Vacuum",
    description: "Powerful cordless vacuum with smart features and attachments.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-03-10",
    ticketCost: 25,
    participants: 2109,
    status: "completed",
    prizeValue: 749,
    winner: {
      name: "Emma Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      userId: "user5",
    },
  },
]

export const getCompletedSweepstakes = (): Sweepstake[] => {
  return completedSweepstakesData
}

export const getCompletedSweepstakeById = (id: string): CompletedSweepstake | undefined => {
  return completedSweepstakesData.find((sweepstake) => sweepstake.id === id)
}
