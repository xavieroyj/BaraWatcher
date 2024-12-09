"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Logo from '@/app/images/logowhite.png'
import { usePathname } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export default function Navbar() {
  const pathname = usePathname();
  const isDashboardRoute = pathname.includes("dashboard");
  const isLoginRoute = pathname.includes("login");
  const isRegisterRoute = pathname.includes("register");
  const { 
    data: session, 
    isPending,
    error
  } = authClient.useSession() 

  if (isDashboardRoute || isLoginRoute || isRegisterRoute) { 
    return null;
  }

  return (
    <nav className="bg-black shadow-md sticky top-2 mx-5 z-10 rounded-xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center">
            <Image src={Logo} alt="Logo" width={30} height={80} className="mr-3" />
            <span className="text-2xl font-bold text-white">BaraWatcher</span>
          </div>
        </Link>
        <div className="space-x-4">
          {isPending ? (
            <Button variant="outline" disabled>Loading...</Button>
          ) : session ? (
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="default">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}