<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Checkout</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Checkout</ion-title>
        </ion-toolbar>
      </ion-header>

      <CheckoutForm />
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

  import CheckoutForm from "@/components/CheckoutForm.vue";

  export default defineComponent({
    name: "CheckoutScreen",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      CheckoutForm,
    },
  });
</script>
