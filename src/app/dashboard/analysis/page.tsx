"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, ArrowDownRight, Calendar, Download, Share2 } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from "recharts";
import { cn } from "@/lib/utils";

// Mock Data
const PNL_DATA = [
    { date: 'May 01', value: 1200 },
    { date: 'May 05', value: 1500 },
    { date: 'May 10', value: 1100 },
    { date: 'May 15', value: 2400 },
    { date: 'May 20', value: 3800 },
    { date: 'May 25', value: 3200 },
    { date: 'May 30', value: 4500 },
];

const ASSET_ALLOCATION = [
    { name: 'BTC', value: 45, color: '#F7931A' },
    { name: 'ETH', value: 25, color: '#627EEA' },
    { name: 'SOL', value: 15, color: '#00FFA3' },
    { name: 'USDT', value: 10, color: '#26A17B' },
    { name: 'Others', value: 5, color: '#848E9C' },
];

const MONTHLY_VOLUME = [
    { month: 'Jan', volume: 45000 },
    { month: 'Feb', volume: 52000 },
    { month: 'Mar', volume: 38000 },
    { month: 'Apr', volume: 65000 },
    { month: 'May', volume: 48000 },
    { month: 'Jun', volume: 72000 },
];

export default function AnalysisPage() {
    return (
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto text-[#EAECEF]">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold font-sans">Trading Analysis</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-xs h-8 bg-[#15181D] border-[#2B3139] text-[#848E9C] hover:text-[#EAECEF]">
                        <Calendar className="h-3 w-3 mr-2" /> Last 30 Days
                    </Button>
                    <Button variant="outline" className="text-xs h-8 bg-[#15181D] border-[#2B3139] text-[#848E9C] hover:text-[#EAECEF]">
                        <Download className="h-3 w-3 mr-2" /> Export
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Profit", value: "+$4,521.23", change: "+12.5%", isGood: true },
                    { label: "Win Rate", value: "68.5%", change: "+2.1%", isGood: true },
                    { label: "Total Volume", value: "$421,500", change: "-5.4%", isGood: false },
                    { label: "Fees Paid", value: "$321.45", change: "-1.2%", isGood: true } // Lower fees is good
                ].map((stat, i) => (
                    <Card key={i} className="border-[#2B3139] bg-[#15181D]">
                        <CardContent className="p-4">
                            <p className="text-xs text-[#848E9C] font-bold uppercase tracking-wider">{stat.label}</p>
                            <div className="mt-2 flex items-baseline justify-between">
                                <h3 className="text-xl font-bold font-mono">{stat.value}</h3>
                                <span className={cn(
                                    "text-xs font-mono flex items-center",
                                    stat.isGood ? "text-profit" : "text-loss"
                                )}>
                                    {stat.isGood ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                    {stat.change}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main PNL Chart */}
                <Card className="lg:col-span-2 border-[#2B3139] bg-[#15181D]">
                    <CardHeader className="border-b border-[#2B3139] py-4">
                        <CardTitle className="text-sm font-bold text-[#EAECEF]">Cumulative PNL (30D)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={PNL_DATA}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2EBD85" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#2EBD85" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2B3139" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#848E9C"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#848E9C"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#15181D', borderColor: '#2B3139', color: '#EAECEF' }}
                                    itemStyle={{ color: '#2EBD85' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2EBD85"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Asset Allocation */}
                <Card className="border-[#2B3139] bg-[#15181D] flex flex-col">
                    <CardHeader className="border-b border-[#2B3139] py-4">
                        <CardTitle className="text-sm font-bold text-[#EAECEF]">Asset Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 flex-1 flex flex-col items-center justify-center relative">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={ASSET_ALLOCATION}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {ASSET_ALLOCATION.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#15181D', borderColor: '#2B3139', color: '#EAECEF' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Legend */}
                        <div className="w-full space-y-2 mt-4">
                            {ASSET_ALLOCATION.map(item => (
                                <div key={item.name} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-[#EAECEF]">{item.name}</span>
                                    </div>
                                    <span className="font-mono text-[#848E9C]">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Volume */}
            <Card className="border-[#2B3139] bg-[#15181D]">
                <CardHeader className="border-b border-[#2B3139] py-4">
                    <CardTitle className="text-sm font-bold text-[#EAECEF]">Monthly Trading Volume</CardTitle>
                </CardHeader>
                <CardContent className="p-4 h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MONTHLY_VOLUME}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2B3139" vertical={false} />
                            <XAxis
                                dataKey="month"
                                stroke="#848E9C"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#848E9C"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value / 1000}k`}
                            />
                            <Tooltip
                                cursor={{ fill: '#2B3139', opacity: 0.4 }}
                                contentStyle={{ backgroundColor: '#15181D', borderColor: '#2B3139', color: '#EAECEF' }}
                            />
                            <Bar dataKey="volume" fill="#F7A600" radius={[2, 2, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
