import type { Metadata } from "next"
import { ProposalClient } from "./proposal-client"

export const metadata: Metadata = {
  title: "הצעת עבודה — סיפורון 2026",
  robots: "noindex, nofollow",
}

export default function ProposalPage() {
  return <ProposalClient />
}
