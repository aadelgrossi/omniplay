import { Stack, styled } from "@/styled-system/jsx";

import SearchGames from "./SearchGames";

export default function Home() {
  return (
    <>
      <Stack
        direction={["column", "row"]}
        textAlign={["center", "flex-start"]}
        alignItems="center"
        gap={[1, 5]}
        pb={5}
      >
        <styled.h1 textStyle="h1" fontSize={["5xl", "6xl"]} color="primary">
          OmniPlay
        </styled.h1>
        <styled.p
          lineHeight="tight"
          textAlign={["center", "left"]}
          textStyle="body"
          color="paper"
        >
          <styled.b fontSize="xl">Elevate Your Gaming Experience</styled.b>{" "}
          <br />
          Browse and discover the greatest games out there!
        </styled.p>
      </Stack>
      <SearchGames />
    </>
  );
}
