"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Lock, Mail, User } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
    const login = useAuthStore((state) => state.login);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            login({ id: "1", name: "John Doe", email: "trader@tront.pro", role: "user" }, "token");
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#0B0E11] flex flex-col justify-center items-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#F7A600]/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#26A17B]/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md z-10"
            >
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 text-[#848E9C] hover:text-[#EAECEF] transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-sm bg-[#F7A600] flex items-center justify-center text-black font-bold text-xl">T</div>
                        <span className="font-bold text-3xl tracking-tighter text-[#EAECEF]">Tront<span className="text-[#F7A600]">.</span>Pro</span>
                    </div>
                    <p className="text-[#848E9C]">Join the future of trading.</p>
                </div>

                <Card className="border-[#2B3139] bg-[#15181D]/80 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="space-y-1 pb-6 border-b border-[#2B3139]">
                        <CardTitle className="text-2xl font-bold text-center text-[#EAECEF]">Create Account</CardTitle>
                        <CardDescription className="text-center text-[#848E9C]">
                            Get started with your free account today
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#848E9C]">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-[#848E9C]" />
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        className="bg-[#0B0E11] border-[#2B3139] pl-9 text-[#EAECEF] focus:border-[#F7A600]"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#848E9C]">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#848E9C]" />
                                    <Input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="bg-[#0B0E11] border-[#2B3139] pl-9 text-[#EAECEF] focus:border-[#F7A600]"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#848E9C]">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#848E9C]" />
                                    <Input
                                        type="password"
                                        placeholder="Create a password"
                                        className="bg-[#0B0E11] border-[#2B3139] pl-9 text-[#EAECEF] focus:border-[#F7A600]"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-[#848E9C]">Must be at least 8 characters</p>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-[#F7A600] hover:bg-[#F7A600]/90 text-black font-bold h-10 mt-2"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#2B3139]"></span></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#15181D] px-2 text-[#848E9C]">Or register with</span></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="bg-[#0B0E11] border-[#2B3139] hover:bg-[#2B3139] text-[#EAECEF]">
                                Google
                            </Button>
                            <Button variant="outline" className="bg-[#0B0E11] border-[#2B3139] hover:bg-[#2B3139] text-[#EAECEF]">
                                Apple
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-center border-t border-[#2B3139] pt-6 pb-6">
                        <p className="text-sm text-[#848E9C]">
                            Already have an account? <Link href="/login" className="text-[#F7A600] hover:underline font-bold">Log in</Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
