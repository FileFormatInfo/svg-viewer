import { PiArrowSquareOutBold, PiListBold } from "react-icons/pi";



import { ChevronDownIcon } from "@chakra-ui/icons";
import { Collapse, Flex, Icon, IconButton, Link as ChLink, Spacer, Stack, Text, useColorModeValue, useDisclosure, PopoverTrigger, Popover, PopoverContent } from "@chakra-ui/react";



import { LogoIcon } from "shared/Components";
import { Link, useNavigate, useSearchParams } from "shared/Router";


export const MobileToolbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bg = useColorModeValue("white", "gray.800");

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
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="Open menu"
            icon={<Icon boxSize="1.75em" as={PiListBold} />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <Stack>
            <ChLink
              as={Link}
              to="/open.html"
              p={2}

            >
              Open
            </ChLink>
            <ChLink
              as={Link}
              to="/view.html"
              p={2}
            >
              View
            </ChLink>
          </Stack>
        </PopoverContent>
      </Popover>
     <Spacer />
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