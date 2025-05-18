"use client";
import React from "react";
import { Label } from "@/components/auth/Label";
import { Input } from "@/components/auth/Input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Successful signup
      router.push("/auth/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to My Signup Component
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            placeholder="Vatsal" 
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required 
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            placeholder="signup@component.com" 
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            placeholder="••••••••" 
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
        </LabelInputContainer>

        {error && (
          <div className="mb-4 text-sm text-red-500">
            {error}
          </div>
        )}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign up →'}
          <BottomGradient />
        </button>

        <div className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-neutral-800 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-100"
          >
            Login
          </Link>
        </div>
        
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
