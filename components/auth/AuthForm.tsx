"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import AuthInputField from "./AuthInputField";
import { AuthFormValues, AuthMode, createAuthSchema } from "@/schemas/auth";
import { loginAction, registerAction } from "@/utils/action";

const copyByMode: Record<
  AuthMode,
  { title: string; submit: string; switchText: string; switchHref: string; switchLabel: string }
> = {
  login: {
    title: "Log In",
    submit: "Log In",
    switchText: "No account yet?",
    switchHref: "/register",
    switchLabel: "Create one",
  },
  register: {
    title: "Create Account",
    submit: "Register",
    switchText: "Already registered?",
    switchHref: "/login",
    switchLabel: "Log in",
  },
};

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const schema = useMemo(() => createAuthSchema(mode), [mode]);
  const resolver = yupResolver(schema) as Resolver<AuthFormValues>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const copy = copyByMode[mode];
  const authAction = mode === "login" ? loginAction : registerAction;

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setError("");
    setIsLoading(true);

    try {
      const result = await authAction({ email, password });
      if (!result?.ok) {
        setError(result?.message || "Request failed");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Server error, please try again.");
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <section className="max-w-md mx-auto py-12 px-6">
      <h1 className="text-2xl font-semibold mb-6">{copy.title}</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <AuthInputField
          type="email"
          placeholder="Email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <AuthInputField
          type="password"
          placeholder="Password"
          registration={register("password")}
          error={errors.password?.message}
        />
        {mode === "register" ? (
          <AuthInputField
            type="password"
            placeholder="Confirm Password"
            registration={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        ) : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Please wait..." : copy.submit}
        </Button>
      </form>
      <p className="text-sm mt-4">
        {copy.switchText}{" "}
        <Link href={copy.switchHref} className="underline">
          {copy.switchLabel}
        </Link>
      </p>
    </section>
  );
}
