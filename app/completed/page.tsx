import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCompletedSweepstakes } from "@/data/completed-sweepstakes"
import { getMeshGradientStyle } from "@/utils/gradient"

export default function CompletedSweepstakesPage() {
  const completedSweepstakes = getCompletedSweepstakes()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Centered header without back button */}
      <header className="sticky top-0 z-50 flex items-center justify-center p-4 bg-ios-gray6 border-b border-ios-gray5">
        <h1 className="ios-heading text-foreground">Completed Sweepstakes</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {completedSweepstakes.map((sweepstake) => (
            <CompletedSweepstakesCard
              key={sweepstake.id}
              id={sweepstake.id}
              title={sweepstake.title}
              completedDate={new Date(sweepstake.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              winner={sweepstake.winner?.name}
              winnerAvatar={sweepstake.winner?.avatar}
              participants={sweepstake.participants}
              prize={sweepstake.prizeValue}
              image={sweepstake.image}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

// Completed Sweepstakes Card Component
function CompletedSweepstakesCard({ id, title, completedDate, winner, winnerAvatar, participants, prize, image }) {
  // Generate a unique gradient for each card
  const gradientStyle = getMeshGradientStyle()

  return (
    <Card className="ios-card overflow-hidden">
      <Link href={`/sweepstake/${id}`} className="block">
        {/* Increased height from 11rem to 13rem */}
        <div className="h-[13rem] relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0" style={gradientStyle}></div>
          <div className="relative h-full p-[1.25rem]">
            <div className="w-full aspect-video rounded-xl overflow-hidden">
              <Image
                src={image || "/placeholder.svg?height=180&width=320"}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          </div>
          <Badge className="absolute top-[1rem] right-[1rem] bg-ios-gray3 text-ios-gray border-none rounded-full px-[0.625rem] py-[0.125rem] text-xs font-medium z-[5]">
            Ended
          </Badge>
        </div>
        <CardContent className="p-[0.75rem] space-y-[0.75rem]">
          <h3 className="font-medium text-card-foreground line-clamp-2">{title}</h3>

          <div className="flex items-center gap-[0.5rem] p-[0.5rem] bg-ios-gray5 rounded-lg">
            <Avatar className="h-[2rem] w-[2rem] border border-ios-gray4">
              <AvatarImage src={winnerAvatar || "/placeholder.svg?height=32&width=32"} alt={winner} />
              <AvatarFallback className="bg-ios-purple text-primary-foreground">
                {winner?.split(" ")[0]?.[0] || "?"}
                {winner?.split(" ")[1]?.[0] || ""}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-xs text-ios-gray">Winner</p>
              <p className="text-sm font-medium text-card-foreground">{winner}</p>
            </div>
          </div>

          <div className="text-sm space-y-[0.5rem]">
            <div className="flex justify-between">
              <span className="text-ios-gray">Completed</span>
              <span className="text-card-foreground">{completedDate}</span>
            </div>
            {participants && (
              <div className="flex justify-between">
                <span className="text-ios-gray">Participants</span>
                <span className="text-card-foreground">{participants.toLocaleString()}</span>
              </div>
            )}
            {prize && (
              <div className="flex justify-between">
                <span className="text-ios-gray">Prize Value</span>
                <span className="text-card-foreground">${prize.toLocaleString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-[0.75rem] pt-0">
        <Link href={`/sweepstake/${id}`} className="w-full">
          <button
            type="button"
            className="w-full py-[0.5rem] border border-ios-gray4 text-card-foreground rounded-md text-sm font-medium"
          >
            View Results
          </button>
        </Link>
      </CardFooter>
    </Card>
  )
}
