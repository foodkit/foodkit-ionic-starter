<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Order Status</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Order Status</ion-title>
        </ion-toolbar>
      </ion-header>

      <Suspense>
        <template #default>
          <OrderStatus :order-id="id" />
        </template>
        <template #fallback>
          Loading order information...
        </template>
      </Suspense>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  } from "@ionic/vue";

  import OrderStatus from "@/components/OrderStatus.vue";
  import { useRoute } from "vue-router";

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
    setup() {
      const route = useRoute();
      const id: number = (route.params.id as unknown) as number;

      return { id };
    },
  });
</script>
