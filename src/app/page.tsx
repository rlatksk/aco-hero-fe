"use client"

import { BannedList } from '@/components/banned-list'
import { TeamSections } from '@/components/team-sections'
import { EnemyHeroesSection } from '@/components/enemy-heroes-section'
import { OptimizeButton } from '@/components/optimize-button'
import { SolutionSection } from '@/components/solution-section'
import { FloatingConfigPanel } from '@/components/floating-config-panel'
import { useHeroes } from '@/hooks/use-heroes'
import { useAppStore } from '@/store/app-store'
import { Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  const { isLoading, error } = useHeroes()
  const { clearAll, bannedHeroes, yourTeam, enemyHeroes, solution } = useAppStore()
  
  // Check if there's any data to clear
  const hasData = bannedHeroes.length > 0 || 
                  Object.keys(yourTeam).length > 0 || 
                  enemyHeroes.length > 0 || 
                  solution !== null

  const handleClearAll = () => {
    clearAll()
    toast.success('Cleared all data', {
      description: 'All selections have been reset',
    })
  }

  if (isLoading) {
    return (
      <main className="min-h-screen p-4 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header Skeleton */}
          <header className="text-center py-8 mb-6">
            <Skeleton className="h-10 w-80 mx-auto mb-2" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </header>

          <div className="space-y-6">
            {/* Banned List Skeleton */}
            <div className="card-bg rounded-md p-4">
              <Skeleton className="h-6 w-32 mb-3" />
              <div className="flex flex-wrap gap-2">
                {[...Array(10)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-16" />
                ))}
              </div>
            </div>

            {/* Team Sections Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Your Team */}
              <div className="card-bg rounded-md p-4">
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-10 w-20" />
                      <Skeleton className="h-10 flex-1" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Enemy Team */}
              <div className="card-bg rounded-md p-4">
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-16" />
                  ))}
                </div>
              </div>
            </div>

            {/* Optimize Button Skeleton */}
            <div className="flex justify-center py-6">
              <Skeleton className="h-14 w-48" />
            </div>
          </div>

          {/* Footer Skeleton */}
          <footer className="mt-20 pt-6 border-t border-[#21262d] text-center">
            <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
          </footer>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center card-bg rounded-md p-8">
          <p className="text-lg text-[#ff7b72] mb-2">Failed to load heroes</p>
          <p className="text-sm text-[#8b949e]">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <header className="text-center py-8 mb-6">
          <h1 className="text-4xl font-bold text-foreground tracking-tight mb-2">
            Dota 2 <span className="text-[#58a6ff]">ACO</span> Optimizer
          </h1>
          <p className="text-sm text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
            0/1 Knapsack Problem solved using Ant Colony Optimization metaheuristic algorithm
          </p>
        </header>

        <div className="space-y-6">
          <BannedList />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TeamSections />
            <EnemyHeroesSection />
          </div>
          <OptimizeButton />
          <SolutionSection />
        </div>

        <footer className="mt-20 pt-6 border-t border-[#21262d] text-center">
          <p className="text-xs text-[#8b949e]">
            This project was developed as a final assessment demonstrating the application of 
            Ant Colony Optimization to solve the 0/1 Knapsack Problem in the context of Dota 2 hero selection.
          </p>
        </footer>

        <FloatingConfigPanel />

        {hasData && (
          <button
            onClick={handleClearAll}
            className="fixed bottom-6 left-6 bg-[#ff7b72] hover:bg-[#ff8b82] text-white p-4 rounded-full shadow-lg transition-all duration-200 z-40 flex items-center gap-2 border border-[#ff7b72]/50"
            aria-label="Clear all selections"
            title="Clear all selections"
          >
            <Trash2 className="h-6 w-6" />
          </button>
        )}
      </div>
    </main>
  )
}
