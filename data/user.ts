import type { User } from "@/types"

export const userData: User = {
  id: "user123",
  name: "John Doe",
  username: "johndoe",
  avatar: "/placeholder.svg?height=128&width=128",
  memberSince: "April 2024",
  tickets: 1250,
  isPremium: true,
  entries: [
    {
      sweepstakeId: "sw1",
      entries: 5,
      entryDate: "2025-03-20",
    },
    {
      sweepstakeId: "sw2",
      entries: 12,
      entryDate: "2025-03-22",
    },
    {
      sweepstakeId: "sw3",
      entries: 20,
      entryDate: "2025-03-25",
    },
    {
      sweepstakeId: "sw10",
      entries: 8,
      entryDate: "2025-03-15",
    },
    {
      sweepstakeId: "sw11",
      entries: 15,
      entryDate: "2025-02-25",
    },
    {
      sweepstakeId: "sw12",
      entries: 10,
      entryDate: "2025-01-15",
    },
    {
      sweepstakeId: "sw13",
      entries: 3,
      entryDate: "2025-03-20",
    },
    {
      sweepstakeId: "sw14",
      entries: 7,
      entryDate: "2025-03-05",
    },
  ],
  wins: ["sw11", "sw12", "sw14"],
}

export const getUserEntries = () => {
  return userData.entries
}

export const getUserActiveEntries = (sweepstakes) => {
  const activeEntryIds = userData.entries
    .map((entry) => entry.sweepstakeId)
    .filter((id) => {
      const sweepstake = sweepstakes.find((s) => s.id === id)
      return sweepstake && sweepstake.status === "active"
    })

  return userData.entries.filter((entry) => activeEntryIds.includes(entry.sweepstakeId))
}

export const getUserWonEntries = (sweepstakes) => {
  return userData.entries.filter((entry) => userData.wins.includes(entry.sweepstakeId))
}

export const getUserHistoryEntries = (sweepstakes) => {
  const historyEntryIds = userData.entries
    .map((entry) => entry.sweepstakeId)
    .filter((id) => {
      const sweepstake = sweepstakes.find((s) => s.id === id)
      return sweepstake && sweepstake.status === "completed" && !userData.wins.includes(id)
    })

  return userData.entries.filter((entry) => historyEntryIds.includes(entry.sweepstakeId))
}
