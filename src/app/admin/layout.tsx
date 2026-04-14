import { AdminSidebar, AdminMobileHeader } from "@/components/layout/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <AdminSidebar />
      <AdminMobileHeader />
      <div className="lg:pr-64">
        <main className="px-4 py-4 sm:p-6 lg:p-8 pb-20">{children}</main>
      </div>
    </div>
  )
}
