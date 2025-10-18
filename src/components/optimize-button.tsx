"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'
import { useMutation } from '@tanstack/react-query'
import { optimizeTeamComposition } from '@/lib/api'
import { Loader2, Zap } from 'lucide-react'
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

  return (
    <div className="flex justify-center py-6">
      <Button
        onClick={handleOptimize}
        disabled={!hasValidData || isOptimizing}
        size="lg"
        className="bg-[#136F63] hover:bg-[#136F63]/90 text-[#F5FBEF] font-semibold px-10 py-6 rounded-md transition-colors border border-[#136F63]/50"
      >
        {isOptimizing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Computing Solution
          </>
        ) : (
          <>
            <Zap className="mr-2 h-5 w-5" />
            Optimize Team
          </>
        )}
      </Button>
    </div>
  )
}