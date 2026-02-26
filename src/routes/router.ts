import { RootRoute, Route, Router } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import Layout from "../components/Layout";

export const rootRoute = new RootRoute({
  component: Layout,
});

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

export const cartRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  productRoute,
  cartRoute,
]);

export const router = new Router({ routeTree });
