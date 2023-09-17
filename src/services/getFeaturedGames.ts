import { useQuery } from "@tanstack/react-query";

import api from "./api";
import { Game } from "./types";

type FeaturedGamesArgs = {
  ordering?: "metacritic";
  dates?: string;
  page_size?: number;
};

type GamesResponse = {
  count: number;
  results: Game[];
};

const getFeaturedGames = async (args: FeaturedGamesArgs) => {
  const {
    ordering = "-metacritic",
    dates = "2023-01-01,2023-12-01",
    page_size = 20,
  } = args;
  const { data } = await api.get<GamesResponse>("/games", {
    params: { ordering, dates, page_size },
  });

  return data;
};

export const useGetFeaturedGames = (args: FeaturedGamesArgs) => {
  return useQuery({
    queryKey: ["featured-games"],
    queryFn: () => getFeaturedGames(args),
  });
};

export default getFeaturedGames;
