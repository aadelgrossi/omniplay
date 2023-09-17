import { useQuery } from '@tanstack/react-query';

import api from "./api";
import { Game } from "./types";

const getSingleGameFromId = async (gameId: number) => {
  try {
    const { data } = await api.get<Game>(`games/${gameId}/additions`);
    return data;
  } catch {
    return null;
  }
};

export const useGetSingleGameById = (gameId: number) => {
  return useQuery({
    queryKey: [`game-id-${gameId}`],
    queryFn: () => getSingleGameFromId(gameId),
  });
};

export default getSingleGameFromId;
