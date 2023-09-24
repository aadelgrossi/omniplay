"use client";

import { list } from "radash";

import GameCard from "@/components/GameCard";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import Select from "@/components/Select";
import useSearchGames from "@/hooks/useSearchGames";
import type { Game } from "@/services/types";
import { Grid, HStack, Stack } from "@/styled-system/jsx";

type ListGamesProps = {
  results?: Game[];
  isLoading?: boolean;
};

function ListGames({ results = [], isLoading }: ListGamesProps) {
  if (isLoading)
    return (
      <>
        {list(8).map((item) => (
          <GameCard key={item} isLoading />
        ))}
      </>
    );

  return (
    <>
      {results.map((game) => (
        <GameCard game={game} key={game.slug} />
      ))}
    </>
  );
}

export default function SearchGames() {
  const {
    games,
    inputValue,
    isLoading,
    nextPage,
    onChangePageSize,
    page,
    pageSize,
    prevPage,
    setInputValue,
    totalPages,
  } = useSearchGames();

  return (
    <>
      <Stack direction={["column", "row"]}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <HStack
          justifyContent={["space-around", "flex-start"]}
          flexWrap={["wrap", "unset"]}
        >
          <Pagination
            totalPages={totalPages}
            page={page}
            next={nextPage}
            prev={prevPage}
          />
          <Select
            value={pageSize.toString()}
            onValueChange={onChangePageSize}
            options={[
              { label: "Show 10 items", value: 10 },
              { label: "Show 20 items", value: 20 },
              { label: "Show 50 items", value: 50 },
              { label: "Show 100 items", value: 100 },
            ]}
          />
        </HStack>
      </Stack>

      <Grid
        marginTop={6}
        gap={[2, 5]}
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr));"
      >
        <ListGames results={games} isLoading={isLoading} />
      </Grid>
    </>
  );
}
