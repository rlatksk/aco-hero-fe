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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#58a6ff]"></div>
            Computing Solution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#8b949e] text-sm">
            Running ACO algorithm to find optimal composition...
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!solution) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-[#8b949e]" />
            Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#8b949e] text-center py-8 text-sm">
            Configure your team and click &quot;Optimize&quot; to generate recommendations
          </p>
        </CardContent>
      </Card>
    )
  }

  // Sort picks by position order
  const sortedRecommendedPicks = solution.recommended_picks ? sortByPosition(solution.recommended_picks) : []
  const sortedTeamBreakdown = solution.team_breakdown ? sortByPosition(solution.team_breakdown) : []

  return (
    <Card id="solution-section">
      <CardHeader className="border-b border-[#30363d]">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-[#58a6ff]" />
            <span>Optimal Composition</span>
          </div>
          <Badge className="font-mono text-xs">
            {solution.best_score.toFixed(2)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap gap-3 justify-center max-w-5xl">
            {sortedRecommendedPicks.length > 0 ? (
              sortedRecommendedPicks.map((pick, index) => {
              const hero = heroes.find(h => h.name === pick.hero_name)
              
              return (
                <div key={index} className="card-bg card-hover rounded-md p-3">
                  <div className="text-center space-y-2">
                    <div className="text-[10px] font-medium text-[#58a6ff] uppercase tracking-wide">
                      {pick.position_name}
                    </div>
                    {hero ? (
                      <>
                        <div className="flex justify-center">
                          <img 
                            src={getHeroPortraitUrl(hero.id)} 
                            alt={hero.name}
                            loading="lazy"
                            className="w-16 h-16 rounded-md object-cover border border-[#30363d]"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                        <div className="space-y-0.5">
                          <div className="font-semibold text-foreground text-xs">
                            {hero.name}
                          </div>
                          <div className="text-[10px] text-[#8b949e] font-mono">
                            {pick.score.toFixed(2)}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-1">
                        <div className="font-semibold text-foreground text-xs">
                          {pick.hero_name}
                        </div>
                        <div className="text-[10px] text-[#8b949e] font-mono">
                          {pick.score.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full text-center text-[#8b949e] text-sm">
              No recommendations
            </div>
          )}
          </div>
        </div>

        {sortedTeamBreakdown.length > 0 && (
          <div className="pt-4 border-t border-[#30363d]">
            <div className="flex items-start gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-[#58a6ff] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-2.5">Analysis</h4>
                <div className="space-y-2.5">
                  {sortedTeamBreakdown.map((contribution, index) => (
                    <div key={index} className="card-bg card-hover p-3 rounded-md">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-medium text-xs">{contribution.hero_name}</span>
                        <Badge className="text-[10px]">
                          {contribution.position_name}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="bg-[#0d1117] border border-[#30363d] p-2 rounded-md">
                          <div className="text-[#8b949e] mb-0.5">Position WR</div>
                          <div className="text-foreground font-mono">{contribution.position_win_rate.toFixed(2)}</div>
                        </div>
                        <div className="bg-[#0d1117] border border-[#30363d] p-2 rounded-md">
                          <div className="text-[#8b949e] mb-0.5">Team Synergy</div>
                          <div className="text-foreground font-mono">{contribution.team_synergy.toFixed(2)}</div>
                        </div>
                        <div className="bg-[#0d1117] border border-[#30363d] p-2 rounded-md">
                          <div className="text-[#8b949e] mb-0.5">Internal Synergy</div>
                          <div className="text-foreground font-mono">{contribution.internal_synergy.toFixed(2)}</div>
                        </div>
                        <div className="bg-[#0d1117] border border-[#30363d] p-2 rounded-md">
                          <div className="text-[#8b949e] mb-0.5">Counter Value</div>
                          <div className="text-foreground font-mono">{contribution.counter_value.toFixed(2)}</div>
                        </div>
                      </div>
                      <div className="mt-2.5 pt-2.5 border-t border-[#30363d]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#8b949e]">Total Score</span>
                          <span className="text-xs font-bold text-[#58a6ff] font-mono">
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
          <div className="pt-4 border-t border-[#30363d]">
            <h4 className="font-medium text-sm mb-2.5">Performance</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
              <div className="card-bg card-hover p-3 rounded-md">
                <div className="text-[#8b949e] text-[10px] mb-1">Execution Time</div>
                <div className="font-bold text-sm font-mono">{solution.performance.execution_time_seconds.toFixed(3)}s</div>
              </div>
              <div className="card-bg card-hover p-3 rounded-md">
                <div className="text-[#8b949e] text-[10px] mb-1">Solutions</div>
                <div className="font-bold text-sm font-mono">{solution.performance.solutions_explored.toLocaleString()}</div>
              </div>
              <div className="card-bg card-hover p-3 rounded-md">
                <div className="text-[#8b949e] text-[10px] mb-1">Search Space</div>
                <div className="font-bold text-sm font-mono">{solution.performance.search_space.toLocaleString()}</div>
              </div>
              <div className="card-bg card-hover p-3 rounded-md">
                <div className="text-[#8b949e] text-[10px] mb-1">Total Runs</div>
                <div className="font-bold text-sm font-mono">{solution.performance.total_runs}</div>
              </div>
              <div className="card-bg card-hover p-3 rounded-md">
                <div className="text-[#8b949e] text-[10px] mb-1">Mode</div>
                <div className="font-medium text-xs">{solution.performance.mode}</div>
              </div>
            </div>
          </div>
        )}

        {solution.performance && (
          <>
            <div className="pt-4 border-t border-[#30363d]">
              <h4 className="font-medium text-sm mb-2.5">Performance</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
                <div className="card-bg card-hover p-3 rounded-md">
                  <div className="text-[#8b949e] text-[10px] mb-1">Execution Time</div>
                  <div className="font-bold text-sm font-mono">{solution.performance.execution_time_seconds.toFixed(3)}s</div>
                </div>
                <div className="card-bg card-hover p-3 rounded-md">
                  <div className="text-[#8b949e] text-[10px] mb-1">Solutions</div>
                  <div className="font-bold text-sm font-mono">{solution.performance.solutions_explored.toLocaleString()}</div>
                </div>
                <div className="card-bg card-hover p-3 rounded-md">
                  <div className="text-[#8b949e] text-[10px] mb-1">Search Space</div>
                  <div className="font-bold text-sm font-mono">{solution.performance.search_space.toLocaleString()}</div>
                </div>
                <div className="card-bg card-hover p-3 rounded-md">
                  <div className="text-[#8b949e] text-[10px] mb-1">Total Runs</div>
                  <div className="font-bold text-sm font-mono">{solution.performance.total_runs}</div>
                </div>
                <div className="card-bg card-hover p-3 rounded-md">
                  <div className="text-[#8b949e] text-[10px] mb-1">Mode</div>
                  <div className="font-medium text-xs">{solution.performance.mode}</div>
                </div>
              </div>
            </div>

            {solution.performance.run_scores && solution.performance.run_scores.length > 0 && (
              <div className="pt-4 border-t border-[#30363d]">
                <h4 className="font-medium text-sm mb-2.5">Run Scores</h4>
                <div className="flex flex-wrap gap-2">
                  {solution.performance.run_scores.map((score, index) => (
                    <div 
                      key={index} 
                      className={`card-bg px-3 py-2 rounded-md ${
                        score === solution.best_score 
                          ? 'ring-2 ring-[#58a6ff] bg-[#58a6ff]/10' 
                          : 'card-hover'
                      }`}
                    >
                      <div className="text-[#8b949e] text-[10px] mb-0.5">Run {index + 1}</div>
                      <div className="font-bold text-xs font-mono text-foreground">
                        {score.toFixed(4)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}