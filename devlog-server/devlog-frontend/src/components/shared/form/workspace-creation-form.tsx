"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { createWorkspace } from "@/services/workspace.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const WorkspaceCreationForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const  {data : user}  = useAuth();
  const queryClient = useQueryClient();

  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: async (payload: { name: string; adminId: string }) => {
      const res = await createWorkspace(payload);
      return res.data;
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

    const payload = {
      name,
      adminId: user?.id as string,
    };

    try {
      await mutateAsync(payload);
      if (error) {
        toast.error(error.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["user-workspaces"] });
      setOpen(false);
      form.reset();
      toast.success("Workspace created successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Label htmlFor="name">Workspace Name</Label>
      <Input placeholder="eg. thunders" type="text" name="name" />
      <Button disabled={isPending} type="submit" className="text-gray-200">
        {isPending ? (
          <span className="flex gap-2 items-center text-gray-200">
            <LoaderCircle className="animate-spin transition-all" /> Creating...
          </span>
        ) : (
          "Create Workspace"
        )}
      </Button>
    </form>
  );
};

export default WorkspaceCreationForm;
