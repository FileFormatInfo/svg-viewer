import { Center } from "@chakra-ui/react";

import { ErrorPageStrategy } from "shared/Result";

import { OpenUrlForm } from "./OpenUrlForm";

export const OpenPage = () => {
  return (
      <Center flex={1} py={{ base: 10, md: 12 }}>
        <OpenUrlForm initialUrl="https://view.svg.zone/favicon.svg" />
      </Center>
  );
};

export const Component = OpenPage; //withRequireImage(OpenPage, { to: "/products" });

export const ErrorBoundary = ErrorPageStrategy;
