import type { SelectProps as RadixSelectProps } from "@radix-ui/react-select";
import * as RadixSelect from "@radix-ui/react-select";
import { FaChevronDown } from "react-icons/fa";

import { css } from "@/styled-system/css";
import { styled } from "@/styled-system/jsx";

type SelectProps = RadixSelectProps & {
  options: Array<{
    value: string | number;
    label?: string;
  }>;
};

const Trigger = styled(RadixSelect.Trigger, {
  base: {
    minWidth: "170px",
    border: "2px solid",
    borderColor: "primary",
    outline: "none",
    p: 3,
    borderRadius: "lg",
    "& svg": {
      fill: "primary",
    },
    color: "slate.300",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const Item = styled(RadixSelect.SelectItem, {
  base: {
    p: 3,
    display: "flex",
    justifyContent: "space-between",
    width: "var(--radix-select-trigger-width)",
    backgroundColor: "slate.800",
    color: "slate.300",
    outline: "none",
    transition: "background 0.2s ease",
    cursor: "pointer",
    "&[data-highlighted]": {
      backgroundColor: "slate.700",
    },
  },
});

export default function Select(props: SelectProps) {
  const { options, value, ...rest } = props;

  return (
    <RadixSelect.Root value={value} {...rest}>
      <Trigger>
        <RadixSelect.Value placeholder="Items per page" asChild>
          <span>{options.find((option) => option.value == value)?.label}</span>
        </RadixSelect.Value>
        <RadixSelect.Icon>
          <FaChevronDown />
        </RadixSelect.Icon>
      </Trigger>

      <RadixSelect.Content
        sideOffset={5}
        position="popper"
        className={css({
          width: "var(--radix-select-trigger-width)",
          maxHeight: "var(--radix-select-content-available-height)",
          overflow: "hidden",
          borderRadius: "lg",
          zIndex: 2,
        })}
      >
        {options.map((option) => (
          <Item key={option.value} value={option.value as string}>
            {option?.label || option.value}
          </Item>
        ))}
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
}
