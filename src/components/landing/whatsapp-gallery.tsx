"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const WHATSAPP_MESSAGES = [
  {
    text: "הסיפורים שלך מרתקים! הילדים כל אחד שומע ונרדמים בשלווה. תודה רבה!",
    time: "21:52",
  },
  {
    text: "יש לי ילד שאם הוא לא שומע סיפור — הוא לא ישב. הסיפורים שלך הפכו את הערב שלנו.",
    time: "22:14",
  },
  {
    text: "הילדות שלי מחכות כל ערב לסיפור חדש. ומבקשות לשמוע כמה פעמים!",
    time: "21:38",
  },
  {
    text: "נכנסנו לשגרה חדשה. הסיפורים מעניינים, מפתחים דמיון וקשב. וגם אני כאמא מאזינה!",
    time: "22:05",
  },
  {
    text: "התוכן איכותי ביותר ומועבר בדרך מעניינת שמאפשרת פיתוח הדמיון.",
    time: "21:47",
  },
  {
    text: "הילדים מחכים כל יום לשמוע את הסיפורים! ומבקשים להשמיע בצורה חוויתית ורגועה.",
    time: "22:31",
  },
]

function WhatsAppCard({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
        {/* WhatsApp header bar */}
        <div className="bg-[#075e54] dark:bg-[#1a3a35] px-4 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            ס
          </div>
          <div>
            <div className="text-white text-sm font-semibold">סיפורון</div>
            <div className="text-white/70 text-[11px]">מנוי פעיל</div>
          </div>
        </div>

        {/* Message bubble */}
        <div className="p-3 bg-[#e5ddd5] dark:bg-slate-900/50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm relative max-w-[90%] mr-auto">
            {/* Bubble tail */}
            <div
              className="absolute -right-1.5 top-0 w-3 h-3 bg-white dark:bg-slate-800"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />
            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed text-right" dir="rtl">
              {text}
            </p>
            <div className="flex items-center justify-start gap-1 mt-1.5">
              <span className="text-[11px] text-gray-500 dark:text-gray-400">{time}</span>
              <span className="text-[11px] text-[#53bdeb]">✓✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WhatsAppGallery() {
  const [isPaused, setIsPaused] = useState(false)
  const doubled = [...WHATSAPP_MESSAGES, ...WHATSAPP_MESSAGES]

  return (
    <section className="py-20 sm:py-28 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            מה אומרים עלינו ב-WhatsApp
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            הודעות אמיתיות מהורים בקהילה
          </p>
        </motion.div>
      </div>

      {/* Mobile: horizontal scroll with snap */}
      <div className="lg:hidden">
        <div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          {WHATSAPP_MESSAGES.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <WhatsAppCard text={msg.text} time={msg.time} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop: auto-scrolling carousel with hover pause */}
      <div
        className="hidden lg:block relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              },
            }}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {doubled.map((msg, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <WhatsAppCard text={msg.text} time={msg.time} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Glass fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
