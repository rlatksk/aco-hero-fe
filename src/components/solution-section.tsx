"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/app-store'
import { getHeroPortraitUrl } from '@/types/heroes'
import { CheckCircle, TrendingUp, Target } from 'lucide-react'

export function SolutionSection() {
  const { solution, isOptimizing, heroes } = useAppStore()

  // Define position order
  const positionOrder = ['Safelane', 'Midlane', 'Offlane', 'Soft Support', 'Hard Support']
  
  // Function to sort picks by position
  const sortByPosition = <T extends { position_name: string }>(items: T[]): T[] => {
    return [...items].sort((a, b) => {
      const indexA = positionOrder.indexOf(a.position_name)
      const indexB = positionOrder.indexOf(b.position_name)
      return indexA - indexB
    })
  }

  if (isOptimizing) {
    return (
      <Card className="glass border-emerald-500/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-500"></div>
            Computing Solution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-sm">
            Running ACO algorithm to find optimal composition...
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!solution) {
    return (
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-gray-400" />
            Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8 text-sm">
            Configure your team and click "Optimize" to generate recommendations
          </p>
        </CardContent>
      </Card>
    )
  }

  // Sort picks by position order
  const sortedRecommendedPicks = solution.recommended_picks ? sortByPosition(solution.recommended_picks) : []
  const sortedTeamBreakdown = solution.team_breakdown ? sortByPosition(solution.team_breakdown) : []

  return (
    <Card className="glass border-emerald-500/20">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-lg font-semibold flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <span>Optimal Composition</span>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-mono text-xs">
            {solution.best_score.toFixed(2)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 max-w-fit">
            {sortedRecommendedPicks.length > 0 ? (
              sortedRecommendedPicks.map((pick, index) => {
              const hero = heroes.find(h => h.name === pick.hero_name)
              
              return (
                <div key={index} className="glass glass-hover rounded-lg p-3 border-white/10">
                  <div className="text-center space-y-2">
                    <div className="text-[10px] font-medium text-emerald-400 uppercase tracking-wide">
                      {pick.position_name}
                    </div>
                    {hero ? (
                      <>
                        <div className="flex justify-center">
                          <img 
                            src={getHeroPortraitUrl(hero.id)} 
                            alt={hero.name}
                            className="w-16 h-16 rounded-lg object-cover border border-emerald-500/30 shadow-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-semibold text-white text-xs">
                            {hero.name}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono">
                            {pick.score.toFixed(2)}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-1">
                        <div className="font-semibold text-white text-xs">
                          {pick.hero_name}
                        </div>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {pick.score.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full text-center text-gray-400 text-sm">
              No recommendations
            </div>
          )}
          </div>
        </div>

        {sortedTeamBreakdown.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-start gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-2.5 text-white">Analysis</h4>
                <div className="space-y-2.5">
                  {sortedTeamBreakdown.map((contribution, index) => (
                    <div key={index} className="glass glass-hover p-3 rounded-lg border-white/10">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-medium text-white text-xs">{contribution.hero_name}</span>
                        <Badge className="text-[10px] bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                          {contribution.position_name}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="glass p-2 rounded">
                          <div className="text-gray-400 mb-0.5">Position WR</div>
                          <div className="text-white font-mono">{contribution.position_win_rate.toFixed(2)}</div>
                        </div>
                        <div className="glass p-2 rounded">
                          <div className="text-gray-400 mb-0.5">Team Synergy</div>
                          <div className="text-white font-mono">{contribution.team_synergy.toFixed(2)}</div>
                        </div>
                        <div className="glass p-2 rounded">
                          <div className="text-gray-400 mb-0.5">Internal Synergy</div>
                          <div className="text-white font-mono">{contribution.internal_synergy.toFixed(2)}</div>
                        </div>
                        <div className="glass p-2 rounded">
                          <div className="text-gray-400 mb-0.5">Counter Value</div>
                          <div className="text-white font-mono">{contribution.counter_value.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2.5 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-400">Total Score</span>
                          <span className="text-xs font-bold text-emerald-400 font-mono">
                            {contribution.total_score.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {solution.performance && (
          <div className="pt-4 border-t border-white/10">
            <h4 className="font-medium text-sm mb-2.5 text-white">Performance</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              <div className="glass glass-hover p-3 rounded-lg border-white/10">
                <div className="text-gray-400 text-[10px] mb-1">Execution Time</div>
                <div className="font-bold text-white text-sm font-mono">{solution.performance.execution_time_seconds.toFixed(3)}s</div>
              </div>
              <div className="glass glass-hover p-3 rounded-lg border-white/10">
                <div className="text-gray-400 text-[10px] mb-1">Solutions</div>
                <div className="font-bold text-white text-sm font-mono">{solution.performance.solutions_explored.toLocaleString()}</div>
              </div>
              <div className="glass glass-hover p-3 rounded-lg border-white/10">
                <div className="text-gray-400 text-[10px] mb-1">Search Space</div>
                <div className="font-bold text-white text-sm font-mono">{solution.performance.search_space.toLocaleString()}</div>
              </div>
              <div className="glass glass-hover p-3 rounded-lg border-white/10">
                <div className="text-gray-400 text-[10px] mb-1">Mode</div>
                <div className="font-medium text-white text-xs">{solution.performance.mode}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}