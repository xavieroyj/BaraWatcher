"use client";
import React, { useState, useEffect } from "react";

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
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";

const items = [
    {
        title: "Home",
        path: "/dashboard",
        icon: Home,
    },
    {
        title: "History",
        path: "/dashboard/history",
        icon: History,
    },
    {
        title: "Settings",
        path: "/dashboard/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    const {
        connectWallet,
        disconnectWallet,
        getConnectedWallets,
        isConnecting,
        error,
        isPending,
    } = useWallet();
    const [connectedWallet, setConnectedWallet] = useState<{
        address: string;
        isConnected: boolean;
    } | null>(null);

    useEffect(() => {
        const fetchWallets = async () => {
            const wallets = await getConnectedWallets();
            const activeWallet = wallets.find((w) => w.isConnected);
            if (activeWallet) {
                setConnectedWallet({
                    address: activeWallet.address,
                    isConnected: activeWallet.isConnected,
                });
            }
        };

        if (!isPending) {
            fetchWallets();
        }
    }, [getConnectedWallets, isPending]);

    const handleConnect = async () => {
        const wallet = await connectWallet();
        if (wallet) {
            setConnectedWallet({
                address: wallet.address,
                isConnected: wallet.isConnected,
            });
        }
    };

    const handleDisconnect = async () => {
        if (connectedWallet) {
            const success = await disconnectWallet(connectedWallet.address);
            if (success) {
                setConnectedWallet(null);
            }
        }
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex items-center">
                                    <Image
                                        src={Logo}
                                        alt="Logo"
                                        width={55}
                                        height={55}
                                        className="-mr-1"
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
                            {error && (
                                <p className="text-center text-red-600 text-sm">
                                    {/* {error} */}
                                </p>
                            )}

                            {connectedWallet ? (
                                <div className="space-y-2">
                                    <p className="text-center text-green-600">
                                        Wallet Connected:
                                        <span className="font-mono text-sm block mt-1">
                                            {connectedWallet.address}
                                        </span>
                                    </p>
                                    <Button
                                        onClick={handleDisconnect}
                                        variant="destructive"
                                        className="w-full"
                                    >
                                        Disconnect Wallet
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={handleConnect}
                                    className="w-full"
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
            </SidebarFooter>
        </Sidebar>
    );
}
