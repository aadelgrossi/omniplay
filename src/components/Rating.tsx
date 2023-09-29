import { styled } from "../../styled-system/jsx";

const Box = styled("div", { base: { borderRadius: "md", px: 2, py: 1 } });
const Value = styled("span", {
  base: { color: "slate.900", fontWeight: "semibold" },
});

export default function Rating({ value }: { value?: number }) {
  if (!value) return <></>;

  if (value <= 40)
    return (
      <Box bg="red.400">
        <Value>{value}</Value>
      </Box>
    );

  if (value <= 80)
    return (
      <Box bg="yellow.400">
        <Value>{value}</Value>
      </Box>
    );

  return (
    <Box bg="green.400">
      <Value>{value}</Value>
    </Box>
  );
}
