"use client"

import React from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Combobox } from '@/components/ui/combobox'
import { useAppStore } from '@/store/app-store'
import { Badge } from '@/components/ui/badge'
import { getHeroPortraitUrl } from '@/types/heroes'

export function EnemyHeroesSection() {
  const { enemyHeroes, addEnemyHero, removeEnemyHero, updateEnemyHero, heroes, bannedHeroes, yourTeam } = useAppStore()

  const heroOptions = heroes.map(hero => ({
    value: hero.id.toString(),
    label: hero.name,
    imageUrl: getHeroPortraitUrl(hero.id)
  }))

  const getAvailableHeroes = (currentIndex: number) => {
    // Get all used heroes (banned + your team + other enemy slots, excluding current slot)
    const usedHeroes = new Set([
      ...bannedHeroes,
      ...Object.values(yourTeam).filter(id => id !== undefined),
      ...enemyHeroes.filter((_, index) => index !== currentIndex)
    ])
    
    return heroOptions.filter(option => !usedHeroes.has(parseInt(option.value)))
  }

  const handleAddEnemy = () => {
    addEnemyHero(-1) // Use -1 as placeholder for empty slot
  }

  const handleEnemyChange = (index: number, heroIdStr: string) => {
    if (heroIdStr === "" || heroIdStr === null || heroIdStr === undefined) {
      // If empty string, set to -1 (placeholder)
      updateEnemyHero(index, -1)
    } else {
      const heroId = parseInt(heroIdStr)
      updateEnemyHero(index, heroId)
    }
  }

  const handleRemoveEnemy = (index: number) => {
    const heroId = enemyHeroes[index]
    if (heroId !== undefined) {
      removeEnemyHero(heroId)
    }
  }

  return (
    <Card className="glass glass-hover border-white/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-white">Enemy Team ({enemyHeroes.length}/5)</CardTitle>
        <Button 
          onClick={handleAddEnemy}
          size="sm"
          className="bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/30 text-emerald-300 hover:text-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={enemyHeroes.length >= 5}
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        {enemyHeroes.length === 0 ? (
          <p className="text-gray-400 text-center py-6 text-sm">
            No enemy heroes selected
          </p>
        ) : (
          <div className="space-y-2.5">
            {enemyHeroes.map((heroId, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <div className="flex-1">
                  <Combobox
                    options={getAvailableHeroes(index)}
                    value={heroId === -1 ? '' : heroId.toString()}
                    onValueChange={(value) => handleEnemyChange(index, value)}
                    placeholder="Select enemy hero..."
                    emptyText="No heroes found."
                  />
                </div>
                <Button
                  onClick={() => handleRemoveEnemy(index)}
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-white/10 h-9 w-9 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        {enemyHeroes.length > 0 && enemyHeroes.some(id => id !== -1) && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-1.5">
              {enemyHeroes
                .filter(id => id !== -1)
                .map(heroId => {
                  const hero = heroes.find(h => h.id === heroId)
                  return hero ? (
                    <Badge key={heroId} className="text-xs bg-red-500/20 text-red-300 border-red-500/30">
                      {hero.name}
                    </Badge>
                  ) : null
                })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}