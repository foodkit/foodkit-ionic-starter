import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import Tabs from "../views/Tabs.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "menu",
      },
      {
        path: "menu",
        component: () => import("@/views/MenuTab.vue"),
      },
      {
        path: "cart",
        component: () => import("@/views/CartTab.vue"),
      },
      {
        path: "auth",
        component: () => import("@/views/AuthTab.vue"),
      },
      {
        path: "checkout",
        component: () => import("@/views/CheckoutScreen.vue"),
      },
      {
        path: "orders/:id/status",
        component: () => import("@/views/OrderStatusScreen.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
