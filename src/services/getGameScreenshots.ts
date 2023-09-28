import { useQuery } from "@tanstack/react-query";

import api from "./api";
import { QueryResults, Screenshot } from "./types";

type ScreenshotsQueryResponse = QueryResults<Screenshot>

const getGameScreenshots = async (slug: string) => {
  const { data } = await api.get<ScreenshotsQueryResponse>(`games/${slug}/screenshots`);
  return data;
};

export const useGetGameScreenshots = (slug: string) => {
  return useQuery({
    queryKey: ["screenshots", slug],
    queryFn: () => getGameScreenshots(slug),
  });
};

export default getGameScreenshots