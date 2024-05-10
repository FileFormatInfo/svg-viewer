import { Center } from "@chakra-ui/react";

import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

import { withRequireImage} from "modules/image/application";
import { OpenUrlForm } from "modules/image/presentation";

export const OpenPage = () => {
  return (
    <Page maxW="container.xl">
      <Center py={{ base: 10, md: 12 }}>
        <OpenUrlForm initialUrl="https://www.vectorlogo.zone/favicon.svg" />
      </Center>
    </Page>
  );
};

export const Component = OpenPage; //withRequireImage(OpenPage, { to: "/products" });

export const ErrorBoundary = ErrorPageStrategy;
