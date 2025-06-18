import { ActiveSweepstakesCard } from "@/components/cards/active-sweepstakes-card"
import { getActiveSweepstakes } from "@/data/sweepstakes"

export default function ActiveSweepstakesPage() {
  const activeSweepstakes = getActiveSweepstakes()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Centered header without back button */}
      <header className="sticky top-0 z-50 flex items-center justify-center p-4 bg-ios-gray6 border-b border-ios-gray5">
        <h1 className="ios-heading text-foreground">Active Sweepstakes</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeSweepstakes.map((sweepstake) => (
            <ActiveSweepstakesCard key={sweepstake.id} sweepstake={sweepstake} variant="fullWidth" />
          ))}
        </div>
      </main>
    </div>
  )
}
