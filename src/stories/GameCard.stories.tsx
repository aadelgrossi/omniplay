import type { Meta, StoryObj } from "@storybook/react";
import { Sarabun } from "next/font/google";

import GameCard from "@/components/GameCard";

import { styled } from "../../styled-system/jsx";

const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const game = {
  id: 2943,
  name: "God of War 2018",
  slug: "god-of-war-2",
  metacritic: 90,
  parent_platforms: [
    {
      platform: {
        id: 3,
        slug: "playstation",
        name: "Playstation",
      },
    },
  ],
  genres: [
    {
      id: 20,
      slug: "action",
      name: "Action",
    },
  ],
  background_image:
    "https://media.rawg.io/media/resize/1920/-/screenshots/928/928cdaf4ae204f202d177bbd65e911b3.jpeg",
};

const meta: Meta<typeof GameCard> = {
  title: "Components/GameCard",
  component: GameCard,
  parameters: {
    layout: "centered",
  },
  args: {
    game,
  },
  decorators: [
    (Story) => (
      <styled.div className={sarabun.className} width="300px">
        <Story />
      </styled.div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const NoImage: Story = {
  args: {
    game: {
      ...game,
      background_image: "",
    },
  },
};
