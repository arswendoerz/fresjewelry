import * as React from "react";
import { createRootRoute, useLocation } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "@/components/Navbar/navbar";
import FooterFresh from "@/components/Footer/footerFres";
import { Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <>
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <hr />}
      <Outlet />
      {!isAuthPage && <hr />}
      {!isAuthPage && <FooterFresh />}
      <TanStackRouterDevtools />
    </>
  );
}