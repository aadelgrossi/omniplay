"use client";

import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import Select from "@/components/Select";

import { HStack, Stack, styled } from "../../../styled-system/jsx";
import SearchResults from "./SearchResults";
import useSearchGames from "./useSearchGames";

export default function SearchGamesLayout() {
  const {
    games,
    inputValue,
    isLoading,
    nextPage,
    onChangePageSize,
    page,
    pageSize,
    previousPage,
    setInputValue,
    totalPages,
    totalEntries,
    resetSearch,
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
            totalEntries={totalEntries}
            totalPages={totalPages}
            page={page}
            next={nextPage}
            previous={previousPage}
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

      <SearchResults
        search={inputValue}
        resetSearch={resetSearch}
        results={games}
        isLoading={isLoading}
      />
    </>
  );
}
