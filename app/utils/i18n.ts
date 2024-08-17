//import { default as IntlMessageFormat } from "intl-messageformat";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const locale = "en"; //LATER


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function t(message: string, values?: Record<string, unknown>):string {
    return message;
    //LATER
    //return new IntlMessageFormat(message, locale).format(values) as string;
}
