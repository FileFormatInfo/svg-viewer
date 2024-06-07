// eslint-disable-next-line no-restricted-imports
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import { Layout, BareLayout } from "shared/Layout";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <BareLayout />
      </>
    ),
    children: [
      {
        lazy: () => import("./View"),
        path: "/view.html",
      },
    ],
  },
  {
    element: (
      <>
        <ScrollRestoration getKey={(location) => location.pathname} />
        <Layout />
      </>
    ),
    children: [
      {
        path: "/",
        lazy: () => import("./Home"),
      },
      {
        path: "/open.html",
        lazy: () => import("./Open"),
      },
    ],
  },
]);