import type { Metadata } from "next";
import { Rethink_Sans, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { ActionProvider } from "@/context/ActionContext";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink-sans",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "RentManager - Property Management System",
  description: "Modern rental management platform for landlords and tenants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${rethinkSans.variable} ${geist.variable}`}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/logo.svg" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "var(--color-background)" }} suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            <ActionProvider>
              {children}
            </ActionProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
