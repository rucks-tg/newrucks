"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar, Users, Trophy, Ticket, Share2, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EntryModal } from "@/components/ui/entry-modal"
import { getSweepstakeById } from "@/data/sweepstakes"
import { userData, getUserEntries } from "@/data/user"
import { getMeshGradientStyle } from "@/utils/gradient"
import { getTasksBySweepstakeId } from "@/data/tasks"

export default function SweepstakePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [ticketAmount, setTicketAmount] = useState(1)
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false)

  // Get sweepstake data
  const sweepstake = getSweepstakeById(params.id)

  // Get tasks for this sweepstake
  const tasks = getTasksBySweepstakeId(params.id)

  // Check if user has entries for this sweepstake
  const userEntries = getUserEntries()
  const userEntry = userEntries.find((entry) => entry.sweepstakeId === params.id)
  const hasEntries = !!userEntry

  if (!sweepstake) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl font-semibold mb-4">Sweepstake not found</h1>
        <Button onClick={() => router.push("/")} variant="outline">
          Return to Home
        </Button>
      </div>
    )
  }

  const { id, title, description, image, startDate, ticketCost, participants, status, winner, prizeValue } = sweepstake

  // Generate gradient style for the header
  const gradientStyle = getMeshGradientStyle()

  // Format dates
  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  // Calculate total cost
  const totalCost = ticketAmount * ticketCost

  // Handle entry submission
  const handleSubmitEntry = (amount: number) => {
    if (userData.tickets < amount * ticketCost) {
      alert("You don't have enough tickets for this entry")
      return
    }

    alert(`Entry submitted! You've entered with ${amount} entries (${amount * ticketCost} stars)`)
    router.refresh()
  }

  // Handle task start
  const handleStartTask = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Centered header without back button */}
      <header className="sticky top-0 z-50 flex items-center justify-center p-4 bg-ios-gray6 border-b border-ios-gray5">
        <h1 className="ios-heading text-foreground">Sweepstake Details</h1>
        <div className="absolute right-4">
          <button
            className="flex items-center justify-center w-[2rem] h-[2rem] rounded-full bg-ios-gray5"
            aria-label="Share"
          >
            <Share2 className="w-[1.25rem] h-[1.25rem]" />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section with image */}
        <div className="relative h-[15rem] w-full overflow-hidden" style={gradientStyle}>
          {/* Image overlay with 16:9 aspect ratio, properly contained */}
          <div className="absolute inset-0 p-4">
            <div className="w-full h-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg?height=320&width=568"}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 568px"
              />
            </div>
          </div>

          {/* Status badge */}
          <Badge
            className={`absolute top-[1rem] right-[1rem] border-none px-[0.75rem] py-[0.25rem] text-sm font-medium z-20 ${
              status === "active"
                ? "bg-ios-green text-primary-foreground"
                : status === "upcoming"
                  ? "bg-ios-indigo text-primary-foreground"
                  : "bg-ios-gray3 text-ios-gray"
            }`}
          >
            {status === "active" ? "Active" : status === "upcoming" ? "Upcoming" : "Completed"}
          </Badge>

          {/* Prize value */}
          {prizeValue && (
            <div className="absolute bottom-[1rem] right-[1rem] bg-black/70 text-white px-[0.75rem] py-[0.25rem] rounded-full text-sm font-medium z-20">
              Value: ${prizeValue.toLocaleString()}
            </div>
          )}
        </div>

        {/* Title and description */}
        <div className="p-4 space-y-3">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-ios-gray">{description}</p>

          {/* Key details */}
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-[1.25rem] h-[1.25rem] text-ios-blue" />
              <div>
                <p className="text-xs text-ios-gray">
                  {status === "active" ? "Started" : status === "upcoming" ? "Starts" : "Completed"}
                </p>
                <p className="text-sm font-medium">{formattedStartDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Ticket className="w-[1.25rem] h-[1.25rem] text-ios-yellow" />
              <div>
                <p className="text-xs text-ios-gray">Entry Cost</p>
                <p className="text-sm font-medium">
                  {ticketCost} <span className="text-ios-yellow">★</span> per entry
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-[1.25rem] h-[1.25rem] text-ios-purple" />
              <div>
                <p className="text-xs text-ios-gray">Participants</p>
                <p className="text-sm font-medium">{participants.toLocaleString()}</p>
              </div>
            </div>

            {userEntry && (
              <div className="flex items-center gap-2">
                <Trophy className="w-[1.25rem] h-[1.25rem] text-ios-green" />
                <div>
                  <p className="text-xs text-ios-gray">Your Entries</p>
                  <p className="text-sm font-medium">{userEntry.entries}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Tabs for different sections */}
          <Tabs defaultValue={status === "active" ? "tasks" : "details"} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={status === "active" ? "tasks" : "details"}>
                {status === "active" ? "Tasks" : "Details"}
              </TabsTrigger>
              <TabsTrigger value="rules">Rules</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-4 pt-4">
              {status === "active" && tasks.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Complete Tasks for Bonus Entries</h3>

                  {tasks.map((task) => (
                    <Card key={task.id} className="overflow-hidden">
                      <CardContent className="p-[0.75rem]">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-ios-gray mt-[0.25rem]">{task.description}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-[0.25rem] flex items-center gap-1"
                            onClick={() => handleStartTask(task.url)}
                          >
                            <span>Start</span>
                            <ExternalLink className="h-[0.75rem] w-[0.75rem]" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {status === "completed" && winner && (
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold text-center">Winner</h3>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-[4rem] w-[4rem] border-2 border-ios-yellow">
                        <AvatarImage src={winner.avatar || "/placeholder.svg?height=64&width=64"} alt={winner.name} />
                        <AvatarFallback className="bg-ios-purple text-primary-foreground text-xl">
                          {winner.name.split(" ")[0][0]}
                          {winner.name.split(" ")[1]?.[0] || ""}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="font-medium text-lg">{winner.name}</p>
                        <p className="text-ios-gray text-sm">Winner</p>
                      </div>
                    </div>

                    {userEntry && (
                      <div className="bg-ios-gray5 p-[0.75rem] rounded-lg mt-[0.75rem]">
                        <p className="text-center text-sm">
                          You entered this sweepstake with{" "}
                          <span className="font-medium">{userEntry.entries} entries</span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <h3 className="font-semibold">About this prize</h3>
                <p className="text-sm text-ios-gray">
                  {description}
                  {prizeValue && ` This prize is valued at $${prizeValue.toLocaleString()}.`}
                </p>

                <p className="text-sm text-ios-gray mt-4">
                  {status === "active"
                    ? `This sweepstake is currently active with ${participants.toLocaleString()} participants. Enter now for your chance to win!`
                    : status === "upcoming"
                      ? "This sweepstake is coming soon. Check back later to enter!"
                      : `This sweepstake has ended with ${participants.toLocaleString()} total entries.`}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <h3 className="font-semibold">About this prize</h3>
                <p className="text-sm text-ios-gray">
                  {description}
                  {prizeValue && ` This prize is valued at $${prizeValue.toLocaleString()}.`}
                </p>

                <p className="text-sm text-ios-gray mt-4">
                  {status === "upcoming"
                    ? "This sweepstake is coming soon. Check back later to enter!"
                    : `This sweepstake has ended with ${participants.toLocaleString()} total entries.`}
                </p>
              </div>

              {status === "completed" && winner && (
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold text-center">Winner</h3>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-[4rem] w-[4rem] border-2 border-ios-yellow">
                        <AvatarImage src={winner.avatar || "/placeholder.svg?height=64&width=64"} alt={winner.name} />
                        <AvatarFallback className="bg-ios-purple text-primary-foreground text-xl">
                          {winner.name.split(" ")[0][0]}
                          {winner.name.split(" ")[1]?.[0] || ""}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="font-medium text-lg">{winner.name}</p>
                        <p className="text-ios-gray text-sm">Winner</p>
                      </div>
                    </div>

                    {userEntry && (
                      <div className="bg-ios-gray5 p-[0.75rem] rounded-lg mt-[0.75rem]">
                        <p className="text-center text-sm">
                          You entered this sweepstake with{" "}
                          <span className="font-medium">{userEntry.entries} entries</span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="rules" className="space-y-4 pt-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Sweepstake Rules</h3>
                <ul className="text-sm text-ios-gray space-y-2 list-disc pl-[1.25rem]">
                  <li>No purchase necessary to enter or win.</li>
                  <li>Each ticket gives you one entry into the sweepstake.</li>
                  <li>Entries are final and cannot be refunded once submitted.</li>
                  <li>Winner will be selected randomly from all valid entries.</li>
                  <li>Winner will be notified via the email associated with their account.</li>
                  <li>Prize must be claimed within 30 days of notification.</li>
                  <li>Taxes and any additional fees are the responsibility of the winner.</li>
                  <li>Void where prohibited by law.</li>
                </ul>

                <p className="text-sm text-ios-gray mt-4">
                  By entering this sweepstake, you agree to these rules and our Terms of Service.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Entry form for active sweepstakes */}
      {status === "active" && (
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-ios-gray6 border-t border-ios-gray5">
          <div className="space-y-3">
            {hasEntries ? (
              <div className="flex flex-col gap-3">
                <div className="bg-ios-gray5 p-[0.75rem] rounded-lg">
                  <p className="text-center">
                    You have <span className="font-medium">{userEntry?.entries} entries</span> in this sweepstake
                  </p>
                </div>
                <Button
                  className="w-full ios-button-primary bg-ios-blue py-[0.875rem] text-base rounded-none"
                  onClick={() => setIsEntryModalOpen(true)}
                >
                  Add More Entries
                </Button>
              </div>
            ) : (
              <Button
                className="w-full ios-button-primary bg-ios-blue py-[0.875rem] text-base rounded-none"
                onClick={() => setIsEntryModalOpen(true)}
              >
                Enter Sweepstake
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Coming soon for upcoming sweepstakes */}
      {status === "upcoming" && (
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-ios-gray6 border-t border-ios-gray5">
          <Button className="w-full py-[0.875rem] text-base rounded-none" variant="secondary" disabled>
            Coming Soon
          </Button>
        </div>
      )}

      {/* Entry Modal */}
      <EntryModal
        isOpen={isEntryModalOpen}
        onClose={() => setIsEntryModalOpen(false)}
        onSubmit={handleSubmitEntry}
        initialAmount={ticketAmount}
        ticketCost={ticketCost}
        userTickets={userData.tickets}
      />
    </div>
  )
}
