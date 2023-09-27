import { ComponentPropsWithoutRef } from "react";

import { styled } from "@/styled-system/jsx";

export default function Input(props: ComponentPropsWithoutRef<"input">) {
  return (
    <styled.input
      width="full"
      padding={3}
      borderRadius="lg"
      placeholder="Browse games by name"
      _focus={{
        outlineWidth: "2px solid white",
        outlineColor: "primary",
        transition: "outline 0.2s ease-in-out",
      }}
      {...props}
    />
  );
}
