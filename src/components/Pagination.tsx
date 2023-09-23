import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { HStack, styled } from "@/styled-system/jsx";

const PaginationControl = styled("button", {
  base: {
    cursor: "pointer",
    transition: "opacity 0.2s ease",
    p: 4,
    borderRadius: "lg",
    backgroundColor: "primary",
    "& svg": {
      fill: "gray.300",
      width: 3,
      height: 3,
    },
    "&:disabled": {
      opacity: 0.3,
      cursor: "unset",
    },
  },
});

type PaginationProps = {
  page: number;
  totalPages: number;
  next: () => void;
  prev: () => void;
};

export default function Pagination({
  next,
  prev,
  page,
  totalPages,
}: PaginationProps) {
  return (
    <HStack gap={3}>
      <PaginationControl disabled={page === 1} onClick={() => prev()}>
        <FaChevronLeft />
      </PaginationControl>
      <styled.p width="max-content" color="paper">
        Page <styled.b color="primary">{page}</styled.b> / {totalPages}
      </styled.p>
      <PaginationControl disabled={page === totalPages} onClick={() => next()}>
        <FaChevronRight />
      </PaginationControl>
    </HStack>
  );
}
