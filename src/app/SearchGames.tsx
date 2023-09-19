"use client";

import { Masonry } from "masonic";
import { list } from "radash";
import { useState } from "react";

import GameCard from "@/components/GameCard";
import Input from "@/components/Input";
import { useGetGames } from "@/services/getGames";
import { Game } from "@/services/types";
import { Grid } from "@/styled-system/jsx";
import { token } from "@/styled-system/tokens";

type ListGamesProps = {
  results?: Game[];
  isLoading?: boolean;
};

const ListGames = ({ results, isLoading }: ListGamesProps) => {
  if (isLoading) {
    return (
      <Grid
        marginTop={6}
        gap={5}
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr));"
      >
        {list(20).map((item) => (
          <GameCard key={item} isLoading />
        ))}
      </Grid>
    );
  }
  return (
    <Masonry
      style={{
        maxWidth: token("breakpoints.2xl"),
        marginTop: token("spacing.6"),
      }}
      columnWidth={280}
      columnGutter={20}
      items={results || []}
      render={(props) => <GameCard {...props.data} />}
    />
  );
};

export default function SearchGames() {
  const [search, setSearch] = useState("");

  const args = search
    ? { search, dates: undefined }
    : {
        dates: "2023-01-01,2023-12-01",
      };

  const { data, isLoading, isFetching } = useGetGames(args);

  return (
    <>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
      <ListGames results={data?.results} isLoading={isLoading || isFetching} />
    </>
  );
}
