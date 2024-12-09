"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Home, History, Settings, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/images/logowhite.png";
import Image from "next/image";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const items = [
    {
        title: "Home",
        path: "/dashboard",
        icon: Home,
    },
    {
        title: "Bara API",
        path: "/dashboard/bwapi",
        icon: History,
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const [address, setAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const router = useRouter();
    let provider: any;

    async function connectMetaMask() {
        setIsConnecting(true);
        try {
            if (window.ethereum == null) {
                throw new Error("MetaMask not installed");
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            const address = accounts[0];
            setAddress(address);
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
        } finally {
            setIsConnecting(false);
        }
    }

    const disconnectWallet = () => {
        setAddress(null);
    };

    const logout = async () => {
        await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/"); // redirect to login page
              },
            },
          });
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="flex items-center space-x-2">
                                    <Image
                                        src={Logo}
                                        alt="Logo"
                                        width={38}
                                        height={30}
                                        className="-mr-50"
                                    />
                                    <span className="text-xl font-bold text-black">
                                        BaraWatcher
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive =
                                    pathname !== null &&
                                    (item.path === "/dashboard"
                                        ? pathname === "/dashboard" ||
                                          pathname.startsWith(
                                              "/dashboard/collection/"
                                          )
                                        : pathname.startsWith(item.path));

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link href={item.path}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>

            <SidebarFooter>
                <div className="p-6">
                    <Card className="max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">
                                Wallet
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {address ? (
                                <div className="space-y-2">
                                    <p className="text-center text-green-600">
                                        Wallet Connected:
                                        <span className="font-mono text-sm block mt-1">
                                            {`${address.slice(
                                                0,
                                                6
                                            )}...${address.slice(-4)}`}
                                        </span>
                                    </p>
                                    <Button
                                        variant="destructive"
                                        className="w-full"
                                        onClick={disconnectWallet}
                                    >
                                        Disconnect Wallet
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    className="w-full"
                                    onClick={connectMetaMask}
                                    disabled={isConnecting}
                                >
                                    {isConnecting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Connecting...
                                        </>
                                    ) : (
                                        "Connect Wallet"
                                    )}
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <SidebarMenu>
                    <SidebarMenuButton asChild>
                        <Button onClick={logout}>Logout</Button>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
