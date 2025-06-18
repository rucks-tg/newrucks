import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getUpcomingSweepstakes } from "@/data/sweepstakes"
import { getMeshGradientStyle } from "@/utils/gradient"

export default function UpcomingSweepstakesPage() {
  const upcomingSweepstakes = getUpcomingSweepstakes()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Centered header without back button */}
      <header className="sticky top-0 z-50 flex items-center justify-center p-4 bg-ios-gray6 border-b border-ios-gray5">
        <h1 className="ios-heading text-foreground">Upcoming Sweepstakes</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {upcomingSweepstakes.map((sweepstake) => (
            <UpcomingSweepstakesCard
              key={sweepstake.id}
              id={sweepstake.id}
              title={sweepstake.title}
              startDate={new Date(sweepstake.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              ticketCost={sweepstake.ticketCost}
              description={sweepstake.description}
              image={sweepstake.image}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

// Upcoming Sweepstakes Card Component
function UpcomingSweepstakesCard({ id, title, startDate, ticketCost, description, image }) {
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
          <Badge className="absolute top-[1rem] right-[1rem] bg-ios-indigo text-primary-foreground border-none rounded-full px-[0.625rem] py-[0.125rem] text-xs font-medium z-[5]">
            Upcoming
          </Badge>
        </div>
        <CardContent className="p-[0.75rem] space-y-[0.5rem]">
          <h3 className="font-medium text-card-foreground line-clamp-2">{title}</h3>
          {description && <p className="text-xs text-ios-gray line-clamp-2">{description}</p>}
          <div className="text-sm space-y-[0.5rem]">
            <div className="flex justify-between">
              <span className="text-ios-gray">Starts</span>
              <span className="text-card-foreground">{startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ios-gray">Entry</span>
              <span className="text-card-foreground">
                <span className="text-ios-yellow">{ticketCost} ★</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-[0.75rem] pt-0">
        <Link href={`/sweepstake/${id}`} className="w-full">
          <button
            type="button"
            className="w-full py-[0.5rem] bg-ios-gray5 text-ios-gray rounded-md text-sm font-medium"
            disabled
          >
            Coming Soon
          </button>
        </Link>
      </CardFooter>
    </Card>
  )
}
