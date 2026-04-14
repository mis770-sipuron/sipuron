// Sipuron Design System Constants

export const COLORS = {
  primary: {
    amber: '#F59E0B',
    amberDark: '#D97706',
    gold: '#B8860B',
  },
  secondary: {
    purple: '#7C3AED',
    purpleDark: '#5B21B6',
  },
  accent: {
    coral: '#FB7185',
    coralDark: '#E11D48',
  },
  background: {
    cream: '#FFFBF0',
    navy: '#0F172A',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#F43F5E',
} as const

export const GLASS = 'backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-white/20 dark:border-slate-700/30 shadow-lg'
export const GLASS_HOVER = 'hover:bg-white/80 dark:hover:bg-slate-900/80 hover:shadow-xl transition-all duration-300'
export const CARD_WARM = 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300'

// Story Categories
export const STORY_CATEGORIES = [
  { slug: 'parashat-shavua', name: 'פרשת שבוע', type: 'parasha', icon: '📖' },
  { slug: 'holidays', name: 'חגים ומועדים', type: 'holiday', icon: '🕎' },
  { slug: 'values', name: 'ערכים ומידות', type: 'topic', icon: '💎' },
  { slug: 'adventures', name: 'הרפתקאות', type: 'topic', icon: '🗺' },
  { slug: 'tzadikim', name: 'סיפורי צדיקים', type: 'character', icon: '✨' },
  { slug: 'hasidim', name: 'סיפורי חסידים', type: 'character', icon: '🕯' },
  { slug: 'talmud', name: 'סיפורי תלמוד', type: 'topic', icon: '📚' },
  { slug: 'bedtime', name: 'לפני השינה', type: 'topic', icon: '🌙' },
  { slug: 'mushka-series', name: 'סדרת מושקה', type: 'series', icon: '👧' },
  { slug: 'arthur-series', name: 'סדרת ארתור', type: 'series', icon: '🦁' },
] as const

// Pricing
export const DOMAIN = 'sipuron.org'
export const SITE_URL = 'https://sipuron.org'
export const SHORT_LINK_DOMAIN = 's.sipuron.org'

export const PLANS = {
  monthly: {
    name: 'חודשי',
    slug: 'monthly',
    priceMonthly: 49.90,
    priceFirstMonth: 5,
    billing: 'monthly',
  },
  annual: {
    name: 'שנתי',
    slug: 'annual',
    priceMonthly: 39.90,
    priceTotal: 478.80,
    priceFirstMonth: 5,
    billing: 'annual',
    savings: 120,
  },
} as const

// Admin sidebar navigation
export const ADMIN_NAV = [
  { href: '/admin', label: 'סקירה כללית', icon: 'LayoutDashboard' },
  { href: '/admin/subscribers', label: 'מנויים', icon: 'Users' },
  { href: '/admin/stories', label: 'סיפורים', icon: 'BookOpen' },
  { href: '/admin/finance', label: 'כספים', icon: 'DollarSign' },
  { href: '/admin/messaging', label: 'הודעות + בוט', icon: 'MessageSquare' },
  { href: '/admin/links', label: 'לינקים + אנליטיקס', icon: 'Link' },
  { href: '/admin/roadmap', label: 'רודמאפ', icon: 'Map' },
  { href: '/admin/settings', label: 'הגדרות', icon: 'Settings' },
] as const

// Departments for roadmap
export const DEPARTMENTS = [
  { slug: 'cmo', name: 'CMO שיווק', color: '#F59E0B' },
  { slug: 'cso', name: 'CSO מכירות', color: '#10B981' },
  { slug: 'cpo', name: 'CPO מוצר', color: '#8B5CF6' },
  { slug: 'cto', name: 'CTO טכנולוגיה', color: '#3B82F6' },
  { slug: 'cco', name: 'CCO שירות', color: '#EC4899' },
  { slug: 'cfo', name: 'CFO כספים', color: '#14B8A6' },
  { slug: 'coo', name: 'COO תפעול', color: '#F97316' },
  { slug: 'clo', name: 'CLO משפטים', color: '#6B7280' },
] as const

// Format NIS currency
export function fmtCurrency(amount: number): string {
  return `₪${amount.toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

// Format number with commas
export function fmtNumber(n: number): string {
  return n.toLocaleString('he-IL')
}

// Format duration (seconds → "X דק׳")
export function fmtDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60)
  return `${minutes} דק׳`
}
