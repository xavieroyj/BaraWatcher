import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, History } from "lucide-react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const sidebarNavItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
]

function SidebarNav() {
  return (
    <nav className="space-y-1">
      {sidebarNavItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <ScrollArea className="h-full py-6 px-4">
          <SidebarNav />
        </ScrollArea>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
