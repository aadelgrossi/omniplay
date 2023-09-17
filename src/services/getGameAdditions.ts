import { useQuery } from '@tanstack/react-query';

import api from "./api";
import { GamesResponse } from "./types";

const getAdditionsByGameId = async (gameId: number) => {
  const { data } = await api.get<GamesResponse>(`games/${gameId}/additions`);
  return data;
};

export const useGetGameAdditionsByGameId = (gameId: number) => {
  return useQuery({
    queryKey: [`game-id-${gameId}-additions`],
    queryFn: () => getAdditionsByGameId(gameId),
  });
};

export default getAdditionsByGameId;
