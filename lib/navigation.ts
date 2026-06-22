import {
  UtensilsCrossed,
  ClipboardList,
  ChefHat,
  BarChart2,
  Settings,
  TableProperties,
  type LucideIcon,
} from 'lucide-react'

export type Role = 'gerente' | 'mesero' | 'cocinero'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  roles: Role[]
}

export interface NavGroup {
  label: string
  roles: Role[]
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Operaciones',
    roles: ['gerente', 'mesero', 'cocinero'],
    items: [
      { label: 'Menú',    href: '/menu',    icon: UtensilsCrossed, roles: ['gerente', 'mesero', 'cocinero'] },
      { label: 'Mesas',    href: '/mesa',    icon: TableProperties, roles: ['gerente', 'mesero', 'cocinero'] },
/*       { label: 'Pedidos', href: '/pedidos', icon: ClipboardList,   roles: ['gerente', 'mesero'] },
 */      { label: 'Cocina',  href: '/kitchen',  icon: ChefHat,         roles: ['gerente', 'cocinero'] },
    ],
  },
  {
    label: 'Administración',
    roles: ['gerente'],
    items: [
      { label: 'Reportes',      href: '/reportes',      icon: BarChart2, roles: ['gerente'] },
      { label: 'Configuración', href: '/configuracion', icon: Settings,  roles: ['gerente'] },
    ],
  },
]

export const ROLE_LABELS: Record<Role, string> = {
  gerente:  'Gerente',
  mesero:   'Mesero',
  cocinero: 'Cocinero',
}

export const ROLE_COLORS: Record<Role, string> = {
  gerente:  'bg-amber-100 text-amber-700',
  mesero:   'bg-blue-100 text-blue-700',
  cocinero: 'bg-orange-100 text-orange-700',
}
