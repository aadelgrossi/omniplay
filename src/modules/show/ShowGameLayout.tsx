import Image from "next/image";
import { FaCalendar, FaGamepad, FaShieldAlt, FaStar } from "react-icons/fa";

import BackButton from "@/components/BackButton";
import GameCard from "@/components/GameCard";
import GameParentPlatforms from "@/components/GameParentPlatforms";
import InfoCard from "@/components/InfoCard";
import getGameAdditions from "@/services/getGameAdditions";
import getGameScreenshots from "@/services/getGameScreenshots";
import { Game } from "@/services/types";

import { Box, Grid, Stack, styled, VStack } from "../../../styled-system/jsx";
import ScreenshotsGallery from "./ScreenshotsGallery";
import SectionBlock from "./SectionBlock";

const ImageGradient = styled(Box, {
  base: {
    width: "100vw",
    position: "absolute",
    right: 0,
    bottom: 0,
    height: "80vh",
    bgGradient: "to-t",
    gradientFrom: "slate.900",
    gradientTo: "transparent",
    zIndex: -1,
  },
});

export default async function ShowGameLayout({ game }: { game: Game }) {
  const screenshots = await getGameScreenshots(game.slug);
  const additions = await getGameAdditions(game.slug);

  return (
    <VStack alignItems="flex-start" w="full" gap={3}>
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
          opacity: 0.08,
        }}
      />
      <BackButton variant="ghost" />
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
            {game?.metacritic && (
              <InfoCard
                icon={<FaStar />}
                label="Metacritic Score"
                value={game?.metacritic}
              />
            )}
            {Number(game?.developers.length) > 0 && (
              <InfoCard
                icon={<FaGamepad />}
                label="Developer"
                value={game?.developers[0].name}
              />
            )}
          </Grid>
        </VStack>
      </Stack>
      {game?.description_raw && (
        <SectionBlock heading="About">
          <styled.pre
            fontFamily="inherit"
            borderRadius="lg"
            fontSize={["medium", "medium", "large"]}
            color="slate.200"
            whiteSpace="pre-line"
          >
            {game?.description_raw}
          </styled.pre>
        </SectionBlock>
      )}

      {additions.count > 0 && (
        <SectionBlock heading="DLC's">
          <Grid
            width="full"
            gap={[2, 5]}
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr));"
          >
            {additions.results.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Grid>
        </SectionBlock>
      )}
    </VStack>
  );
}
