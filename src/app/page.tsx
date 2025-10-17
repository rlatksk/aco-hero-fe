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
        
        {/* Floating Clear All Button */}
        {hasData && (
          <div className="fixed bottom-6 left-6 z-50">
            <Button
              onClick={clearAll}
              size="lg"
              className="bg-[#ff7b72] hover:bg-[#ff8b82] text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full h-14 px-6"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Clear All
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
