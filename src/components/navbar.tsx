"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Info } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#21262d] bg-[#0d1117]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0d1117]/80">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-foreground hover:text-[#58a6ff] transition-colors">
              <span className="text-[#58a6ff]">ACO</span> Hero Optimizer
            </Link>
          </div>
          
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-[#1f6feb]/10 text-[#58a6ff]'
                  : 'text-[#8b949e] hover:text-foreground hover:bg-[#21262d]'
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/about"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/about'
                  ? 'bg-[#1f6feb]/10 text-[#58a6ff]'
                  : 'text-[#8b949e] hover:text-foreground hover:bg-[#21262d]'
              }`}
            >
              <Info className="h-4 w-4" />
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
