"use client"

import { motion } from "framer-motion"

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
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* WhatsApp header bar */}
        <div className="bg-[#075e54] px-4 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            ס
          </div>
          <div>
            <div className="text-white text-sm font-semibold">סיפורון</div>
            <div className="text-white/70 text-[11px]">מנוי פעיל</div>
          </div>
        </div>

        {/* Message bubble */}
        <div className="p-3 bg-[#e5ddd5]">
          <div className="bg-white rounded-lg p-3 shadow-sm relative max-w-[90%] mr-auto">
            {/* Bubble tail */}
            <div className="absolute -right-1.5 top-0 w-3 h-3 bg-white" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
            <p className="text-gray-800 text-sm leading-relaxed text-right" dir="rtl">
              {text}
            </p>
            <div className="flex items-center justify-start gap-1 mt-1.5">
              <span className="text-[11px] text-gray-500">{time}</span>
              <span className="text-[11px] text-[#53bdeb]">✓✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WhatsAppGallery() {
  // Duplicate messages for seamless infinite scroll
  const doubled = [...WHATSAPP_MESSAGES, ...WHATSAPP_MESSAGES]

  return (
    <section className="py-16 sm:py-20 overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            מה אומרים עלינו ב-WhatsApp
          </h2>
          <p className="mt-3 text-muted-foreground text-lg">
            הודעות אמיתיות מהורים בקהילה
          </p>
        </motion.div>
      </div>

      {/* Mobile: horizontal scroll with snap */}
      <div className="lg:hidden">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
          {WHATSAPP_MESSAGES.map((msg, i) => (
            <WhatsAppCard key={i} text={msg.text} time={msg.time} />
          ))}
        </div>
      </div>

      {/* Desktop: auto-scrolling carousel */}
      <div className="hidden lg:block relative">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {doubled.map((msg, i) => (
              <WhatsAppCard key={i} text={msg.text} time={msg.time} />
            ))}
          </motion.div>
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
