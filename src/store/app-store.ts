import { create } from 'zustand'
import { TeamComposition, OptimizationResponse, Hero, OptimizationConfig, DEFAULT_CONFIG } from '@/types/heroes'

interface AppState {
  // Heroes data
  heroes: Hero[]
  setHeroes: (heroes: Hero[]) => void
  
  // Banned heroes
  bannedHeroes: number[]
  addBannedHero: (heroId: number) => void
  removeBannedHero: (heroId: number) => void
  updateBannedHero: (index: number, heroId: number) => void
  
  // Team compositions
  yourTeam: TeamComposition
  enemyHeroes: number[]
  updateYourTeam: (role: keyof TeamComposition, heroId: number | undefined) => void
  removeFromYourTeam: (role: keyof TeamComposition) => void
  addEnemyHero: (heroId: number) => void
  removeEnemyHero: (heroId: number) => void
  updateEnemyHero: (index: number, heroId: number) => void
  
  // Configuration
  config: OptimizationConfig
  updateConfig: (config: Partial<OptimizationConfig>) => void
  resetConfig: () => void
  
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
    
  removeBannedHero: (heroId: number) =>
    set((state) => ({
      bannedHeroes: state.bannedHeroes.filter((id) => id !== heroId),
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
    
  removeEnemyHero: (heroId: number) =>
    set((state) => ({
      enemyHeroes: state.enemyHeroes.filter((id) => id !== heroId),
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
  
  reset: () => set(initialState),
}))