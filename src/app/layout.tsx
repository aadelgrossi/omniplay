import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import type { Metadata } from "next";
import { Sarabun } from "next/font/google";

import Providers from "./providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
