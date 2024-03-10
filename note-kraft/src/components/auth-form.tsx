"use client";

import { cn } from "notekraft/lib/utils";
import { HTMLAttributes, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Auth login form
 */
export function AuthForm({ ...props }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value?.toLowerCase());
    setError("");
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setError("");
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/notes");
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6")} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-3">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
            />
            <Input
              id="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 bg-white dark:bg-black">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle size={32} className="pr-2" />
        )}
        Google Login
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
