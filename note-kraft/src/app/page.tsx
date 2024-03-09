import { ThemeSwitcher } from "notekraft/components/ThemeSwitcher";
import { HomePage } from "notekraft/components/home";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "notekraft/components/ui/avatar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 py-24 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
        <div className="absolute top-10 right-10">
          <ThemeSwitcher />
        </div>
        <HomePage />
      </div>
    </main>
  );
}
