"use client";
import WorkspaceCreationForm from "@/components/shared/form/workspace-creation-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Upgrade from "@/components/ui/upgrade";
import { useAuth } from "@/hooks/useAuth";
import { verifyTeamLink } from "@/services/workspace.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const TeamFallback = () => {
  const [open, setOpen] = useState(false);
  const { data: user } = useAuth();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (link: string) => {
      const response = await verifyTeamLink(link);
      if (response.success) {
        queryClient.invalidateQueries({
          queryKey: ["user-workspaces", "workspace-members"],
        });
      }
      return response;
    },
  });

  const handleTeamJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const inviteLink = form.get("invite-link") as string;
    try {
      const res = await mutateAsync(inviteLink);
      if (!res?.success) {
        toast.error(res!.message);
      } else {
        formElement.reset();
        toast.success(res.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl w-full flex flex-col items-center justify-center mx-auto text-center space-y-12 z-10">
      {/* Illustration Section */}
      <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden bg-zinc-800/50 flex items-center justify-center">
        <Image
          width={400}
          height={400}
          alt="Team collaboration"
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUojSGfBSh7pze87RJdexksn0iDAN_hjZdVq_6TTgQQjuOU2SPnkhPYNTVonwAwXn6V7Lln-xiitKHdmig_IyDjcXqUk_RFnglqTA00XuxJg1fDiYtsUJP5T5kMc-c9WGO3_w9dDfCB0TtfWb9Hi8pDYSCBgk8WVwjMHtfsUvSjBALx3vV_Tz9mivCcyntI5amYqdpMHkDNlTUOgN5K9MA8LfXOpHAA-CSji9woR7l9-PjCGGz6FfjcAc1AU_OD4k9jocDARPcpEA"
        />
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center animate-pulse">
            <span className="material-symbols-outlined text-5xl text-indigo-400">
              groups
            </span>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-100">
          Build your dream team
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
          You aren&apos;t part of a workspace yet. Create a new one for your
          team or join an existing workspace with an invite code.
        </p>
      </div>

      {/* Bento Grid CTA Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
        {/* Create Workspace Card */}
        <div
          onClick={() => setOpen(!open)}
          className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-outline-variant/20 hover:border-primary/30 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-on-surface-variant group-hover:text-primary" />
          </div>
          <h4 className="text-sm font-bold text-on-surface-variant group-hover:text-on-surface">
            Create New Workspace
          </h4>
          <p className="text-[11px] text-outline text-center mt-2 max-w-[150px]">
            Start a new team and invite collaborators
          </p>
        </div>

        {/* Join Workspace Card */}
        <div className="bg-zinc-900/60 p-4 rounded-lg flex flex-col items-start text-start gap-3">
          <h3>Join Workspace</h3>
          <p>
            Entering an existing team? Paste your secure invite link below to
            join team.
          </p>
          <form onSubmit={handleTeamJoin} className="w-full space-y-3">
            <div className="relative">
              <Input
                name="invite-link"
                placeholder="Invite Link"
                className="w-full bg-zinc-900/50 border-zinc-700 ring-1  rounded-lg py-3 px-4 text-sm text-zinc-100 placeholder:text-zinc-600"
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-zinc-700/50 text-gray-200 font-bold py-3 px-6 rounded-lg cursor-pointer ring-zinc-700/50 transition-all duration-200 active:scale-95"
            >
              Join Team
            </Button>
          </form>
        </div>

        {user?.plan === "PRO" && open ? (
          <Modal title="Create Workspace" setOpen={setOpen} open={open}>
            <WorkspaceCreationForm setOpen={setOpen} />
          </Modal>
        ) : (
          open && (
            <Modal title="Buy Subscription" setOpen={setOpen} open={open}>
              <Upgrade />
            </Modal>
          )
        )}
      </div>
    </div>
  );
};

export default TeamFallback;
