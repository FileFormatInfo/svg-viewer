import { useRef } from 'react';
import { PiArrowSquareOutBold, PiListBold, PiXBold } from "react-icons/pi";



import { ChevronDownIcon } from "@chakra-ui/icons";
import { Select, Button, FormControl, FormLabel, Input, Collapse, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Flex, Icon, IconButton, Link as ChLink, Spacer, Stack, Switch, Text, useColorModeValue, useDisclosure, PopoverTrigger, Popover, PopoverContent } from "@chakra-ui/react";



import { getQueryStringParam, setQueryStringParam } from 'utils/querystring';



import { LogoIcon } from "shared/Components";
import { Link, useNavigate, useSearchParams } from "shared/Router";



import { BackgroundButtons } from "./BackgroundButtons";
import { BorderButtons } from "./BorderButtons";
import { ZoomButtons } from './ZoomButtons';


export const MobileToolbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();

  const btnRef = useRef<HTMLButtonElement | null>(null);

  const isDebug = getQueryStringParam("debug", "0") === "1";
  const backUrl = searchParams.get("backUrl") || "/";
  const backText = searchParams.get("backText") || "Exit";
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
        icon={ isOpen ? <Icon boxSize="1.75em" as={PiXBold} /> : <Icon boxSize="1.75em" as={PiListBold} />}
        onClick={onToggle}
      />
      <Drawer
        size={"sm"}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>

            <FormControl display='flex' alignItems='center' pb={3}>
              <FormLabel htmlFor='email-alerts' mb='0'>
                Zoom
              </FormLabel>
              <Spacer/>
              <ZoomButtons boxSize="2.25em" size="lg" />
            </FormControl>


            <FormControl display='flex' alignItems='center' pb={3}>
              <FormLabel htmlFor='email-alerts' mb='0'>
                Border
              </FormLabel>
              <Spacer/>
              <BorderButtons boxSize="2.25em" size="lg" />
            </FormControl>

            <FormControl display='flex' alignItems='center' pb={3}>
              <FormLabel htmlFor='email-alerts' mb='0'>
                Background
              </FormLabel>
              <Spacer/>
              <BackgroundButtons boxSize="2.25em" size="lg" />
            </FormControl>

            <FormControl display='flex' alignItems='center' py={4} >
              <FormLabel htmlFor='email-alerts' mb='0' >
                Debugging?
              </FormLabel>
              <Spacer />
              <Switch isChecked={isDebug} onChange={() => navigate(`/view.html?${setQueryStringParam("debug", isDebug ? "0" : "1")}`)}/>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>      <Spacer />
      <Flex onClick={() => navigate("/open.html")}>
        <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>SVG View</Text>
      </Flex>
      <Spacer />
      <IconButton
        aria-label={backText}
        icon={<Icon boxSize="1.75em" as={PiArrowSquareOutBold} />}
        onClick={() => {
          if (backUrl.startsWith("http://") || backUrl.startsWith("https://")) {
            window.location.href = backUrl;
          } else {
            navigate(backUrl)
          }
        }}
      />
      
    </Flex>
  );
};