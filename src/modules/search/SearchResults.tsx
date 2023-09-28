import { list } from "radash";
import { FaUndo } from "react-icons/fa";

import GameCard from "@/components/GameCard";
import { Game } from "@/services/types";
import { Center, Grid, styled } from "@/styled-system/jsx";

type SearchResultsProps = {
  results?: Game[];
  isLoading?: boolean;
  search: string;
  resetSearch: () => void;
};

export default function SearchResults(props: SearchResultsProps) {
  const { results = [], isLoading, search, resetSearch } = props;

  if (isLoading)
    return (
      <Grid
        width="full"
        marginTop={6}
        gap={[2, 5]}
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr));"
      >
        {list(8).map((item) => (
          <GameCard key={item} isLoading />
        ))}
      </Grid>
    );

  if (results.length === 0)
    return (
      <Center
        mt={5}
        gap={2}
        display="flex"
        flexDirection="column"
        minHeight="30vh"
        width="full"
      >
        <styled.p
          textAlign="center"
          fontSize="xl"
          color="slate.400"
          css={{
            "& span": {
              fontStyle: "italic",
              color: "slate.200",
              fontSize: "2xl",
            },
          }}
        >
          No results found for <span>&quot;{search}&quot;</span>
        </styled.p>
        <styled.button
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={2}
          cursor="pointer"
          bg="primary"
          p={4}
          lineHeight={1.25}
          borderRadius="lg"
          color="slate.200"
          onClick={resetSearch}
        >
          <FaUndo />
          Reset search
        </styled.button>
      </Center>
    );

  return (
    <Grid
      width="full"
      marginTop={6}
      gap={[2, 5]}
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr));"
    >
      {results.map((game) => (
        <GameCard game={game} key={game.slug} />
      ))}
    </Grid>
  );
}