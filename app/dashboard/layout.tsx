import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full min-h-screen">
        <SidebarTrigger />

        <div className="px-4 py-2">
          {children}
        </div>

      </main>
    </SidebarProvider>
  )
}