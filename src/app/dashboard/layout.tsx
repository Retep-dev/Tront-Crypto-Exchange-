"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    ArrowRightLeft,
    Settings,
    LogOut,
    Menu,
    Bell,
    Wallet,
    PieChart,
    LineChart,
    CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const sidebarItems = [
    { icon: LineChart, label: "Trade", href: "/dashboard" },
    { icon: Wallet, label: "Assets", href: "/dashboard/assets" },
    { icon: ArrowRightLeft, label: "Orders", href: "/dashboard/transactions" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/overview" },
    { icon: PieChart, label: "Analysis", href: "/dashboard/analysis" },
    { icon: CreditCard, label: "Buy Crypto", href: "/dashboard/buy" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#0B0E11] text-[#EAECEF] font-sans">
            {/* Desktop Sidebar - Dense & Tech */}
            <aside className="hidden w-16 hover:w-52 transition-all duration-300 border-r border-[#2B3139] bg-[#0B0E11] md:flex md:flex-col group z-50">
                <div className="flex h-16 items-center justify-center group-hover:justify-start group-hover:px-6 border-b border-[#2B3139]">
                    <div className="h-8 w-8 min-w-[2rem] rounded-sm bg-[#F7A600] flex items-center justify-center text-black font-bold">T</div>
                    <span className="ml-3 font-bold text-lg tracking-tight text-[#EAECEF] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">Tront Pro</span>
                </div>

                <div className="flex flex-1 flex-col py-4 gap-1">
                    <nav className="space-y-1 px-2">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-sm px-3 py-3 text-sm font-medium transition-colors relative overflow-hidden",
                                    pathname === item.href
                                        ? "text-[#F7A600] bg-[#2B3139]"
                                        : "text-[#848E9C] hover:text-[#EAECEF] hover:bg-[#15181D]"
                                )}
                            >
                                <item.icon className="h-5 w-5 min-w-[1.25rem]" />
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">{item.label}</span>
                                {pathname === item.href && (
                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#F7A600]" />
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="p-2 border-t border-[#2B3139]">
                    <Button variant="ghost" className="w-full justify-center group-hover:justify-start gap-3 text-[#848E9C] hover:text-[#F6465D]" onClick={handleLogout}>
                        <LogOut className="h-5 w-5 min-w-[1.25rem]" />
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">Logout</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col min-w-0">
                {/* Header */}
                <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-[#2B3139] bg-[#0B0E11] px-4">
                    <div className="flex items-center gap-4 md:hidden">
                        <div className="h-8 w-8 rounded-sm bg-[#F7A600] flex items-center justify-center text-black font-bold">T</div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-4 text-sm font-medium text-[#848E9C]">
                            <span className="text-[#EAECEF] cursor-pointer hover:text-[#F7A600]">Markets</span>
                            <span className="cursor-pointer hover:text-[#EAECEF]">Trade</span>
                            <span className="cursor-pointer hover:text-[#EAECEF]">Derivatives</span>
                            <span className="cursor-pointer hover:text-[#EAECEF]">Earn</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#15181D] rounded-sm border border-[#2B3139]">
                            <span className="text-xs text-[#848E9C]">Est. Value:</span>
                            <span className="text-sm font-bold font-mono">0.4521 BTC</span>
                        </div>
                        <Button variant="ghost" size="icon" className="text-[#848E9C] hover:text-[#EAECEF]">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="h-8 w-8 rounded-full bg-[#2B3139] flex items-center justify-center text-xs font-bold text-[#F7A600] border border-[#F7A600]/20 hover:border-[#F7A600] transition-colors"
                            >
                                JD
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                                    <div className="absolute right-0 top-10 w-48 z-50 rounded-md border border-[#2B3139] bg-[#15181D] shadow-xl py-1">
                                        <div className="px-4 py-2 border-b border-[#2B3139] mb-1">
                                            <p className="text-sm font-medium text-[#EAECEF]">John Doe</p>
                                            <p className="text-xs text-[#848E9C]">trader@tront.pro</p>
                                        </div>
                                        <Link href="/dashboard/settings" onClick={() => setIsProfileOpen(false)}>
                                            <div className="px-4 py-2 text-sm text-[#848E9C] hover:text-[#EAECEF] hover:bg-[#2B3139] cursor-pointer flex items-center gap-2">
                                                <Settings className="h-4 w-4" /> Settings
                                            </div>
                                        </Link>
                                        <div
                                            onClick={handleLogout}
                                            className="px-4 py-2 text-sm text-[#F6465D] hover:bg-[#2B3139] cursor-pointer flex items-center gap-2"
                                        >
                                            <LogOut className="h-4 w-4" /> Log Out
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto scrollbar-hide">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#15181D] border-t border-[#2B3139] flex justify-between items-center px-4 pb-safe pt-2 z-50 h-16 safe-area-bottom">
                {[
                    { icon: LayoutDashboard, label: "Home", href: "/dashboard/overview" },
                    { icon: LineChart, label: "Trade", href: "/dashboard" },
                    { icon: ArrowRightLeft, label: "Orders", href: "/dashboard/transactions" },
                    { icon: Wallet, label: "Assets", href: "/dashboard/assets" },
                    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
                ].map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center gap-1 transition-colors",
                            pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
                                ? "text-[#F7A600]"
                                : "text-[#848E9C] hover:text-[#EAECEF]"
                        )}
                    >
                        <item.icon className={cn("h-5 w-5", pathname === item.href && "fill-current")} />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div >
    );
}
