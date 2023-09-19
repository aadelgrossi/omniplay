"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

import { token } from "@/styled-system/tokens";

const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: ReactNode }) {
  const baseColor = token("colors.slate.700");
  const highlightColor = token("colors.slate.800");

  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        {children}
      </SkeletonTheme>
    </QueryClientProvider>
  );
}
