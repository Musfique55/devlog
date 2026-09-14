import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

interface SidebarContentProps {
  activeItem: string;
  navItems: { id: string; label: string; icon: React.ElementType; href: string }[];
  setOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const SidebarContent = ({ activeItem, navItems, setOpen, handleLogout }: SidebarContentProps) => (
    <div className="flex flex-col h-full py-8 px-2 md:px-4">
      {/* Logo */}
      <Link href={"/"} className="mb-10 px-4" onClick={() => setOpen(false)}>
        <h1 className="text-xl font-bold tracking-tighter text-primary">DevLog</h1>
        <p className="text-sm font-medium text-zinc-500 tracking-tight">Developer Workspace</p>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-primary font-semibold bg-primary/10 border-r-2 border-primary"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 px-4 py-3 h-auto"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" /> Logout
        </Button>
      </nav>

      {/* Create Log Button */}
      <div className="mt-auto px-4">
        <Link href={"/dashboard#create-log"} onClick={() => setOpen(false)}>
          <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-bold py-3 rounded-lg shadow-lg shadow-primary/20">
            Create Log
          </Button>
        </Link>
      </div>
    </div>
  );


  export default SidebarContent;