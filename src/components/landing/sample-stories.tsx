"use client"

import { Play, Clock, Lock, Headphones } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { usePlayer } from "@/components/player/player-provider"
import { useRef } from "react"

const SAMPLE_STORIES = [
  {
    id: "shammir",
    title: "תולעת השמיר ובניית המקדש",
    description: "איך גילה שלמה המלך את הסוד לבניית בית המקדש — בלי כלי ברזל?",
    duration: 12,
    category: "סיפורי תלמוד",
    ageRange: "5-10",
    isFree: true,
    gradient: "from-amber-200 via-orange-200 to-rose-200 dark:from-amber-900/40 dark:via-orange-900/30 dark:to-rose-900/30",
  },
  {
    id: "silence-sinai",
    title: "השקט שלימד להקשיב",
    description: "רותם ואליאב מגלים למה כל עם ישראל שתק בבוקר מתן תורה.",
    duration: 8,
    category: "חגים ומועדים",
    ageRange: "4-8",
    isFree: true,
    gradient: "from-blue-200 via-indigo-200 to-purple-200 dark:from-blue-900/40 dark:via-indigo-900/30 dark:to-purple-900/30",
  },
  {
    id: "mushka-garden",
    title: "מושקה והגן הקסום",
    description: "מושקה מגלה שהפרחים בגן הסודי צומחים רק כשעושים חסד.",
    duration: 15,
    category: "סדרת מושקה",
    ageRange: "3-7",
    isFree: false,
    gradient: "from-emerald-200 via-teal-200 to-cyan-200 dark:from-emerald-900/40 dark:via-teal-900/30 dark:to-cyan-900/30",
  },
]

/* ── 3D Tilt Card wrapper ── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  function handleMouse(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Waveform decorative element ── */
function WaveformBars() {
  return (
    <div className="flex items-end gap-[3px] h-8 opacity-40">
      {[0.6, 1, 0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6].map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-white/80"
          style={{ height: `${h * 100}%` }}
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export function SampleStories() {
  const { play } = usePlayer()

  return (
    <section className="py-20 sm:py-28 bg-background relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          >
            טעימה מהסיפורים שלנו
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
          >
            האזינו עכשיו — בלי הרשמה
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_STORIES.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.12 }}
            >
              <TiltCard>
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full group">
                  {/* Cover with gradient */}
                  <div className={`relative h-52 bg-gradient-to-br ${story.gradient} flex items-center justify-center overflow-hidden`}>
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                      <Badge variant="secondary" className="text-xs glass-card border-0 backdrop-blur-md">
                        {story.category}
                      </Badge>
                      {!story.isFree && (
                        <Badge variant="outline" className="text-xs glass-card border-0 backdrop-blur-md">
                          <Lock className="h-3 w-3 ml-1" />
                          פרימיום
                        </Badge>
                      )}
                    </div>

                    {/* Waveform decoration */}
                    <div className="absolute bottom-3 left-3">
                      <WaveformBars />
                    </div>

                    {/* Play button with ripple */}
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/30"
                        animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      />
                      <Button
                        size="icon"
                        className="relative h-16 w-16 rounded-full bg-white/90 hover:bg-white text-primary shadow-xl hover:scale-110 transition-transform z-10"
                        onClick={() => play({
                          id: story.id,
                          title: story.title,
                          audioUrl: "",
                          coverImage: "",
                          duration: story.duration * 60,
                        })}
                      >
                        <Play className="h-7 w-7 fill-current ms-0.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {story.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {story.duration} דק׳
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Headphones className="h-3.5 w-3.5" />
                        גיל {story.ageRange}
                      </span>
                    </div>
                  </div>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-2 hover:border-primary/50 hover:bg-primary/5 px-8 transition-all"
            asChild
          >
            <a href="/stories">לכל הסיפורים ←</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
