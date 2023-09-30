import type { Meta, StoryObj } from "@storybook/react";
import { Sarabun } from "next/font/google";
import { FaCalendar } from "react-icons/fa";

import InfoCard from "@/components/InfoCard";

import { styled } from "../../styled-system/jsx";

const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const meta: Meta<typeof InfoCard> = {
  title: "Components/InfoCard",
  component: InfoCard,
  parameters: {
    layout: "centered",
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

export const Primary: Story = {
  args: {
    label: "Release Date",
    icon: <FaCalendar />,
    value: "Aug 25, 2022",
  },
};
