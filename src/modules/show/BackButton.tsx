"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

import { styled } from "../../../styled-system/jsx";

export default function BackButton() {
  const router = useRouter();

  return (
    <styled.button
      display="flex"
      alignItems="center"
      color="white"
      gap={3}
      cursor="pointer"
      px={4}
      py={3}
      borderRadius="lg"
      transition="background 0.2s ease"
      onClick={router.back}
      _hover={{
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <FaChevronLeft />
      <styled.p fontWeight="bold" color="paper" fontSize="lg">
        Go back
      </styled.p>
    </styled.button>
  );
}
