"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, CreditCard, Send, Wallet, Gift, Bell, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const HOT_PAIRS = [
    { pair: "BTC/USDT", price: "64,231.50", change: "+2.45%" },
    { pair: "ETH/USDT", price: "3,452.12", change: "-1.20%" },
    { pair: "SOL/USDT", price: "145.67", change: "+5.67%" },
    { pair: "BNB/USDT", price: "590.23", change: "+0.45%" },
];

const CAMPAIGNS = [
    { title: "New User Bonus", desc: "Deposit to claim $500", color: "bg-gradient-to-r from-purple-600 to-blue-600" },
    { title: "Referral Program", desc: "Invite friends, earn 20%", color: "bg-gradient-to-r from-[#F7A600] to-orange-600" },
];

export default function DashboardOverview() {
    const [balanceHidden, setBalanceHidden] = useState(false);

    return (
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                {/* Left Column: Assets & Actions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Total Equity Card */}
                    <Card className="border-[#2B3139] bg-[#15181D] overflow-hidden relative">
                        <div className="p-6 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-[#848E9C] text-xs font-bold uppercase tracking-wider">Total Equity (USD)</h2>
                                <button onClick={() => setBalanceHidden(!balanceHidden)} className="text-[#848E9C] text-xs hover:text-[#EAECEF]">
                                    {balanceHidden ? "Show" : "Hide"} Balance
                                </button>
                            </div>
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl font-mono font-bold text-[#EAECEF]">
                                    {balanceHidden ? "******" : "24,531.45"}
                                </span>
                                <span className="text-[#848E9C] font-mono">≈ {balanceHidden ? "***" : "0.38"} BTC</span>
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                <Button className="flex flex-col h-auto py-3 gap-2 bg-[#2B3139] hover:bg-[#474D57] border-0 text-[#EAECEF]">
                                    <CreditCard className="h-5 w-5 text-[#F7A600]" />
                                    <span className="text-xs">Buy Crypto</span>
                                </Button>
                                <Button className="flex flex-col h-auto py-3 gap-2 bg-[#2B3139] hover:bg-[#474D57] border-0 text-[#EAECEF]">
                                    <Wallet className="h-5 w-5 text-[#F7A600]" />
                                    <span className="text-xs">Deposit</span>
                                </Button>
                                <Button className="flex flex-col h-auto py-3 gap-2 bg-[#2B3139] hover:bg-[#474D57] border-0 text-[#EAECEF]">
                                    <Send className="h-5 w-5 text-[#F7A600]" />
                                    <span className="text-xs">Withdraw</span>
                                </Button>
                                <Button className="flex flex-col h-auto py-3 gap-2 bg-[#2B3139] hover:bg-[#474D57] border-0 text-[#EAECEF]">
                                    <ArrowUpRight className="h-5 w-5 text-[#F7A600]" />
                                    <span className="text-xs">Transfer</span>
                                </Button>
                            </div>
                        </div>
                        {/* Bg decoration */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F7A600]/10 blur-3xl rounded-full pointer-events-none" />
                    </Card>

                    {/* Banners */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {CAMPAIGNS.map((camp, i) => (
                            <Card key={i} className="border-0 overflow-hidden relative group cursor-pointer">
                                <div className={cn("absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity", camp.color)} />
                                <div className="p-4 relative z-10">
                                    <h3 className="font-bold text-[#EAECEF]">{camp.title}</h3>
                                    <p className="text-xs text-[#EAECEF]/70">{camp.desc}</p>
                                </div>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-white/50" />
                            </Card>
                        ))}
                    </div>

                    {/* Hot Pairs */}
                    <Card className="border-[#2B3139] bg-[#15181D]">
                        <CardHeader className="pb-2 border-b border-[#2B3139]">
                            <CardTitle className="text-sm font-bold text-[#EAECEF]">Hot Markets</CardTitle>
                        </CardHeader>
                        <div className="divide-y divide-[#2B3139]">
                            {HOT_PAIRS.map((pair) => (
                                <div key={pair.pair} className="flex items-center justify-between p-4 hover:bg-[#2B3139] transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <Star className="h-4 w-4 text-[#848E9C] hover:text-[#F7A600]" />
                                        <span className="font-bold text-[#EAECEF]">{pair.pair}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-mono text-[#EAECEF]">{pair.price}</div>
                                        <div className={cn("text-xs font-mono", pair.change.startsWith("+") ? "text-profit" : "text-loss")}>
                                            {pair.change}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Announcements & Activity */}
                <div className="space-y-6">
                    <Card className="border-[#2B3139] bg-[#15181D]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-[#EAECEF] flex items-center gap-2">
                                <Bell className="h-4 w-4 text-[#F7A600]" /> Announcements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="text-xs space-y-1 cursor-pointer group">
                                    <p className="text-[#EAECEF] group-hover:text-[#F7A600] line-clamp-1">Market Analysis: Bitcoin approaches $65k resistance level</p>
                                    <p className="text-[#848E9C]">2 hours ago</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-[#2B3139] bg-[#15181D]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-[#EAECEF]">Recent Login</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs text-[#848E9C] font-mono">
                            <div className="flex justify-between">
                                <span>Time</span>
                                <span className="text-[#EAECEF]">2026-01-09 13:45</span>
                            </div>
                            <div className="flex justify-between">
                                <span>IP Address</span>
                                <span className="text-[#EAECEF]">192.168.1.1</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Location</span>
                                <span className="text-[#EAECEF]">New York, US</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
