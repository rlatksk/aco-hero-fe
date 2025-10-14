import { create } from 'zustand'
import { TeamComposition, OptimizationResponse, Hero, OptimizationConfig, DEFAULT_CONFIG } from '@/types/heroes'

interface AppState {
  // Heroes data
  heroes: Hero[]
  setHeroes: (heroes: Hero[]) => void
  
  // Banned heroes
  bannedHeroes: number[]
  addBannedHero: (heroId: number) => void
  removeBannedHero: (index: number) => void
  updateBannedHero: (index: number, heroId: number) => void
  
  // Team compositions
  yourTeam: TeamComposition
  enemyHeroes: number[]
  updateYourTeam: (role: keyof TeamComposition, heroId: number | undefined) => void
  removeFromYourTeam: (role: keyof TeamComposition) => void
  addEnemyHero: (heroId: number) => void
  removeEnemyHero: (index: number) => void
  updateEnemyHero: (index: number, heroId: number) => void
  
  // Configuration
  config: OptimizationConfig
  updateConfig: (config: Partial<OptimizationConfig>) => void
  resetConfig: () => void
  
  // Clear functions
  clearBannedHeroes: () => void
  clearYourTeam: () => void
  clearEnemyTeam: () => void
  clearAll: () => void
  
  // Solution/recommendations
  solution: OptimizationResponse | null
  setSolution: (solution: OptimizationResponse | null) => void
  
  // UI state
  isOptimizing: boolean
  setIsOptimizing: (isOptimizing: boolean) => void
  
  // Reset function
  reset: () => void
}

const initialState = {
  heroes: [],
  bannedHeroes: [],
  yourTeam: {},
  enemyHeroes: [],
  config: DEFAULT_CONFIG,
  solution: null,
  isOptimizing: false,
}

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  
  setHeroes: (heroes) => set({ heroes }),
  
  addBannedHero: (heroId: number) =>
    set((state) => ({
      bannedHeroes: [...state.bannedHeroes, heroId],
    })),
    
  removeBannedHero: (index: number) =>
    set((state) => ({
      bannedHeroes: state.bannedHeroes.filter((_, i) => i !== index),
    })),
    
  updateBannedHero: (index: number, heroId: number) =>
    set((state) => {
      const newBannedHeroes = [...state.bannedHeroes]
      newBannedHeroes[index] = heroId
      return { bannedHeroes: newBannedHeroes }
    }),
    
  updateYourTeam: (role, heroId) =>
    set((state) => ({
      yourTeam: {
        ...state.yourTeam,
        [role]: heroId !== undefined ? heroId : undefined,
      },
    })),
    
  removeFromYourTeam: (role) =>
    set((state) => {
      const newTeam = { ...state.yourTeam }
      delete newTeam[role]
      return { yourTeam: newTeam }
    }),
    
  addEnemyHero: (heroId: number) =>
    set((state) => ({
      enemyHeroes: [...state.enemyHeroes, heroId],
    })),
    
  removeEnemyHero: (index: number) =>
    set((state) => ({
      enemyHeroes: state.enemyHeroes.filter((_, i) => i !== index),
    })),
    
  updateEnemyHero: (index: number, heroId: number) =>
    set((state) => {
      const newEnemyHeroes = [...state.enemyHeroes]
      newEnemyHeroes[index] = heroId
      return { enemyHeroes: newEnemyHeroes }
    }),
    
  updateConfig: (newConfig) =>
    set((state) => ({
      config: { ...state.config, ...newConfig },
    })),
    
  resetConfig: () => set({ config: DEFAULT_CONFIG }),
    
  setSolution: (solution) => set({ solution }),
  
  setIsOptimizing: (isOptimizing) => set({ isOptimizing }),
  
  clearBannedHeroes: () => set({ bannedHeroes: [] }),
  
  clearYourTeam: () => set({ yourTeam: {} }),
  
  clearEnemyTeam: () => set({ enemyHeroes: [] }),
  
  clearAll: () => set({ 
    bannedHeroes: [], 
    yourTeam: {}, 
    enemyHeroes: [], 
    solution: null 
  }),
  
  reset: () => set(initialState),
}))