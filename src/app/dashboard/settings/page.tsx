"use client";

import { useState } from "react";
import { User, Shield, Key, Bell, CreditCard, ChevronRight, LogOut, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const SETTINGS_SECTIONS = [
    { id: 'profile', label: 'Profile', icon: User, desc: 'Manage your personal details' },
    { id: 'security', label: 'Security', icon: Shield, desc: '2FA and Password settings' },
    { id: 'api', label: 'API Keys', icon: Key, desc: 'Connect third-party apps' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alert preferences' },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] max-w-7xl mx-auto">

            {/* Sidebar */}
            <div className="w-full md:w-64 border-r border-[#2B3139] bg-[#0B0E11] p-4">
                <h1 className="text-xl font-bold text-[#EAECEF] mb-6 px-2">Settings</h1>
                <nav className="space-y-1">
                    {SETTINGS_SECTIONS.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={cn(
                                "w-full flex items-center text-left px-3 py-3 rounded-sm transition-all group",
                                activeTab === section.id
                                    ? "bg-[#2B3139] text-[#F7A600]"
                                    : "text-[#848E9C] hover:bg-[#15181D] hover:text-[#EAECEF]"
                            )}
                        >
                            <section.icon className={cn("h-4 w-4 mr-3", activeTab === section.id ? "text-[#F7A600]" : "text-[#848E9C] group-hover:text-[#EAECEF]")} />
                            <div>
                                <div className="text-sm font-bold">{section.label}</div>
                            </div>
                            {activeTab === section.id && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0B0E11]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="max-w-2xl space-y-6"
                    >
                        {activeTab === 'profile' && (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#EAECEF]">Profile Settings</h2>
                                    <p className="text-[#848E9C]">Manage your public profile and preferences.</p>
                                </div>

                                <Card className="border-[#2B3139] bg-[#15181D]">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-[#EAECEF]">Personal Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs text-[#848E9C] uppercase font-bold">First Name</label>
                                                <Input defaultValue="John" className="bg-[#0B0E11] border-[#2B3139]" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-[#848E9C] uppercase font-bold">Last Name</label>
                                                <Input defaultValue="Doe" className="bg-[#0B0E11] border-[#2B3139]" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-[#848E9C] uppercase font-bold">Email Address</label>
                                            <Input defaultValue="john.doe@example.com" className="bg-[#0B0E11] border-[#2B3139]" disabled />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-[#848E9C] uppercase font-bold">Username</label>
                                            <Input defaultValue="johndoe_trader" className="bg-[#0B0E11] border-[#2B3139]" />
                                        </div>

                                        <div className="pt-4">
                                            <Button className="bg-[#F7A600] text-black font-bold hover:bg-[#F7A600]/90">Save Changes</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {activeTab === 'security' && (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#EAECEF]">Security</h2>
                                    <p className="text-[#848E9C]">Secure your account with 2FA and strong passwords.</p>
                                </div>

                                <Card className="border-[#2B3139] bg-[#15181D]">
                                    <CardContent className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-[#F7A600]/10 flex items-center justify-center text-[#F7A600]">
                                                <Shield className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#EAECEF]">Two-Factor Authentication (2FA)</h3>
                                                <p className="text-sm text-[#848E9C]">Add an extra layer of security to your account.</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant={is2FAEnabled ? "outline" : "default"}
                                            onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                                            className={cn(
                                                is2FAEnabled ? "border-profit text-profit" : "bg-[#F7A600] text-black font-bold"
                                            )}
                                        >
                                            {is2FAEnabled ? "Enabled" : "Enable 2FA"}
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="border-[#2B3139] bg-[#15181D]">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-[#EAECEF]">Change Password</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs text-[#848E9C] uppercase font-bold">Current Password</label>
                                            <Input type="password" className="bg-[#0B0E11] border-[#2B3139]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-[#848E9C] uppercase font-bold">New Password</label>
                                            <Input type="password" className="bg-[#0B0E11] border-[#2B3139]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-[#848E9C] uppercase font-bold">Confirm New Password</label>
                                            <Input type="password" className="bg-[#0B0E11] border-[#2B3139]" />
                                        </div>
                                        <div className="pt-2">
                                            <Button variant="secondary" className="bg-[#2B3139] text-[#EAECEF] hover:bg-[#474D57]">Update Password</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {activeTab === 'api' && (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#EAECEF]">API Management</h2>
                                    <p className="text-[#848E9C]">Create and manage keys for algorithmic trading.</p>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-sm border border-[#F7A600]/30 bg-[#F7A600]/5 text-[#F7A600]">
                                    <div className="flex items-center gap-2 text-sm font-bold">
                                        <Shield className="h-4 w-4" />
                                        <span>Security Tip: Never share your secret keys with anyone.</span>
                                    </div>
                                </div>

                                <Card className="border-[#2B3139] bg-[#15181D]">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle className="text-lg text-[#EAECEF]">My API Keys</CardTitle>
                                        <Button className="bg-[#EAECEF] text-black hover:bg-white text-xs font-bold h-8">create New Key</Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-8 text-[#848E9C]">
                                            <Key className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                            <p>No active API keys found.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {activeTab === 'notifications' && (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#EAECEF]">Notifications</h2>
                                    <p className="text-[#848E9C]">Choose what you want to be alerted about.</p>
                                </div>

                                <Card className="border-[#2B3139] bg-[#15181D]">
                                    <CardContent className="divide-y divide-[#2B3139]">
                                        {[
                                            'Login Alerts',
                                            'Price Alerts',
                                            'Order Fills',
                                            'Withdrawal Confirmations',
                                            'News & Announcements'
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between py-4">
                                                <span className="text-sm font-bold text-[#EAECEF]">{item}</span>
                                                <div className="h-6 w-10 bg-[#2B3139] rounded-full relative cursor-pointer">
                                                    <div className="absolute right-1 top-1 h-4 w-4 bg-[#F7A600] rounded-full" />
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
