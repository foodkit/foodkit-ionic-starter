<template>
  <div>
    <form>
      <ion-item>
        <ion-label>Address Line 1</ion-label>
        <ion-input v-model="form.address1"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Address Line 2</ion-label>
        <ion-input v-model="form.address2"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Room Number</ion-label>
        <ion-input v-model="form.roomNumber"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Floor Number</ion-label>
        <ion-input type="number" v-model="form.floorNumber"></ion-input>
      </ion-item>
      <ion-button @click="placeOrder()">Place order</ion-button>
    </form>
  </div>
</template>

<script lang="ts">
  import Address from "@/models/address";
  import ApiClient from "@/services/apiClient";
  import AuthService from "@/services/authService";
  import CartService from "@/services/cartService";
  import CheckoutService from "@/services/checkoutService";
  import {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    toastController,
  } from "@ionic/vue";
  import { defineComponent, inject, reactive } from "vue";
  import { useRouter } from "vue-router";

  export default defineComponent({
    name: "CheckoutForm",
    components: {
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
    },
    setup() {
      const router = useRouter();

      const authService = inject<AuthService>("authService");
      if (authService === undefined) {
        throw new Error("Auth service is not bound.");
      }
      const cartService = inject<CartService>("cartService");
      if (cartService === undefined) {
        throw new Error("Cart service is not bound.");
      }

      const checkoutService = new CheckoutService(
        new ApiClient(),
        authService,
        cartService
      );

      const form = reactive({
        address1: "",
        address2: "",
        roomNumber: "",
        floorNumber: "",
      });

      const placeOrder = async () => {
        const address = new Address();
        address.address1 = form.address1;
        address.address2 = form.address2;
        address.roomNumber = form.roomNumber;
        address.floorNumber = (form.floorNumber as unknown) as number;

        //TODO: resolve coordinates dynamically
        address.latitude = 13.7563;
        address.longitude = 100.5018;

        const orderId = await checkoutService.checkout(address);

        if (orderId) {
          const toast = await toastController.create({
            message: "Order placed successfully",
            duration: 2000,
          });
          await toast.present();
          router.push(`/orders/${orderId}/status`);
        } else {
          const toast = await toastController.create({
            message: "There was an error while placing the order",
            duration: 2000,
          });
          await toast.present();
        }
      };

      return {
        form,
        placeOrder,
      };
    },
  });
</script>
