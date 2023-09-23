"use client";

import { list } from "radash";
import { useState } from "react";
import { useDebounce } from "react-use";

import GameCard from "@/components/GameCard";
import Input from "@/components/Input";
import { useGetGames } from "@/services/getGames";
import { Game } from "@/services/types";
import { Grid } from "@/styled-system/jsx";

type ListGamesProps = {
  results?: Game[];
  isLoading?: boolean;
};

const ListGames = ({ results = [], isLoading }: ListGamesProps) => {
  if (isLoading) {
    return (
      <Grid
        marginTop={6}
        gap={5}
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr));"
      >
        {list(20).map((item) => (
          <GameCard key={item} isLoading />
        ))}
      </Grid>
    );
  }

  return (
    <Grid
      marginTop={6}
      gap={5}
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr));"
    >
      {results.map((item) => (
        <GameCard key={item.id} {...item} />
      ))}
    </Grid>
  );
};

export default function SearchGames() {
  const [inputValue, setInputValue] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();

  useDebounce(() => setSearch(inputValue), 600, [inputValue]);

  const { data, isLoading } = useGetGames({
    search: search,
    dates: search ? undefined : "2023-01-01,2023-12-01",
  });

  return (
    <>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ListGames results={data?.results} isLoading={isLoading} />
    </>
  );
}
