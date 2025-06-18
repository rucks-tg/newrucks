import type { Sweepstake } from "@/types"
import {
  getCompletedSweepstakeById,
  getCompletedSweepstakes as getCompletedSweepstakesData,
} from "./completed-sweepstakes"

export const sweepstakesData: Sweepstake[] = [
  {
    id: "sw1",
    title: 'Apple MacBook Pro 16" M3 Max',
    description: "The most powerful MacBook Pro ever with the M3 Max chip, 32GB RAM, and 1TB SSD storage.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-03-15",
    ticketCost: 50,
    participants: 1243,
    status: "active",
    prizeValue: 3499,
  },
  {
    id: "sw2",
    title: "PlayStation 5 Pro Bundle",
    description: "Next-gen gaming console with extra controller, 3 games, and 1-year PS Plus subscription.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-03-18",
    ticketCost: 25,
    participants: 3567,
    status: "active",
    prizeValue: 699,
  },
  {
    id: "sw3",
    title: "$1,000 Amazon Gift Card",
    description: "Shop for anything you want with this $1,000 Amazon gift card. Valid worldwide.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-03-20",
    ticketCost: 10,
    participants: 8921,
    status: "active",
    prizeValue: 1000,
  },
  {
    id: "sw4",
    title: "Luxury Weekend Getaway",
    description: "3-day, 2-night stay at a 5-star resort with all meals and spa treatments included.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-03-25",
    ticketCost: 100,
    participants: 756,
    status: "active",
    prizeValue: 2500,
  },
  {
    id: "sw5",
    title: "Tesla Model 3 Performance",
    description: "Win a brand new Tesla Model 3 Performance with all premium features included.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-04-20",
    ticketCost: 200,
    participants: 0,
    status: "upcoming",
    prizeValue: 55990,
  },
  {
    id: "sw6",
    title: "iPhone 16 Pro Max",
    description: "The latest iPhone with the most advanced camera system and performance.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-04-22",
    ticketCost: 30,
    participants: 0,
    status: "upcoming",
    prizeValue: 1199,
  },
  {
    id: "sw7",
    title: "DJI Mavic 4 Pro Drone",
    description: "Professional-grade aerial photography drone with 8K video capabilities.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-04-25",
    ticketCost: 40,
    participants: 0,
    status: "upcoming",
    prizeValue: 1599,
  },
  {
    id: "sw8",
    title: "$5,000 Cash Prize",
    description: "Win $5,000 in cash to spend however you want.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-05-01",
    ticketCost: 75,
    participants: 0,
    status: "upcoming",
    prizeValue: 5000,
  },
  {
    id: "sw9",
    title: "Gaming PC Setup",
    description: "Complete gaming setup with RTX 4090, 64GB RAM, and 4K monitor.",
    image: "/placeholder.svg?height=160&width=280",
    startDate: "2025-05-05",
    ticketCost: 60,
    participants: 0,
    status: "upcoming",
    prizeValue: 3500,
  },
]

export const getActiveSweepstakes = () => {
  return sweepstakesData.filter((sweepstake) => sweepstake.status === "active")
}

export const getUpcomingSweepstakes = () => {
  return sweepstakesData.filter((sweepstake) => sweepstake.status === "upcoming")
}

export const getCompletedSweepstakes = () => {
  return getCompletedSweepstakesData()
}

export const getSweepstakeById = (id: string): Sweepstake | undefined => {
  // First check in the main sweepstakes data
  const sweepstake = sweepstakesData.find((sweepstake) => sweepstake.id === id)
  if (sweepstake) return sweepstake

  // If not found, check in completed sweepstakes
  return getCompletedSweepstakeById(id)
}
