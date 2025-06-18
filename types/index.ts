export interface Sweepstake {
  id: string
  title: string
  description: string
  image: string
  startDate: string
  ticketCost: number
  participants: number
  status: "active" | "upcoming" | "completed"
  winner?: Winner
  prizeValue?: number
}

export interface Winner {
  name: string
  avatar?: string
  userId: string
}

export interface UserEntry {
  sweepstakeId: string
  entries: number
  entryDate: string
}

export interface User {
  id: string
  name: string
  username: string
  avatar: string
  memberSince: string
  tickets: number
  isPremium: boolean
  entries: UserEntry[]
  wins: string[] // Array of sweepstake IDs the user has won
}
