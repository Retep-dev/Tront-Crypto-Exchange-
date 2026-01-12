"use client";

import { useState } from "react";
import { CreditCard, Landmark, Banknote, ChevronDown, ArrowRight, RefreshCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const PAYMENT_METHODS = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, fee: '2%', time: 'Instant' },
    { id: 'bank', name: 'Bank Transfer', icon: Landmark, fee: '0%', time: '1-3 Days' },
    { id: 'p2p', name: 'P2P Trading', icon: Banknote, fee: '0%', time: 'Variable' },
];

const CRYPTO_OPTIONS = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', price: 64231.50 },
    { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', price: 3452.12 },
    { symbol: 'USDT', name: 'Tether', icon: '₮', price: 1.00 },
    { symbol: 'SOL', name: 'Solana', icon: '◎', price: 145.67 },
];

export default function BuyCryptoPage() {
    const [spendAmount, setSpendAmount] = useState<string>("1000");
    const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].id);
    const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0]);

    const receiveAmount = (parseFloat(spendAmount || "0") / selectedCrypto.price * 0.98).toFixed(6);

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">

            {/* Left Column: Input Form */}
            <div className="flex-1 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#EAECEF] mb-1">Buy Crypto</h1>
                    <p className="text-[#848E9C]">Fast, secure, and low fees.</p>
                </div>

                <div className="space-y-4">
                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-3 gap-2">
                        {PAYMENT_METHODS.map((method) => (
                            <button
                                key={method.id}
                                onClick={() => setSelectedMethod(method.id)}
                                className={cn(
                                    "flex flex-col items-center justify-center p-3 rounded-sm border transition-all gap-2",
                                    selectedMethod === method.id
                                        ? "bg-[#2B3139] border-[#F7A600] text-[#EAECEF]"
                                        : "bg-[#15181D] border-[#2B3139] text-[#848E9C] hover:bg-[#2B3139]"
                                )}
                            >
                                <method.icon className={cn("h-6 w-6", selectedMethod === method.id ? "text-[#F7A600]" : "text-[#848E9C]")} />
                                <span className="text-xs font-bold text-center">{method.name}</span>
                            </button>
                        ))}
                    </div>

                    <Card className="border-[#2B3139] bg-[#15181D]">
                        <CardContent className="p-6 space-y-6">

                            {/* Spend Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#848E9C] uppercase">I want to spend</label>
                                <div className="relative flex items-center">
                                    <Input
                                        value={spendAmount}
                                        onChange={(e) => setSpendAmount(e.target.value)}
                                        className="h-14 text-2xl font-bold pl-4 pr-24 bg-[#0B0E11] border-[#2B3139] text-[#EAECEF] focus:ring-[#F7A600]"
                                        placeholder="0.00"
                                    />
                                    <div className="absolute right-2 px-3 py-1.5 rounded-sm bg-[#2B3139] text-[#EAECEF] font-bold text-sm flex items-center gap-1">
                                        USD <ChevronDown className="h-4 w-4 text-[#848E9C]" />
                                    </div>
                                </div>
                            </div>

                            {/* Receive Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#848E9C] uppercase">I will receive</label>
                                <div className="relative flex items-center">
                                    <Input
                                        value={receiveAmount}
                                        readOnly
                                        className="h-14 text-2xl font-bold pl-4 pr-32 bg-[#0B0E11] border-[#2B3139] text-[#EAECEF] focus:ring-[#F7A600]"
                                    />
                                    <div className="absolute right-2">
                                        <button
                                            className="px-3 py-1.5 rounded-sm bg-[#2B3139] text-[#EAECEF] font-bold text-sm flex items-center gap-2 hover:bg-[#474D57] transition-colors"
                                        >
                                            <span className="w-5 h-5 rounded-full bg-[#F7A600] text-black flex items-center justify-center text-xs">
                                                {selectedCrypto.icon}
                                            </span>
                                            {selectedCrypto.symbol}
                                            <ChevronDown className="h-4 w-4 text-[#848E9C]" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Estimated Price */}
                            <div className="flex items-center justify-between text-xs text-[#848E9C] px-1">
                                <span>Estimated Price</span>
                                <div className="flex items-center gap-1 font-mono text-[#EAECEF]">
                                    <RefreshCcw className="h-3 w-3" />
                                    1 {selectedCrypto.symbol} ≈ ${selectedCrypto.price.toLocaleString()} USD
                                </div>
                            </div>

                            <Button className="w-full h-12 text-lg font-bold bg-[#F7A600] text-black hover:bg-[#F7A600]/90">
                                Buy {selectedCrypto.symbol}
                            </Button>

                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:w-96 space-y-6">
                <Card className="border-[#2B3139] bg-[#15181D]">
                    <CardHeader className="border-b border-[#2B3139] pb-4">
                        <CardTitle className="text-base text-[#EAECEF]">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-[#848E9C]">You Spend</span>
                            <span className="font-mono font-bold text-[#EAECEF]">${parseFloat(spendAmount || "0").toFixed(2)} USD</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#848E9C]">Method</span>
                            <span className="text-[#EAECEF] text-right">{PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#848E9C]">Processing Time</span>
                            <span className="text-[#EAECEF] text-right">{PAYMENT_METHODS.find(m => m.id === selectedMethod)?.time}</span>
                        </div>
                        <div className="border-t border-[#2B3139] my-2" />
                        <div className="flex justify-between">
                            <span className="text-[#848E9C]">Service Fee</span>
                            <span className="font-mono text-[#EAECEF]">$5.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#848E9C]">Network Fee</span>
                            <span className="font-mono text-[#EAECEF]">$2.50</span>
                        </div>
                        <div className="border-t border-[#2B3139] my-2" />
                        <div className="flex justify-between items-center">
                            <span className="text-[#EAECEF] font-bold">Total Receive</span>
                            <div className="text-right">
                                <span className="block font-mono font-bold text-xl text-[#F7A600]">{receiveAmount} {selectedCrypto.symbol}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-[#2B3139]/30 rounded-sm p-4 text-xs text-[#848E9C] flex gap-3">
                    <Info className="h-5 w-5 shrink-0 text-[#F7A600]" />
                    <p>Your transaction limit is $50,000 per day. To increase this limit, please verify your identity in Settings.</p>
                </div>
            </div>
        </div>
    );
}
