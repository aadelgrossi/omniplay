import Container from "@/components/Container";
import Input from "@/components/Input";
import { styled, VStack } from "@/styled-system/jsx";

export default function Home() {
  return (
    <styled.main minHeight="100vh" backgroundColor="gray.900">
      <Container>
        <VStack
          textAlign={["center", "flex-start"]}
          alignItems={["center", "flex-start"]}
          gap={0}
        >
          <styled.h1 textStyle="h1" color="primary">
            OmniPlay
          </styled.h1>
          <styled.p textStyle="body" color="paper">
            Elevate Your Gaming Experience: Browse and discover the greatest
            games out there!
          </styled.p>
        </VStack>
        <Input />
      </Container>
    </styled.main>
  );
}
