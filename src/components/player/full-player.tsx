"use client"

import { useCallback, useRef, useState } from "react"
import { usePlayer } from "./player-provider"
import { Button } from "@/components/ui/button"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Moon,
} from "lucide-react"

function formatTime(seconds: number) {
  if (!seconds || !isFinite(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5] as const
const SLEEP_OPTIONS = [
  { label: "15 דק׳", minutes: 15 },
  { label: "30 דק׳", minutes: 30 },
  { label: "45 דק׳", minutes: 45 },
  { label: "סוף הסיפור", minutes: -1 },
] as const

export function FullPlayer() {
  const {
    currentStory,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    pause,
    resume,
    seek,
    setRate,
    skipForward,
    skipBack,
  } = usePlayer()

  const [sleepTimer, setSleepTimer] = useState<number | null>(null)
  const sleepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = progressBarRef.current
      if (!bar || !duration) return
      const rect = bar.getBoundingClientRect()
      // RTL: clicking on the right side = beginning, left side = end
      const clickX = e.clientX - rect.left
      const ratio = clickX / rect.width
      // In RTL the visual direction is flipped, but we use direction: rtl
      // so CSS handles it. We calculate based on LTR click position.
      seek(ratio * duration)
    },
    [duration, seek]
  )

  const handleSleepTimer = useCallback(
    (minutes: number) => {
      // Clear existing timer
      if (sleepTimeoutRef.current) {
        clearTimeout(sleepTimeoutRef.current)
        sleepTimeoutRef.current = null
      }

      if (sleepTimer === minutes) {
        // Toggle off
        setSleepTimer(null)
        return
      }

      setSleepTimer(minutes)

      if (minutes === -1) {
        // "End of story" — no timeout, player will naturally stop
        return
      }

      sleepTimeoutRef.current = setTimeout(() => {
        pause()
        setSleepTimer(null)
        console.log(`[FullPlayer] Sleep timer fired after ${minutes} minutes`)
      }, minutes * 60 * 1000)
    },
    [sleepTimer, pause]
  )

  if (!currentStory) {
    return (
      <div className="flex items-center justify-center h-96 text-muted-foreground">
        <p>בחרו סיפור כדי להתחיל להאזין</p>
      </div>
    )
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="relative flex flex-col items-center justify-center gap-8 p-6 min-h-[600px] overflow-hidden rounded-2xl">
      {/* Blurred background */}
      <div
        className="absolute inset-0 -z-10 scale-110 blur-3xl opacity-30"
        style={{
          backgroundImage: `url(${currentStory.coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-background/70" />

      {/* Cover art */}
      <img
        src={currentStory.coverImage}
        alt={currentStory.title}
        className="size-52 rounded-2xl object-cover shadow-2xl"
      />

      {/* Title & narrator */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold">{currentStory.title}</h2>
        {currentStory.narrator && (
          <p className="text-muted-foreground">{currentStory.narrator}</p>
        )}
      </div>

      {/* Seekable progress bar */}
      <div className="w-full max-w-sm space-y-2">
        <div
          ref={progressBarRef}
          className="relative h-2 w-full rounded-full bg-muted cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div
            className="absolute inset-y-0 start-0 rounded-full bg-amber-500 transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 size-4 rounded-full bg-amber-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ insetInlineStart: `calc(${progress}% - 8px)` }}
          />
        </div>

        {/* Time display */}
        <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => skipBack(15)}
          aria-label="15 שניות אחורה"
        >
          <SkipBack className="size-6" />
        </Button>

        <button
          onClick={isPlaying ? pause : resume}
          className="flex items-center justify-center size-16 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 transition-colors cursor-pointer"
          aria-label={isPlaying ? "השהה" : "נגן"}
        >
          {isPlaying ? (
            <Pause className="size-7" />
          ) : (
            <Play className="size-7 ms-0.5" />
          )}
        </button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => skipForward(15)}
          aria-label="15 שניות קדימה"
        >
          <SkipForward className="size-6" />
        </Button>
      </div>

      {/* Speed selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground me-1">מהירות</span>
        {SPEED_OPTIONS.map((speed) => (
          <button
            key={speed}
            onClick={() => setRate(speed)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              playbackRate === speed
                ? "bg-amber-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {speed}x
          </button>
        ))}
      </div>

      {/* Sleep timer */}
      <div className="flex items-center gap-2">
        <Moon className="size-4 text-muted-foreground me-1" />
        {SLEEP_OPTIONS.map((option) => (
          <button
            key={option.minutes}
            onClick={() => handleSleepTimer(option.minutes)}
            className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${
              sleepTimer === option.minutes
                ? "bg-indigo-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
