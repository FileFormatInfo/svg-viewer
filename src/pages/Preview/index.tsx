import {
  Box,
  VStack,
  StackProps,
  Container,
  ContainerProps,
  Flex,
} from "@chakra-ui/react";
import { t } from "utils";

import { Page, PageHeader } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";
import { useNavigate, useSearchParams } from "shared/Router";

import { DesktopToolbar } from "./DesktopToolbar";

import { withRequireImage } from "modules/image/application";

const PreviewPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get('url') || undefined;

  return (
    <VStack
      w="100%"
      h="100vh"
      spacing="0"
    >
      <DesktopToolbar />
      <Flex w="100%" h="100%" bg="white" alignItems="center" justifyContent="center">
      <img src={url} />
      </Flex>
    </VStack>
  );
};

export const Component = PreviewPage; //withRequireImage(PreviewPage, { to: "/open" });

export const ErrorBoundary = ErrorPageStrategy;
