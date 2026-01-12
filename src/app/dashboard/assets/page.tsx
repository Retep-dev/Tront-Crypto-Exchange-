"use client";

import { useState } from "react";
import { Eye, EyeOff, Wallet, ArrowUpRight, ArrowDownLeft, RefreshCcw, Plus, Search, MoreHorizontal, History, X, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_ASSETS = [
    { symbol: "USDT", name: "Tether", balance: 24531.45, price: 1.00, change: 0.01, color: "bg-[#26A17B]", type: "stable" },
    { symbol: "BTC", name: "Bitcoin", balance: 0.45210000, price: 64231.50, change: 2.45, color: "bg-[#F7931A]", type: "coin" },
    { symbol: "ETH", name: "Ethereum", balance: 4.21000000, price: 3452.12, change: -1.20, color: "bg-[#627EEA]", type: "coin" },
    { symbol: "SOL", name: "Solana", balance: 145.000000, price: 145.67, change: 5.67, color: "bg-[#00FFA3]", type: "coin" },
    { symbol: "BNB", name: "BNB", balance: 12.5000000, price: 590.23, change: 0.45, color: "bg-[#F3BA2F]", type: "coin" },
    { symbol: "XRP", name: "Ripple", balance: 4500.00000, price: 0.6234, change: -0.89, color: "bg-[#EAECEF]", type: "coin" },
];

const ModalOverlay = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
        <motion.div
            initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
            className="w-full max-w-md bg-[#15181D] border border-[#2B3139] rounded-lg shadow-xl overflow-hidden"
        >
            <div className="flex items-center justify-between p-4 border-b border-[#2B3139]">
                <h3 className="text-lg font-bold text-[#EAECEF]">{title}</h3>
                <button onClick={onClose} className="text-[#848E9C] hover:text-[#EAECEF]">
                    <X className="h-5 w-5" />
                </button>
            </div>
            <div className="p-4">
                {children}
            </div>
        </motion.div>
    </motion.div>
);

const MOCK_HISTORY = [
    { id: 1, type: "Deposit", asset: "USDT", amount: 5000.00, status: "Completed", date: "2024-05-20 14:30" },
    { id: 2, type: "Withdraw", asset: "BTC", amount: 0.050000, status: "Processing", date: "2024-05-19 09:15" },
    { id: 3, type: "Transfer", asset: "ETH", amount: 1.500000, status: "Completed", date: "2024-05-18 18:45" },
    { id: 4, type: "Deposit", asset: "SOL", amount: 20.00000, status: "Completed", date: "2024-05-15 11:20" },
];

const TABS = [
    { id: "overview", label: "Overview" },
    { id: "spot", label: "Spot" },
    { id: "funding", label: "Funding" },
    { id: "history", label: "History" },
];

