"use client";

import { list } from "radash";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

import GameCard from "@/components/GameCard";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import { useGetGames } from "@/services/getGames";
import { Game } from "@/services/types";
import { Grid, HStack } from "@/styled-system/jsx";

type ListGamesProps = {
  results?: Game[];
  isLoading?: boolean;
};

const ListGames = ({ results = [], isLoading }: ListGamesProps) => {
  if (isLoading) {
    return (
      <Grid
        marginTop={6}
        gap={[2, 5]}
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr));"
      >
        {list(8).map((item) => (
          <GameCard key={item} isLoading />
        ))}
      </Grid>
    );
  }

  return (
    <Grid
      marginTop={6}
      gap={[2, 5]}
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

  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isFetched } = useGetGames({
    search,
    page,
    page_size: pageSize,
  });

  useEffect(() => {
    if (isFetched) {
      setTotalPages(Math.ceil(Number(data?.count) / pageSize));
    }
  }, [isFetched]);

  useEffect(() => {
    if (search) {
      setPage(1);
    }
  }, [search]);

  return (
    <>
      <HStack>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Pagination
          totalPages={totalPages}
          page={page}
          next={() => setPage((page) => page + 1)}
          prev={() => setPage((page) => page - 1)}
        />
      </HStack>
      <ListGames results={data?.results} isLoading={isLoading || isFetching} />
    </>
  );
}
