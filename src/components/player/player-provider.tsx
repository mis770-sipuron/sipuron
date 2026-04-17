"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

export interface Story {
  id: string
  title: string
  audioUrl: string
  coverImage: string
  duration: number
  narrator?: string
}

interface PlayerState {
  currentStory: Story | null
  isPlaying: boolean
  currentTime: number
  duration: number
  playbackRate: number
}

interface PlayerActions {
  play: (story: Story) => void
  pause: () => void
  resume: () => void
  seek: (time: number) => void
  setRate: (rate: number) => void
  skipForward: (seconds?: number) => void
  skipBack: (seconds?: number) => void
  close: () => void
}

type PlayerContextValue = PlayerState & PlayerActions

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const saveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio()
    audio.preload = "metadata"
    audioRef.current = audio

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onDurationChange = () => setDuration(audio.duration || 0)
    const onEnded = () => setIsPlaying(false)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("durationchange", onDurationChange)
    audio.addEventListener("ended", onEnded)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("durationchange", onDurationChange)
      audio.removeEventListener("ended", onEnded)
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
      audio.pause()
      audio.src = ""
    }
  }, [])

  // Auto-save progress every 10 seconds while playing
  useEffect(() => {
    if (isPlaying && currentStory) {
      saveIntervalRef.current = setInterval(() => {
        console.log(
          `[PlayerProvider] Saving progress: story=${currentStory.id}, time=${Math.floor(currentTime)}s`
        )
      }, 10_000)
    }
    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current)
        saveIntervalRef.current = null
      }
    }
  }, [isPlaying, currentStory, currentTime])

  const play = useCallback((story: Story) => {
    const audio = audioRef.current
    if (!audio) return

    const fallbackAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    const url = story.audioUrl || fallbackAudio

    // If same story, just resume
    setCurrentStory((prev) => {
      if (prev?.id === story.id) {
        audio.play()
        return prev
      }
      // New story
      audio.src = url
      audio.load()
      audio.play()
      setCurrentTime(0)
      setDuration(story.duration || 0)
      return { ...story, audioUrl: url }
    })
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const resume = useCallback(() => {
    audioRef.current?.play()
  }, [])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || 0))
  }, [])

  const setRate = useCallback((rate: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.playbackRate = rate
    setPlaybackRate(rate)
  }, [])

  const skipForward = useCallback((seconds = 15) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(audio.currentTime + seconds, audio.duration || 0)
  }, [])

  const skipBack = useCallback((seconds = 15) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(audio.currentTime - seconds, 0)
  }, [])

  const close = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.src = ""
    setCurrentStory(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        currentStory,
        isPlaying,
        currentTime,
        duration,
        playbackRate,
        play,
        pause,
        resume,
        seek,
        setRate,
        skipForward,
        skipBack,
        close,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return ctx
}
