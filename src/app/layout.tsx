import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { ActionProvider } from "@/context/ActionContext";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
