<template>
  <div>
    <div class="wrapper">
      <ion-img :src="stateImg" />
      <p class="status">{{ stateFormatted }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, ref } from "vue";
  import { IonImg } from "@ionic/vue";

  import OrdersService from "@/services/ordersService";
  import ApiClient from "@/services/apiClient";
  import AuthService from "@/services/authService";

  export default defineComponent({
    name: "OrderStatus",
    components: {
      IonImg,
    },
    props: {
      orderId: {
        type: Number,
        required: true,
      },
    },
    async setup(props) {
      const authService = inject<AuthService>("authService");
      if (authService === undefined) {
        throw new Error("Auth service is not bound.");
      }

      const state = ref<string | null>(null);

      const ordersService = new OrdersService(new ApiClient(), authService);

      state.value = await ordersService.status(props.orderId);

      setInterval(async () => {
        state.value = await ordersService.status(props.orderId);
      }, 10000);

      const stateFormatted = computed(() => {
        switch (state.value) {
          case "pending":
            return "Pending";
          case "vendor-accepted":
            return "Accepted by vendor";
          case "driver-accepted":
            return "Accepted by driver";
          case "dispatched":
            return "Dispatched";
          case "completed":
            return "Completed";
          case "ginja-cancelled":
            return "Cancelled by Foodkit";
          case "vendor-cancelled":
            return "Cancelled by vendor";
        }
      });

      const stateImg = computed(() => {
        switch (state.value) {
          case "pending":
          case "vendor-accepted":
            return "/assets/order-in-progress.svg";
          case "driver-accepted":
          case "dispatched":
            return "/assets/order-on-the-way.svg";
          case "completed":
            return "/assets/order-completed.svg";
          case "ginja-cancelled":
          case "vendor-cancelled":
            return "/assets/order-cancelled.svg";
        }
      });

      return {
        stateFormatted,
        stateImg,
      };
    },
  });
</script>

<style scoped>
  .wrapper {
    margin: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .status {
    font-size: 1.2rem;
  }
</style>