export default function AssetsPage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [showBalance, setShowBalance] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeModal, setActiveModal] = useState<"deposit" | "withdraw" | "transfer" | null>(null);

    // Derived Data
    const totalEq = MOCK_ASSETS.reduce((acc, a) => acc + (a.balance * a.price), 0);
    const totalBTC = totalEq / 64231.50;

    const filteredAssets = MOCK_ASSETS.filter(
        asset => asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto h-full flex flex-col">

            {/* Modal Logic */}
            <AnimatePresence>
                {activeModal === "deposit" && (
                    <ModalOverlay title="Deposit Crypto" onClose={() => setActiveModal(null)}>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#0B0E11] rounded border border-[#2B3139] flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-[#848E9C]">Select Asset</p>
                                    <p className="font-bold text-[#EAECEF]">USDT <span className="text-[#848E9C] font-normal text-xs">Tether</span></p>
                                </div>
                                <RefreshCcw className="h-4 w-4 text-[#F7A600]" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-[#848E9C]">Deposit Address (TRC20)</p>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 p-3 bg-[#0B0E11] rounded border border-[#2B3139] text-xs font-mono text-[#EAECEF] break-all">
                                        TDp7...8x92
                                    </code>
                                    <Button size="icon" className="bg-[#2B3139] hover:bg-[#474D57]"><Copy className="h-4 w-4" /></Button>
                                </div>
                            </div>
                            <div className="text-xs text-[#F7A600] flex items-center gap-2">
                                <CheckCircle className="h-3 w-3" /> Minimum deposit: 10 USDT
                            </div>
                            <Button className="w-full bg-[#F7A600] text-black font-bold" onClick={() => setActiveModal(null)}>Done</Button>
                        </div>
                    </ModalOverlay>
                )}
                {activeModal === "withdraw" && (
                    <ModalOverlay title="Withdraw Crypto" onClose={() => setActiveModal(null)}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs text-[#848E9C]">Address</label>
                                <Input placeholder="Enter wallet address" className="bg-[#0B0E11] border-[#2B3139]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-[#848E9C]">Amount</label>
                                <div className="relative">
                                    <Input placeholder="0.00" className="bg-[#0B0E11] border-[#2B3139] pr-12" />
                                    <button className="absolute right-2 top-2 text-xs text-[#F7A600] font-bold">MAX</button>
                                </div>
                            </div>
                            <Button className="w-full bg-[#2B3139] text-[#EAECEF] hover:bg-[#474D57]" onClick={() => setActiveModal(null)}>Confirm Withdrawal</Button>
                        </div>
                    </ModalOverlay>
                )}
                {activeModal === "transfer" && (
                    <ModalOverlay title="Transfer Assets" onClose={() => setActiveModal(null)}>
                        <div className="space-y-4 relative">
                            <div className="flex flex-col gap-2 relative z-10">
                                <div className="p-3 bg-[#0B0E11] rounded border border-[#2B3139] flex justify-between">
                                    <span className="text-xs text-[#848E9C]">From</span>
                                    <span className="font-bold text-[#EAECEF]">Spot Wallet</span>
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#2B3139] p-1 rounded-full border border-[#15181D]">
                                    <ArrowDownLeft className="h-4 w-4 text-[#F7A600]" />
                                </div>
                                <div className="p-3 bg-[#0B0E11] rounded border border-[#2B3139] flex justify-between">
                                    <span className="text-xs text-[#848E9C]">To</span>
                                    <span className="font-bold text-[#EAECEF]">Funding Wallet</span>
                                </div>
                            </div>
                            <Input placeholder="Amount" className="bg-[#0B0E11] border-[#2B3139]" />
                            <Button className="w-full bg-[#F7A600] text-black font-bold" onClick={() => setActiveModal(null)}>Transfer Now</Button>
                        </div>
                    </ModalOverlay>
                )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 flex-1">

                {/* Header Actions & Stats */}
                <div className="flex flex-col md:flex-row gap-6">
                    <Card className="flex-1 border-[#2B3139] bg-[#15181D] relative overflow-hidden">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-[#848E9C] uppercase tracking-wider">Estimated Balance</CardTitle>
                            <button onClick={() => setShowBalance(!showBalance)} className="text-[#848E9C] hover:text-[#EAECEF]">
                                {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1 mb-6">
                                <div className="flex items-baseline gap-2">
                                    <h1 className="text-3xl font-bold font-mono text-[#EAECEF]">
                                        {showBalance ? `$${totalEq.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "******"}
                                    </h1>
                                    <span className="text-sm font-mono text-[#848E9C]">USD</span>
                                </div>
                                <div className="text-sm text-[#848E9C]">
                                    ≈ {showBalance ? totalBTC.toFixed(8) : "******"} BTC
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={() => setActiveModal("deposit")} className="flex-1 bg-[#F7A600] text-black hover:bg-[#F7A600]/90 font-bold">Deposit</Button>
                                <Button onClick={() => setActiveModal("withdraw")} variant="secondary" className="flex-1 bg-[#2B3139] hover:bg-[#474D57] text-[#EAECEF]">Withdraw</Button>
                                <Button onClick={() => setActiveModal("transfer")} variant="secondary" className="flex-1 bg-[#2B3139] hover:bg-[#474D57] text-[#EAECEF]">Transfer</Button>
                            </div>
                        </CardContent>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7A600]/5 blur-3xl rounded-full pointer-events-none" />
                    </Card>

                    {/* Quick PNL Cards */}
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <Card className="border-[#2B3139] bg-[#15181D] flex flex-col justify-center p-4">
                            <p className="text-xs text-[#848E9C] uppercase mb-2">Today's PNL</p>
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-mono font-bold text-profit">+$1,234.56</p>
                                <ArrowUpRight className="h-4 w-4 text-profit" />
                            </div>
                        </Card>
                        <Card className="border-[#2B3139] bg-[#15181D] flex flex-col justify-center p-4">
                            <p className="text-xs text-[#848E9C] uppercase mb-2">30D PNL</p>
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-mono font-bold text-profit">+$5,678.90</p>
                                <ArrowUpRight className="h-4 w-4 text-profit" />
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="flex-1 flex flex-col">
                    <div className="flex border-b border-[#2B3139] mb-4">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setSearchQuery(""); }}
                                className={cn(
                                    "px-6 py-3 text-sm font-bold transition-colors border-b-2",
                                    activeTab === tab.id
                                        ? "text-[#F7A600] border-[#F7A600]"
                                        : "text-[#848E9C] border-transparent hover:text-[#EAECEF]"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <Card className="flex-1 border-[#2B3139] bg-[#15181D] flex flex-col">

                        {/* Tab Content Controls */}
                        {activeTab !== "history" && (
                            <div className="p-4 border-b border-[#2B3139] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#848E9C]" />
                                    <Input
                                        placeholder="Search coins"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 h-9 bg-[#0B0E11] border-[#2B3139] focus:ring-[#F7A600]"
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                    <label className="flex items-center gap-2 text-[#848E9C] hover:text-[#EAECEF] cursor-pointer">
                                        <input type="checkbox" className="rounded-sm border-[#2B3139] bg-[#0B0E11] text-[#F7A600] focus:ring-0" />
                                        Hide small balances
                                    </label>
                                </div>
                            </div>
                        )}

                        <div className="flex-1 overflow-x-auto">
                            {activeTab === "history" ? (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-[#0B0E11] text-[#848E9C] font-medium uppercase text-xs">
                                        <tr>
                                            <th className="px-4 py-3">Time</th>
                                            <th className="px-4 py-3">Type</th>
                                            <th className="px-4 py-3">Asset</th>
                                            <th className="px-4 py-3 text-right">Amount</th>
                                            <th className="px-4 py-3 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#2B3139]">
                                        {MOCK_HISTORY.map(tx => (
                                            <tr key={tx.id} className="hover:bg-[#2B3139]/50 transition-colors">
                                                <td className="px-4 py-4 text-[#848E9C] font-mono text-xs">{tx.date}</td>
                                                <td className="px-4 py-4 font-bold text-[#EAECEF]">{tx.type}</td>
                                                <td className="px-4 py-4 text-[#EAECEF]">{tx.asset}</td>
                                                <td className="px-4 py-4 text-right font-mono text-[#EAECEF]">{tx.amount}</td>
                                                <td className="px-4 py-4 text-right">
                                                    <span className={cn(
                                                        "text-xs px-2 py-1 rounded-sm",
                                                        tx.status === "Completed" ? "bg-profit/10 text-profit" : "bg-[#F7A600]/10 text-[#F7A600]"
                                                    )}>{tx.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-[#0B0E11] text-[#848E9C] font-medium uppercase text-xs">
                                        <tr>
                                            <th className="px-4 py-3">Asset</th>
                                            <th className="px-4 py-3 text-right">Balance</th>
                                            <th className="px-4 py-3 text-right">Market Price</th>
                                            <th className="px-4 py-3 text-right">Value (USD)</th>
                                            <th className="px-4 py-3 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#2B3139]">
                                        {filteredAssets.map((asset) => (
                                            <tr key={asset.symbol} className="hover:bg-[#2B3139]/50 transition-colors">
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs", asset.color)}>
                                                            {asset.symbol[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-[#EAECEF]">{asset.symbol}</div>
                                                            <div className="text-xs text-[#848E9C]">{asset.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="font-mono text-[#EAECEF]">{showBalance ? asset.balance.toFixed(8) : "********"}</div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="font-mono text-[#EAECEF]">${asset.price.toFixed(2)}</div>
                                                    <div className={cn("text-xs font-mono", asset.change >= 0 ? "text-profit" : "text-loss")}>
                                                        {asset.change > 0 ? "+" : ""}{asset.change}%
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="font-mono font-bold text-[#EAECEF]">
                                                        ${showBalance ? (asset.balance * asset.price).toLocaleString('en-US', { minimumFractionDigits: 2 }) : "********"}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex justify-end gap-2 text-[#F7A600] font-medium text-xs">
                                                        <button className="hover:text-[#F7A600]/80">Trade</button>
                                                        <span className="text-[#2B3139]">|</span>
                                                        <button className="hover:text-[#F7A600]/80" onClick={() => setActiveModal("deposit")}>Deposit</button>
                                                        <span className="text-[#2B3139]">|</span>
                                                        <button className="hover:text-[#F7A600]/80" onClick={() => setActiveModal("withdraw")}>Withdraw</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {activeTab !== "history" && filteredAssets.length === 0 && (
                                <div className="p-8 text-center text-[#848E9C]">
                                    No assets found matching "{searchQuery}"
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
}
