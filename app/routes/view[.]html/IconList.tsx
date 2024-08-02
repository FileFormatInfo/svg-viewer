import { VStack, Stack, Text, useBreakpointValue, StackDirection } from "@chakra-ui/react";


const sizes = [ 16, 24, 32, 48, 64, 96, 128 ]

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


function IconList({
    display,
    imageCss,
    url,
}: IProps) {

    const direction:StackDirection = useBreakpointValue({
        base: 'column',
        lg: 'row',
    }, {
        fallback: 'lg',
    }) || 'row';
    
    return(
        <Stack direction={direction} justifyItems="center" spacing={10} style={{"display": display}}>
            {sizes.map((size) => ( <IconCard imageCss={imageCss} key={size} size={size} url={url} /> ))}
        </Stack>
    );
}

export { IconList };