<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Order Status</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <OrderStatus v-if="status" :status="status" />
      <div v-if="!status">Loading order information...</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, inject, ref } from "vue";
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  } from "@ionic/vue";
  import OrdersService from "@/services/ordersService";
  import ApiClient from "@/services/apiClient";
  import AuthService from "@/services/authService";

  import OrderStatus from "@/components/OrderStatus.vue";
  import { useRoute } from "vue-router";

  // We need to make sure the setInterval call is only triggered while the user is on the order tracking page
  // and is only triggered ONCE per session. Do this by keeping track of the interval ID and freeing it when
  // user navigates to a different page.
  let interval: any = null;
  const tickBus = {
    listener: () => console.log('no-op'),
    tick: function () {
      this.listener && this.listener();
    },
    listen: function (listener: any) {
      this.listener = listener;
    },
  };

  export default defineComponent({
    name: "OrderStatusScreen",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      OrderStatus,
    },
    ionViewWillEnter() {
      interval = setInterval(() => {
        tickBus.tick();
      }, 10000);
    },
    ionViewWillLeave() {
      clearInterval(interval);
    },
    setup () {
      const route = useRoute();
      const id = (route.params.id as unknown) as number;
      const authService = inject<AuthService>("authService");
      if (authService === undefined) {
        throw new Error("Auth service is not bound.");
      }
      const ordersService = new OrdersService(new ApiClient(), authService);
      const status = ref<null|string>(null);
      const update = () => {
        ordersService.status(id)
          .then((nextStatus) => status.value = nextStatus);
      };
      tickBus.listen(update); // trigger the update once per tick (every 10 seconds)
      update(); // force the update once when the page loads
      return { status };
    },
  });
</script>
