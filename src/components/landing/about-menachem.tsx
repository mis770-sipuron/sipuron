"use client"

import { Mic, Heart, Quote } from "lucide-react"
import { motion } from "framer-motion"

/* ── Audio wave decorative bars ── */
function AudioWave({ className = "" }: { className?: string }) {
  const bars = [0.3, 0.7, 0.5, 1, 0.6, 0.9, 0.4, 0.8, 0.5, 0.7, 0.3, 0.6, 0.8, 0.4, 0.9, 0.5]
  return (
    <div className={`flex items-center gap-[2px] ${className}`}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-primary/20"
          style={{ height: 32 * h }}
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export function AboutMenachem() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background" />
      <div className="absolute inset-0 gradient-mesh" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Avatar with glow */}
          <motion.div
            className="relative inline-block mb-8"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 150, damping: 12 }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 blur-xl"
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative h-28 w-28 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-900 flex items-center justify-center shadow-xl border-4 border-background">
              <Mic className="h-12 w-12 text-amber-800 dark:text-amber-200" />
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
          >
            הקול מאחורי הסיפורים
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong className="text-foreground">מנחם שרון</strong> — קריין, מספר סיפורים ואבא.
            כל סיפור נכתב ומופק ברמה תיאטרלית, עם דגש על ערכים יהודיים,
            דמיון עשיר ושפה שילדים אוהבים.
          </motion.p>

          {/* Premium quote block */}
          <motion.div
            className="relative glass-card rounded-2xl p-8 sm:p-10 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Decorative quote icon */}
            <Quote className="absolute top-4 right-4 h-10 w-10 text-primary/10 -scale-x-100" />

            {/* Audio wave decoration */}
            <div className="flex justify-center mb-6">
              <AudioWave />
            </div>

            <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed font-medium italic">
              &ldquo;החזון שלי פשוט — שכל ילד יהודי בעולם ירדם עם סיפור טוב.
              <br />
              סיפור שמלמד, מרגש ובונה עולם פנימי עשיר.&rdquo;
            </blockquote>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary font-medium">
              — מנחם שרון
            </div>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 text-sm text-primary font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="h-4 w-4 fill-primary" />
            </motion.span>
            מאז 2025 — כל לילה סיפור חדש, בלי הפסקה
          </motion.div>
        </div>
      </div>
    </section>
  )
}
