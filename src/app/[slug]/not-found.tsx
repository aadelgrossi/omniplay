import { FaChevronLeft } from "react-icons/fa";
import { RiSearchEyeLine } from "react-icons/ri";

import BackButton from "@/components/BackButton";

import { Center, HStack, styled } from "../../../styled-system/jsx";

const Container = styled(Center, {
  base: {
    color: "paper",
    minHeight: "50vh",
    display: "flex",
    flexDir: "column",
    "& > div > svg": {
      width: "112px",
      height: "112px",
    },
    "& span": {
      fontSize: "8xl",
      fontWeight: "semibold",
    },
  },
});

export default function NotFound() {
  return (
    <Container>
      <HStack alignItems="flex-end" gap={1}>
        <styled.span>4</styled.span>
        <RiSearchEyeLine />
        <styled.span>4</styled.span>
      </HStack>

      <styled.h2 mb={5} color="slate.400" fontSize="2xl" fontWeight="medium">
        Game not found
      </styled.h2>

      <BackButton>
        <FaChevronLeft />
        Go back
      </BackButton>
    </Container>
  );
}
