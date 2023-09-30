import Link from "next/link";

import { Stack, styled } from "../../styled-system/jsx";

export default function Header() {
  return (
    <Stack
      direction={["column", "row"]}
      textAlign={["center", "flex-start"]}
      alignItems="center"
      gap={[1, 5]}
      py={8}
    >
      <Link href="/" style={{ cursor: "pointer" }}>
        <styled.h1 textStyle="h1" fontSize={["5xl", "6xl"]} color="primary">
          OmniPlay
        </styled.h1>
      </Link>
      <styled.p
        lineHeight="tight"
        textAlign={["center", "left"]}
        textStyle="body"
        color="paper"
      >
        <styled.b fontSize="xl">Elevate Your Gaming Experience</styled.b> <br />
        Browse and discover the greatest games out there!
      </styled.p>
    </Stack>
  );
}
