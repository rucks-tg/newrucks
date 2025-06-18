"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Trophy, Ticket, Star } from "lucide-react"
import { SweepstakesEntryCard } from "@/components/cards/sweepstakes-entry-card"
import { userData, getUserActiveEntries, getUserWonEntries, getUserHistoryEntries } from "@/data/user"
import { getSweepstakeById } from "@/data/sweepstakes"
import { sweepstakesData } from "@/data/sweepstakes"
import { completedSweepstakesData } from "@/data/completed-sweepstakes"

export default function ProfilePage() {
  // Get all sweepstakes data
  const allSweepstakes = [...sweepstakesData, ...completedSweepstakesData]

  // Get user's sweepstakes entries
  const activeEntries = getUserActiveEntries(allSweepstakes)
  const wonEntries = getUserWonEntries(allSweepstakes)
  const historyEntries = getUserHistoryEntries(allSweepstakes)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Centered header without back button */}
      <header className="sticky top-0 z-50 flex items-center justify-center p-4 bg-ios-gray6 border-b border-ios-gray5">
        <h1 className="ios-heading text-foreground">Profile</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 space-y-6">
        {/* User Profile Section */}
        <Card className="ios-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-ios-blue">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback className="bg-ios-gray5 text-foreground text-2xl">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-ios-green rounded-full border-4 border-background"></div>
              </div>

              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">{userData.name}</h2>
                  {userData.isPremium && (
                    <Badge className="bg-gradient-to-r from-ios-yellow to-ios-orange text-primary-foreground border-none">
                      <Star className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-ios-gray">@{userData.username}</p>
                <p className="text-sm text-ios-gray">Member since {userData.memberSince}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 w-full max-w-sm">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Ticket className="w-4 h-4 text-ios-blue" />
                    <span className="text-xl font-bold text-foreground">{userData.tickets.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-ios-gray">Tickets</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="w-4 h-4 text-ios-yellow" />
                    <span className="text-xl font-bold text-foreground">{userData.wins.length}</span>
                  </div>
                  <p className="text-xs text-ios-gray">Wins</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="w-4 h-4 text-ios-purple" />
                    <span className="text-xl font-bold text-foreground">{userData.entries.length}</span>
                  </div>
                  <p className="text-xs text-ios-gray">Entries</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sweepstakes Tabs */}
        <Tabs defaultValue="participating" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="participating">Participating</TabsTrigger>
            <TabsTrigger value="won">Won</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="participating" className="space-y-4 pt-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Active Sweepstakes</h3>
              {activeEntries.length > 0 ? (
                <div className="space-y-3">
                  {activeEntries.map((entry) => {
                    const sweepstake = getSweepstakeById(entry.sweepstakeId)
                    if (!sweepstake) return null
                    return <SweepstakesEntryCard key={entry.sweepstakeId} sweepstake={sweepstake} userEntry={entry} />
                  })}
                </div>
              ) : (
                <Card className="ios-card">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-12 h-12 text-ios-gray mx-auto mb-3" />
                    <p className="text-ios-gray">You're not participating in any active sweepstakes</p>
                    <p className="text-sm text-ios-gray mt-1">Browse sweepstakes to start entering!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="won" className="space-y-4 pt-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Won Sweepstakes</h3>
              {wonEntries.length > 0 ? (
                <div className="space-y-3">
                  {wonEntries.map((entry) => {
                    const sweepstake = getSweepstakeById(entry.sweepstakeId)
                    if (!sweepstake) return null
                    return (
                      <SweepstakesEntryCard
                        key={entry.sweepstakeId}
                        sweepstake={sweepstake}
                        userEntry={entry}
                        isWon={true}
                      />
                    )
                  })}
                </div>
              ) : (
                <Card className="ios-card">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-12 h-12 text-ios-gray mx-auto mb-3" />
                    <p className="text-ios-gray">No wins yet</p>
                    <p className="text-sm text-ios-gray mt-1">Keep entering sweepstakes for your chance to win!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 pt-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Past Entries</h3>
              {historyEntries.length > 0 ? (
                <div className="space-y-3">
                  {historyEntries.map((entry) => {
                    const sweepstake = getSweepstakeById(entry.sweepstakeId)
                    if (!sweepstake) return null
                    return <SweepstakesEntryCard key={entry.sweepstakeId} sweepstake={sweepstake} userEntry={entry} />
                  })}
                </div>
              ) : (
                <Card className="ios-card">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-12 h-12 text-ios-gray mx-auto mb-3" />
                    <p className="text-ios-gray">No past entries</p>
                    <p className="text-sm text-ios-gray mt-1">Your completed sweepstakes will appear here</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
