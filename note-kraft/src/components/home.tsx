import Link from "next/link";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./ui/page-headers";
import { buttonVariants } from "./ui/button";
import { cn } from "notekraft/lib/utils";

export function HomePage() {
  return (
    <>
      <div className="container relative">
        <PageHeader>
          <PageHeaderHeading>Note Kraft ✏️</PageHeaderHeading>
          <PageHeaderDescription>
            Welcome to Note kraft, a collaborative note-taking web application
            that revolutionizes how teams work together on notes!
          </PageHeaderDescription>
          <PageActions>
            <Link
              href="/docs"
              className={cn(buttonVariants(), "rounded-[6px]")}
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-[6px]"
              )}
            >
              Login to continue
            </Link>
          </PageActions>
        </PageHeader>
      </div>
    </>
  );
}
