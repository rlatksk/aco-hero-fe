"use client"

import React from 'react'
import { Plus, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HeroPicker } from '@/components/ui/hero-picker'
import { useAppStore } from '@/store/app-store'
import { Badge } from '@/components/ui/badge'
import { getHeroPortraitUrl } from '@/types/heroes'

export function EnemyHeroesSection() {
  const { enemyHeroes, addEnemyHero, removeEnemyHero, updateEnemyHero, clearEnemyTeam, heroes, bannedHeroes, yourTeam } = useAppStore()
  const [pickerOpen, setPickerOpen] = React.useState(false)
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null)

  const heroOptions = heroes.map(hero => ({
    value: hero.id.toString(),
    label: hero.name,
    imageUrl: getHeroPortraitUrl(hero.id)
  }))

  const getUsedHeroes = () => {
    // Get all used heroes (banned + your team + other enemy slots, excluding current editing slot)
    return new Set([
      ...bannedHeroes,
      ...Object.values(yourTeam).filter(id => id !== undefined),
      ...enemyHeroes.filter((id, index) => id !== -1 && (editingIndex === null || index !== editingIndex))
    ])
  }

  const handleAddEnemy = () => {
    setEditingIndex(null)
    setPickerOpen(true)
  }

  const handleEditEnemy = (index: number) => {
    setEditingIndex(index)
    setPickerOpen(true)
  }

  const handlePickerValueChange = (heroIdStr: string) => {
    const heroId = parseInt(heroIdStr)
    
    if (editingIndex !== null) {
      updateEnemyHero(editingIndex, heroId)
    } else {
      addEnemyHero(heroId)
    }
    setPickerOpen(false)
  }

  const handleRemoveEnemy = (index: number) => {
    removeEnemyHero(index)
  }

  const actualEnemyCount = enemyHeroes.filter(id => id !== -1).length

  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Enemy Team ({actualEnemyCount}/5)</CardTitle>
        <div className="flex items-center gap-2">
          {actualEnemyCount > 0 && (
            <Button 
              onClick={clearEnemyTeam}
              size="sm"
              variant="ghost"
              className="text-[#ff7b72] hover:text-[#ff7b72] hover:bg-[#ff7b72]/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          <Button 
            onClick={handleAddEnemy}
            size="sm"
            variant="secondary"
            disabled={actualEnemyCount >= 5}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="min-h-[200px]">
        {actualEnemyCount === 0 ? (
          <p className="text-[#8b949e] text-center py-6 text-sm">
            No enemy heroes selected
          </p>
        ) : (
          <div className="space-y-2.5">
            {enemyHeroes.filter(id => id !== -1).map((heroId, index) => {
              const hero = heroes.find(h => h.id === heroId)
              const actualIndex = enemyHeroes.indexOf(heroId)
              return (
                <div key={actualIndex} className="flex items-center gap-2.5">
                  <div 
                    className="flex-1 flex items-center gap-3 p-3 rounded-lg border border-[#30363d] bg-[#161b22] hover:bg-[#1c2128] transition-colors cursor-pointer"
                    onClick={() => handleEditEnemy(actualIndex)}
                  >
                    {hero && (
                      <img 
                        src={getHeroPortraitUrl(hero.id)}
                        alt={hero.name}
                        className="w-12 h-16 rounded object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{hero?.name || 'Unknown Hero'}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRemoveEnemy(actualIndex)}
                    size="sm"
                    variant="ghost"
                    className="h-9 w-9 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </div>
        )}
        
        {enemyHeroes.length > 0 && enemyHeroes.some(id => id !== -1) && (
          <div className="mt-4 pt-4 border-t border-[#30363d]">
            <div className="flex flex-wrap gap-1.5">
              {enemyHeroes
                .filter(id => id !== -1)
                .map(heroId => {
                  const hero = heroes.find(h => h.id === heroId)
                  return hero ? (
                    <Badge key={heroId} variant="destructive" className="text-xs">
                      {hero.name}
                    </Badge>
                  ) : null
                })}
            </div>
          </div>
        )}
      </CardContent>

      <HeroPicker
        options={heroOptions}
        usedHeroes={getUsedHeroes()}
        value={editingIndex !== null ? enemyHeroes[editingIndex]?.toString() : ''}
        onValueChange={handlePickerValueChange}
        open={pickerOpen}
        onOpenChange={setPickerOpen}
      />
    </Card>
  )
}