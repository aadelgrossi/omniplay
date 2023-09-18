import Image from "next/image";

import { Game } from "@/services/types";
import { HStack, styled } from "@/styled-system/jsx";

import Rating from "./Rating";

const CardContent = styled("div", { base: { p: 4 } });
const Title = styled("h2", { base: { textStyle: "h2", color: "paper" } });

export default function GameCard(game: Game) {
  return (
    <styled.div borderRadius="lg" key={game.id} bg="slate.800">
      <Image
        style={{
          overflow: "hidden",
          width: "100%",
          aspectRatio: "16/9",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        alt={game.name}
        src={game.background_image || ""}
        width={300}
        height={150}
      />
      <CardContent>
        <HStack justifyContent="space-between">
          <Title title={game.name}>{game.name}</Title>
          <Rating value={game.metacritic} />
        </HStack>
      </CardContent>
    </styled.div>
  );
}
