"use client";
import { useRef } from "react";
import { PiArrowSquareOutBold, PiListBold, PiXBold } from "react-icons/pi";

import {
  Button,
  FormControl,
  FormLabel,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Icon,
  IconButton,
  Spacer,
  Switch,
  Text,
  useColorModeValue,
  useDisclosure,

} from "@chakra-ui/react";
import { Link as RemixLink, useSearchParams } from "@remix-run/react";

import { t } from "~/utils/i18n";

import { ToolbarButton } from "~/components/ToolbarButton";

import { BackgroundButtons } from "./BackgroundButtons";
import { BorderButtons } from "./BorderButtons";
import { ExitButton } from "./ExitButton";
import { ZoomButtons } from "./ZoomButtons";

interface IProps {
  currentZoom: number;
  setZoom?: React.Dispatch<React.SetStateAction<number>>;
}

export const MobileToolbar = ({ currentZoom, setZoom }: IProps) => {
  const [searchParams] = useSearchParams();
  const { isOpen, onToggle, onClose } = useDisclosure();

  const btnRef = useRef<HTMLButtonElement | null>(null);

  const isDebug = (searchParams.get("debug") || "0") === "1";
  searchParams.set("debug", isDebug ? "0" : "1");
  const backUrl = searchParams.get("backUrl") || "/";
  const backText = searchParams.get("backText") || t("Exit");
  return (
    <Flex
      w="100%"
      minW="100%"
      minH="60px"
      py={2}
      px={4}
      borderBottom={1}
      direction="row"
      borderStyle="solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <IconButton
        aria-label="Open menu"
        ref={btnRef}
        icon={
          isOpen ? (
            <Icon boxSize="1.75em" as={PiXBold} />
          ) : (
            <Icon boxSize="1.75em" as={PiListBold} />
          )
        }
        onClick={onToggle}
      />
      <Drawer
        size={"sm"}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <FormControl display="flex" alignItems="center" pb={3}>
              <FormLabel htmlFor="email-alerts" mb="0">
                Zoom
              </FormLabel>
              <Spacer />
              <ZoomButtons
                boxSize="2.25em"
                currentZoom={currentZoom}
                setZoom={setZoom}
                size="lg"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" pb={3}>
              <FormLabel htmlFor="email-alerts" mb="0">
                Border
              </FormLabel>
              <Spacer />
              <BorderButtons boxSize="2.25em" size="lg" />
            </FormControl>

            <FormControl display="flex" alignItems="center" pb={3}>
              <FormLabel htmlFor="email-alerts" mb="0">
                Background
              </FormLabel>
              <Spacer />
              <BackgroundButtons boxSize="2.25em" size="lg" />
            </FormControl>

            <FormControl display="flex" alignItems="center" py={4}>
              <FormLabel htmlFor="email-alerts" mb="0">
                Debugging?
              </FormLabel>
              <Spacer />
              <Switch
              as={RemixLink}
                isChecked={isDebug}
                to={`?${searchParams.toString()}`}
              />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>{" "}
      <Spacer />
      <Flex as={RemixLink} to="/">
        <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>
          SVG View
        </Text>
      </Flex>
      <Spacer />
      <ExitButton
        text={backText}
        boxSize="1.75em"
        link={backUrl}
        size="md"
      />
    </Flex>
  );
};
