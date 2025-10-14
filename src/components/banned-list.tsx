"use client"

import React from 'react'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Combobox } from '@/components/ui/combobox'
import { useAppStore } from '@/store/app-store'
import { Badge } from '@/components/ui/badge'
import { getHeroPortraitUrl } from '@/types/heroes'

export function BannedList() {
  const { bannedHeroes, updateBannedHero, addBannedHero, removeBannedHero, heroes, yourTeam, enemyHeroes } = useAppStore()

  const heroOptions = heroes.map(hero => ({
    value: hero.id.toString(),
    label: hero.name,
    imageUrl: getHeroPortraitUrl(hero.id)
  }))

  const getAvailableHeroes = (currentIndex: number) => {
    const currentBannedHero = bannedHeroes[currentIndex]
    const usedHeroes = new Set([
      ...bannedHeroes.filter((_, index) => index !== currentIndex),
      ...Object.values(yourTeam).filter(id => id !== undefined),
      ...enemyHeroes.filter(id => id !== -1)
    ])
    return heroOptions.filter(option => !usedHeroes.has(parseInt(option.value)))
  }

  const handleAddBan = () => {
    addBannedHero(-1) // Use -1 as placeholder for empty slot
  }

  const handleBanChange = (index: number, heroIdStr: string) => {
    if (heroIdStr === "" || heroIdStr === null || heroIdStr === undefined) {
      // If empty string, set to -1 (placeholder)
      updateBannedHero(index, -1)
    } else {
      const heroId = parseInt(heroIdStr)
      updateBannedHero(index, heroId)
    }
  }

  const handleRemoveBan = (index: number) => {
    const heroId = bannedHeroes[index]
    if (heroId !== undefined) {
      removeBannedHero(heroId)
    }
  }

  return (
    <Card className="glass glass-hover border-white/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-white">Banned Heroes</CardTitle>
        <Button 
          onClick={handleAddBan}
          size="sm"
          className="bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/30 text-emerald-300 hover:text-emerald-200"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        {bannedHeroes.length === 0 ? (
          <p className="text-gray-400 text-center py-6 text-sm">
            No banned heroes
          </p>
        ) : (
          <div className="space-y-2.5">
            {bannedHeroes.map((heroId, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <div className="flex-1">
                  <Combobox
                    options={getAvailableHeroes(index)}
                    value={heroId === -1 ? '' : heroId.toString()}
                    onValueChange={(value) => handleBanChange(index, value)}
                    placeholder="Select hero to ban..."
                    emptyText="No heroes found."
                  />
                </div>
                <Button
                  onClick={() => handleRemoveBan(index)}
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
        
        {bannedHeroes.length > 0 && bannedHeroes.some(id => id !== -1) && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-1.5">
              {bannedHeroes
                .filter(id => id !== -1)
                .map(heroId => {
                  const hero = heroes.find(h => h.id === heroId)
                  return hero ? (
                    <Badge key={heroId} variant="destructive" className="text-xs bg-red-500/20 text-red-300 border-red-500/30">
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