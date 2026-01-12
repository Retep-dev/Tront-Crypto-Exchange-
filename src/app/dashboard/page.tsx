"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, TrendingUp, Clock, Wallet, Search, Bell, Menu, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Mock Market Data
const PAIRS = [
    { pair: "BTC/USDT", price: 64231.50, change: 2.45, vol: "45.2B", decimals: 2 },
    { pair: "ETH/USDT", price: 3452.12, change: -1.20, vol: "18.5B", decimals: 2 },
    { pair: "SOL/USDT", price: 145.67, change: 5.67, vol: "8.2B", decimals: 2 },
    { pair: "BNB/USDT", price: 590.23, change: 0.45, vol: "2.1B", decimals: 2 },
    { pair: "XRP/USDT", price: 0.6234, change: -0.89, vol: "1.5B", decimals: 4 },
    { pair: "ADA/USDT", price: 0.4521, change: 1.12, vol: "890M", decimals: 4 },
];

const INITIAL_ORDER_BOOK = {
    asks: [
        { price: 64235.50, amount: 0.4521 },
        { price: 64234.00, amount: 1.2000 },
        { price: 64233.50, amount: 0.0500 },
        { price: 64232.00, amount: 0.8900 },
        { price: 64231.50, amount: 2.5000 },
    ],
    bids: [
        { price: 64231.00, amount: 0.1200 },
        { price: 64230.50, amount: 0.5000 },
        { price: 64229.00, amount: 1.5000 },
        { price: 64228.50, amount: 0.3300 },
        { price: 64225.00, amount: 5.0000 },
    ]
};

