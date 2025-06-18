"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Sweepstake } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMeshGradientStyle } from "@/utils/gradient"

interface SmallSweepstakesCardProps {
  sweepstake: Sweepstake
}

export function SmallSweepstakesCard({ sweepstake }: SmallSweepstakesCardProps) {
  const { id, title, startDate, ticketCost, status, winner, image } = sweepstake

  // Generate a unique mesh gradient for this card
  const gradientStyle = useMemo(() => getMeshGradientStyle(), [])

  // Format dates for display
  const formattedStartDate = startDate
    ? new Date(startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null

  // Format winner name to show first name and last initial
  const formatWinnerName = (name: string) => {
    const nameParts = name.split(" ")
    if (nameParts.length > 1) {
      return `${nameParts[0]} ${nameParts[1][0]}.`
    }
    return name
  }

  return (
    <Card className="w-[11.25rem] flex-shrink-0 ios-card overflow-hidden">
      <Link href={`/sweepstake/${id}`} className="block">
        {/* Increased height from 7rem to 8rem */}
        <div className="h-[8rem] relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0" style={gradientStyle}></div>
          <div className="relative h-full p-[1rem] flex items-center justify-center">
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg?height=120&width=213"}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 213px"
              />
            </div>
          </div>
          <Badge
            className={`absolute top-[0.75rem] right-[0.75rem] border-none rounded-full px-[0.625rem] py-[0.125rem] text-xs font-medium z-[5] ${
              status === "upcoming" ? "bg-ios-indigo text-primary-foreground" : "bg-ios-gray3 text-ios-gray"
            }`}
          >
            {status === "upcoming" ? "Upcoming" : "Ended"}
          </Badge>
        </div>
        <CardContent className="p-[0.75rem] ios-small space-y-[0.5rem]">
          <h3 className="ios-caption text-card-foreground line-clamp-1">{title}</h3>

          {status === "upcoming" && formattedStartDate && (
            <>
              <div className="flex justify-between">
                <span className="text-ios-gray">Starts</span>
                <span className="text-card-foreground">{formattedStartDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ios-gray">Entry</span>
                <span className="text-card-foreground">
                  <span className="text-ios-yellow">{ticketCost} ★</span>
                </span>
              </div>
            </>
          )}

          {status === "completed" && (
            <>
              <div className="flex justify-between">
                <span className="text-ios-gray">Completed</span>
                <span className="text-card-foreground">{formattedStartDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ios-gray">Winner</span>
                <span className="text-card-foreground font-medium">
                  {winner ? formatWinnerName(winner.name) : "TBA"}
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Link>
      <CardFooter className="p-[0.75rem] pt-0">
        <Link href={`/sweepstake/${id}`} className="w-full">
          {status === "upcoming" && (
            <button
              type="button"
              className="w-full py-[0.375rem] bg-ios-gray5 text-ios-gray rounded-md text-xs font-medium"
              disabled
            >
              Coming Soon
            </button>
          )}
          {status === "completed" && (
            <button
              type="button"
              className="w-full py-[0.375rem] border border-ios-gray4 text-card-foreground rounded-md text-xs font-medium"
            >
              View Results
            </button>
          )}
        </Link>
      </CardFooter>
    </Card>
  )
}
