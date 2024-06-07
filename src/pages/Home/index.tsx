import { Page } from "shared/Layout";
import { InternalErrorResult } from "shared/Result";
import { useRouteError } from "shared/Router";



import { Flex, Link } from "@chakra-ui/react";


const HomePage = () => {

  return (
      <Flex w="100%" h="100%" direction="column" align="center" justify="center" bg={"pink"} >
        This is some content
        <Link href="/open.html">Open</Link>
      </Flex>
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