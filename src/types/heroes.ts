export interface Hero {
  id: number
  name: string
}

export enum HeroAttribute {
  STRENGTH = "strength",
  AGILITY = "agility",
  INTELLIGENCE = "intelligence",
  UNIVERSAL = "universal"
}

export const ATTRIBUTE_LABELS: Record<HeroAttribute, string> = {
  [HeroAttribute.STRENGTH]: "Strength",
  [HeroAttribute.AGILITY]: "Agility",
  [HeroAttribute.INTELLIGENCE]: "Intelligence",
  [HeroAttribute.UNIVERSAL]: "Universal"
}

export enum Role {
  CARRY = "carry",
  MIDLANE = "midlane", 
  OFFLANE = "offlane",
  SOFT_SUPPORT = "soft_support",
  HARD_SUPPORT = "hard_support"
}

export const ROLE_LABELS: Record<Role, string> = {
  [Role.CARRY]: "Carry",
  [Role.MIDLANE]: "Midlane",
  [Role.OFFLANE]: "Offlane", 
  [Role.SOFT_SUPPORT]: "Soft Support",
  [Role.HARD_SUPPORT]: "Hard Support"
}

export interface TeamComposition {
  [Role.CARRY]?: number
  [Role.MIDLANE]?: number
  [Role.OFFLANE]?: number
  [Role.SOFT_SUPPORT]?: number
  [Role.HARD_SUPPORT]?: number
}

export interface OptimizationConfig {
  num_ants: number
  num_iterations: number
  alpha: number
  beta: number
  evaporation_rate: number
  pheromone_deposit: number
  use_all_heroes: boolean
}

export interface Teammate {
  name: string
  position: number
}

export interface OptimizationRequest {
  config: OptimizationConfig
  enemies: string[]
  teammates: Teammate[]
}

export interface OptimizationResponse {
  best_solution: Record<string, number>
  best_score: number
  recommended_picks: Array<{
    hero_name: string
    position_name: string
    score: number
  }>
  performance: {
    execution_time_seconds: number
    solutions_explored: number
    search_space: number
    mode: string
  }
  team_breakdown: Array<{
    hero_name: string
    position_name: string
    total_score: number
    position_win_rate: number
    team_synergy: number
    internal_synergy: number
    counter_value: number
  }>
}

// Default configuration
export const DEFAULT_CONFIG: OptimizationConfig = {
  num_ants: 25,
  num_iterations: 40,
  alpha: 1.2,
  beta: 2.0,
  evaporation_rate: 0.12,
  pheromone_deposit: 1.2,
  use_all_heroes: true
}

// Role to position mapping
export const ROLE_TO_POSITION: Record<Role, number> = {
  [Role.CARRY]: 1,
  [Role.MIDLANE]: 2,
  [Role.OFFLANE]: 3,
  [Role.SOFT_SUPPORT]: 4,
  [Role.HARD_SUPPORT]: 5
}

// Helper function to get hero portrait URL
export const getHeroPortraitUrl = (heroId: number): string => {
  return `https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/${getHeroImageName(heroId)}.png`
}

// Helper function to get hero attribute
export const getHeroAttribute = (heroId: number): HeroAttribute => {
  // Strength Heroes (Red) - Manually add hero IDs here
  const strengthHeroes: number[] = [
    1,
    5,
    12,
    14,
    15,
    18,
    22,
    26,
    27,
    29,
    30,
    31,
    39,
    46,
    47,
    50,
    55,
    58,
    68,
    70,
    71,
    77,
    78,
    80,
    87,
    93,
    98,
    100,
    104,
    105,
    107,
    108,
    110,
    111,
    112,
    124,
  ]
  
  const agilityHeroes: number[] = [
    3,
    9,
    10,
    13,
    17,
    28,
    32,
    35,
    37,
    38,
    43,
    45,
    53,
    54,
    59,
    60,
    61,
    62,
    63,
    65,
    75,
    76,
    83,
    84,
    89,
    94,
    96,
    102,
    103,
    109,
    113,
    114,
    116,
    120
  ]
  
    const intelligenceHeroes: number[] = [
    2,
    16,
    19,
    20,
    21,
    25,
    33,
    36,
    40,
    42,
    44,
    48,
    49,
    51,
    52,
    64,
    67,
    72,
    73,
    79,
    81,
    82,
    85,
    86,
    88,
    90,
    91,
    92,
    99,
    106,
    119,
    122,
    123,
    125
  ]
  
  const universalHeroes: number[] = [
    0,
    4,
    6,
    7,
    8,
    11,
    23,
    24,
    34,
    41,
    56,
    57,
    66,
    69,
    74,
    95,
    97,
    101,
    115,
    117,
    118,
    121,
  ]
  
  if (strengthHeroes.includes(heroId)) return HeroAttribute.STRENGTH
  if (agilityHeroes.includes(heroId)) return HeroAttribute.AGILITY
  if (intelligenceHeroes.includes(heroId)) return HeroAttribute.INTELLIGENCE
  if (universalHeroes.includes(heroId)) return HeroAttribute.UNIVERSAL
  
  // Default to universal if not found
  return HeroAttribute.UNIVERSAL
}

