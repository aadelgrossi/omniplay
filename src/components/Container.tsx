import { ContainerProps, styled } from "@/styled-system/jsx";

export default function Container(props: ContainerProps) {
  return (
    <styled.div
      px={[2, 5]}
      mx="auto"
      width="full"
      maxWidth={["100%", "breakpoint-2xl"]}
      {...props}
    />
  );
}
