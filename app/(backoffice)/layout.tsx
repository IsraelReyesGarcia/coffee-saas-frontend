import AppSidebar from '@/components/sidebar/AppSidebar'
import type { Role } from '@/lib/navigation'

// Reemplazar con session/auth cuando esté disponible
const CURRENT_ROLE: Role = 'gerente'

export default function BackofficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role={CURRENT_ROLE} />
      <main className="flex-1 overflow-auto relative z-0">
        {children}
      </main>
    </div>
  )
}
