// eslint-disable-next-line no-restricted-imports
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";

import { Layout, BareLayout } from "shared/Layout";
import { Component as HomePage } from "./Home";
import { Component as OpenPage } from "./Open";

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
        element: <HomePage />,
        //lazy: () => import("./Home"),
      },
      {
        path: "/open.html",
        element: <OpenPage />,
      },
    ],
  },
]);