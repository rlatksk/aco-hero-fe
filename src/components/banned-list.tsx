"use client"

import React from 'react'
import { Plus, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HeroPicker } from '@/components/ui/hero-picker'
import { useAppStore } from '@/store/app-store'
import { Badge } from '@/components/ui/badge'
import { getHeroPortraitUrl } from '@/types/heroes'

export function BannedList() {
  const { bannedHeroes, updateBannedHero, addBannedHero, removeBannedHero, clearBannedHeroes, heroes, yourTeam, enemyHeroes } = useAppStore()
  const [pickerOpen, setPickerOpen] = React.useState(false)
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null)

  const heroOptions = heroes.map(hero => ({
    value: hero.id.toString(),
    label: hero.name,
    imageUrl: getHeroPortraitUrl(hero.id)
  }))

  const getUsedHeroes = () => {
    return new Set([
      ...bannedHeroes.filter(id => id !== -1 && (editingIndex === null || bannedHeroes[editingIndex] !== id)),
      ...Object.values(yourTeam).filter(id => id !== undefined),
      ...enemyHeroes.filter(id => id !== -1)
    ])
  }

  const handleAddBan = () => {
    setEditingIndex(null)
    setPickerOpen(true)
  }

  const handleEditBan = (index: number) => {
    setEditingIndex(index)
    setPickerOpen(true)
  }

  const handlePickerValueChange = (heroIdStr: string) => {
    const heroId = parseInt(heroIdStr)
    
    if (editingIndex !== null) {
      updateBannedHero(editingIndex, heroId)
    } else {
      addBannedHero(heroId)
    }
    setPickerOpen(false)
  }

  const handleRemoveBan = (index: number) => {
    removeBannedHero(index)
  }

  const actualBannedCount = bannedHeroes.filter(id => id !== -1).length

  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Banned Heroes ({actualBannedCount})</CardTitle>
        <div className="flex items-center gap-2">
          {actualBannedCount > 0 && (
            <Button 
              onClick={clearBannedHeroes}
              size="sm"
              variant="ghost"
              className="text-[#ff7b72] hover:text-[#ff7b72] hover:bg-[#ff7b72]/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          <Button 
            onClick={handleAddBan}
            size="sm"
            variant="secondary"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {actualBannedCount === 0 ? (
          <p className="text-[#8b949e] text-center py-6 text-sm">
            No banned heroes
          </p>
        ) : (
          <div className="space-y-2.5">
            {bannedHeroes.filter(id => id !== -1).map((heroId) => {
              const hero = heroes.find(h => h.id === heroId)
              const actualIndex = bannedHeroes.indexOf(heroId)
              return (
                <div key={actualIndex} className="flex items-center gap-2.5">
                  <div 
                    className="flex-1 flex items-center gap-3 p-3 rounded-lg border border-[#30363d] bg-[#161b22] hover:bg-[#1c2128] transition-colors cursor-pointer"
                    onClick={() => handleEditBan(actualIndex)}
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
                    onClick={() => handleRemoveBan(actualIndex)}
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
        
        {bannedHeroes.length > 0 && bannedHeroes.some(id => id !== -1) && (
          <div className="mt-4 pt-4 border-t border-[#30363d]">
            <div className="flex flex-wrap gap-1.5">
              {bannedHeroes
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
        value={editingIndex !== null ? bannedHeroes[editingIndex]?.toString() : ''}
        onValueChange={handlePickerValueChange}
        open={pickerOpen}
        onOpenChange={setPickerOpen}
      />
    </Card>
  )
}