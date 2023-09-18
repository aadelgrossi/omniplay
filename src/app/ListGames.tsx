"use client";

import { Masonry } from "masonic";

import GameCard from "@/components/GameCard";
import { useGetFeaturedGames } from "@/services/getFeaturedGames";
import { token } from "@/styled-system/tokens";

export default function ListGames() {
  const { data } = useGetFeaturedGames({});

  if (!data?.results.length) return <></>;
  return (
    <Masonry
      style={{
        maxWidth: token("breakpoints.2xl"),
        marginTop: token("spacing.10"),
      }}
      columnWidth={280}
      columnGutter={20}
      items={data.results || []}
      render={(props) => <GameCard {...props.data} />}
    />
  );
}
