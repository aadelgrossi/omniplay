import { list } from "radash";
import { FaUndo } from "react-icons/fa";

import Button from "@/components/Button";
import GameCard, { GameCardProps } from "@/components/GameCard";

import { Center, Grid, styled } from "../../../styled-system/jsx";

type SearchResultsProps = {
  results?: Array<GameCardProps["game"]>;
  isLoading?: boolean;
  search?: string;
  resetSearch?: () => void;
};

export default function SearchResults(props: SearchResultsProps) {
  const { results = [], isLoading, search, resetSearch } = props;

  if (isLoading)
    return (
      <Grid
        width="full"
        marginTop={6}
        gap={[3, 5]}
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr));"
      >
        {list(1, 8).map((item) => (
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
          title="no-results"
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
        <Button onClick={resetSearch}>
          <FaUndo />
          Reset search
        </Button>
      </Center>
    );

  return (
    <Grid
      width="full"
      marginTop={6}
      gap={[3, 5]}
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr));"
    >
      {results.map((game) => (
        <GameCard game={game} key={game?.slug} />
      ))}
    </Grid>
  );
}
