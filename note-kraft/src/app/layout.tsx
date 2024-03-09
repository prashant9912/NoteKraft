import "./globals.css";
import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { ReduxProvider } from "notekraft/components/providers/redux-provider";
import { ThemeProvider } from "notekraft/components/providers/themes-provider";
import { Toaster } from "notekraft/components/ui/toaster";

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
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
