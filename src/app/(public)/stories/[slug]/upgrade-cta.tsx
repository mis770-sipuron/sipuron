"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  variant: "circle" | "button"
}

export function UpgradeCta({ variant }: Props) {
  if (variant === "circle") {
    return (
      <Link href="/checkout">
        <div className="size-20 sm:size-24 rounded-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
          <Lock className="size-8 sm:size-10 text-white mb-1" />
          <span className="text-white text-[10px] sm:text-xs font-bold">למנויים בלבד</span>
        </div>
      </Link>
    )
  }

  return (
    <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white gap-2 h-12 px-8 text-base rounded-xl shadow-lg shadow-amber-500/20">
      <Link href="/checkout">
        <Lock className="size-5" />
        הצטרפו למועדון — מ-₪5 בלבד
      </Link>
    </Button>
  )
}
