import { useState } from "react";



import { Box, Checkbox, Stack, Link, Button, Heading, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useSecondaryTextColor } from "theme";



import { t } from "utils";



import { TextInput } from "shared/Form";
import { Navigate, useNavigate } from "shared/Router";
import { NavigateProps } from "shared/Router";



import { useImageStore } from "../application";
import { useOpenNotifications } from "./useOpenNotifications";


interface IProps {
  initialUrl?: string;
}

export const OpenUrlForm = ({ initialUrl }: IProps) => {
  const secondaryColor = useSecondaryTextColor();

  const [url, setUrl] = useState(initialUrl);
  const navigate = useNavigate();

  const [notifySuccess, notifyFailure] = useOpenNotifications();
  const load = useImageStore((store) => store.load);

  return (
    <VStack align="stretch" spacing={8} w="100%" maxW="lg">
      <VStack textAlign="center">
        <Heading fontSize={{ base: "2xl", md: "4xl" }}>
          {t("Select an SVG image")}
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color={secondaryColor}>
          {t("to preview")}
        </Text>
      </VStack>
      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
        p={{ base: 6, md: 8 }}
      >
        <VStack
          as="form"
          spacing={4}
          onSubmit={(e) => {
            e.preventDefault();

            if (!url) {
              return;
            }

            load(url)
              .then(() => { 
                notifySuccess();
                navigate(`/image.html?url=${encodeURIComponent(url || '')}`);
              })
              // eslint-disable-next-line no-console
              .catch((err) => { console.log(err); notifyFailure() });
          }}
        >
          <TextInput
            id="url"
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
          >
            {t("URL")}
          </TextInput>

            <Button
              type="submit"
              colorScheme="blue"
              w="100%"
            >
              {t("Open")}
            </Button>
        </VStack>
      </Box>
    </VStack>
  );
};