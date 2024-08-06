import { VStack, Stack, Text, useBreakpointValue, StackDirection } from "@chakra-ui/react";
import { useSearchParams } from "@remix-run/react";


const defaultSizes = "16,24,32,48,64,96,128";

interface ICardProps {
    imageCss: Record<string, string>;
    size: number;
    url: string;
}

function IconCard({ imageCss, size, url }: ICardProps) {
    const alignSelf = useBreakpointValue({
        base: 'center',
        lg: 'end',
    }, {
        fallback: 'lg',
    }) || 'start';

    return (
        <VStack alignSelf={alignSelf}>
            <img alt={`${size} for ${url}`} src={url} style={{...imageCss, "width": `${size}pt`, "height": `${size}pt`}}/>
            <Text>{`${size}`}</Text>
        </VStack>
    )
}

interface IProps {
    display: string,
    imageCss: Record<string, string>;
    url: string;
}

type VHSettings = {
    direction: StackDirection;
    spacing: number;
    styles: object;
}

function getSizes(urlSizes: string): number[] {

    if (!/[0-9]+(,[0-9]+)*/.test(urlSizes)) {
        urlSizes = defaultSizes;
    }
    const strSizes = urlSizes.split(',');
    return strSizes.map((size) => parseInt(size));
}


function IconList({
    display,
    imageCss,
    url,
}: IProps) {

    const [searchParams] = useSearchParams();

    const sizes = getSizes(searchParams.get('sizes') || defaultSizes);

    const vhsettings:VHSettings = useBreakpointValue({
        base: { direction: 'column', spacing: 4, styles: { "position": "absolute", "top": "4px"}},
        lg: { direction: 'row', spacing: 12, styles: {}},
    }, {
        fallback: 'lg',
    }) || { direction: 'row', spacing: 10, styles: {}};

    return(
        <Stack direction={vhsettings.direction}  justifyItems="center" spacing={vhsettings.spacing} style={{"display": display, ...vhsettings.styles}}>
            {sizes.map((size) => ( <IconCard imageCss={imageCss} key={size} size={size} url={url} /> ))}
        </Stack>
    );
}

export { IconList };
