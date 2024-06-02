import { LoaderFunctionArgs } from "shared/Router";

import { cartProductsLoader } from "modules/carts/infrastructure";

export const previewPageLoader = ({ params }: LoaderFunctionArgs) => {
  return cartProductsLoader((params as { cartId: string }).cartId);
};
