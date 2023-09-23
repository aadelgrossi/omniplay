import { useQuery } from "@tanstack/react-query";

import api from "./api";
import { Game } from "./types";

type GamesQueryArgs = {
  search?: string;
  ordering?: "metacritic";
  dates?: string;
  page_size?: number;
};

type GamesQueryResponse = {
  count: number;
  results: Game[];
};

const getGames = async (args: GamesQueryArgs) => {
  const {
    ordering = "-metacritic",
    dates,
    page_size = 20,
    search
  } = args;
  const { data } = await api.get<GamesQueryResponse>("/games", {
    params: { ordering, dates, page_size, search, search_exact: true },
  });

  return data;
};

export const useGetGames = (args: GamesQueryArgs) => {
  return useQuery({
    queryKey: ["games",`games-${args.search}`],
    queryFn: () => getGames(args),
  });
};

export default getGames;
