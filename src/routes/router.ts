import { RootRoute, Route, Router } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";

export const rootRoute = new RootRoute();

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const routeTree = rootRoute.addChildren([homeRoute]);

export const router = new Router({ routeTree });
