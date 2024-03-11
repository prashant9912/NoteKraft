"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { AuthType } from "notekraft/types/auth-type";
import { cn } from "notekraft/lib/utils";
import { registerUser } from "notekraft/services/auth-service";
import { toast } from "./ui/use-toast";

export function AuthForm({ mode = AuthType.SIGNIN, ...props }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value?.toLowerCase());
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (mode === AuthType.SIGNIN) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          toast({ title: "Login successfully" });
          router.push("/notes");
        }
      } else if (mode === AuthType.SIGNUP) {
        const result: any = await registerUser(email, password);

        if (result?.error) {
          setError(result.error);
        } else {
          toast({ title: "Created user, login now with new user." });
          router.push("/auth/login");
        }
      }
    } catch {
      toast({ title: "Failed to authenticate", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-4")} {...props}>
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
            {mode === AuthType.SIGNIN
              ? "Sign In with Email"
              : "Sign Up with Email"}
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
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => {
          if (mode === AuthType.SIGNIN) {
            router.push("/auth/signup");
          } else {
            router.push("/auth/login");
          }
        }}
      >
        {mode === AuthType.SIGNIN
          ? "Create account"
          : "Login with existing account"}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
