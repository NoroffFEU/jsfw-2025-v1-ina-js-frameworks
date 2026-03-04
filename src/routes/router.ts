import { RootRoute, Route, Router } from "@tanstack/react-router";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import ContactPage from "../pages/ContactPage";
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

export const confirmationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/confirmation",
  component: ConfirmationPage,
});

export const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  productRoute,
  cartRoute,
  confirmationRoute,
  contactRoute,
]);

export const router = new Router({ routeTree });
