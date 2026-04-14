"use client"

import { Play, Clock, Lock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const SAMPLE_STORIES = [
  {
    id: "shammir",
    title: "תולעת השמיר ובניית המקדש",
    description: "איך גילה שלמה המלך את הסוד לבניית בית המקדש — בלי כלי ברזל?",
    duration: 12,
    category: "סיפורי תלמוד",
    ageRange: "5-10",
    isFree: true,
  },
  {
    id: "silence-sinai",
    title: "השקט שלימד להקשיב",
    description: "רותם ואליאב מגלים למה כל עם ישראל שתק בבוקר מתן תורה.",
    duration: 8,
    category: "חגים ומועדים",
    ageRange: "4-8",
    isFree: true,
  },
  {
    id: "mushka-garden",
    title: "מושקה והגן הקסום",
    description: "מושקה מגלה שהפרחים בגן הסודי צומחים רק כשעושים חסד.",
    duration: 15,
    category: "סדרת מושקה",
    ageRange: "3-7",
    isFree: false,
  },
]

export function SampleStories() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          >
            טעימה מהסיפורים שלנו
          </motion.h2>
          <motion.p
            className="mt-3 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 0.1 }}
          >
            האזינו עכשיו — בלי הרשמה
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_STORIES.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -8 }}
            >
              <Card
                className="story-card-hover overflow-hidden border-0 shadow-md h-full"
              >
                {/* Cover placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {story.category}
                    </Badge>
                    {!story.isFree && (
                      <Badge variant="outline" className="text-xs bg-background/80">
                        <Lock className="h-3 w-3 ml-1" />
                        פרימיום
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="icon"
                    className="h-14 w-14 rounded-full bg-primary/90 hover:bg-primary shadow-lg hover:scale-110 transition-transform"
                  >
                    <Play className="h-6 w-6 fill-current" />
                  </Button>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {story.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {story.duration} דק׳
                    </span>
                    <span>גיל {story.ageRange}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full" asChild>
            <a href="/stories">לכל הסיפורים →</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
