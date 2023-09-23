"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { list } from "radash";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

import GameCard from "@/components/GameCard";
import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import Select from "@/components/Select";
import { useGetGames } from "@/services/getGames";
import type { Game } from "@/services/types";
import { Grid, HStack } from "@/styled-system/jsx";

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
      {results.map((item) => (
        <GameCard key={item.id} {...item} />
      ))}
    </>
  );
}

export default function SearchGames() {
  const router = useRouter();
  const params = useSearchParams();
  const searchParams = new URLSearchParams(params);

  const search = params.get("q") as string;
  const page = (params.get("page") || 1) as number;
  const pageSize = (params.get("page_size") || 10) as number;

  const [totalPages, setTotalPages] = useState(1);
  const [inputValue, setInputValue] = useState(search);

  useDebounce(
    () => {
      if (!inputValue) {
        searchParams.delete("q");
        router.push(`/?${searchParams.toString()}`);
        return;
      }
      searchParams.set("q", inputValue);
      router.push(`/?${searchParams.toString()}`);
    },
    600,
    [inputValue]
  );

  const onChangePageSize = (value: string) => {
    searchParams.set("page_size", value);
    router.push(`/?${searchParams.toString()}`);
  };

  const { data, isLoading, isFetching, isFetched } = useGetGames({
    search,
    page,
    page_size: pageSize,
  });

  useEffect(() => {
    if (isFetched) {
      setTotalPages(Math.ceil(Number(data?.count) / pageSize));
    }
  }, [isFetched, pageSize]);

  useEffect(() => {
    if (search) {
      searchParams.set("page", "1");
      router.push(`/?${searchParams.toString()}`);
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
          next={() => {
            searchParams.set("page", String(Number(page) + 1));
            router.push(`/?${searchParams.toString()}`);
          }}
          prev={() => {
            searchParams.set("page", String(Number(page) - 1));
            router.push(`/?${searchParams.toString()}`);
          }}
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

      <Grid
        marginTop={6}
        gap={[2, 5]}
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr));"
      >
        <ListGames
          results={data?.results}
          isLoading={isLoading || isFetching}
        />
      </Grid>
    </>
  );
}
