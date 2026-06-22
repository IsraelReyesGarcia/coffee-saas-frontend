'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Coffee, ChevronLeft, Ellipsis } from 'lucide-react'
import { Tooltip } from 'radix-ui'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { NAV_GROUPS, ROLE_LABELS, ROLE_COLORS, type Role } from '@/lib/navigation'

interface AppSidebarProps {
  role: Role
}

export default function AppSidebar({ role }: AppSidebarProps) {
  const pathname = usePathname()

  // Lazy initializer: lee localStorage una sola vez en el cliente (sin setState en effect)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('sidebar-collapsed') === 'true'
  })

  // mounted sin setState en effect: servidor=false, cliente=true
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      localStorage.setItem('sidebar-collapsed', String(!prev))
      return !prev
    })
  }

  const visibleGroups = NAV_GROUPS
    .map(group => ({
      ...group,
      items: group.items.filter(item => item.roles.includes(role)),
    }))
    .filter(group => group.roles.some(r => r === role) && group.items.length > 0)

  const roleInitial = role.charAt(0).toUpperCase()

  if (!mounted) return <aside className="w-60 shrink-0" />

  return (
    <Tooltip.Provider delayDuration={300}>
      <aside
        className={cn(
          'relative flex flex-col h-screen sticky top-0 bg-sidebar border-r border-sidebar-border text-sidebar-foreground transition-[width] ease-in-out duration-300 shrink-0 overflow-visible',
          isCollapsed ? 'w-[72px]' : 'w-60'
        )}
      >
        {/* Toggle flotante en el borde derecho */}
        <button
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          className="absolute -right-4 top-6 z-50 flex size-8 items-center justify-center rounded-full bg-sidebar border border-sidebar-border shadow-sm hover:bg-sidebar-accent transition-colors"
        >
          <ChevronLeft
            size={16}
            className={cn(
              'text-sidebar-foreground/60 transition-transform ease-in-out duration-300 z-1000',
              isCollapsed && 'rotate-180'
            )}
            
          />
        </button>

        {/* Header — Logo y nombre */}
        <div className="flex h-14 items-center px-4 border-b border-sidebar-border overflow-hidden">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white shadow-sm">
            <Coffee size={18} />
          </div>
          <span
            className={cn(
              'ml-3 font-winky text-xl font-semibold whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
              isCollapsed ? 'hidden -translate-x-96 opacity-0' : 'translate-x-0 opacity-100'
            )}
          >
            Coffee
          </span>
          {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium truncate">Usuario</span>
                <span className={cn('text-xs px-2 py-0.5 rounded-full w-fit mt-0.5', ROLE_COLORS[role])}>
                  {ROLE_LABELS[role]}
                </span>
              </div>
            )}
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {visibleGroups.map((group) => (
            <div key={group.label}>
              {/* Etiqueta del grupo */}
              <div className={cn('mb-1 px-3', isCollapsed && 'flex justify-center')}>
                {isCollapsed ? (
                  <Ellipsis size={14} className="text-sidebar-foreground/30" />
                ) : (
                  <p className="text-xs font-medium uppercase tracking-wider text-sidebar-foreground/40">
                    {group.label}
                  </p>
                )}
              </div>

              {/* Items del grupo */}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  const navButton = (
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      asChild
                      className={cn(
                        'w-full justify-start h-10',
                        isCollapsed && 'justify-center px-0'
                      )}
                    >
                      <Link href={item.href}>
                        <Icon size={18} className="shrink-0" />
                        <span
                          className={cn(
                            'ml-2 transition-[transform,opacity,display] ease-in-out duration-200',
                            isCollapsed ? 'hidden -translate-x-96 opacity-0' : 'translate-x-0 opacity-100'
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </Button>
                  )

                  if (isCollapsed) {
                    return (
                      <Tooltip.Root key={item.href}>
                        <Tooltip.Trigger asChild>{navButton}</Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            side="right"
                            sideOffset={8}
                            className="z-50 rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
                          >
                            {item.label}
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    )
                  }

                  return <div key={item.href}>{navButton}</div>
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer — Usuario y rol */}
        <div className="border-t border-sidebar-border p-3">
          <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center')}>
            <div
              title={isCollapsed ? ROLE_LABELS[role] : undefined}
              className="size-9 shrink-0 rounded-full bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center text-sm font-semibold cursor-default"
            >
              {roleInitial}
            </div>
            
          </div>
        </div>
      </aside>
    </Tooltip.Provider>
  )
}
