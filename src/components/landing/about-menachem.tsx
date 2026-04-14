"use client"

import { Mic, Heart } from "lucide-react"
import { motion } from "framer-motion"

export function AboutMenachem() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Avatar placeholder */}
          <motion.div
            className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-900 mb-6 shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 150, damping: 12 }}
          >
            <Mic className="h-10 w-10 text-amber-800 dark:text-amber-200" />
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 0.1 }}
          >
            הקול מאחורי הסיפורים
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <strong className="text-foreground">מנחם שרון</strong> — קריין, מספר סיפורים ואבא.
            כל סיפור נכתב ומופק ברמה תיאטרלית, עם דגש על ערכים יהודיים,
            דמיון עשיר ושפה שילדים אוהבים.
          </motion.p>

          <motion.p
            className="text-lg text-muted-foreground leading-relaxed mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            &ldquo;החזון שלי פשוט — שכל ילד יהודי בעולם ירדם עם סיפור טוב.
            <br />
            סיפור שמלמד, מרגש ובונה עולם פנימי עשיר.&rdquo;
          </motion.p>

          <motion.div
            className="inline-flex items-center gap-2 text-sm text-primary font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
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
