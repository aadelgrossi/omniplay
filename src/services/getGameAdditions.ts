import { useQuery } from '@tanstack/react-query';

import api from "./api";
import { Game, QueryResults } from "./types";

type GameAdditionsResponse = QueryResults<Game>

const getGameAdditions = async (slug: string) => {
  const { data } = await api.get<GameAdditionsResponse>(`games/${slug}/additions`);
  return data;
};

export const useGetGameAdditions = (slug: string) => {
  return useQuery({
    queryKey: ['additions',slug],
    queryFn: () => getGameAdditions(slug),
  });
};

export default getGameAdditions;
