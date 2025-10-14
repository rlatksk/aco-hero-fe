"use client"

import { BannedList } from '@/components/banned-list'
import { TeamSections } from '@/components/team-sections'
import { EnemyHeroesSection } from '@/components/enemy-heroes-section'
import { OptimizeButton } from '@/components/optimize-button'
import { SolutionSection } from '@/components/solution-section'
import { FloatingConfigPanel } from '@/components/floating-config-panel'
import { useHeroes } from '@/hooks/use-heroes'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const { isLoading, error } = useHeroes()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-500" />
          <p className="text-sm text-gray-400">Loading heroes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass rounded-lg p-8">
          <p className="text-lg text-red-400 mb-2">Failed to load heroes</p>
          <p className="text-sm text-gray-400">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-4 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <header className="text-center py-12 mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Dota 2 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">ACO</span> Optimizer
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
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

        <footer className="mt-20 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500">
            Made by rlatksk
          </p>
        </footer>

        <FloatingConfigPanel />
      </div>
    </main>
  )
}
