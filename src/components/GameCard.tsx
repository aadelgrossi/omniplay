import Image from "next/image";
import Link from "next/link";
import { cloneElement } from "react";
import { BsAndroid2 } from "react-icons/bs";
import {
  FaApple,
  FaLinux,
  FaPlaystation,
  FaWindows,
  FaXbox,
} from "react-icons/fa";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { SiNintendo, SiSega } from "react-icons/si";
import { TbWorld } from "react-icons/tb";
import Skeleton from "react-loading-skeleton";

import { Game } from "@/services/types";
import { Box, HStack, styled } from "@/styled-system/jsx";

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

const Platforms = styled(HStack, {
  base: {
    gap: 2.5,
    mb: 1,
    "& svg": {
      fill: "gray.300",
      width: 3.5,
      height: 3.5,
    },
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

const platformIconLookup: { [key: string]: JSX.Element } = {
  android: <BsAndroid2 />,
  pc: <FaWindows />,
  mac: <FaApple />,
  linux: <FaLinux />,
  playstation: <FaPlaystation />,
  nintendo: <SiNintendo />,
  xbox: <FaXbox />,
  sega: <SiSega />,
  ios: <MdOutlinePhoneIphone />,
  web: <TbWorld />,
};

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

type GameCardProps = Partial<Game> & { isLoading?: boolean };

export default function GameCard(props: GameCardProps) {
  const { isLoading, ...game } = props;

  if (isLoading) return <CardSkeleton />;
  return (
    <Link href={game.slug || "/"}>
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
          src={game.background_image || ""}
          width={300}
          height={150}
        />
        <CardContent>
          <Platforms>
            {game.parent_platforms?.map(({ platform }) => (
              <>
                {cloneElement(platformIconLookup[platform.slug], {
                  title: platform.name,
                })}
              </>
            ))}
          </Platforms>

          <HStack gap={2} alignItems="center" justifyContent="space-between">
            <Title title={game.name}>{game.name}</Title>
            <Rating value={game.metacritic} />
          </HStack>
          <Genres>{game?.genres?.map((genre) => genre.name).join(", ")}</Genres>
        </CardContent>
      </CardWrapper>
    </Link>
  );
}
