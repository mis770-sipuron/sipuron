"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export type Story = {
  id: string
  title: string
  slug: string
  description: string | null
  audio_url: string | null
  duration_seconds: number
  narrator: string
  age_min: number
  age_max: number
  is_premium: boolean
  cover_image_url: string | null
  sort_order: number
  status: string
  published_at: string | null
}

export function useStories() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("stories")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (data) setStories(data)
        setLoading(false)
      })
  }, [])

  return { stories, loading }
}
