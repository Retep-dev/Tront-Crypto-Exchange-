"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Shield, Globe, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CryptoTicker = () => {
  const tickers = [
    { pair: "BTC/USDT", price: "64,231.50", change: "+2.45%", up: true },
    { pair: "ETH/USDT", price: "3,452.12", change: "-1.20%", up: false },
    { pair: "SOL/USDT", price: "145.67", change: "+5.67%", up: true },
    { pair: "BNB/USDT", price: "590.23", change: "+0.45%", up: true },
    { pair: "XRP/USDT", price: "0.6234", change: "-0.89%", up: false },
    { pair: "ADA/USDT", price: "0.4567", change: "+1.12%", up: true },
    { pair: "DOGE/USDT", price: "0.1234", change: "-3.45%", up: false },
    { pair: "DOT/USDT", price: "7.89", change: "+0.56%", up: true },
  ];

  return (
    <div className="w-full bg-[#0B0E11] border-b border-[#2B3139] overflow-hidden py-3">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...tickers, ...tickers, ...tickers].map((t, i) => (
          <div key={i} className="flex items-center gap-2 mx-6 text-sm font-mono">
            <span className="font-bold text-[#EAECEF]">{t.pair}</span>
            <span className={cn(t.up ? "text-[#26A17B]" : "text-[#F6465D]")}>{t.price}</span>
            <span className={cn("text-xs", t.up ? "text-[#26A17B]" : "text-[#F6465D]")}>{t.change}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0E11] text-[#EAECEF] selection:bg-[#F7A600]/30 selection:text-white">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#0B0E11]/80 backdrop-blur-md border-b border-[#2B3139]">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-sm bg-[#F7A600] flex items-center justify-center text-black font-bold text-xl">T</div>
            <span className="font-bold text-2xl tracking-tighter text-[#EAECEF]">Tront<span className="text-[#F7A600]">.</span>Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#848E9C]">
            <Link href="#" className="hover:text-[#F7A600] transition-colors">Markets</Link>
            <Link href="#" className="hover:text-[#F7A600] transition-colors">Exchange</Link>
            <Link href="#" className="hover:text-[#F7A600] transition-colors">Derivatives</Link>
            <Link href="#" className="hover:text-[#F7A600] transition-colors">Earn</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-[#EAECEF] hover:text-[#F7A600] hover:bg-transparent px-2 font-medium">Log In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-[#F7A600] hover:bg-[#F7A600]/90 text-black font-bold h-10 px-6 rounded-sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F7A600]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#26A17B]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
          </div>

          <div className="z-10 max-w-5xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2B3139] bg-[#15181D]/50 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#26A17B] animate-pulse" />
              <span className="text-sm font-mono text-[#848E9C]">Zero Fees on First Deposit</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight"
            >
              Trade the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7A600] to-[#FFD700]">Future</span> <br />
              of Finance.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-[#848E9C] max-w-2xl mx-auto leading-relaxed"
            >
              Experience lightning-fast execution, deep liquidity, and bank-grade security on the world's most advanced crypto exchange.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link href="/register">
                <Button className="h-14 px-10 text-lg bg-[#F7A600] hover:bg-[#F7A600]/90 text-black font-bold rounded-sm shadow-[0_0_20px_rgba(247,166,0,0.3)] hover:shadow-[0_0_30px_rgba(247,166,0,0.5)] transition-all">
                  Start Trading Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-4 text-sm text-[#848E9C]">
                <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-[#26A17B]" /> No KYC to Start</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-[#26A17B]" /> 24/7 Support</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Cards Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 w-full max-w-6xl relative z-10"
          >
            <div className="relative rounded-t-xl overflow-hidden border-t border-x border-[#2B3139] bg-[#15181D]/80 backdrop-blur-xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-[#F7A600]/5 to-transparent pointer-events-none" />
              <CryptoTicker />
              <div className="h-[400px] flex items-center justify-center text-[#2B3139] font-mono text-sm relative">
                <div className="absolute inset-0 bg-[url('/chart-grid.svg')] opacity-[0.05]" />
                {/* Abstract representation of UI */}
                <div className="w-full h-full p-8 grid grid-cols-4 gap-6 opacity-30">
                  <div className="col-span-3 border border-[#2B3139] bg-[#0B0E11] rounded" />
                  <div className="col-span-1 border border-[#2B3139] bg-[#0B0E11] rounded space-y-2 p-2">
                    <div className="h-8 bg-[#2B3139] rounded" />
                    <div className="h-8 bg-[#2B3139] rounded" />
                    <div className="h-8 bg-[#2B3139] rounded" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <p className="text-[#848E9C] text-lg">Live Market Data</p>
                    <h3 className="text-4xl font-bold text-[#EAECEF]">$64,231.50</h3>
                    <p className="text-[#26A17B] font-mono">+2.45% (24h)</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-32 border-t border-[#2B3139] bg-[#0B0E11] relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for <span className="text-[#F7A600]">Pro Traders</span></h2>
              <p className="text-xl text-[#848E9C]">Advanced tools, institutional-grade liquidity, and a powerful matching engine. Everything you need to dominate the market.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Ultra-Low Latency", desc: "Microsecond execution speeds ensure you never miss a tick. Our matching engine handles 100k TPS." },
                { icon: Shield, title: "Bank-Grade Security", desc: "Your assets are protected by MPC wallets and cold storage. We sleep so you can trade safely." },
                { icon: BarChart2, title: "Deep Liquidity", desc: "Access the deepest order books in the industry with minimal slippage on all major pairs." },
                { icon: Globe, title: "Global Access", desc: "Trade from anywhere in the world. 24/7 multilingual support ready to assist you anytime." },
                { icon: CheckCircle2, title: "Up to 100x Leverage", desc: "undo: Maximize your capital efficiency with powerful derivatives products and cross-margin." },
                { icon: ArrowRight, title: "API First", desc: "Connect your bots with our robust, high-frequency websocket and REST APIs." },
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-lg border border-[#2B3139] bg-[#15181D] hover:border-[#F7A600]/50 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-32 bg-[#F7A600]/5 blur-[60px] rounded-full translate-x-10 -translate-y-10 group-hover:bg-[#F7A600]/10 transition-colors" />
                  <feature.icon className="h-12 w-12 text-[#F7A600] mb-6 relative z-10" />
                  <h3 className="text-xl font-bold mb-4 text-[#EAECEF] relative z-10">{feature.title}</h3>
                  <p className="text-[#848E9C] leading-relaxed relative z-10">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 border-t border-[#2B3139] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1E2329] to-[#0B0E11]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl font-bold mb-8">Ready to start trading?</h2>
            <div className="flex justify-center gap-4">
              <Link href="/register">
                <Button className="h-14 px-12 text-lg bg-[#F7A600] hover:bg-[#F7A600]/90 text-black font-bold rounded-sm">Create Free Account</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2B3139] bg-[#0B0E11] py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-6 w-6 rounded-sm bg-[#F7A600] flex items-center justify-center text-black font-bold text-xs">T</div>
              <span className="font-bold text-lg tracking-tighter text-[#EAECEF]">Tront<span className="text-[#F7A600]">.</span>Pro</span>
            </div>
            <p className="text-[#848E9C] text-sm">The world's most trusted crypto exchange.</p>
          </div>
          {["Products", "Services", "Support"].map((col, i) => (
            <div key={i}>
              <h4 className="font-bold text-[#EAECEF] mb-6">{col}</h4>
              <ul className="space-y-4 text-sm text-[#848E9C]">
                <li><a href="#" className="hover:text-[#F7A600]">Link 1</a></li>
                <li><a href="#" className="hover:text-[#F7A600]">Link 2</a></li>
                <li><a href="#" className="hover:text-[#F7A600]">Link 3</a></li>
              </ul>
            </div>
          ))}
        </div>
        <div className="container mx-auto px-4 pt-8 border-t border-[#2B3139] text-center text-[#848E9C] text-sm">
          © 2026 Tront Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
