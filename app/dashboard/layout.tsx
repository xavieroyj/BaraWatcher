import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"
import "../globals.css";
import { Toaster } from "@/components/ui/toaster"

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 w-full min-h-screen">
          <Toaster/>
          <SidebarTrigger />

          <div className="px-4 py-2">
            {children}
          </div>

        </main>
      </SidebarProvider>
    </div>
  )
}