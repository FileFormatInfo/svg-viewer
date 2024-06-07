import { Page } from "shared/Layout";
import { InternalErrorResult } from "shared/Result";
import { useRouteError } from "shared/Router";



import { Flex } from "@chakra-ui/react";


const HomePage = () => {

  return (
    <Page maxW="container.xl" spacing={{ base: 8, lg: 20 }}>
      <Flex w="100%" h="100%" direction="column" align="center" justify="center">
        This is some content
      </Flex>
    </Page>
  );
};

export const Component = HomePage;

export const ErrorBoundary = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return <HomePage/>;
  }

  return <InternalErrorResult />;
};