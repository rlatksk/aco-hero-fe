"use client"

import React from 'react'
import { Plus, X, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TeamHeroPicker } from '@/components/ui/team-hero-picker'
import { useAppStore } from '@/store/app-store'
import { Badge } from '@/components/ui/badge'
import { Role, ROLE_LABELS, getHeroPortraitUrl } from '@/types/heroes'

interface TeamMember {
  heroId: number
  role: Role
}

export function TeamSections() {
  const { yourTeam, updateYourTeam, removeFromYourTeam, clearYourTeam, heroes, bannedHeroes, enemyHeroes } = useAppStore()
  const [pickerOpen, setPickerOpen] = React.useState(false)
  const [editingRole, setEditingRole] = React.useState<Role | null>(null)

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
    .filter(([, heroId]) => heroId !== undefined)
    .map(([role, heroId]) => ({
      heroId: heroId as number,
      role: role as Role
    }))

  const getUsedHeroes = (currentHeroId?: number) => {
    return new Set([
      ...bannedHeroes,
      ...Object.values(yourTeam).filter(id => id !== undefined && id !== currentHeroId),
      ...enemyHeroes.filter(id => id !== -1)
    ])
  }

  const getAvailableRoles = (currentRole?: Role) => {
    const usedRoles = new Set(
      Object.keys(yourTeam).filter(role => yourTeam[role as Role] !== undefined && role !== currentRole)
    )
    
    return roleOptions.filter(option => !usedRoles.has(option.value))
  }

  const handleAddTeamMember = () => {
    setPickerOpen(true)
    setEditingRole(null)
  }

  const handleEditTeamMember = (role: Role) => {
    setEditingRole(role)
    setPickerOpen(true)
  }

  const handlePickerValueChange = (heroIdStr: string, roleStr: string) => {
    const heroId = parseInt(heroIdStr)
    const role = roleStr as Role
    
    // If editing existing member, remove old entry
    if (editingRole) {
      updateYourTeam(editingRole, undefined)
    }
    
    // Add new entry
    updateYourTeam(role, heroId)
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
              {teamMembers.map((member) => {
                const hero = heroes.find(h => h.id === member.heroId)
                return (
                  <div key={member.role} className="flex items-center gap-2.5">
                    <div 
                      className="flex-1 flex items-center gap-3 p-3 rounded-lg border border-[#30363d] bg-[#161b22] hover:bg-[#1c2128] transition-colors cursor-pointer"
                      onClick={() => handleEditTeamMember(member.role)}
                    >
                      {hero && (
                        <img 
                          src={getHeroPortraitUrl(hero.id)}
                          alt={hero.name}
                          className="w-12 h-16 rounded object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{hero?.name || 'Select hero...'}</p>
                        <p className="text-xs text-[#8b949e]">{ROLE_LABELS[member.role]}</p>
                      </div>
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
                )
              })}
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

      <TeamHeroPicker
        options={heroOptions}
        usedHeroes={getUsedHeroes(editingRole ? yourTeam[editingRole] : undefined)}
        value={editingRole ? { heroId: yourTeam[editingRole]?.toString() || '', role: editingRole } : undefined}
        onValueChange={handlePickerValueChange}
        availableRoles={getAvailableRoles(editingRole || undefined)}
        open={pickerOpen}
        onOpenChange={setPickerOpen}
      />
    </div>
  )
}