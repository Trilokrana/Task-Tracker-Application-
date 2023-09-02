import { AuthProvider } from "./Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Tracking",
  description: "Created By Trilok Rana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
