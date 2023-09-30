"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

import Button, { ButtonProps } from "@/components/Button";

export default function BackButton(props: ButtonProps) {
  const router = useRouter();

  return (
    <Button onClick={router.back} {...props}>
      <FaChevronLeft />
      Go back
    </Button>
  );
}
