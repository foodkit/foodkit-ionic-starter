<template>
  <div>
    <div class="wrapper">
      <ion-img :src="image" />
      <p class="status">{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from "vue";
  import { IonImg } from "@ionic/vue";

  const statusToString = (status: string) => {
    switch (status) {
      case "unverified":
      case "pending":
        return "Awaiting approval...";
      case "vendor-accepted":
      case "driver-accepted":
        return "Food is being cooked";
      case "dispatched":
        return "On the way";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Order Cancelled";
    }
    return 'unknown';
  };

  const statusToImage = (status: string) => {
    switch (status) {
      case "unverified":
      case "pending":
      case "vendor-accepted":
        return "/assets/order-in-progress.svg";
      case "driver-accepted":
      case "dispatched":
        return "/assets/order-on-the-way.svg";
      case "completed":
        return "/assets/order-completed.svg";
      case "cancelled":
        return "/assets/order-cancelled.svg";
    }
    return "/assets/order-cancelled.svg";
  };

  export default defineComponent({
    name: "OrderStatus",
    components: {
      IonImg,
    },
    props: {
      status: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      return {
        description: computed(() => statusToString(props.status)),
        image: computed(() => statusToImage(props.status)),
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
