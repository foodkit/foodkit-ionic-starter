<template>
  <div>
    <div v-if="cartService.getItems().length > 0">
      <ion-grid>
        <ion-row>
          <ion-col
            v-for="cartItem in cartService.getItems()"
            :key="cartItem.menuItem.id"
          >
            <ion-card>
              <img
                :src="cartItem.menuItem.images[0].src"
                v-if="cartItem.menuItem.images.length"
              />
              <ion-card-header>
                <ion-card-subtitle>{{
                  cartItem.menuItem.formatPrice()
                }}</ion-card-subtitle>
                <ion-card-title>{{ cartItem.menuItem.name }}</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ cartItem.menuItem.description }}
                <div>
                  <ion-button @click="cartService.remove(cartItem)">
                    Remove from cart
                  </ion-button>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid>
        <ion-row>
          <ion-col>Total: {{ cartService.total() }}</ion-col>
          <ion-col>
            <ion-button router-link="/checkout">
              Checkout
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
    <div class="empty-card-wrapper" v-else>
      <ion-img src="/assets/empty-cart.svg" />
      <p>The cart is empty</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject } from "vue";
  import {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
    IonImg,
  } from "@ionic/vue";
  import AuthService from "@/services/authService";
  import CartService from "@/services/cartService";

  export default defineComponent({
    name: "Cart",
    components: {
      IonGrid,
      IonRow,
      IonCol,
      IonCard,
      IonCardHeader,
      IonCardContent,
      IonCardSubtitle,
      IonCardTitle,
      IonButton,
      IonImg,
    },
    setup() {
      const authService = inject<AuthService>("authService");
      const cartService = inject<CartService>("cartService");

      return {
        authService,
        cartService,
      };
    },
  });
</script>

<style scoped>
  .empty-card-wrapper {
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
