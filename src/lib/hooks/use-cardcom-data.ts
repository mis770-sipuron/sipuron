"use client"

import { useState, useEffect, useCallback } from "react"
import type { CardcomTransaction, CardcomFailedTransaction } from "@/lib/cardcom/types"

interface UseCardcomResult<T> {
  data: T[]
  loading: boolean
  error: string | null
  refetch: () => void
}

/**
 * Fetch Cardcom transactions for a date range.
 * Pass empty strings to skip fetching (e.g. when in mock mode).
 */
export function useCardcomTransactions(
  fromDate: string,
  toDate: string
): UseCardcomResult<CardcomTransaction> {
  const [data, setData] = useState<CardcomTransaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!fromDate || !toDate) return
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(
        `/api/cardcom/transactions?from=${fromDate}&to=${toDate}`,
        { headers: { authorization: "Bearer admin" } }
      )
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `HTTP ${res.status}`)
      }
      const json = await res.json()
      setData(json.Results ?? [])
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [fromDate, toDate])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

/**
 * Fetch Cardcom failed/special transactions for a date range.
 * Pass empty strings to skip fetching.
 */
export function useCardcomFailures(
  fromDate: string,
  toDate: string
): UseCardcomResult<CardcomFailedTransaction> {
  const [data, setData] = useState<CardcomFailedTransaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!fromDate || !toDate) return
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(
        `/api/cardcom/failures?from=${fromDate}&to=${toDate}`,
        { headers: { authorization: "Bearer admin" } }
      )
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `HTTP ${res.status}`)
      }
      const json = await res.json()
      setData(json.Results ?? [])
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [fromDate, toDate])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

/**
 * Trigger a manual Cardcom sync via the cron endpoint.
 */
export function useSyncCardcom() {
  const [syncing, setSyncing] = useState(false)
  const [result, setResult] = useState<{ synced: boolean; count?: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sync = useCallback(async () => {
    try {
      setSyncing(true)
      setError(null)
      const res = await fetch("/api/cron/sync-cardcom", {
        method: "POST",
        headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || "admin"}` },
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`)
      setResult(json)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error"
      setError(msg)
    } finally {
      setSyncing(false)
    }
  }, [])

  return { sync, syncing, result, error }
}
