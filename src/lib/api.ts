import { OptimizationResponse, Hero, TeamComposition, Role, ROLE_TO_POSITION, OptimizationConfig } from '@/types/heroes'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1'

export async function fetchHeroes(): Promise<Hero[]> {
  const response = await fetch(`${API_BASE_URL}/heroes`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch heroes: ${response.status}`)
  }
  
  return response.json()
}

export async function optimizeTeamComposition(
  config: OptimizationConfig,
  bannedHeroes: number[],
  yourTeam: TeamComposition,
  enemyHeroes: number[],
  heroes: Hero[]
): Promise<OptimizationResponse> {
  
  // Convert banned heroes to names
  const banned = bannedHeroes
    .filter(heroId => heroId !== -1)
    .map(heroId => heroes.find(h => h.id === heroId)?.name)
    .filter(Boolean) as string[]
  
  // Convert enemy heroes to names (only from enemyHeroes, not banned)
  const enemies = enemyHeroes
    .filter(heroId => heroId !== -1)
    .map(heroId => heroes.find(h => h.id === heroId)?.name)
    .filter(Boolean) as string[]
  
  // Convert your team to teammates array
  const teammates = Object.entries(yourTeam)
    .filter(([, heroId]) => heroId !== undefined)
    .map(([role, heroId]) => {
      const heroName = heroes.find(h => h.id === heroId!)?.name
      const position = ROLE_TO_POSITION[role as Role]
      return heroName ? { name: heroName, position } : null
    })
    .filter(Boolean) as { name: string; position: number }[]

  const request = {
    config,
    enemies,
    teammates,
    banned_heroes: banned
  }

  console.log('API Request:', JSON.stringify(request, null, 2));

  try {
    const response = await fetch(`${API_BASE_URL}/optimize`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      },
      body: JSON.stringify(request)
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error Response:', errorText);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      throw new Error(`Failed to optimize team composition: ${response.status} - ${errorText}`)
    }
    
    const result = await response.json()
    return result
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the optimization service. Please check CORS settings on the server.')
    }
    throw error
  }
}