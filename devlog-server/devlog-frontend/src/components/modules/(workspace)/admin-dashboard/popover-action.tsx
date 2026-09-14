"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { removeMemberFromWorkspace } from "@/services/workspace.services";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";

const PopoverAction = ({
  workspaceId,
  memberId,
}: {
  workspaceId: string;
  memberId: string;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => removeMemberFromWorkspace(workspaceId, memberId),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (res) => {
      if(res.success){
        toast.success(res.message);
        queryClient.invalidateQueries({
          queryKey: ["workspace-members", workspaceId],
          exact : false
        });
      }else {
        toast.error(res.message);
      }
    },
  });

  const handleRemove = async () => {
    try {
      toast.message("want to remove this member?", {
        action: {
          label: "yes",
          onClick: async () => {
             await mutateAsync();
          },
          actionButtonStyle: {
            backgroundColor: "#ef4444",
            color: "white",
          },
        },
        cancel: {
          label: "cancel",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      toast.error(error.message)
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Action</PopoverTitle>
          <PopoverDescription></PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col items-center justify-center gap-2">
          <Button
            onClick={handleRemove}
            className="w-full cursor-pointer"
          >
            Remove from team
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverAction;
