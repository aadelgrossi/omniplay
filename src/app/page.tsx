import { styled, VStack } from "@/styled-system/jsx";

export default function Home() {
  return (
    <styled.main minHeight="100vh" backgroundColor="gray.900">
      <VStack
        textAlign={["center", "flex-start"]}
        alignItems={["center", "flex-start"]}
        padding={[2, 5]}
      >
        <styled.h1 textStyle="h1" color="primary">
          OmniPlay
        </styled.h1>
        <styled.p textStyle="body" color="text">
          Elevate Your Gaming Experience: Browse and discover the greatest games
          out there!
        </styled.p>
      </VStack>
    </styled.main>
  );
}
