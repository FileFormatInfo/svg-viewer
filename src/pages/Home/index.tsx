import { Page } from "shared/Layout";
import { InternalErrorResult } from "shared/Result";
import { useRouteError } from "shared/Router";


import { useNavigate, useSearchParams } from "shared/Router";

import { Button, Flex, Link } from "@chakra-ui/react";


const HomePage = () => {
  const navigate = useNavigate();

  return (
      <Flex flex={1} w="100%" h="100%" direction="column" align="center" justify="center">
        <Button onClick={
          () => navigate("/open.html") 
        }>Open</Button>
        
        <Button display="none" onClick={ //LATER: random logo & icon
          () => navigate("/open.html") 
        }>Random Logo</Button>

        
        <Button display="none" onClick={ //LATER: upload
          () => navigate("/open.html") 
        }>Upload</Button>
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