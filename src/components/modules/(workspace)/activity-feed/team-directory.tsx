"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Users } from "lucide-react";
import { RoleType, TeamMember } from "./team-member";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { inviteUserToWorkspace } from "@/services/workspace.services";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Member } from "@/hooks/useWorkspace";
import SubscriptionAlert from "@/components/ui/subscription-alert";

interface TeamDirectoryProps {
  members: Member[];
  workspaceId: string;
  isAdmin: "ADMIN" | "MEMBER";
}

export function TeamDirectory({
  members,
  workspaceId,
  isAdmin,
}: TeamDirectoryProps) {
  const [open, setOpen] = useState(false);
  const { data: user } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { email: string; workspaceId: string }) => {
      const result = await inviteUserToWorkspace(payload);
      return result;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const payload = {
      email,
      workspaceId,
    };
    try {
      const res = await mutateAsync(payload);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setOpen(false);
      toast.success(res.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <aside className="w-full fixed bg-zinc-900/60 h-screen flex flex-col p-4 sm:p-6 overflow-y-auto border-l border-white/50">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-zinc-500 mb-4 sm:mb-6">
          Team Directory
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {members.map((member) => (
            <TeamMember
              key={member.id}
              image={member.user.image}
              name={member.user.name}
              role={member.role as RoleType}
            />
          ))}
        </div>
      </div>

      {/* Invite CTA */}
      {isAdmin === "ADMIN" ? (
        <div className="mt-auto bg-surface-container-highest/30 rounded-xl p-3 sm:p-4 border border-white/5">
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary flex-shrink-0" />
            <p className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-on-background truncate">
              Invite Team
            </p>
          </div>
          <p className="text-[9px] sm:text-[10px] text-zinc-500 mb-2 sm:mb-3 line-clamp-2">
            Collaborate with your team by inviting new members.
          </p>
          <Button
            onClick={() => setOpen(!open)}
            className="w-full text-[9px] sm:text-xs py-1.5 sm:py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg font-bold transition-colors cursor-pointer"
          >
            Send Invite
          </Button>
        </div>
      ) : null}

      {open && user?.plan === "PRO" ? (
        <Modal open={open} setOpen={setOpen} title="Invite Member">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              name="email"
              placeholder="enter an email"
              required
            />
            <Button
              disabled={isPending}
              type="submit"
              className="text-white/80 cursor-pointer"
            >
              {isPending ? (
                <span className="flex gap-2 items-center">
                  <LoaderCircle className="animate-spin transition-all" />
                  Sending Invite
                </span>
              ) : (
                "Invite"
              )}
            </Button>
          </form>
        </Modal>
      ) : (
        <SubscriptionAlert open={open} setOpen={setOpen} />
      )}
    </aside>
  );
}
