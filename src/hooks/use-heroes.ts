"use client"

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAppStore } from '@/store/app-store'
import { fetchHeroes } from '@/lib/api'

export function useHeroes() {
  const { setHeroes } = useAppStore()
  
  const query = useQuery({
    queryKey: ['heroes'],
    queryFn: fetchHeroes,
    staleTime: 1000 * 60 * 30, // 30 minutes
  })

  useEffect(() => {
    if (query.data) {
      setHeroes(query.data)
    }
  }, [query.data, setHeroes])

  return query
}