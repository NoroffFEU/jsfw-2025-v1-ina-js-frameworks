import { RootRoute, Route, Router } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";

export const rootRoute = new RootRoute();

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const productRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  component: ProductPage,
});

export const routeTree = rootRoute.addChildren([homeRoute, productRoute]);

export const router = new Router({ routeTree });
