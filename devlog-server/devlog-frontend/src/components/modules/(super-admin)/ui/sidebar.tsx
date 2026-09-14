"use client";

import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Settings, Home, X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SuperAdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: TrendingUp, label: "Workspaces", href: "/admin/workspaces" },
    { icon: BarChart3, label: "User Management", href: "/admin/users" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 bg-zinc-900 border-b border-zinc-800 w-full p-4 flex justify-between items-center h-16">
        <Link href={'/'} className="flex items-center gap-2">
        <h1 className="text-lg font-bold text-zinc-100">DevLog</h1>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-zinc-400 hover:text-purple-400"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Sidebar - Desktop and Mobile */}
      <aside
        className={`fixed left-0 top-16 lg:top-0 h-[calc(100vh-4rem)] lg:h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col py-6 px-4 z-40 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo - Hidden on mobile */}
        <Link href={'/'} className="hidden lg:block mb-10 px-2">
          <h1 className="text-lg font-bold tracking-tighter text-zinc-100">
            DevLog 
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 font-semibold text-xs sm:text-sm rounded-lg transition-colors duration-200 ${
                item.href === pathname
                  ? "text-purple-300 bg-purple-500/10 border-l-2 border-purple-500"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto px-2">
          <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-lg py-2.5 transition-colors text-xs sm:text-sm">
            View Reports
          </Button>
          <div className="mt-6 flex items-center gap-3">
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-zinc-100 truncate">
                Admin User
              </p>
              <p className="text-[10px] text-zinc-500">Owner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
