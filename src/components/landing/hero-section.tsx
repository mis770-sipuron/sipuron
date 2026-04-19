"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Sparkles, Shield, CreditCard } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

/* ── Sparkle particle component ── */
function SparkleParticle({ delay, x, size }: { delay: number; x: string; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, bottom: "20%" }}
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0.6, 0],
        y: [0, -60, -120, -160],
        scale: [0, 1, 0.7, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    >
      <Sparkles className="text-amber-400/60" style={{ width: size, height: size }} />
    </motion.div>
  )
}

/* ── Cursor spotlight hook (desktop only) ── */
function useCursorSpotlight(containerRef: React.RefObject<HTMLElement | null>) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 150, damping: 20 })
  const smoothY = useSpring(y, { stiffness: 150, damping: 20 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const isTouchDevice = window.matchMedia("(hover: none)").matches
    if (isTouchDevice) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      x.set(e.clientX - rect.left)
      y.set(e.clientY - rect.top)
    }
    el.addEventListener("mousemove", handleMove)
    return () => el.removeEventListener("mousemove", handleMove)
  }, [containerRef, x, y])

  return { smoothX, smoothY }
}

/* ── Word-by-word reveal ── */
const headlineWords1 = ["כל", "לילה", "סיפור", "חדש."]
const headlineWords2 = ["כל", "סיפור", "—", "עולם", "שלם."]

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { smoothX, smoothY } = useCursorSpotlight(containerRef)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  const sparkles = [
    { delay: 0, x: "10%", size: 16 },
    { delay: 1.2, x: "25%", size: 12 },
    { delay: 0.6, x: "45%", size: 18 },
    { delay: 1.8, x: "65%", size: 14 },
    { delay: 0.3, x: "80%", size: 16 },
    { delay: 2.1, x: "92%", size: 12 },
  ]

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden gradient-warm noise-overlay section-divider-wave"
    >
      {/* Cursor spotlight (desktop only) */}
      {isMounted && (
        <motion.div
          className="hidden lg:block absolute pointer-events-none z-[2]"
          style={{
            x: smoothX,
            y: smoothY,
            width: 400,
            height: 400,
            marginLeft: -200,
            marginTop: -200,
            background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Animated floating blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-[#d4a0a0]/20 rounded-full blur-3xl"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-[#a8d5ba]/15 rounded-full blur-3xl"
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#d4b855]/12 rounded-full blur-3xl"
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sparkle particles */}
      {sparkles.map((s, i) => (
        <SparkleParticle key={i} {...s} />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        {/* Children illustration — desktop only */}
        <motion.div
          className="hidden lg:block absolute left-4 xl:left-10 top-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80, delay: 0.3 }}
          animate={{ y: [-8, 8, -8] }}
          style={{ animationDuration: "6s" }}
        >
          <Image
            src="/children.png"
            alt="ילדי סיפורון"
            width={400}
            height={400}
            className="w-[280px] xl:w-[360px] h-auto drop-shadow-2xl"
            priority
          />
        </motion.div>

        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-8"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 150, damping: 12 }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
            </motion.span>
            <span className="text-sm font-semibold text-foreground/80">
              מעל 10,000 משפחות כבר מאזינות
            </span>
          </motion.div>

          {/* Headline — word-by-word reveal */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            <span className="block">
              {headlineWords1.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mx-[0.12em]"
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.1,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block mt-2">
              {headlineWords2.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mx-[0.12em] bg-gradient-to-l from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.1,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            סיפורי שמע מרגשים לילדים, בקול של מנחם שרון.
            <br className="hidden sm:block" />
            הפקה תיאטרלית עם ערכים יהודיים — מושלם לשעת השינה.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Button
              size="lg"
              asChild
              className="relative w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg px-10 py-7 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 transition-all overflow-hidden group"
            >
              <Link href="/join">
                {/* Shimmer overlay */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
                <Play className="h-5 w-5 ml-2 fill-current relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10 font-bold">להאזין בחינם</span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto text-lg px-10 py-7 rounded-full border-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Link href="/join">להצטרף ב-₪5 בלבד</Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-green-600" />
              סליקה מאובטחת
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="h-4 w-4 text-primary" />
              ביטול בכל זמן
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" />
              10,000+ משפחות
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
