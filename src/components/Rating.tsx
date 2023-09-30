import { Center, styled } from "../../styled-system/jsx";

const Box = styled(Center, { base: { borderRadius: "md", p: 2, w: 9, h: 9 } });
const Value = styled("span", {
  base: {
    color: "slate.900",
    fontSize: "lg",
    fontWeight: "bold",
  },
});

export default function Rating({ value }: { value?: number }) {
  if (!value) return <></>;

  return (
    <Box
      bg={value <= 40 ? "red.400" : value <= 80 ? "yellow.400" : "green.400"}
    >
      <Value>{value}</Value>
    </Box>
  );
}
