import Image from "next/image";
import Link from "next/link";
import {
  FaCalendar,
  FaChevronLeft,
  FaGamepad,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

import GameParentPlatforms from "@/components/GameParentPlatforms";
import InfoCard from "@/components/InfoCard";
import getGameScreenshots from "@/services/getGameScreenshots";
import getSingleGame from "@/services/getSingleGame";
import { Box, Grid, Stack, styled, VStack } from "@/styled-system/jsx";

import ScreenshotsGallery from "./ScreenshotsGallery";

const ImageGradient = styled(Box, {
  base: {
    width: "100vw",
    position: "absolute",
    right: 0,
    bottom: 0,
    height: "80vh",
    bgGradient: "to-t",
    gradientFrom: "gray.900",
    gradientVia: "gray.900",
    gradientTo: "transparent",
    zIndex: -1,
  },
});

const StyledLink = styled(Link, {
  base: {
    display: "flex",
    alignItems: "center",
    pt: 5,
    gap: 3,
    "& svg": {
      fill: "paper",
    },
  },
});

export default async function ShowGameLayout({ slug }: { slug: string }) {
  const game = await getSingleGame(slug);
  const screenshots = await getGameScreenshots(slug);

  return (
    <>
      <ImageGradient />
      <Image
        src={game?.background_image || ""}
        alt={game?.name || ""}
        fill
        style={{
          position: "absolute",
          zIndex: -2,
          top: 0,
          right: 0,
          width: "100%",
          objectFit: "cover",
          opacity: 0.3,
        }}
      />
      <StyledLink href="/">
        <FaChevronLeft />
        <styled.p color="paper" fontSize="lg">
          Go back
        </styled.p>
      </StyledLink>
      <Stack
        direction={["column", "column", "column", "row"]}
        my={[2, 5]}
        gap={[2, 2, 4, 8, 12]}
      >
        <ScreenshotsGallery
          screenshots={screenshots.results}
          game={game?.name || ""}
        />
        <VStack
          width="full"
          my={5}
          gap={5}
          justifyContent="center"
          alignItems="flex-start"
        >
          <GameParentPlatforms
            size="md"
            parent_platforms={game?.parent_platforms}
          />
          <styled.h1 textStyle="h1" color="paper" fontSize={["4xl", "5xl"]}>
            {game?.name}
          </styled.h1>

          <Grid
            width="full"
            gridTemplateColumns="repeat(auto-fill,minmax(150px,1fr))"
          >
            <InfoCard
              icon={<FaCalendar />}
              label="Release date"
              value={new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(new Date(game?.released || ""))}
            />
            <InfoCard
              icon={<FaShieldAlt />}
              label="ESRB Rating"
              value={game?.esrb_rating?.name}
            />
            <InfoCard
              icon={<FaStar />}
              label="Metacritic Score"
              value={game?.metacritic}
            />
            <InfoCard
              icon={<FaGamepad />}
              label="Developer"
              value={game?.developers[0].name}
            />
          </Grid>
        </VStack>
      </Stack>
      <styled.h3 fontWeight="bold" fontSize="4xl" color="primary">
        About
      </styled.h3>
      <styled.pre
        fontFamily="inherit"
        borderRadius="lg"
        fontSize={["medium", "medium", "large"]}
        color="slate.200"
        whiteSpace="pre-line"
      >
        {game?.description_raw}
      </styled.pre>
    </>
  );
}
