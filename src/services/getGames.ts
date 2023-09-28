import { useQuery } from "@tanstack/react-query";

import api from "./api";
import { Game, QueryResults } from "./types";

type GamesQueryArgs = {
  search?: string;
  ordering?: "metacritic";
  metacritic?: string;
  page_size?: number;
  page?: number;
};

type GamesQueryResponse = QueryResults<Game>

const getGames = async (args: GamesQueryArgs) => {
  const { ordering = "-metacritic", page_size = 20, page, search } = args;
  const { data } = await api.get<GamesQueryResponse>("/games", {
    params: {
      ordering,
      dates: search ? undefined : "2022-01-01,2023-12-01",
      page_size,
      page,
      metacritic: search ? undefined : "80,100",
      search,
      search_exact: true,
    },
  });

  return data;
};

export const useGetGamesQuery = (args: GamesQueryArgs) => {
  const { search, page, page_size } = args;
  return useQuery({
    queryKey: ["games", { search, page, page_size }],
    queryFn: () => getGames(args),
  });
};

export default getGames;
