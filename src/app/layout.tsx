import "./globals.css";

import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import { PropsWithChildren } from "react";

import Header from "@/components/Header";

import { styled } from "../../styled-system/jsx";
import Providers from "./providers";

const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OmniPlay",
  description:
    "Elevate Your Gaming Experience: Browse and discover the greatest games out there!",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <styled.body
        px={[3, 5]}
        pb={[3, 10]}
        bgColor="slate.900"
        className={sarabun.className}
      >
        <Providers>
          <styled.div mx="auto" maxWidth={["100%", "breakpoint-2xl"]}>
            <Header />
            <main>{children}</main>
          </styled.div>
        </Providers>
      </styled.body>
    </html>
  );
}
