import { useRef, useState } from "react";
import { PiListBold, PiXBold } from "react-icons/pi";

import {
    Button,
    DrawerRoot,
    DrawerBody,
    DrawerBackdrop,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    Flex,
    HStack,
    Icon,
    IconButton,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { Link as RemixLink, useSearchParams } from "@remix-run/react";
import { useColorModeValue } from "~/components/ui/color-mode";
import { CloseButton } from "~/components/ui/close-button"
import { Switch } from "~/components/ui/switch"

import { t } from "~/utils/i18n";

import { BackgroundButtons } from "./BackgroundButtons";
import { BorderButtons } from "./BorderButtons";
import { ExitButton } from "./ExitButton";
import { ZoomButtons } from "./ZoomButtons";

interface IProps {
    currentZoom: number;
    setZoom?: React.Dispatch<React.SetStateAction<number>>;
}

export const MobileToolbar = ({ currentZoom, setZoom }: IProps) => {
    const borderColor = useColorModeValue("gray.200", "gray.900");
    const [searchParams] = useSearchParams();
    const [ open, setOpen ] = useState(false);

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
            borderColor={borderColor}
        >
            <IconButton
                aria-label="Open menu"
                ref={btnRef}
                onClick={() => setOpen(true)}
            >{
                    open ? (
                        <Icon boxSize="1.75em" as={PiXBold} />
                    ) : (
                        <Icon boxSize="1.75em" as={PiListBold} />
                    )
                }
            </IconButton>
            <DrawerRoot
                size={"sm"}
                open={open}
                placement="start"
                onOpenChange={(e) => setOpen(e.open)}
            >
                <DrawerBackdrop />
                <DrawerContent>
                    <CloseButton />
                    <DrawerHeader>Settings</DrawerHeader>

                    <DrawerBody>
                        <HStack display="flex" alignItems="center" pb={3}>
                            <Text mb="0">
                                Zoom
                            </Text>
                            <Spacer />
                            <ZoomButtons
                                boxSize="2.25em"
                                currentZoom={currentZoom}
                                setZoom={setZoom}
                                size="lg"
                            />
                        </HStack>

                        <HStack display="flex" alignItems="center" pb={3}>
                            <Text mb="0">
                                Border
                            </Text>
                            <Spacer />
                            <BorderButtons boxSize="2.25em" size="lg" />
                        </HStack>

                        <HStack display="flex" alignItems="center" pb={3}>
                            <Text mb="0">
                                Background
                            </Text>
                            <Spacer />
                            <BackgroundButtons boxSize="2.25em" size="lg" />
                        </HStack>

                        <HStack display="flex" alignItems="center" py={4}>
                            <Text mb="0">
                                Debugging?
                            </Text>
                            <Spacer />
                            <Switch
                                as={RemixLink}
                                checked={isDebug}
                                onCheckedChange={() => `?${searchParams.toString()}`}
                            />
                        </HStack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </DrawerRoot>{" "}
            <Spacer />
            <RemixLink to="/">
                <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>
                    SVG View
                </Text>
            </RemixLink>
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
