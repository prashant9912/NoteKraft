import { redirect } from "next/navigation";
import { serverSession } from "notekraft/utils/nextAuth-utils";
import { ReactNode } from "react";

export default async function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await serverSession();

  if (session) {
    redirect("/notes");
  } else {
    return <>{children}</>;
  }
}
