import { type NextRequest } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

/* ------------------------------------------------------------------ */
/*  Schooler API config                                                */
/* ------------------------------------------------------------------ */

const SCHOOLER_BASE = "https://api.schooler.biz"
const SCHOOLER_CLIENT_ID = "jgbDvY5hfgko7cKF2no7WqCKrG6v17lDIgvIPPW9qsw"
const SCHOOLER_CLIENT_SECRET = "kT3QfI1Skh5YIrvRybvtn-vJG8oyO8nBFlEp5Hgs26Y"
const SCHOOLER_USER_ID = "mis770@gmail.com"
const SCHOOLER_USER_SECRET = "ba664f83fc24999a706d1e9869b65d60"

const SCHOOL_ID = 98808
const STANDALONE_COURSE_ID = 98031 // חודש כסלו — standalone, not in school

/* Campaign mapping by course */
const COURSE_CAMPAIGNS: Record<number, string> = {
  94830: "מנוי - מאגר הסיפורים",
  94915: "מנוי - בונוסים",
  95256: "מאגר הניצחון (חינמי)",
  98031: "חודש כסלו (עונתי)",
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

async function getSchoolerToken(): Promise<string> {
  const res = await fetch(`${SCHOOLER_BASE}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "password",
      client_id: SCHOOLER_CLIENT_ID,
      client_secret: SCHOOLER_CLIENT_SECRET,
      user_id: SCHOOLER_USER_ID,
      user_secret: SCHOOLER_USER_SECRET,
    }),
  })
  const data = await res.json()
  if (!data.access_token) throw new Error("Failed to get Schooler token")
  return data.access_token
}

interface SchoolerSchoolStudent {
  student_id: number
  student_name: string
  student_email: string
  student_phone: string
  student_join_date: string
  last_login_date: string
  courses: {
    course_name: string
    course_id: number
    status_in_course: string
    student_join_date: string
    lessons_complete: number
    lesson_complete_percentage: number
  }[]
}

interface SchoolerCourseStudent {
  student_id: number
  student_name: string
  student_email: string
  student_phone: string
  student_join_date: string
  status_in_course: string
  last_login_date: string
  lessons_complete: number
}

async function fetchAllSchoolStudents(token: string): Promise<SchoolerSchoolStudent[]> {
  const allStudents: SchoolerSchoolStudent[] = []
  let page = 1
  const perPage = 100

  while (true) {
    const res = await fetch(
      `${SCHOOLER_BASE}/api/v1/schools/${SCHOOL_ID}/students?page=${page}&per_page=${perPage}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const json = await res.json()
    const students = json.data?.students || []
    allStudents.push(...students)

    if (students.length < perPage) break
    page++
  }

  return allStudents
}

async function fetchStandaloneCourseStudents(token: string): Promise<SchoolerCourseStudent[]> {
  const allStudents: SchoolerCourseStudent[] = []
  let page = 1
  const perPage = 100

  while (true) {
    const res = await fetch(
      `${SCHOOLER_BASE}/api/v1/courses/${STANDALONE_COURSE_ID}/students?page=${page}&per_page=${perPage}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const json = await res.json()
    const students = json.data?.students || []
    allStudents.push(...students)

    if (students.length < perPage) break
    page++
  }

  return allStudents
}

function determineCampaign(courses: { course_id: number; status_in_course: string }[]): string {
  // Priority: paying subscriber > free funnel > seasonal
  const hasActivePaid = courses.some(
    (c) => c.course_id === 94830 && c.status_in_course === "active"
  )
  if (hasActivePaid) return COURSE_CAMPAIGNS[94830]

  const hasFreeAccess = courses.some((c) => c.course_id === 95256)
  if (hasFreeAccess) return COURSE_CAMPAIGNS[95256]

  const hasKislev = courses.some((c) => c.course_id === 98031)
  if (hasKislev) return COURSE_CAMPAIGNS[98031]

  return "לא ידוע"
}

function determineStatus(courses: { course_id: number; status_in_course: string }[]): string {
  const hasActivePaid = courses.some(
    (c) => c.course_id === 94830 && c.status_in_course === "active"
  )
  if (hasActivePaid) return "converted"

  const hasInactivePaid = courses.some(
    (c) => c.course_id === 94830 && c.status_in_course === "inactive"
  )
  if (hasInactivePaid) return "churned"

  return "lead"
}

/* ------------------------------------------------------------------ */
/*  POST /api/admin/leads/import-schooler                              */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServiceClient()

    // 1. Get Schooler token
    const token = await getSchoolerToken()

    // 2. Pull all school students
    const schoolStudents = await fetchAllSchoolStudents(token)

    // 3. Pull standalone course students (חודש כסלו)
    const kislevStudents = await fetchStandaloneCourseStudents(token)

    // 4. Build unified map by student_id
    const studentMap = new Map<number, {
      name: string
      email: string
      phone: string
      joinDate: string
      courses: { course_id: number; status_in_course: string; course_name: string }[]
      lastLogin: string
    }>()

    // School students
    for (const s of schoolStudents) {
      studentMap.set(s.student_id, {
        name: s.student_name,
        email: s.student_email,
        phone: s.student_phone,
        joinDate: s.student_join_date,
        courses: s.courses.map((c) => ({
          course_id: c.course_id,
          status_in_course: c.status_in_course,
          course_name: c.course_name,
        })),
        lastLogin: s.last_login_date,
      })
    }

    // Standalone course — add or merge
    for (const s of kislevStudents) {
      const existing = studentMap.get(s.student_id)
      if (existing) {
        // Add kislev course if not already there
        const hasKislev = existing.courses.some((c) => c.course_id === STANDALONE_COURSE_ID)
        if (!hasKislev) {
          existing.courses.push({
            course_id: STANDALONE_COURSE_ID,
            status_in_course: s.status_in_course,
            course_name: "סיפורון - חודש כסלו חודש הגאולה",
          })
        }
      } else {
        studentMap.set(s.student_id, {
          name: s.student_name,
          email: s.student_email,
          phone: s.student_phone,
          joinDate: s.student_join_date,
          courses: [{
            course_id: STANDALONE_COURSE_ID,
            status_in_course: s.status_in_course,
            course_name: "סיפורון - חודש כסלו חודש הגאולה",
          }],
          lastLogin: s.last_login_date,
        })
      }
    }

    // 5. Batch insert/upsert into leads
    const leads = Array.from(studentMap.entries()).map(([studentId, s]) => ({
      name: s.name || null,
      email: s.email || null,
      phone: s.phone || null,
      source: "schooler" as const,
      campaign: determineCampaign(s.courses),
      campaign_details: {
        courses: s.courses,
        last_login: s.lastLogin || null,
      },
      schooler_student_id: studentId,
      schooler_courses: s.courses.map((c) => c.course_id),
      join_date: s.joinDate ? new Date(s.joinDate).toISOString() : null,
      status: determineStatus(s.courses),
      last_activity_at: s.lastLogin ? new Date(s.lastLogin).toISOString() : null,
    }))

    // Batch upsert 100 at a time
    let inserted = 0
    let updated = 0
    let errors = 0
    const batchSize = 100

    for (let i = 0; i < leads.length; i += batchSize) {
      const batch = leads.slice(i, i + batchSize)
      const { data, error } = await supabase
        .from("leads")
        .upsert(batch, {
          onConflict: "schooler_student_id",
          ignoreDuplicates: false,
        })
        .select("id")

      if (error) {
        console.error(`[Import] Batch ${i / batchSize + 1} error:`, error.message)
        errors += batch.length
      } else {
        inserted += data?.length || 0
      }
    }

    return Response.json({
      success: true,
      stats: {
        school_students_fetched: schoolStudents.length,
        kislev_students_fetched: kislevStudents.length,
        unique_students: studentMap.size,
        inserted,
        updated,
        errors,
      },
      campaigns: {
        "מנוי - מאגר הסיפורים": leads.filter((l) => l.campaign === "מנוי - מאגר הסיפורים").length,
        "מאגר הניצחון (חינמי)": leads.filter((l) => l.campaign === "מאגר הניצחון (חינמי)").length,
        "חודש כסלו (עונתי)": leads.filter((l) => l.campaign === "חודש כסלו (עונתי)").length,
        "מנוי - בונוסים": leads.filter((l) => l.campaign === "מנוי - בונוסים").length,
      },
    })
  } catch (err) {
    console.error("[Import] Error:", err)
    return Response.json(
      { error: err instanceof Error ? err.message : "Import failed" },
      { status: 500 }
    )
  }
}
