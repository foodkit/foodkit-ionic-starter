<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cart</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Cart</ion-title>
        </ion-toolbar>
      </ion-header>

      <Cart />
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

  import Cart from "@/components/Cart.vue";

  export default defineComponent({
    name: "CartTab",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      Cart,
    },
  });
</script>

<style scoped>
  ion-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
