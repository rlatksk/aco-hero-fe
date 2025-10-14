"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'
import { useMutation } from '@tanstack/react-query'
import { optimizeTeamComposition } from '@/lib/api'
import { Loader2, Zap } from 'lucide-react'

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
    },
    onSuccess: (data) => {
      setSolution(data)
      setIsOptimizing(false)
    },
    onError: (error) => {
      console.error('Optimization failed:', error)
      setIsOptimizing(false)
      // Show error message to user
      alert(`Optimization failed: ${error.message}`)
    }
  })

  const handleOptimize = () => {
    mutation.mutate()
  }

  const hasAnyData = bannedHeroes.some(id => id !== -1) || 
                    Object.values(yourTeam).some(id => id !== undefined) || 
                    enemyHeroes.some(id => id !== -1)

  return (
    <div className="flex justify-center py-6">
      <Button
        onClick={handleOptimize}
        disabled={!hasAnyData || isOptimizing}
        size="lg"
        className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold px-10 py-6 rounded-md transition-colors border border-[#238636]/50"
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