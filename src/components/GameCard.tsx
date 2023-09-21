import Image from "next/image";
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
import Skeleton from "react-loading-skeleton";

import { Game } from "@/services/types";
import { css } from "@/styled-system/css";
import { Box, HStack, styled } from "@/styled-system/jsx";

import Rating from "./Rating";

const CardContent = styled("div", { base: { p: 4 } });
const Title = styled("h2", { base: { textStyle: "h2", color: "paper" } });

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
};

function CardSkeleton() {
  return (
    <Box borderRadius="lg" bg="slate.800">
      <Skeleton
        width="100%"
        height="200px"
        style={{
          lineHeight: "unset",
        }}
      />
      <CardContent>
        <Skeleton width="70%" height="20px" />
      </CardContent>
    </Box>
  );
}

type GameCardProps = Partial<Game> & { isLoading?: boolean };

export default function GameCard(props: GameCardProps) {
  const { isLoading, ...game } = props;

  if (isLoading) return <CardSkeleton />;
  return (
    <Box borderRadius="lg" key={game.id} bg="slate.800">
      <Image
        style={{
          overflow: "hidden",
          width: "100%",
          aspectRatio: "16/9",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        alt={game?.name || ""}
        src={game.background_image || ""}
        width={300}
        height={150}
      />
      <CardContent>
        <HStack
          gap={2.5}
          mb={1}
          className={css({
            "& svg": {
              fill: "gray.300",
              width: 3.5,
              height: 3.5,
            },
          })}
        >
          {game.parent_platforms?.map(({ platform }) => (
            <>
              {cloneElement(platformIconLookup[platform.slug], {
                title: platform.name,
              })}
            </>
          ))}
        </HStack>

        <HStack gap={2} alignItems="flex-start" justifyContent="space-between">
          <Title title={game.name}>{game.name}</Title>
          <Rating value={game.metacritic} />
        </HStack>
      </CardContent>
    </Box>
  );
}
