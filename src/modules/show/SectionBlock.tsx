import { PropsWithChildren } from "react";

import { styled, VStack } from "../../../styled-system/jsx";

type SectionBlockProps = PropsWithChildren<{ heading: string }>;

export default function SectionBlock(props: SectionBlockProps) {
  const { heading, children } = props;

  return (
    <VStack alignItems="flex-start" gap={4} width="full">
      <styled.h3 fontWeight="bold" fontSize="4xl" color="primary">
        {heading}
      </styled.h3>
      {children}
    </VStack>
  );
}
