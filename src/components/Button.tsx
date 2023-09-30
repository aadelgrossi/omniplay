import { ComponentPropsWithoutRef } from "react";

import { styled } from "../../styled-system/jsx";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "solid" | "ghost";
}

export default function Button(props: ButtonProps) {
  const { variant = "solid", ...rest } = props;
  return (
    <styled.button
      bg={variant === "solid" ? "primary" : "transparent"}
      display="flex"
      alignItems="center"
      color="white"
      fontSize="lg"
      fontWeight="bold"
      gap={3}
      cursor="pointer"
      px={5}
      py={3}
      borderRadius="lg"
      transition="background 0.2s ease"
      css={{
        "& > svg": {
          fill: "white",
          width: 5,
          height: 5,
        },
      }}
      _hover={{
        background: variant === "solid" ? "primary" : "rgba(0,0,0,0.3)",
      }}
      {...rest}
    />
  );
}
