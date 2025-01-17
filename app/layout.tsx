import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "./ReduxProvider";
import { AbortControllerProvider } from "@/components/AbortProvider";
import { ThemeProvider } from "./ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Video to GIF Converter",
  description: "Easily convert your videos to high-quality GIFs with our app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black`}
      >
        <ThemeProvider>
          <AbortControllerProvider>
            <ReduxProvider>
              {children}
              <Toaster />
            </ReduxProvider>
          </AbortControllerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