const getHeroImageName = (heroId: number): string => {
  // This maps hero IDs to their Dota 2 image names
  // You might need to adjust this mapping based on your API's hero ID system
  const heroImageNames: Record<number, string> = {
    0: "abaddon",
    1: "alchemist", 
    2: "ancient_apparition",
    3: "antimage",
    4: "arc_warden",
    5: "axe",
    6: "bane",
    7: "batrider",
    8: "beastmaster",
    9: "bloodseeker",
    10: "bounty_hunter",
    11: "brewmaster",
    12: "bristleback",
    13: "broodmother",
    14: "centaur",
    15: "chaos_knight",
    16: "chen",
    17: "clinkz",
    18: "rattletrap",
    19: "crystal_maiden",
    20: "dark_seer",
    21: "dark_willow",
    22: "dawnbreaker",
    23: "dazzle",
    24: "death_prophet",
    25: "disruptor",
    26: "doom_bringer",
    27: "dragon_knight",
    28: "drow_ranger",
    29: "earth_spirit",
    30: "earthshaker",
    31: "elder_titan",
    32: "ember_spirit",
    33: "enchantress",
    34: "enigma",
    35: "faceless_void",
    36: "grimstroke",
    37: "gyrocopter",
    38: "hoodwink",
    39: "huskar",
    40: "invoker",
    41: "wisp",
    42: "jakiro",
    43: "juggernaut",
    44: "keeper_of_the_light",
    45: "kez",
    46: "kunkka",
    47: "legion_commander",
    48: "leshrac",
    49: "lich",
    50: "life_stealer",
    51: "lina",
    52: "lion",
    53: "lone_druid",
    54: "luna",
    55: "lycan",
    56: "magnataur",
    57: "marci",
    58: "mars",
    59: "medusa",
    60: "meepo",
    61: "mirana",
    62: "monkey_king",
    63: "morphling",
    64: "muerta",
    65: "naga_siren",
    66: "furion",
    67: "necrolyte",
    68: "night_stalker",
    69: "nyx_assassin",
    70: "ogre_magi",
    71: "omniknight",
    72: "oracle",
    73: "obsidian_destroyer",
    74: "pangolier",
    75: "phantom_assassin",
    76: "phantom_lancer",
    77: "phoenix",
    78: "primal_beast",
    79: "puck",
    80: "pudge",
    81: "pugna",
    82: "queenofpain",
    83: "razor",
    84: "riki",
    85: "ringmaster",
    86: "rubick",
    87: "sand_king",
    88: "shadow_demon",
    89: "nevermore",
    90: "shadow_shaman",
    91: "silencer",
    92: "skywrath_mage",
    93: "slardar",
    94: "slark",
    95: "snapfire",
    96: "sniper",
    97: "spectre",
    98: "spirit_breaker",
    99: "storm_spirit",
    100: "sven",
    101: "techies",
    102: "templar_assassin",
    103: "terrorblade",
    104: "tidehunter",
    105: "shredder",
    106: "tinker",
    107: "tiny",
    108: "treant",
    109: "troll_warlord",
    110: "tusk",
    111: "abyssal_underlord",
    112: "undying",
    113: "ursa",
    114: "vengefulspirit",
    115: "venomancer",
    116: "viper",
    117: "visage",
    118: "void_spirit",
    119: "warlock",
    120: "weaver",
    121: "windrunner",
    122: "winter_wyvern",
    123: "witch_doctor",
    124: "skeleton_king",
    125: "zuus"
  }
  
  return heroImageNames[heroId] || `hero_${heroId}`
}