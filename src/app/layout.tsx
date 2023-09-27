import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import { PropsWithChildren } from "react";

import { styled } from "@/styled-system/jsx";

import Providers from "./providers";

const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "OmniPlay",
  description:
    "Elevate Your Gaming Experience: Browse and discover the greatest games out there!",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <styled.body bgColor="gray.900" className={sarabun.className}>
        <Providers>
          <styled.div
            pb={10}
            px={[2, 5]}
            mx="auto"
            width="full"
            maxWidth={["100%", "breakpoint-2xl"]}
          >
            {children}
          </styled.div>
        </Providers>
      </styled.body>
    </html>
  );
}
