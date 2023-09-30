import { Box, BoxProps, styled } from "../../styled-system/jsx";

const StyledSkeleton = styled(Box, {
  base: {
    bg: "slate.700",
    animation: "pulse",
    animationDuration: "1s",
  },
});

export default function Skeleton(props: BoxProps) {
  return <StyledSkeleton borderRadius="sm" {...props} />;
}

export function SkeletonCircle(props: BoxProps) {
  return <StyledSkeleton borderRadius="full" {...props} />;
}
