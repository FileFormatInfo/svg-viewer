// eslint-disable-next-line no-restricted-imports
import { RouterProvider } from "react-router-dom";

import { router } from "pages/router";

function App() {
  return <RouterProvider router={router} />;
}

export { App };
