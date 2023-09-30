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

  const rating = () => {
    if (value <= 40) return "red.400";
    if (value <= 80) return "yellow.400";
    return "green.400";
  };

  return (
    <Box bg={rating()}>
      <Value>{value}</Value>
    </Box>
  );
}
