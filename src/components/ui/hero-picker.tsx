"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { HeroAttribute, ATTRIBUTE_LABELS, getHeroAttribute } from "@/types/heroes"
import Image from "next/image"

export interface HeroOption {
  value: string
  label: string
  imageUrl?: string
}

interface HeroPickerProps {
  options: HeroOption[]
  usedHeroes?: Set<number>
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  triggerClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function HeroPicker({
  options,
  usedHeroes = new Set(),
  value,
  onValueChange,
  placeholder = "Select hero...",
  className,
  disabled = false,
  triggerClassName,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: HeroPickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const dialogRef = React.useRef<HTMLDivElement>(null)

  // Use controlled or internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = controlledOnOpenChange || setInternalOpen

  const selectedHero = options.find((option) => option.value === value)

  // Filter heroes based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options
    const query = searchQuery.toLowerCase()
    return options.filter(option => 
      option.label.toLowerCase().includes(query)
    )
  }, [options, searchQuery])

  // Group heroes by attribute
  const herosByAttribute = React.useMemo(() => {
    const groups: Record<HeroAttribute, typeof options> = {
      [HeroAttribute.STRENGTH]: [],
      [HeroAttribute.AGILITY]: [],
      [HeroAttribute.INTELLIGENCE]: [],
      [HeroAttribute.UNIVERSAL]: []
    }
    
    options.forEach(option => {
      const heroId = parseInt(option.value)
      const attribute = getHeroAttribute(heroId)
      groups[attribute].push(option)
    })
    
    return groups
  }, [options])

  // Define attribute order and icons
  const attributeConfig = [
    { 
      type: HeroAttribute.STRENGTH, 
      icon: '/Strength_attribute_symbol.webp',
      color: 'text-[#ff3838]'
    },
    { 
      type: HeroAttribute.AGILITY, 
      icon: '/Agility_attribute_symbol.webp',
      color: 'text-[#33ff33]'
    },
    { 
      type: HeroAttribute.INTELLIGENCE, 
      icon: '/Intelligence_attribute_symbol.webp',
      color: 'text-[#33aaff]'
    },
    { 
      type: HeroAttribute.UNIVERSAL, 
      icon: '/Universal_attribute_symbol.webp',
      color: 'text-[#e4ae39]'
    }
  ]

  // Handle keyboard input for search (invisible search)
  React.useEffect(() => {
    if (!open) {
      setSearchQuery("")
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle letter/number keys and backspace
      if (e.key.length === 1 && /[a-zA-Z0-9 ]/.test(e.key)) {
        e.preventDefault()
        setSearchQuery(prev => prev + e.key)
      } else if (e.key === 'Backspace') {
        e.preventDefault()
        setSearchQuery(prev => prev.slice(0, -1))
      } else if (e.key === 'Escape') {
        setSearchQuery("")
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  // Auto-reset search after 3 seconds of inactivity
  React.useEffect(() => {
    if (!searchQuery || !open) return

    const timer = setTimeout(() => {
      setSearchQuery("")
    }, 3000)

    return () => clearTimeout(timer)
  }, [searchQuery, open])

  const handleSelect = (optionValue: string) => {
    // Check if hero is available before selecting
    const heroIdNum = parseInt(optionValue)
    if (usedHeroes.has(heroIdNum)) {
      return // Don't select if hero is already used
    }
    onValueChange?.(optionValue)
    setOpen(false)
    setSearchQuery("")
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onValueChange?.("")
  }

  // Only render trigger if not controlled externally
  const isControlled = controlledOpen !== undefined

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", triggerClassName)}
            disabled={disabled}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {value ? (
                <>
                  {selectedHero?.imageUrl && (
                    <img 
                      src={selectedHero.imageUrl} 
                      alt={selectedHero.label}
                      className="w-6 h-6 rounded object-cover flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  <span className="truncate">
                    {selectedHero?.label}
                  </span>
                </>
              ) : (
                <span className="text-[#8b949e]">{placeholder}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {value && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleClear}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      onValueChange?.("")
                    }
                  }}
                  className="h-4 w-4 rounded-sm opacity-50 hover:opacity-100 hover:bg-muted flex items-center justify-center cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </div>
              )}
            </div>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className={cn("!max-w-[95vw] w-[95vw] h-[90vh] sm:!max-w-[90vw] sm:w-[90vw] sm:h-[85vh] lg:!max-w-[85vw] lg:w-[85vw] !p-0 overflow-hidden", className)}>
        <DialogHeader className="px-3 sm:px-6 pt-3 sm:pt-5 pb-2 sm:pb-3 border-b border-[#21262d] flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base sm:text-xl font-bold text-[#58a6ff]">
              Select Hero
            </DialogTitle>
          </div>
          <p className="hidden sm:block text-xs text-[#8b949e] mt-2">
            Start typing to search heroes
          </p>
        </DialogHeader>
        
        <div className="overflow-y-auto px-3 sm:px-6 py-3 sm:py-4 scrollbar-hide" style={{ height: 'calc(90vh - 100px)' }}>
          {filteredOptions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#8b949e]">No heroes found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {attributeConfig.map(({ type, icon, color }) => {
                const heroesInAttribute = herosByAttribute[type]
                if (heroesInAttribute.length === 0) return null
                
                return (
                  <div key={type}>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      <Image 
                        src={icon} 
                        alt={ATTRIBUTE_LABELS[type]}
                        width={14}
                        height={14}
                        className="flex-shrink-0 sm:w-[18px] sm:h-[18px]"
                      />
                      <h3 className={cn(
                        "text-[10px] sm:text-xs font-bold uppercase tracking-wider",
                        color
                      )}>
                        {ATTRIBUTE_LABELS[type]}
                      </h3>
                      <div className="flex-1 h-px bg-[#21262d]"></div>
                    </div>
                    <div className="grid grid-cols-4 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 2xl:grid-cols-16 gap-1.5 sm:gap-2">
                      {heroesInAttribute.map((option) => {
                        const isFiltered = !filteredOptions.some(filtered => filtered.value === option.value)
                        const isSelected = option.value === value
                        const isUsed = usedHeroes.has(parseInt(option.value))
                        
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            disabled={isUsed}
                            className={cn(
                              "group relative aspect-[3/4] rounded-md overflow-hidden transition-all duration-200",
                              "border-2",
                              !isUsed && "hover:scale-105 hover:z-10",
                              isSelected 
                                ? "border-[#58a6ff] ring-2 ring-[#58a6ff]/50 scale-105" 
                                : "border-transparent hover:border-[#8b949e]",
                              (isFiltered || isUsed) && "opacity-30 grayscale",
                              isUsed && "cursor-not-allowed"
                            )}
                          >
                    {option.imageUrl ? (
                      <>
                        <img
                          src={option.imageUrl}
                          alt={option.label}
                          className={cn(
                            "w-full h-full object-cover transition-all",
                            !isFiltered && "group-hover:brightness-110"
                          )}
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              const fallback = document.createElement('div')
                              fallback.className = 'w-full h-full flex items-center justify-center bg-[#161b22] text-xs text-center p-1'
                              fallback.textContent = option.label
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                        {/* Hero name tooltip */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[10px] font-medium text-white text-center leading-tight">
                            {option.label}
                          </p>
                        </div>
                        {/* Selected indicator */}
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-[#58a6ff] rounded-full flex items-center justify-center">
                            <svg 
                              className="w-3 h-3 text-white" 
                              fill="none" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#161b22] text-xs text-center p-1">
                        {option.label}
                      </div>
                    )}
                  </button>
                )
              })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
