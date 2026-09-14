"use client";

import { AppSubmitButton } from "@/components/shared/form/AppSubmitButton";
import AppTextArea from "@/components/shared/form/AppTextArea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { createLog } from "@/services/standupLogs.services";
import { logValidator } from "@/zod/logValidator";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export interface StandupData {
  today: string;
  tomorrow: string;
  blocker: string | null;
  projectTag?: string;
  userId: string;
  workspaceId?: string;
}

export function StandupForm({
  workspaceId = undefined,
}: {
  workspaceId?: string;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [tags, setTags] = useState("");
  const { data: user } = useAuth();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createLog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-dashboard-info", "activityLogs"],
      });
    },
  });

  const form = useForm({
    defaultValues: {
      todayWork: "",
      tomorrowWork: "",
      blocker: "",
      projectTags: [] as string[],
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync({
          ...value,
          ...(workspaceId && { workspaceId }),
        });

        if (result.success === false) {
          setServerError(result.message as string);
          return;
        }
        toast.success("Standup Log Created Successfully");
        form.reset();
        setServerError(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setServerError(error.message!);
      }
    },
  });

  const handleTags = () => {
    const trimmedTag = tags.trim();
    const currentTags = form.getFieldValue("projectTags") || [];

    if (trimmedTag && !currentTags.includes(trimmedTag)) {
      if (user?.plan === "FREE" && currentTags.length < 2) {
        form.setFieldValue("projectTags", [...currentTags, trimmedTag]);
        setTags("");
      } else if (user?.plan === "PRO" && currentTags.length < 5) {
        form.setFieldValue("projectTags", [...currentTags, trimmedTag]);
        setTags("");
      } else {
        toast.error(
          "free users can add max 2 tags and pro users can add max 5 tags",
        );
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    const currentTags = form.getFieldValue("projectTags") || [];
    const updatedTags = currentTags.filter((t: string) => t !== tag);
    form.setFieldValue("projectTags", updatedTags);
  };

  const handleKeyDownTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTags();
    }
  };

  return (
    <section
      id="create-log"
      tabIndex={0}
      className="bg-zinc-900/60 p-8 rounded-xl border border-zinc-800/50 relative overflow-hidden focus:bg-zinc-700/80  transition-colors"
    >
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>

      <h2 className="text-xl font-bold text-zinc-100 mb-8">
        Today&apos;s Standup
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6 relative z-10"
      >
        {/* Today */}
        <div>
          <form.Field
            name="todayWork"
            validators={{ onChange: logValidator.createLog.shape.todayWork }}
          >
            {(field) => (
              <AppTextArea
                field={field}
                label="What did you do today?"
                placeholder="Starting the auth module refactor..."
                className="border-gray-200"
              />
            )}
          </form.Field>
        </div>

        {/* Tomorrow */}
        <div>
          <form.Field
            name="tomorrowWork"
            validators={{ onChange: logValidator.createLog.shape.tomorrowWork }}
          >
            {(field) => (
              <AppTextArea
                field={field}
                label="What will you do tomorrow?"
                placeholder="Starting the auth module refactor..."
                className="border-gray-200"
              />
            )}
          </form.Field>
        </div>

        {/* Blockers */}
        <div>
          <form.Field name="blocker">
            {(field) => (
              <AppTextArea
                field={field}
                rows={4}
                label="Any blockers?"
                placeholder="Waiting for PR review on #1204"
                className="border-gray-200"
              />
            )}
          </form.Field>
        </div>

        <div>
          <Label
            htmlFor={"projectTags"}
            className="text-sm font-medium text-gray-300"
          >
            Project Tags
          </Label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onKeyDown={handleKeyDownTagInput}
            placeholder="Enter tag and press Enter"
            className="border-gray-200 text-gray-200 mb-2"
          />
          <Button
            type="button"
            onClick={handleTags}
            className="bg-primary/90  text-white px-4 py-2 rounded-lg transition-all font-medium"
          >
            Add
          </Button>
        </div>
        <form.Subscribe selector={(state) => [state.values.projectTags]}>
          {([projectTags]) => (
            <div className="flex flex-wrap gap-2 mb-4">
              {(projectTags as string[])?.map((tag) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-2 bg-primary/20 text-primary/80 px-3 py-1 rounded-lg text-sm font-medium border border-primary/30"
                >
                  {tag}
                  <Button
                    type="button"
                    size={"icon"}
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-primary/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </form.Subscribe>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isPending || isSubmitting}
              pendingLabel="creating…"
              disabled={!canSubmit}
            >
              Submit Log
            </AppSubmitButton>
          )}
        </form.Subscribe>
        {serverError && <p>{serverError}</p>}
      </form>
    </section>
  );
}
