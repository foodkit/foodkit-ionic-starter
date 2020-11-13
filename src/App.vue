<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
  import { IonApp, IonRouterOutlet } from "@ionic/vue";
  import { defineComponent, provide, reactive } from "vue";
  import ApiClient from "./services/apiClient";
  import AuthService from "./services/authService";
  import CartService from "./services/cartService";

  export default defineComponent({
    name: "App",
    components: {
      IonApp,
      IonRouterOutlet,
    },
    setup() {
      const authService = reactive(
        new AuthService(new ApiClient(), localStorage)
      );
      // preload user info, if authenticated
      if (authService.getAccessToken()) {
        authService.currentUser();
      }
      const cartService = reactive(new CartService());

      provide("authService", authService);
      provide("cartService", cartService);
    },
  });
</script>
