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

export default function Home() {
  const { isLoading, error } = useHeroes()
  const { clearAll, bannedHeroes, yourTeam, enemyHeroes, solution } = useAppStore()
  
  // Check if there's any data to clear
  const hasData = bannedHeroes.length > 0 || 
                  Object.keys(yourTeam).length > 0 || 
                  enemyHeroes.length > 0 || 
                  solution !== null

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#58a6ff]" />
          <p className="text-sm text-[#8b949e]">Loading heroes...</p>
        </div>
      </div>
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
          <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
            Dota 2 <span className="text-[#58a6ff]">ACO</span> Optimizer
          </h1>
          <p className="text-sm text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
            0/1 Knapsack Problem solved using Ant Colony Optimization metaheuristic algorithm
          </p>
          {hasData && (
            <div className="mt-4">
              <Button
                onClick={clearAll}
                variant="outline"
                size="sm"
                className="text-[#ff7b72] border-[#ff7b72]/30 hover:bg-[#ff7b72]/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}
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
      </div>
    </main>
  )
}
