"use client"

import React from 'react'
import { Plus, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Combobox } from '@/components/ui/combobox'
import { useAppStore } from '@/store/app-store'
import { Badge } from '@/components/ui/badge'
import { Role, ROLE_LABELS, getHeroPortraitUrl } from '@/types/heroes'

interface TeamMember {
  heroId: number
  role: Role
}

export function TeamSections() {
  const { yourTeam, updateYourTeam, removeFromYourTeam, clearYourTeam, heroes, bannedHeroes, enemyHeroes } = useAppStore()

  const heroOptions = heroes.map(hero => ({
    value: hero.id.toString(),
    label: hero.name,
    imageUrl: getHeroPortraitUrl(hero.id)
  }))

  const roleOptions = Object.values(Role).map(role => ({
    value: role,
    label: ROLE_LABELS[role]
  }))

  // Convert yourTeam object to array for easier rendering
  const teamMembers: TeamMember[] = Object.entries(yourTeam)
    .filter(([_, heroId]) => heroId !== undefined)
    .map(([role, heroId]) => ({
      heroId: heroId as number,
      role: role as Role
    }))

  const getAvailableHeroes = (currentHeroId?: number) => {
    const usedHeroes = new Set([
      ...bannedHeroes,
      ...Object.values(yourTeam).filter(id => id !== undefined && id !== currentHeroId),
      ...enemyHeroes.filter(id => id !== -1)
    ])
    
    return heroOptions.filter(option => !usedHeroes.has(parseInt(option.value)))
  }

  const getAvailableRoles = (currentRole?: Role) => {
    const usedRoles = new Set(
      Object.keys(yourTeam).filter(role => yourTeam[role as Role] !== undefined && role !== currentRole)
    )
    
    return roleOptions.filter(option => !usedRoles.has(option.value))
  }

  const handleAddTeamMember = () => {
    // Find first available role
    const usedRoles = new Set(Object.keys(yourTeam).filter(role => yourTeam[role as Role] !== undefined))
    const availableRole = Object.values(Role).find(role => !usedRoles.has(role))
    
    if (availableRole) {
      updateYourTeam(availableRole, -1) // Use -1 as placeholder
    }
  }

  const handleHeroChange = (oldRole: Role, newHeroIdStr: string) => {
    if (newHeroIdStr === "" || newHeroIdStr === null || newHeroIdStr === undefined) {
      // If empty string, set to -1 (placeholder)
      updateYourTeam(oldRole, -1)
    } else {
      const newHeroId = parseInt(newHeroIdStr)
      updateYourTeam(oldRole, newHeroId)
    }
  }

  const handleRoleChange = (oldRole: Role, newRole: string) => {
    const heroId = yourTeam[oldRole]
    if (heroId !== undefined) {
      // Remove from old role
      updateYourTeam(oldRole, undefined)
      // Add to new role
      updateYourTeam(newRole as Role, heroId)
    }
  }

  const handleRemove = (role: Role) => {
    removeFromYourTeam(role)
  }

  return (
    <div className="space-y-6">
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">
            Your Team ({teamMembers.length}/5)
          </CardTitle>
          <div className="flex items-center gap-2">
            {teamMembers.length > 0 && (
              <Button 
                onClick={clearYourTeam}
                size="sm"
                variant="ghost"
                className="text-[#ff7b72] hover:text-[#ff7b72] hover:bg-[#ff7b72]/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            <Button 
              onClick={handleAddTeamMember}
              size="sm"
              variant="secondary"
              disabled={teamMembers.length >= 5}
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="min-h-[200px]">
          {teamMembers.length === 0 ? (
            <p className="text-[#8b949e] text-center py-6 text-sm">
              No heroes selected
            </p>
          ) : (
            <div className="space-y-2.5">
              {teamMembers.map((member) => (
                <div key={member.role} className="flex items-center gap-2.5">
                  <div className="flex-1 grid grid-cols-2 gap-2.5">
                    <Combobox
                      options={getAvailableHeroes(member.heroId)}
                      value={member.heroId === -1 ? '' : member.heroId.toString()}
                      onValueChange={(value) => handleHeroChange(member.role, value)}
                      placeholder="Select hero..."
                      emptyText="No heroes found."
                    />
                    <Combobox
                      options={getAvailableRoles(member.role)}
                      value={member.role}
                      onValueChange={(value) => handleRoleChange(member.role, value)}
                      placeholder="Select role..."
                      emptyText="No roles available."
                    />
                  </div>
                  <Button
                    onClick={() => handleRemove(member.role)}
                    size="sm"
                    variant="ghost"
                    className="h-9 w-9 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {teamMembers.length > 0 && teamMembers.some(m => m.heroId !== -1) && (
            <div className="mt-4 pt-4 border-t border-[#30363d]">
              <div className="flex flex-wrap gap-1.5">
                {teamMembers
                  .filter(m => m.heroId !== -1)
                  .map(member => {
                    const hero = heroes.find(h => h.id === member.heroId)
                    return hero ? (
                      <Badge key={member.role} className="text-xs">
                        {hero.name} · {ROLE_LABELS[member.role]}
                      </Badge>
                    ) : null
                  })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}