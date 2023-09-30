import { notFound } from "next/navigation";

import ShowGameLayout from "@/modules/show/ShowGameLayout";
import getSingleGame from "@/services/getSingleGame";

type ShowGameProps = {
  params: {
    slug: string;
  };
};

export default async function ShowGame({ params }: ShowGameProps) {
  const game = await getSingleGame(params.slug);

  if (!game) return notFound();
  return <ShowGameLayout game={game} />;
}
