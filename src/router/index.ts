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
        path: "auth",
        component: () => import("@/views/AuthTab.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
