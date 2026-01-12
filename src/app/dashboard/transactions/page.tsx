"use client";

import { useState } from "react";
import { Search, Filter, Download, XCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Mock Data for Crypto Orders
const OPEN_ORDERS = [
    { id: "1", pair: "BTC/USDT", type: "Limit", side: "Buy", price: "63,500.00", amount: "0.5000", filled: "0.00%", total: "31,750.00", date: "2024-05-15 14:30:00" },
    { id: "2", pair: "ETH/USDT", type: "Limit", side: "Sell", price: "3,500.00", amount: "10.000", filled: "25.00%", total: "35,000.00", date: "2024-05-15 12:15:00" },
    { id: "3", pair: "SOL/USDT", type: "Stop-Limit", side: "Buy", price: "140.00", amount: "50.00", filled: "0.00%", total: "7,000.00", date: "2024-05-14 09:45:00" },
];

const ORDER_HISTORY = [
    { id: "4", pair: "BTC/USDT", type: "Market", side: "Buy", price: "64,120.50", amount: "0.1000", status: "Filled", total: "6,412.05", date: "2024-05-13 18:20:00" },
    { id: "5", pair: "BNB/USDT", type: "Limit", side: "Sell", price: "600.00", amount: "5.0000", status: "Canceled", total: "3,000.00", date: "2024-05-12 10:00:00" },
    { id: "6", pair: "ADA/USDT", type: "Limit", side: "Buy", price: "0.4500", amount: "1000.0", status: "Filled", total: "450.00", date: "2024-05-11 15:30:00" },
];

const TABS = ["Open Orders", "Order History", "Trade History", "Transaction History"];

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState("Open Orders");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 space-y-4">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold font-sans text-[#EAECEF]">Orders</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-xs h-8">
                        <Download className="h-3 w-3 mr-2" /> Export
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#2B3139] flex gap-6">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pb-3 text-sm font-medium transition-colors relative",
                            activeTab === tab ? "text-[#F7A600]" : "text-[#848E9C] hover:text-[#EAECEF]"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTabOrders"
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F7A600]"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center py-2">
                <div className="relative w-64">
                    <Search className="absolute left-2 top-2 h-4 w-4 text-[#848E9C]" />
                    <Input
                        placeholder="Search Pair"
                        className="pl-8 h-8 text-xs bg-[#15181D] border-[#2B3139]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 text-[#848E9C] hover:text-[#EAECEF] hover:bg-[#2B3139]">
                        <Filter className="h-3 w-3 mr-2" /> Type
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[#848E9C] hover:text-[#EAECEF] hover:bg-[#2B3139]">
                        <Clock className="h-3 w-3 mr-2" /> Date
                    </Button>
                </div>
            </div>

            {/* Data Table */}
            <Card className="flex-1 border-[#2B3139] bg-[#15181D] overflow-hidden flex flex-col">
                <div className="overflow-auto flex-1">
                    <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#0B0E11] text-[#848E9C] uppercase sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 font-medium">Time</th>
                                <th className="px-4 py-3 font-medium">Pair</th>
                                <th className="px-4 py-3 font-medium">Type</th>
                                <th className="px-4 py-3 font-medium">Side</th>
                                <th className="px-4 py-3 text-right font-medium">Price</th>
                                <th className="px-4 py-3 text-right font-medium">Amount</th>
                                <th className="px-4 py-3 text-right font-medium">{activeTab === "Open Orders" ? "Filled" : "Total"}</th>
                                <th className="px-4 py-3 text-right font-medium">Action/Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2B3139]">
                            {activeTab === "Open Orders" ? (
                                OPEN_ORDERS.map((order) => (
                                    <tr key={order.id} className="hover:bg-[#2B3139] transition-colors group">
                                        <td className="px-4 py-3 text-[#EAECEF]">{order.date}</td>
                                        <td className="px-4 py-3 font-bold text-[#EAECEF]">{order.pair}</td>
                                        <td className="px-4 py-3 text-[#EAECEF]">{order.type}</td>
                                        <td className={cn("px-4 py-3 font-bold", order.side === "Buy" ? "text-profit" : "text-loss")}>
                                            {order.side}
                                        </td>
                                        <td className="px-4 py-3 text-right text-[#EAECEF]">{order.price}</td>
                                        <td className="px-4 py-3 text-right text-[#EAECEF]">{order.amount}</td>
                                        <td className="px-4 py-3 text-right text-[#EAECEF]">{order.filled}</td>
                                        <td className="px-4 py-3 text-right">
                                            <Button variant="ghost" size="sm" className="h-6 text-[#F7A600] hover:text-[#F7A600] hover:bg-[#F7A600]/10 text-[10px] px-2">Cancel</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                ORDER_HISTORY.map((order) => (
                                    <tr key={order.id} className="hover:bg-[#2B3139] transition-colors group">
                                        <td className="px-4 py-3 text-[#EAECEF]">{order.date}</td>
                                        <td className="px-4 py-3 font-bold text-[#EAECEF]">{order.pair}</td>
                                        <td className="px-4 py-3 text-[#EAECEF]">{order.type}</td>
                                        <td className={cn("px-4 py-3 font-bold", order.side === "Buy" ? "text-profit" : "text-loss")}>
                                            {order.side}
                                        </td>
                                        <td className="px-4 py-3 text-right text-[#EAECEF]">{order.price}</td>
                                        <td className="px-4 py-3 text-right text-[#EAECEF]">{order.amount}</td>
                                        <td className="px-4 py-3 text-right text-[#EAECEF]">{order.total}</td>
                                        <td className="px-4 py-3 text-right">
                                            <span className={cn(
                                                "text-[10px] px-1.5 py-0.5 rounded-sm uppercase font-bold",
                                                order.status === "Filled" ? "bg-profit/10 text-profit" : "bg-[#2B3139] text-[#848E9C]"
                                            )}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {((activeTab === "Open Orders" && OPEN_ORDERS.length === 0) || (activeTab === "Order History" && ORDER_HISTORY.length === 0)) && (
                        <div className="flex flex-col items-center justify-center p-12 text-[#848E9C]">
                            <Search className="h-8 w-8 mb-2 opacity-20" />
                            <p>No orders found</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
