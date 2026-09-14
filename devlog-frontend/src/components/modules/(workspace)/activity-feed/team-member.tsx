"use client";

import Image from "next/image";

export type RoleType = "ADMIN" | "MEMBER";

interface TeamMemberProps {
  image: string | null;
  name: string;
  role: RoleType;
}

export function TeamMember({ image, name, role }: TeamMemberProps) {
  const roleColors: Record<RoleType, string> = {
    ADMIN: "bg-primary/20 text-primary-container",
    MEMBER: "bg-zinc-800 text-zinc-400",
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container transition-colors group cursor-pointer">
      <div className="relative">
        {image ? (
          <Image
            height={36}
            width={36}
            className="w-9 h-9 rounded-full ring-2 ring-transparent group-hover:ring-primary transition-all object-cover"
            alt={name}
            src={image}
          />
        ) : (
          <div className="w-8 h-8 rounded-xl object-cover hover:grayscale-0 transition-all duration-300 bg-amber-800 flex items-center justify-center text-white font-bold text-2xl">
            <p>{name[0]}</p>
          </div>
        )}

        
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold truncate text-on-background">
            {name}
          </p>
          <span
            className={`text-[9px] ${roleColors[role]} px-1.5 py-0.5 rounded uppercase font-bold`}
          >
            {role}
          </span>
        </div>
        <p className="text-[10px] text-zinc-500">{status}</p>
      </div>
    </div>
  );
}
