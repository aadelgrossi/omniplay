"use client";

import { Masonry } from "masonic";
import { useState } from "react";

import GameCard from "@/components/GameCard";
import Input from "@/components/Input";
import { useGetGames } from "@/services/getGames";
import { Game } from "@/services/types";
import { token } from "@/styled-system/tokens";

type ListGamesProps = {
  results?: Game[];
  isLoading?: boolean;
};

const ListGames = ({ results, isLoading }: ListGamesProps) => {
  if (isLoading) return <p>loading</p>;
  if (!results?.length) return <></>;
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
