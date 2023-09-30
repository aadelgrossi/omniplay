import { Center, styled } from "../../styled-system/jsx";

const Box = styled(Center, { base: { borderRadius: "md", w: 9, h: 9 } });
const Value = styled("span", {
  base: {
    color: "slate.900",
    fontSize: "lg",
    fontWeight: "bold",
  },
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
