"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'
import { useMutation } from '@tanstack/react-query'
import { optimizeTeamComposition } from '@/lib/api'
import { Loader2, Zap, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export function OptimizeButton() {
  const { 
    bannedHeroes, 
    yourTeam, 
    enemyHeroes, 
    config,
    heroes,
    setSolution, 
    isOptimizing, 
    setIsOptimizing 
  } = useAppStore()

  const mutation = useMutation({
    mutationFn: () => optimizeTeamComposition(config, bannedHeroes, yourTeam, enemyHeroes, heroes),
    onMutate: () => {
      setIsOptimizing(true)
      setSolution(null)
      toast.info('Running ACO algorithm...', {
        description: 'Finding optimal team composition',
      })
    },
    onSuccess: (data) => {
      setSolution(data)
      setIsOptimizing(false)
      toast.success('Optimization complete!', {
        description: `Found optimal team with score: ${data.best_score.toFixed(2)}`,
      })
      setTimeout(() => {
        const solutionElement = document.getElementById('solution-section')
        if (solutionElement) {
          solutionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    },
    onError: (error) => {
      console.error('Optimization failed:', error)
      setIsOptimizing(false)
      toast.error('Optimization failed', {
        description: error.message || 'An unexpected error occurred',
      })
    }
  })

  const handleOptimize = () => {
    if (!hasValidData) {
      toast.warning('Missing required heroes', {
        description: 'Please add at least one hero to your team or enemy team',
      })
      return
    }
    mutation.mutate()
  }

  const hasValidTeamHero = Object.values(yourTeam).some(id => id !== undefined && id !== -1)
  const hasValidEnemyHero = enemyHeroes.some(id => id !== -1)
  
  const hasValidData = hasValidTeamHero || hasValidEnemyHero

  const getButtonText = () => {
    if (!hasValidTeamHero && !hasValidEnemyHero) {
      return 'Add heroes to optimize'
    }
    return 'Optimize Team'
  }

  return (
    <div className="flex flex-col items-center gap-3 py-6">
      {!hasValidData && (
        <div className="flex items-center gap-2 text-xs text-[#8b949e] bg-[#161b22] px-4 py-2 rounded-md border border-[#30363d]">
          <AlertCircle className="h-4 w-4 text-[#f85149]" />
          <span>Add at least one teammate or enemy hero</span>
        </div>
      )}
      <div className="relative group">
        <Button
          onClick={handleOptimize}
          disabled={!hasValidData || isOptimizing}
          size="lg"
          className="bg-[#136F63] hover:bg-[#136F63]/90 text-[#F5FBEF] font-semibold px-10 py-6 rounded-md transition-all border border-[#136F63]/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOptimizing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Computing Solution
            </>
          ) : (
            <>
              <Zap className="mr-2 h-5 w-5" />
              {getButtonText()}
            </>
          )}
        </Button>
        {isOptimizing && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-[#8b949e] whitespace-nowrap">
            <span className="animate-pulse">Running {config.num_ants} ants × {config.num_iterations} iterations</span>
          </div>
        )}
      </div>
    </div>
  )
}