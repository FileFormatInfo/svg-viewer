//import { default as IntlMessageFormat } from "intl-messageformat";

const locale = "en"; //LATER


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function t(message: string, values?: any):string {
    return message;
  //return new IntlMessageFormat(message, locale).format(values) as string;
}
