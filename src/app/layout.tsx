import type { Metadata } from "next";
import { Young_Serif, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { ActionProvider } from "@/context/ActionContext";

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-young-serif",
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
    <html lang="en" suppressHydrationWarning className={`${youngSerif.variable} ${geist.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50" suppressHydrationWarning>
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
