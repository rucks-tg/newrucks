"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Sweepstake } from "@/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getMeshGradientStyle } from "@/utils/gradient"

interface ActiveSweepstakesCardProps {
  sweepstake: Sweepstake
  className?: string
  variant?: "default" | "fullWidth"
}

export function ActiveSweepstakesCard({ sweepstake, className, variant = "default" }: ActiveSweepstakesCardProps) {
  const { id, title, startDate, ticketCost, participants, image } = sweepstake

  // Generate a unique mesh gradient for this card
  const gradientStyle = useMemo(() => getMeshGradientStyle(), [])

  // Format date for display
  const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Card
      className={cn(
        "ios-card overflow-hidden",
        variant === "default" ? "w-[17.5rem] flex-shrink-0" : "w-full",
        className,
      )}
    >
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
          <Badge className="absolute top-[1rem] right-[1rem] bg-ios-green text-primary-foreground border-none rounded-full px-[0.625rem] py-[0.125rem] text-xs font-medium z-[5]">
            Active
          </Badge>
        </div>
        <CardHeader className="p-[0.75rem]">
          <h3 className="ios-subheading text-card-foreground line-clamp-2">{title}</h3>
        </CardHeader>
        <CardContent className="p-[0.75rem] pt-0 ios-small space-y-[0.625rem]">
          <div className="flex justify-between">
            <span className="text-ios-gray">Started</span>
            <span className="text-card-foreground">{formattedStartDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ios-gray">Entry</span>
            <span className="text-card-foreground">
              <span className="text-ios-yellow">{ticketCost} ★</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-ios-gray">Participants</span>
            <span className="text-card-foreground">{participants}</span>
          </div>
          <div className="w-full bg-ios-gray5 h-[0.375rem] rounded-sm mt-[0.5rem]">
            <div
              className="bg-ios-blue h-[0.375rem] rounded-full"
              style={{ width: `${Math.min(participants / 100, 100)}%` }}
            ></div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-[0.75rem] pt-0">
        <Link href={`/sweepstake/${id}`} className="w-full">
          <button type="button" className="w-full ios-button-primary bg-ios-blue rounded-lg">
            Enter Sweepstakes
          </button>
        </Link>
      </CardFooter>
    </Card>
  )
}
