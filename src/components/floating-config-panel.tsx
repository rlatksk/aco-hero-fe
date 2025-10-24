"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'
import { RotateCcw, Settings, X, Zap, Info } from 'lucide-react'

export function FloatingConfigPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const { config, updateConfig, resetConfig } = useAppStore()

  useEffect(() => {
    const hasSeenHint = localStorage.getItem('hasSeenConfigHint')
    if (hasSeenHint) {
      setShowHint(false)
    }
  }, [])

  const dismissHint = () => {
    setShowHint(false)
    localStorage.setItem('hasSeenConfigHint', 'true')
  }

  const handleInputChange = (key: keyof typeof config, value: number | boolean) => {
    updateConfig({ [key]: value })
  }

  const configFields = [
    {
      key: 'num_ants' as const,
      label: 'Number of Ants',
      type: 'number',
      min: 1,
      max: 100,
      step: 1,
      description: 'Number of ants in the colony',
      tooltip: 'More ants explore more solutions but take longer'
    },
    {
      key: 'num_iterations' as const,
      label: 'Iterations',
      type: 'number',
      min: 1,
      max: 200,
      step: 1,
      description: 'Number of optimization iterations',
      tooltip: 'More iterations improve solution quality'
    },
    {
      key: 'alpha' as const,
      label: 'Alpha (α)',
      type: 'number',
      min: 0.1,
      max: 5.0,
      step: 0.1,
      description: 'Pheromone importance factor',
      tooltip: 'Higher values favor previous good solutions'
    },
    {
      key: 'beta' as const,
      label: 'Beta (β)',
      type: 'number',
      min: 0.1,
      max: 5.0,
      step: 0.1,
      description: 'Heuristic importance factor',
      tooltip: 'Higher values favor greedy choices'
    },
    {
      key: 'evaporation_rate' as const,
      label: 'Evaporation Rate',
      type: 'number',
      min: 0.01,
      max: 1.0,
      step: 0.01,
      description: 'Pheromone evaporation rate',
      tooltip: 'Higher values forget old solutions faster'
    },
    {
      key: 'pheromone_deposit' as const,
      label: 'Pheromone Deposit',
      type: 'number',
      min: 0.1,
      max: 5.0,
      step: 0.1,
      description: 'Amount of pheromone deposited',
      tooltip: 'Higher values strengthen good solution paths'
    },
    {
      key: 'num_runs' as const,
      label: 'Number of Runs',
      type: 'number',
      min: 1,
      max: 50,
      step: 1,
      description: 'Number of optimization runs',
      tooltip: 'Run optimization multiple times and return best result'
    }
  ]

  return (
    <>
      {!isOpen && showHint && (
        <div className="fixed bottom-23 right-3.5 z-40 animate-pulse">
          <div className="bg-[#136F63] text-[#F5FBEF] px-3 py-2 rounded-lg shadow-lg text-xs flex items-center gap-2 relative">
            <Zap className="h-3 w-3" />
            <span>Customize ACO parameters</span>
            <button 
              onClick={dismissHint}
              className="ml-2 hover:bg-white/20 rounded p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#136F63]" />
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#136F63] hover:bg-[#136F63]/90 text-[#F5FBEF] p-4 rounded-full shadow-lg transition-all duration-200 z-40 flex items-center gap-2 border border-[#136F63]/50 group"
          aria-label="Open ACO Configuration"
        >
          <Settings className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div className="fixed top-1/2 right-6 -translate-y-1/2 z-50 w-96 max-h-[90vh] overflow-hidden">
          <Card className="shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-[#30363d]">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#58a6ff]" />
                ACO Config
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={resetConfig}
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1.5 h-8 text-xs"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[calc(90vh-80px)] overflow-y-auto pt-3">
              
              {configFields.map((field) => (
                <div key={field.key} className="space-y-1.5 group">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium flex items-center gap-1" htmlFor={field.key}>
                      {field.label}
                      <div className="relative inline-block">
                        <Info className="h-3 w-3 text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-[#161b22] text-[10px] text-[#8b949e] rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#30363d]">
                          {field.tooltip}
                        </span>
                      </div>
                    </label>
                    <span className="text-xs text-[#58a6ff] font-mono">
                      {config[field.key]}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <input
                      id={field.key}
                      type={field.type}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={config[field.key]}
                      onChange={(e) => handleInputChange(field.key, parseFloat(e.target.value))}
                      className="w-full h-7 px-2.5 rounded-md input-bg text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="text-[10px] text-[#8b949e]">
                      {field.description}
                    </p>
                  </div>
                </div>
              ))}
              
              <div className="space-y-1.5 pt-2 border-t border-[#30363d]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium" htmlFor="use_all_heroes">
                    Use All Heroes
                  </label>
                  <input
                    id="use_all_heroes"
                    type="checkbox"
                    checked={config.use_all_heroes}
                    onChange={(e) => handleInputChange('use_all_heroes', e.target.checked)}
                    className="h-4 w-4 rounded border-[#30363d] bg-[#0d1117] text-[#58a6ff] focus:ring-[#58a6ff] focus:ring-1"
                  />
                </div>
                <p className="text-[10px] text-[#8b949e]">
                  Include all available heroes in optimization
                </p>
              </div>

              {!config.use_all_heroes && (
                <div className="space-y-1.5 pt-2 border-t border-[#30363d]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium" htmlFor="max_heroes">
                      Max Heroes
                    </label>
                    <input
                      id="max_heroes"
                      type="number"
                      min="1"
                      max="126"
                      value={config.max_heroes || 50}
                      onChange={(e) => handleInputChange('max_heroes', parseInt(e.target.value) || 50)}
                      className="w-16 h-7 px-2.5 rounded-md input-bg text-xs transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-[#8b949e]">
                    First {config.max_heroes || 50} heroes by ID
                  </p>
                </div>
              )}

              <div className="pt-2 border-t border-[#30363d]">
                <p className="text-[10px] text-[#8b949e] text-center">
                  ACO metaheuristic parameters
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
