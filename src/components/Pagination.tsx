import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { HStack, styled } from "../../styled-system/jsx";

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
  totalEntries: number;
  next: () => void;
  previous: () => void;
};

export default function Pagination(props: PaginationProps) {
  const { next, previous, page, totalPages, totalEntries } = props;
  return (
    <HStack gap={3}>
      <PaginationControl
        disabled={page === 1 || !totalEntries}
        onClick={previous}
      >
        <FaChevronLeft />
      </PaginationControl>
      <styled.p width="max-content" color="paper">
        Page <styled.b color="primary">{page}</styled.b> / {totalPages}
      </styled.p>
      <PaginationControl
        disabled={page === totalPages || !totalEntries}
        onClick={() => next()}
      >
        <FaChevronRight />
      </PaginationControl>
    </HStack>
  );
}
