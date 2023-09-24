import Image from "next/image";
import { FaCalendar, FaGamepad, FaShieldAlt, FaStar } from "react-icons/fa";
import { ImUpload } from "react-icons/im";

import GameParentPlatforms from "@/components/GameParentPlatforms";
import InfoCard from "@/components/InfoCard";
import getSingleGame from "@/services/getSingleGame";
import { Box, Grid, Stack, styled, VStack } from "@/styled-system/jsx";
import { token } from "@/styled-system/tokens";

type ShowGameProps = {
  params: {
    slug: string;
  };
};

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

export default async function ShowGame({ params }: ShowGameProps) {
  const game = await getSingleGame(params.slug);
  const maxWidth = token("breakpoints.lg");

  return (
    <Box>
      <ImageGradient />
      <Image
        src={game?.background_image || ""}
        alt={game?.name || ""}
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          zIndex: -2,
          top: 0,
          right: 0,
          width: "100%",
          objectFit: "contain",
          opacity: 0.4,
        }}
      />
      <Stack
        direction={["column", "column", "column", "row"]}
        mt={[2, 5]}
        gap={[2, 2, 2, 8]}
      >
        <Image
          src={game?.background_image || ""}
          alt={game?.name || ""}
          width={500}
          height={200}
          style={{
            maxWidth,
            width: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <VStack
          width="full"
          my={5}
          gap={3}
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

            {Number(game?.publishers.length) > 0 && (
              <InfoCard
                icon={<ImUpload />}
                label="Publisher"
                value={game?.publishers?.[0]?.name}
              />
            )}
          </Grid>
        </VStack>
      </Stack>
      <styled.h3 fontSize="2xl" color="paper">
        About
      </styled.h3>
      <styled.pre
        fontFamily="inherit"
        borderRadius="lg"
        bgColor="slate.900"
        color="slate.400"
        p={3}
        whiteSpace="pre-line"
      >
        {game?.description_raw}
      </styled.pre>
    </Box>
  );
}
