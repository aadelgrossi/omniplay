import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import { Game } from "@/services/types";
import { Box, HStack, styled } from "@/styled-system/jsx";

import GameParentPlatforms from "./GameParentPlatforms";
import Rating from "./Rating";

const CardContent = styled("div", { base: { p: 4 } });
const Title = styled("h2", {
  base: {
    textStyle: "h2",
    color: "paper",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "pre",
    maxWidth: "280px",
  },
});

const Genres = styled("p", {
  base: {
    textStyle: "body",
    color: "slate.400",
    fontSize: "sm",
  },
});

const CardWrapper = styled(Box, {
  base: {
    cursor: "pointer",
    transform: "scale(1)",
    transition: "transform 0.1s ease-in-out",
    height: "full",
    _hover: {
      outline: "2px solid black",
      outlineColor: "primary",
      transform: "scale(1.02)",
    },
    borderRadius: "lg",
    bg: "slate.800",
  },
});

function CardSkeleton() {
  return (
    <Box borderRadius="lg" bg="slate.800">
      <Skeleton width="100%" height="200px" style={{ lineHeight: "unset" }} />
      <CardContent>
        <Skeleton width="120px" height="16px" />
        <HStack width="full" justifyContent="space-between">
          <Skeleton width="260px" height="24px" />
          <Skeleton width="28px" height="28px" />
        </HStack>
        <Skeleton width="160px" height="12px" />
      </CardContent>
    </Box>
  );
}

type GameCardProps = {
  game?: Game;
  isLoading?: boolean;
};

export default function GameCard(props: GameCardProps) {
  const { isLoading, game } = props;

  if (isLoading) return <CardSkeleton />;
  return (
    <Link href={game?.slug || "/"}>
      <CardWrapper>
        <Image
          style={{
            overflow: "hidden",
            width: "100%",
            aspectRatio: "16/9",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            objectFit: "cover",
          }}
          alt={game?.name || ""}
          src={game?.background_image || ""}
          width={300}
          height={150}
        />
        <CardContent>
          <GameParentPlatforms parent_platforms={game?.parent_platforms} />

          <HStack gap={2} alignItems="center" justifyContent="space-between">
            <Title title={game?.name}>{game?.name}</Title>
            <Rating value={game?.metacritic} />
          </HStack>
          <Genres>{game?.genres?.map((genre) => genre.name).join(", ")}</Genres>
        </CardContent>
      </CardWrapper>
    </Link>
  );
}
