"use client"

import { usePlayer } from "@/components/player/player-provider"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

interface Props {
  storyId: string
  title: string
  audioUrl: string
  coverImage: string
  duration: number
}

export function PlayButton({ storyId, title, audioUrl, coverImage, duration }: Props) {
  const { play, pause, currentStory, isPlaying } = usePlayer()
  const isThisPlaying = isPlaying && currentStory?.id === storyId

  const handleClick = () => {
    if (isThisPlaying) {
      pause()
    } else {
      play({ id: storyId, title, audioUrl, coverImage, duration })
    }
  }

  return (
    <>
      {/* hero play circle */}
      <button
        onClick={handleClick}
        className="size-20 sm:size-24 rounded-full bg-amber-500/90 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
      >
        {isThisPlaying ? (
          <Pause className="size-10 sm:size-12 text-white fill-white" />
        ) : (
          <Play className="size-10 sm:size-12 text-white fill-white ms-1" />
        )}
      </button>
    </>
  )
}

export function PlayButtonCta({ storyId, title, audioUrl, coverImage, duration }: Props) {
  const { play, pause, currentStory, isPlaying } = usePlayer()
  const isThisPlaying = isPlaying && currentStory?.id === storyId

  return (
    <Button
      onClick={() =>
        isThisPlaying
          ? pause()
          : play({ id: storyId, title, audioUrl, coverImage, duration })
      }
      className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-12 px-8 text-base rounded-xl shadow-lg shadow-amber-500/20"
    >
      {isThisPlaying ? (
        <Pause className="size-5 fill-white" />
      ) : (
        <Play className="size-5 fill-white" />
      )}
      {isThisPlaying ? "השהו" : "האזינו עכשיו"}
    </Button>
  )
}
