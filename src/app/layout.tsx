import "./globals.css";

import type { Metadata } from "next";
import { Sarabun } from "next/font/google";

import AppProvider from "./provider";

const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "OmniPlay",
  description:
    "Elevate Your Gaming Experience: Browse and discover the greatest games out there!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sarabun.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
