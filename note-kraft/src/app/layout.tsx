import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "notekraft/providers/redux-provider";

/**
 * Base font for application
 */
export const baseFont = Hanken_Grotesk({ subsets: ["latin"] });

/**
 * Metadata
 */
export const metadata: Metadata = {
  title: "Notekraft",
  description: "Collaborative note taking app",
};

/**
 * Root laytout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={baseFont.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
