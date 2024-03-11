import Link from "next/link";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./ui/page-headers";
import { buttonVariants } from "./ui/button";
import { cn } from "notekraft/lib/utils";
import Image from "next/image";

export function HomePage() {
  return (
    <>
      <div className="container relative flex flex-col items-center">
        <PageHeader>
          <PageHeaderHeading>Note Kraft ✏️</PageHeaderHeading>
          <PageHeaderDescription>
            Welcome to Note kraft, a collaborative note-taking web application
            that revolutionizes how teams work together on notes!
          </PageHeaderDescription>
          <PageActions>
            <Link
              href="/notes"
              className={cn(buttonVariants(), "rounded-[6px]")}
            >
              Get Started
            </Link>
            <Link
              href="/auth/login"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-[6px]"
              )}
            >
              Login to continue
            </Link>
          </PageActions>
        </PageHeader>

        <Image
          className="mt-[-50px]"
          src="/feature-images.png"
          alt="notekraft featured image"
          width={700}
          height={300}
        />
      </div>
    </>
  );
}
