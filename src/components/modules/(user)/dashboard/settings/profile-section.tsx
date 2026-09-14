"use client";

import { handleProfileUpdate } from "@/app/(PrivateLayout)/(User)/dashboard/_action/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function ProfileSection() {
  const { data: user } = useAuth();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await handleProfileUpdate(formData);
      if (!res.success) {
        toast.error(res.message);
      }
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

    const formData = new FormData();
    formData.append("file", profileImage as Blob);
    formData.append("data", JSON.stringify({ name }) as string);
    mutateAsync(formData);
  };

  return (
    <section className="relative" id="profile">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-2">Profile</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            This information will be displayed publicly to your team members and
            collaborators.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-2/3 bg-zinc-900/40 rounded-xl p-8 border border-zinc-800/50"
        >
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-zinc-800/30">
            <div className="relative group cursor-pointer">
              {profileImage ? (
                <Image
                  width={200}
                  height={200}
                  alt="Avatar"
                  className="w-20 h-20 rounded-xl object-cover hover:grayscale-0 transition-all duration-300"
                  src={URL.createObjectURL(profileImage)}
                />
              ) : user?.image ? (
                <Image
                  width={200}
                  height={200}
                  alt="Avatar"
                  className="w-20 h-20 rounded-xl object-cover hover:grayscale-0 transition-all duration-300"
                  src={user.image}
                />
              ) : (
                <div className="w-20 h-20 rounded-xl object-cover hover:grayscale-0 transition-all duration-300 bg-amber-800 flex items-center justify-center text-white font-bold text-2xl">
                  <p>{user?.name[0]}</p>
                </div>
              )}

              <div
                onClick={() => imageRef.current?.click()}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
              >
                <span className="text-white text-2xl">📷</span>
                <input
                  onChange={(e) => setProfileImage(e.target.files?.[0] as File)}
                  name="image"
                  ref={imageRef}
                  type="file"
                  className="hidden"
                />
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg text-zinc-100">{user?.name}</h4>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-primary">
                Full Name
              </label>
              <Input
                name="name"
                type="text"
                defaultValue={user?.name ?? ""}
                className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-primary">
                Email Address
              </label>
              <Input
                type="email"
                defaultValue={user?.email ?? ""}
                readOnly
                className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600"
              />
            </div>
            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary hover:bg-primary/90 text-white font-semibold"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin transition-all" />{" "}
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
