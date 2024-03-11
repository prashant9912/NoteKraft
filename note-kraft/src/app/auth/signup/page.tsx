import { AuthForm } from "notekraft/components/auth-form";
import { AuthType } from "notekraft/types/auth-type";

export default function LoginPage() {
  return (
    <>
      <div className="container relative h-svh flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter email & password below to create your account
            </p>
          </div>
          <AuthForm mode={AuthType.SIGNUP} />
        </div>
      </div>
    </>
  );
}
