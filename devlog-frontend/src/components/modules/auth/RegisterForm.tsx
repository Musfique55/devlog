"use client";
import { createAccount } from "@/app/(auth)/_actions/action";
import AppFields from "@/components/shared/form/AppFields";
import { AppSubmitButton } from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { authValidator } from "@/zod/authValidator";
import { useForm } from "@tanstack/react-form";
import { EyeClosed, EyeIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getNewRefreshToken } from "@/services/auth.services";

export function RegisterForm({ inviteToken }: { inviteToken?: string }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createAccount,
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      inviteToken: inviteToken || "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value);
        if (!result.success) {
          setServerError(result.error as string);
          return;
        }
        await getNewRefreshToken();
        toast.success("Account Created Successfully");
        form.reset();
        setServerError(null);
        // router.push(`/auth/verify-email-notice?email=${value.email}`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setServerError(error.message!);
      }
    },
  });

  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-20 pb-8 px-6 relative overflow-hidden  selection:bg-primary-container/30">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gray-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-gray-400/20 rounded-full blur-[100px]" />

      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl bg-[#0A0A0A]">
        {/* Form Body */}
        <div className="p-8 md:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Full Name */}
            <form.Field
              name="name"
              validators={{ onChange: authValidator.register.shape.name }}
            >
              {(field) => (
                <AppFields
                  field={field}
                  label="Full Name"
                  placeholder="Linus Torvalds"
                  type="text"
                  prepend={
                    <Button
                      type="button"
                      size="icon-xs"
                      className="bg-transparent"
                    >
                      <UserIcon className="text-zinc-400" />
                    </Button>
                  }
                  className="w-full  border-0 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary text-body-md py-3 px-4 transition-all duration-200 placeholder:text-outline/40 rounded-lg outline-none"
                />
              )}
            </form.Field>

            {/* Work Email */}
            <form.Field
              name="email"
              validators={{ onChange: authValidator.register.shape.email }}
            >
              {(field) => (
                <AppFields
                  field={field}
                  label="Work Email"
                  placeholder="name@company.com"
                  type="email"
                  prepend={
                    <Button
                      type="button"
                      size="icon-xs"
                      className="bg-transparent"
                    >
                      <MailIcon className="text-zinc-400" />
                    </Button>
                  }
                  className="w-full bg-surface-container-lowest border-0 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary text-body-md py-3 px-4 transition-all duration-200 placeholder:text-outline/40 rounded-lg outline-none"
                />
              )}
            </form.Field>

            {/* Password */}
            <form.Field
              name="password"
              validators={{ onChange: authValidator.register.shape.password }}
            >
              {(field) => (
                <AppFields
                  field={field}
                  label="Password"
                  placeholder="********"
                  type={`${showPassword ? "text" : "password"}`}
                  append={
                    <Button
                      type="button"
                      size="icon-xs"
                      className="bg-transparent cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed className="text-zinc-400" />
                      ) : (
                        <EyeIcon className="text-zinc-400" />
                      )}
                    </Button>
                  }
                  prepend={
                    <Button
                      type="button"
                      size="icon-xs"
                      className="bg-transparent"
                    >
                      <LockIcon className="text-zinc-400" />
                    </Button>
                  }
                  className="w-full  border-0 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary text-body-md py-3 px-4 transition-all duration-200 placeholder:text-outline/40 rounded-lg outline-none"
                />
              )}
            </form.Field>

            {/* Submit */}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isPending || isSubmitting}
                  pendingLabel="Creating Account…"
                  disabled={!canSubmit}
                >
                  Create Account
                </AppSubmitButton>
              )}
            </form.Subscribe>

            {serverError && <p>{serverError}</p>}
          </form>

          {/* Divider */}
          {/* <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-[#0A0A0A] text-outline uppercase tracking-widest font-medium text-gray-300">
                or continue with
              </span>
            </div>
          </div> */}

          {/* Google OAuth */}
          {/* <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 bg-[#161616] cursor-pointer ring-1 ring-outline-variant/20 hover:bg-surface-bright transition-colors rounded-lg group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-semibold text-gray-300">
              Sign up with Google
            </span>
          </button> */}
        </div>

        {/* Footer Link */}
        <div className="bg-surface-container-high py-6 px-10 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?
            <Link
              href={
                inviteToken
                  ? `/auth/login?redirect=${encodeURIComponent(`/invite/accept?token=${inviteToken}`)}`
                  : "/auth/login"
              }
              className="text-inherit font-bold hover:underline ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Policy Text */}
      {/* <p className="text-center text-[0.7rem] text-outline/60 mt-8 px-6 leading-relaxed absolute bottom-4 left-0 right-0">
        By creating an account, you agree to our{" "}
        <a href="#" className="underline hover:text-outline transition-colors">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-outline transition-colors">
          Privacy Policy
        </a>
        .
      </p> */}
    </main>
  );
}
