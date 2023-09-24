import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

import { useGetGamesQuery } from "@/services/getGames";

const useSearchGames = () => {
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

  const { data, isLoading, isFetching, isFetched } = useGetGamesQuery({
    search,
    page,
    page_size: pageSize,
  });

  useEffect(() => {
    const totalEntries = data?.count || 0

    if (isFetched) {
      setTotalPages(Math.ceil(totalEntries / pageSize));
    }
  }, [isFetched, pageSize]);

  useEffect(() => {
    if (search) {
      searchParams.set("page", "1");
      router.push(`/?${searchParams.toString()}`);
    }
  }, [search]);

  const nextPage = () => {
    searchParams.set("page", String(Number(page) + 1));
    router.push(`/?${searchParams.toString()}`);
  };

  const prevPage = () => {
    searchParams.set("page", String(Number(page) - 1));
    router.push(`/?${searchParams.toString()}`);
  };

  return {
    games: data?.results,
    inputValue,
    isLoading: isLoading || isFetching,
    nextPage,
    onChangePageSize,
    page,
    pageSize,
    prevPage,
    setInputValue,
    totalPages,
  };
};

export default useSearchGames;
