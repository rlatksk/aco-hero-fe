"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'
import { RotateCcw, Settings, X } from 'lucide-react'

export function FloatingConfigPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { config, updateConfig, resetConfig } = useAppStore()

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
      description: 'Number of ants in the colony'
    },
    {
      key: 'num_iterations' as const,
      label: 'Iterations',
      type: 'number',
      min: 1,
      max: 200,
      step: 1,
      description: 'Number of optimization iterations'
    },
    {
      key: 'alpha' as const,
      label: 'Alpha (α)',
      type: 'number',
      min: 0.1,
      max: 5.0,
      step: 0.1,
      description: 'Pheromone importance factor'
    },
    {
      key: 'beta' as const,
      label: 'Beta (β)',
      type: 'number',
      min: 0.1,
      max: 5.0,
      step: 0.1,
      description: 'Heuristic importance factor'
    },
    {
      key: 'evaporation_rate' as const,
      label: 'Evaporation Rate',
      type: 'number',
      min: 0.01,
      max: 1.0,
      step: 0.01,
      description: 'Pheromone evaporation rate'
    },
    {
      key: 'pheromone_deposit' as const,
      label: 'Pheromone Deposit',
      type: 'number',
      min: 0.1,
      max: 5.0,
      step: 0.1,
      description: 'Amount of pheromone deposited'
    }
  ]

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#238636] hover:bg-[#2ea043] text-white p-4 rounded-full shadow-lg transition-all duration-200 z-40 flex items-center gap-2 border border-[#238636]/50"
          aria-label="Open ACO Configuration"
        >
          <Settings className="h-6 w-6" />
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
                <div key={field.key} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium" htmlFor={field.key}>
                      {field.label}
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