export default function TradingDashboard() {
    const [selectedPair, setSelectedPair] = useState(PAIRS[0]);
    const [price, setPrice] = useState(selectedPair.price.toString());
    const [amount, setAmount] = useState("");
    const [side, setSide] = useState<"buy" | "sell">("buy");
    const [timeframe, setTimeframe] = useState("1H");
    const [chartKey, setChartKey] = useState(0); // Force re-render chart animation
    const [recentTrades, setRecentTrades] = useState<{ price: number, amount: number, time: string, side: 'buy' | 'sell' }[]>([]);
    const [notification, setNotification] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"orderbook" | "trades">("orderbook");

    // Update form when pair changes
    useEffect(() => {
        setPrice(selectedPair.price.toString());
        setAmount("");
        setChartKey(k => k + 1); // Reset chart animation
    }, [selectedPair]);

    const handlePairSelect = (pair: typeof PAIRS[0]) => {
        setSelectedPair(pair);
    };

    const handleOrderBookClick = (p: number) => {
        setPrice(p.toFixed(selectedPair.decimals));
    };

    const handlePlaceOrder = () => {
        if (!amount || parseFloat(amount) <= 0) {
            showNotification("Invalid Amount");
            return;
        }

        // Mock execution
        const newTrade = {
            price: parseFloat(price),
            amount: parseFloat(amount),
            time: new Date().toLocaleTimeString(),
            side: side
        };

        setRecentTrades([newTrade, ...recentTrades].slice(0, 10));
        showNotification(`Order Placed: ${side.toUpperCase()} ${amount} ${selectedPair.pair.split('/')[0]} @ ${price}`);
        setAmount("");
    };

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-2 gap-2 bg-[#0B0E11] text-[#EAECEF] font-sans">

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-20 right-4 z-50 bg-[#2B3139] border border-[#F7A600] text-[#EAECEF] px-4 py-2 rounded-sm shadow-lg flex items-center gap-2"
                    >
                        <CheckCircle className="h-4 w-4 text-[#F7A600]" />
                        <span className="text-sm font-bold">{notification}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ticker Tape */}
            <div className="flex items-center gap-6 overflow-x-auto border-b border-[#2B3139] pb-2 scrollbar-hide shrink-0">
                {PAIRS.map((pair) => (
                    <button
                        key={pair.pair}
                        onClick={() => handlePairSelect(pair)}
                        className={cn(
                            "flex items-center gap-2 whitespace-nowrap min-w-max px-2 py-1 rounded-sm transition-colors",
                            selectedPair.pair === pair.pair ? "bg-[#2B3139]" : "hover:bg-[#15181D]"
                        )}
                    >
                        <span className="font-bold text-xs">{pair.pair}</span>
                        <span className={cn("text-xs font-mono", pair.change >= 0 ? "text-profit" : "text-loss")}>
                            {pair.price}
                        </span>
                        <span className={cn("text-[10px] px-1 rounded-sm", pair.change >= 0 ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss")}>
                            {pair.change > 0 ? "+" : ""}{pair.change}%
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-12 gap-2 min-h-0">

                {/* Left Panel: Market Pairs */}
                <Card className="col-span-12 lg:col-span-3 xl:col-span-2 flex flex-col border-[#2B3139] bg-[#15181D]">
                    <div className="p-3 border-b border-[#2B3139]">
                        <Input placeholder="Search Coin" className="h-8 text-xs bg-[#2B3139] border-none focus:ring-1 focus:ring-[#F7A600]" />
                    </div>
                    <div className="flex text-[10px] text-[#848E9C] p-2 font-bold uppercase">
                        <span className="flex-1">Pair</span>
                        <span className="flex-1 text-right">Price</span>
                        <span className="w-12 text-right">24h</span>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {PAIRS.map((pair) => (
                            <div
                                key={pair.pair}
                                onClick={() => handlePairSelect(pair)}
                                className={cn(
                                    "flex items-center justify-between p-2 cursor-pointer group transition-colors",
                                    selectedPair.pair === pair.pair ? "bg-[#2B3139]" : "hover:bg-[#2B3139]"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <Star className={cn("h-3 w-3", selectedPair.pair === pair.pair ? "text-[#F7A600]" : "text-[#848E9C] group-hover:text-[#F7A600]")} />
                                    <span className="text-xs font-bold text-[#EAECEF]">{pair.pair.split('/')[0]}</span>
                                </div>
                                <div className="text-right">
                                    <div className={cn("text-xs font-mono group-hover:text-[#EAECEF]", pair.change >= 0 ? "text-profit" : "text-loss")}>
                                        {pair.price}
                                    </div>
                                </div>
                                <div className="w-12 text-right">
                                    <div className={cn("text-[10px]", pair.change >= 0 ? "text-profit" : "text-loss")}>
                                        {pair.change}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Center Panel: Chart & Stats */}
                <div className="col-span-12 lg:col-span-6 xl:col-span-7 flex flex-col gap-2">

                    {/* Header Stats */}
                    <Card className="flex items-center justify-between p-4 border-[#2B3139] bg-[#15181D]">
                        <div className="flex items-center gap-4">
                            <h1 className="text-xl font-bold font-sans">{selectedPair.pair}</h1>
                            <span className="text-xs bg-[#2B3139] px-2 py-1 rounded text-[#F7A600]">Perpetual</span>
                        </div>
                        <div className="flex gap-8 text-xs">
                            <div>
                                <p className="text-[#848E9C]">Last Price</p>
                                <p className={cn("text-lg font-mono font-bold", selectedPair.change >= 0 ? "text-profit" : "text-loss")}>
                                    {selectedPair.price}
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-[#848E9C]">24h Change</p>
                                <p className={cn("font-mono", selectedPair.change >= 0 ? "text-profit" : "text-loss")}>
                                    {selectedPair.change > 0 ? "+" : ""}{selectedPair.change}%
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-[#848E9C]">24h Volume</p>
                                <p className="font-mono text-[#EAECEF]">{selectedPair.vol}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Main Chart Area */}
                    <Card className="flex-1 relative border-[#2B3139] bg-[#15181D] overflow-hidden min-h-[400px]">
                        <div className="absolute top-2 left-2 flex gap-2 z-10">
                            {['15m', '1H', '4H', '1D', '1W'].map(tf => (
                                <button
                                    key={tf}
                                    onClick={() => { setTimeframe(tf); setChartKey(k => k + 1); }}
                                    className={cn(
                                        "text-xs px-2 py-1 rounded-sm transition-colors font-medium",
                                        timeframe === tf ? "bg-[#2B3139] text-[#EAECEF]" : "text-[#848E9C] hover:text-[#EAECEF] hover:bg-[#2B3139]"
                                    )}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>

                        {/* CSS Mock Chart Grid */}
                        <div className="absolute inset-0 pt-10 pb-6 pr-14 pl-2 grid grid-cols-12 grid-rows-6 gap-[1px] opacity-10 pointer-events-none">
                            {Array.from({ length: 72 }).map((_, i) => (
                                <div key={i} className="border-r border-t border-[#848E9C]"></div>
                            ))}
                        </div>

                        {/* TradingView-like Mock Candles */}
                        <div key={chartKey} className="absolute inset-0 pt-10 pb-6 pr-14 pl-2 flex items-end justify-between px-8 gap-1">
                            {Array.from({ length: 40 }).map((_, i) => {
                                const height = Math.random() * 60 + 20;
                                const isGreen = Math.random() > 0.45;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ delay: i * 0.02, duration: 0.5 }}
                                        className="relative w-full flex justify-center group"
                                        style={{ height: `${height}%` }}
                                    >
                                        <div className={cn("w-[1px] h-full absolute", isGreen ? "bg-profit" : "bg-loss")}></div>
                                        <div className={cn("w-[80%] absolute top-[10%] bottom-[10%]", isGreen ? "bg-profit" : "bg-loss")}></div>
                                        {/* Hover Tooltip */}
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2B3139] text-[10px] px-2 py-1 rounded text-white opacity-0 group-hover:opacity-100 pointer-events-none z-20 whitespace-nowrap">
                                            Open: {(selectedPair.price * (1 + (Math.random() * 0.01))).toFixed(2)}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Y-Axis Price Labels */}
                        <div className="absolute top-10 right-0 bottom-6 w-12 flex flex-col justify-between text-[10px] text-[#848E9C] font-mono py-2 text-right pr-1">
                            <span>{(selectedPair.price * 1.02).toFixed(0)}</span>
                            <span>{(selectedPair.price * 1.01).toFixed(0)}</span>
                            <span>{(selectedPair.price).toFixed(0)}</span>
                            <span>{(selectedPair.price * 0.99).toFixed(0)}</span>
                            <span>{(selectedPair.price * 0.98).toFixed(0)}</span>
                        </div>
                    </Card>
                </div>

                {/* Right Panel: Order Book & Trades */}
                <div className="col-span-12 lg:col-span-3 xl:col-span-3 flex flex-col gap-2">
                    <Card className="flex-1 flex flex-col border-[#2B3139] bg-[#15181D]">
                        <div className="flex border-b border-[#2B3139]">
                            <button
                                onClick={() => setActiveTab("orderbook")}
                                className={cn(
                                    "flex-1 py-3 text-xs font-bold transition-colors border-b-2",
                                    activeTab === "orderbook"
                                        ? "text-[#F7A600] border-[#F7A600]"
                                        : "text-[#848E9C] border-transparent hover:text-[#EAECEF]"
                                )}
                            >
                                Order Book
                            </button>
                            <button
                                onClick={() => setActiveTab("trades")}
                                className={cn(
                                    "flex-1 py-3 text-xs font-bold transition-colors border-b-2",
                                    activeTab === "trades"
                                        ? "text-[#F7A600] border-[#F7A600]"
                                        : "text-[#848E9C] border-transparent hover:text-[#EAECEF]"
                                )}
                            >
                                Recent Trades
                            </button>
                        </div>

                        {activeTab === "orderbook" ? (
                            <>
                                {/* Order Book Header */}
                                <div className="grid grid-cols-3 text-[10px] text-[#848E9C] p-2 font-bold uppercase">
                                    <span>Price (USDT)</span>
                                    <span className="text-right">Amount</span>
                                    <span className="text-right">Total</span>
                                </div>

                                {/* Asks (Sells) */}
                                <div className="flex-1 flex flex-col justify-end gap-[1px] overflow-hidden pb-1">
                                    {INITIAL_ORDER_BOOK.asks.slice().reverse().map((ask, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleOrderBookClick(ask.price)}
                                            className="grid grid-cols-3 text-[11px] font-mono relative cursor-pointer hover:bg-[#2B3139] px-2 py-[2px]"
                                        >
                                            <div className="absolute top-0 right-0 h-full bg-loss/10" style={{ width: `${Math.random() * 80}%` }}></div>
                                            <span className="text-loss relative z-10">{ask.price.toFixed(selectedPair.decimals)}</span>
                                            <span className="text-[#EAECEF] text-right relative z-10">{ask.amount.toFixed(4)}</span>
                                            <span className="text-[#EAECEF] text-right relative z-10">{(ask.price * ask.amount).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Current Price */}
                                <div className="py-2 px-4 border-y border-[#2B3139] flex items-center justify-center gap-2">
                                    <span className={cn("text-lg font-bold font-mono", selectedPair.change >= 0 ? "text-profit" : "text-loss")}>
                                        {selectedPair.price}
                                    </span>
                                    {selectedPair.change >= 0 ? <ArrowUp className="h-4 w-4 text-profit" /> : <ArrowDown className="h-4 w-4 text-loss" />}
                                </div>

                                {/* Bids (Buys) */}
                                <div className="flex-1 flex flex-col gap-[1px] overflow-hidden pt-1">
                                    {INITIAL_ORDER_BOOK.bids.map((bid, i) => (
                                        <div
                                            key={i}
                                            onClick={() => handleOrderBookClick(bid.price)}
                                            className="grid grid-cols-3 text-[11px] font-mono relative cursor-pointer hover:bg-[#2B3139] px-2 py-[2px]"
                                        >
                                            <div className="absolute top-0 right-0 h-full bg-profit/10" style={{ width: `${Math.random() * 80}%` }}></div>
                                            <span className="text-profit relative z-10">{bid.price.toFixed(selectedPair.decimals)}</span>
                                            <span className="text-[#EAECEF] text-right relative z-10">{bid.amount.toFixed(4)}</span>
                                            <span className="text-[#EAECEF] text-right relative z-10">{(bid.price * bid.amount).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col h-full">
                                <div className="grid grid-cols-3 text-[10px] text-[#848E9C] p-2 font-bold uppercase">
                                    <span>Price (USDT)</span>
                                    <span className="text-right">Amount</span>
                                    <span className="text-right">Time</span>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    {/* Mock some initial/recent trades if empty + user trades */}
                                    {[...recentTrades,
                                    { price: selectedPair.price, amount: 0.05, time: '14:32:01', side: 'buy' },
                                    { price: selectedPair.price * 1.001, amount: 0.12, time: '14:31:55', side: 'sell' },
                                    { price: selectedPair.price * 0.999, amount: 0.55, time: '14:31:40', side: 'buy' },
                                    { price: selectedPair.price, amount: 0.01, time: '14:31:05', side: 'buy' },
                                    { price: selectedPair.price * 0.998, amount: 1.25, time: '14:30:12', side: 'sell' }
                                    ].map((trade, i) => (
                                        <div key={i} className="grid grid-cols-3 text-[11px] font-mono px-2 py-1.5 hover:bg-[#2B3139]">
                                            <span className={trade.side === 'buy' ? "text-profit" : "text-loss"}>{trade.price.toFixed(selectedPair.decimals)}</span>
                                            <span className="text-[#EAECEF] text-right">{trade.amount}</span>
                                            <span className="text-[#848E9C] text-right">{trade.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Order Entry */}
                    <Card className="p-4 border-[#2B3139] bg-[#15181D]">
                        <div className="flex gap-2 mb-4">
                            <Button
                                onClick={() => setSide("buy")}
                                className={cn(
                                    "flex-1 border-none font-bold transition-all",
                                    side === "buy" ? "bg-profit hover:bg-profit/90 text-white" : "bg-[#2B3139] text-[#848E9C] hover:bg-[#474D57]"
                                )}
                            >
                                Buy Long
                            </Button>
                            <Button
                                onClick={() => setSide("sell")}
                                className={cn(
                                    "flex-1 border-none font-bold transition-all",
                                    side === "sell" ? "bg-loss hover:bg-loss/90 text-white" : "bg-[#2B3139] text-[#848E9C] hover:bg-[#474D57]"
                                )}
                            >
                                Sell Short
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-[10px] text-[#848E9C] uppercase font-bold">Price (USDT)</label>
                                <div className="flex items-center">
                                    <Input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="font-mono text-right bg-[#0B0E11] border-[#2B3139] focus:ring-[#F7A600]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] text-[#848E9C] uppercase font-bold">Amount ({selectedPair.pair.split('/')[0]})</label>
                                <div className="flex items-center">
                                    <Input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="font-mono text-right bg-[#0B0E11] border-[#2B3139] focus:ring-[#F7A600]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2 pt-2">
                                {['10%', '25%', '50%', '100%'].map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setAmount((Math.random() * 2).toFixed(4))} // Mock balance calc
                                        className="text-[10px] bg-[#2B3139] text-[#EAECEF] rounded-sm py-1 hover:bg-[#474D57]"
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between text-[10px] text-[#848E9C] pt-2">
                                <span>Total (USDT)</span>
                                <span className="font-mono text-[#EAECEF] font-bold">
                                    {((parseFloat(price) || 0) * (parseFloat(amount) || 0)).toFixed(2)}
                                </span>
                            </div>

                            <Button
                                onClick={handlePlaceOrder}
                                className={cn(
                                    "w-full mt-2 font-bold text-white transition-all",
                                    side === "buy" ? "bg-profit hover:bg-profit/90" : "bg-loss hover:bg-loss/90"
                                )}
                            >
                                {side === "buy" ? "Buy" : "Sell"} {selectedPair.pair.split('/')[0]}
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
