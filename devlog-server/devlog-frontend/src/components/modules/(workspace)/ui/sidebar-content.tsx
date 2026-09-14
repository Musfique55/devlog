import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface SidebarContentsProps {
    navItems: {
        icon: React.ElementType;
        label: string;
        href: string;
      }[];
      setIsSheetOpen: (value: boolean) => void;
      setIsModalOpen: (value: boolean) => void;
      pathname: string;
}


const SidebarContents = ({navItems, setIsSheetOpen, setIsModalOpen, pathname} : SidebarContentsProps) => {
    return (
        <div className="flex flex-col h-full py-6 px-4">
      {/* Logo */}
      <Link 
        href={"/"} 
        className="mb-10 px-2" 
        onClick={() => setIsSheetOpen(false)}
      >
        <h1 className="text-lg font-bold tracking-tighter text-primary">
          DevLog
        </h1>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map(
          (item) =>
            item && (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsSheetOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 font-semibold transition-colors duration-200 text-sm rounded-lg ${
                  pathname === item.href
                    ? "text-primary bg-primary/10 border-r-2 border-primary"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/20"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            ),
        )}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto px-2">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setIsSheetOpen(false);
          }}
          className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-lg py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm"
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span>New Log</span>
        </Button>
      </div>
    </div>
    );
};

export default SidebarContents;