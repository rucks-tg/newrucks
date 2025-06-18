"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Sweepstake, UserEntry } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"
import { getMeshGradientStyle } from "@/utils/gradient"

interface SweepstakesEntryCardProps {
  sweepstake: Sweepstake
  userEntry: UserEntry
  isWon?: boolean
}

export function SweepstakesEntryCard({ sweepstake, userEntry, isWon = false }: SweepstakesEntryCardProps) {
  const { id, title, startDate, ticketCost, participants, status, image } = sweepstake
  const { entries } = userEntry

  // Generate a unique mesh gradient for this card
  const gradientStyle = useMemo(() => getMeshGradientStyle(), [])

  // Format date for display
  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const isHistory = status === "completed" && !isWon

  return (
    <Card className="ios-card overflow-hidden">
      <Link href={`/sweepstake/${id}`}>
        <CardContent className="p-0">
          <div className="flex items-start">
            {/* Increased height from 7rem to 8rem */}
            <div className="w-[7rem] h-[8rem] relative overflow-hidden rounded-l-2xl">
              <div className="absolute inset-0" style={gradientStyle}></div>
              <div className="relative h-full p-[0.625rem] flex items-center justify-center">
                <div className="w-full aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg?height=120&width=213"}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
              </div>

              {isWon && (
                <div className="absolute inset-0 bg-gradient-to-br from-ios-yellow/80 to-ios-orange/80 flex items-center justify-center z-[5] rounded-l-2xl">
                  <Trophy className="h-[2rem] w-[2rem] text-primary-foreground" />
                </div>
              )}
              {isHistory && (
                <div className="absolute inset-0 bg-ios-gray6/80 flex items-center justify-center z-[5] rounded-l-2xl">
                  <Badge className="bg-ios-gray3 text-ios-gray border-none rounded-full px-[0.625rem] py-[0.125rem] text-xs font-medium">
                    Ended
                  </Badge>
                </div>
              )}
              {status === "active" && (
                <Badge className="absolute top-[0.375rem] left-[0.375rem] bg-ios-green text-primary-foreground border-none rounded-full px-[0.625rem] py-[0.125rem] text-xs font-medium z-[5]">
                  Active
                </Badge>
              )}
            </div>

            <div className="flex-1 p-[0.75rem]">
              <h3 className="ios-subheading text-card-foreground line-clamp-1">{title}</h3>

              <div className="mt-[0.25rem] ios-small space-y-[0.375rem]">
                <div className="flex justify-between">
                  <span className="text-ios-gray">{status === "active" ? "Started" : "Completed"}</span>
                  <span className="text-card-foreground">{formattedStartDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ios-gray">Your Entries</span>
                  <span className="text-card-foreground">
                    {entries} ({entries * ticketCost} <span className="text-ios-yellow">★</span>)
                  </span>
                </div>

                {status === "active" && participants > 0 && (
                  <div className="mt-[0.5rem]">
                    <div className="flex justify-between text-xs mb-[0.25rem]">
                      <span className="text-ios-gray">Your odds</span>
                      <span className="text-card-foreground">{((entries / participants) * 100).toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-ios-gray5 h-[0.375rem] rounded-full">
                      <div
                        className="bg-ios-blue h-[0.375rem] rounded-full"
                        style={{ width: `${Math.min((entries / participants) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {isWon && (
                  <div className="mt-[0.25rem] flex items-center">
                    <Badge className="bg-gradient-to-r from-ios-yellow to-ios-orange text-primary-foreground border-none rounded-full px-[0.625rem] py-[0.125rem] text-xs font-medium">
                      Winner!
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
