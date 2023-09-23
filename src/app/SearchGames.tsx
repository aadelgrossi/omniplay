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
      {results.map((item) => (
        <GameCard {...item} key={item.slug} />
      ))}
    </>
  );
}

export default function SearchGames() {
  const router = useRouter();
  const initialParams = useSearchParams();
  const searchParams = new URLSearchParams(initialParams);

  const search = searchParams.get("q") || "";
  const page = (searchParams.get("page") || 1) as number;
  const pageSize = (searchParams.get("page_size") || 10) as number;

  const [totalPages, setTotalPages] = useState(1);
  const [inputValue, setInputValue] = useState(search);

  useDebounce(
    () => {
      if (!inputValue) {
        searchParams.set("q", "");
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
      </Stack>

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
