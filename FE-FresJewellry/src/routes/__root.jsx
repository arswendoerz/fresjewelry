import * as React from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "@/components/ui/navbar";
import FooterFresh from "@/components/ui/footerFres";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <hr />
      <Outlet />
      <hr />
      <FooterFresh />
      <TanStackRouterDevtools />
    </>
  ),
});
