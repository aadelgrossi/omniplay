import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Select from "@/components/Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    (Story) => {
      const [value, onValueChange] = useState("10");
      return (
        <Story
          args={{
            value,
            onValueChange,
            options: [
              { label: "Show 10 items", value: 10 },
              { label: "Show 20 items", value: 20 },
              { label: "Show 50 items", value: 50 },
              { label: "Show 100 items", value: 100 },
            ],
          }}
        />
      );
    },
  ],
};
