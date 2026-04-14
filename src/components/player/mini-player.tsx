"use client"

import { usePlayer } from "./player-provider"
import { Button } from "@/components/ui/button"
import { Play, Pause, X } from "lucide-react"

function formatTime(seconds: number) {
  if (!seconds || !isFinite(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function MiniPlayer() {
  const {
    currentStory,
    isPlaying,
    currentTime,
    duration,
    pause,
    resume,
    close,
  } = usePlayer()

  if (!currentStory) return null

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 glass border-t border-border/50 animate-in slide-in-from-bottom duration-300"
    >
      {/* Thin progress line at top of mini player */}
      <div className="h-0.5 w-full bg-muted">
        <div
          className="h-full bg-amber-500 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-3 px-4 py-2 max-w-screen-xl mx-auto">
        {/* Cover art */}
        <button
          onClick={() => console.log("[MiniPlayer] Navigate to full player")}
          className="shrink-0 cursor-pointer"
        >
          <img
            src={currentStory.coverImage}
            alt={currentStory.title}
            className="size-12 rounded-lg object-cover shadow-sm"
          />
        </button>

        {/* Title */}
        <button
          onClick={() => console.log("[MiniPlayer] Navigate to full player")}
          className="flex-1 min-w-0 text-start cursor-pointer"
        >
          <p className="text-sm font-semibold truncate">
            {currentStory.title}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </button>

        {/* Play / Pause */}
        <Button
          variant="ghost"
          size="icon"
          onClick={isPlaying ? pause : resume}
          aria-label={isPlaying ? "השהה" : "נגן"}
        >
          {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
        </Button>

        {/* Close */}
        <Button
          variant="ghost"
          size="icon"
          onClick={close}
          aria-label="סגור נגן"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  )
}
