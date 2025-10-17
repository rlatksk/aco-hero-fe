import { Hero } from "@/types/heroes"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1'

// Heroes will be loaded from API
export let HEROES: Hero[] = []

export const loadHeroes = async (): Promise<Hero[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/heroes`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const heroes: Hero[] = await response.json()
    HEROES = heroes
    return heroes
  } catch (error) {
    console.error('Failed to load heroes:', error)
    // Return empty array on error
    return []
  }
}

export const getHeroById = (id: number): Hero | undefined => {
  return HEROES.find(hero => hero.id === id)
}

export const getHeroByName = (name: string): Hero | undefined => {
  return HEROES.find(hero => hero.name === name)
}