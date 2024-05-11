import { PiArrowSquareOutBold, PiCheckerboardFill, PiSquareBold, PiSquareFill, PiMagnifyingGlassMinusBold, PiMagnifyingGlassPlusBold, PiArrowsOutCardinalBold, PiArrowsInCardinalBold } from "react-icons/pi";



import { ButtonGroup, Button, Flex, Icon, IconButton, Spacer, Text, useColorModeValue } from "@chakra-ui/react";
import { useBrandColor } from "theme";



import { LogoIcon } from "shared/Components";
import { ToggleModeButton } from "shared/Components";
import { Link, useLocation, useNavigate } from "shared/Router";
import { setQueryStringParam } from "utils/querystring";


export const DesktopToolbar = () => {
  const { pathname } = useLocation();
    const navigate = useNavigate();


  const linkColor = useColorModeValue("gray.600", "gray.200");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const brandColor = useBrandColor();
  const bg = useColorModeValue("gray.50", "gray.900");

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
      <Flex onClick={ () => navigate('/open')}>
        <LogoIcon boxSize={10} />
        <Text fontSize="xl" fontWeight="bold" ps={3} pt={1}>
          SVG Preview
        </Text>
      </Flex>
      <Spacer />
      <ButtonGroup isAttached >
        <IconButton aria-label='Zoom out' icon={<Icon boxSize="1.75em" as={PiMagnifyingGlassMinusBold} />} onClick={
          () => navigate(`/image?${setQueryStringParam('zoom', 'out')}`)
        }/>
        <IconButton aria-label='Original size' icon={<Icon boxSize="1.75em" as={PiArrowsInCardinalBold} />}  onClick={
          () => navigate(`/image?${setQueryStringParam('zoom', '1')}`)
        }/>
        <IconButton aria-label='Zoom In' icon={<Icon boxSize="1.75em" as={PiMagnifyingGlassPlusBold} />} />
        <IconButton aria-label='Max zoom' icon={<Icon boxSize="1.75em" as={PiArrowsOutCardinalBold} />} />
      </ButtonGroup>
      <Spacer />
      <ButtonGroup isAttached >
        <IconButton aria-label='Checkboard background' icon={<Icon boxSize="1.75em" as={PiCheckerboardFill} />} />
        <IconButton aria-label='Light background' icon={<Icon boxSize="1.75em" as={PiSquareBold} />} />
        <IconButton aria-label='Dark background' icon={<Icon boxSize="1.75em" as={PiSquareFill} />} />
      </ButtonGroup>
      <Spacer />
      <IconButton aria-label='Exit' icon={<Icon boxSize="1.75em" as={PiArrowSquareOutBold} />} onClick={
        () => navigate('/')
      }/>
      <ToggleModeButton />
    </Flex>
  );
};