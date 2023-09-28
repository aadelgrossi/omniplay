import { useQuery } from '@tanstack/react-query';

import api from "./api";
import { Game } from "./types";

const getSingleGame = async (slug: string) => {
  try {
    const { data } = await api.get<Game>(`games/${slug}`);
    return data;
  } catch {
    return null;
  }
};

export const useGetSingleGame = (slug: string) => {
  return useQuery({
    queryKey: ['game', slug],
    queryFn: () => getSingleGame(slug),
  });
};

export default getSingleGame;
