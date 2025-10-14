"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/app-store'
import { RotateCcw, Settings } from 'lucide-react'

export function ConfigurationPanel() {
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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5 text-[#8b949e]" />
          ACO Configuration
        </CardTitle>
        <Button
          onClick={resetConfig}
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {configFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" htmlFor={field.key}>
                {field.label}
              </label>
              <span className="text-sm text-muted-foreground">
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
                className="w-full h-8 px-3 rounded-md input-bg text-sm text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">
                {field.description}
              </p>
            </div>
          </div>
        ))}
        
        {/* Use All Heroes Toggle */}
        <div className="space-y-2 pt-2 border-t border-[#30363d]">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" htmlFor="use_all_heroes">
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
          <p className="text-xs text-[#8b949e]">
            Include all available heroes in optimization
          </p>
        </div>

        {/* Configuration Summary */}
        <div className="pt-4 border-t border-[#30363d]">
          <p className="text-xs text-[#8b949e] text-center">
            Ant Colony Optimization parameters for metaheuristic search
          </p>
        </div>
      </CardContent>
    </Card>
  )
}