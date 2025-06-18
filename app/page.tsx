import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Ticket } from "lucide-react"
import { ActiveSweepstakesCard } from "@/components/cards/active-sweepstakes-card"
import { SmallSweepstakesCard } from "@/components/cards/small-sweepstakes-card"
import { getActiveSweepstakes, getUpcomingSweepstakes } from "@/data/sweepstakes"
import { getCompletedSweepstakes } from "@/data/completed-sweepstakes"
import { userData } from "@/data/user"

export default function Home() {
  // Get data from our data source and limit to 3 cards per section
  const activeSweepstakes = getActiveSweepstakes().slice(0, 3)
  const upcomingSweepstakes = getUpcomingSweepstakes().slice(0, 3)
  const completedSweepstakes = getCompletedSweepstakes().slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Slim header with username and ticket balance */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-ios-gray6 border-b border-ios-gray5">
        <Link
          href="/profile"
          className="flex items-center gap-1 px-3 py-1 bg-ios-gray5 rounded-full hover:bg-ios-gray4 transition-colors"
        >
          <div className="relative">
            <Avatar className="h-4 w-4 border border-ios-gray4">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback className="bg-ios-gray5 text-foreground text-xs">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-ios-green rounded-full border border-background"></div>
          </div>
          <span className="text-sm font-medium text-foreground">{userData.name}</span>
        </Link>
        <Link
          href="/tickets"
          className="flex items-center gap-1 px-3 py-1 bg-ios-gray5 rounded-full hover:bg-ios-gray4 transition-colors"
        >
          <Ticket className="h-4 w-4 text-ios-blue" />
          <span className="text-sm font-medium text-foreground">{userData.tickets.toLocaleString()} tickets</span>
        </Link>
      </header>

      {/* Main content with three sections */}
      <main className="flex-1 p-4 space-y-6">
        {/* Active Sweepstakes Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="ios-heading text-foreground">Active Sweepstakes</h2>
            <Link href="/active" className="text-sm text-ios-blue">
              View All
            </Link>
          </div>

          <ScrollArea className="w-full pb-4">
            <div className="flex space-x-4">
              {activeSweepstakes.map((sweepstake) => (
                <ActiveSweepstakesCard key={sweepstake.id} sweepstake={sweepstake} variant="default" />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="bg-ios-gray5" />
          </ScrollArea>
        </section>

        {/* Upcoming Sweepstakes Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="ios-heading text-foreground">Upcoming Sweepstakes</h2>
            <Link href="/upcoming" className="text-sm text-ios-blue">
              View All
            </Link>
          </div>

          <ScrollArea className="w-full pb-4">
            <div className="flex space-x-3">
              {upcomingSweepstakes.map((sweepstake) => (
                <SmallSweepstakesCard key={sweepstake.id} sweepstake={sweepstake} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="bg-ios-gray5" />
          </ScrollArea>
        </section>

        {/* Completed Sweepstakes Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="ios-heading text-foreground">Completed Sweepstakes</h2>
            <Link href="/completed" className="text-sm text-ios-blue">
              View All
            </Link>
          </div>

          <ScrollArea className="w-full pb-4">
            <div className="flex space-x-3">
              {completedSweepstakes.map((sweepstake) => (
                <SmallSweepstakesCard key={sweepstake.id} sweepstake={sweepstake} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="bg-ios-gray5" />
          </ScrollArea>
        </section>
      </main>
    </div>
  )
}
