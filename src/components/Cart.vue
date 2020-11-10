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

      <div>Total: {{ cartService.total() }}</div>
      <div>
        <ion-button>
          Checkout
        </ion-button>
      </div>
    </div>
    <div v-else>
      The cart is empty
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
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
  } from "@ionic/vue";
  import AuthService from "@/services/authService";
  import ApiClient from "@/services/apiClient";
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
    },
    data() {
      return {
        authService: new AuthService(new ApiClient(), localStorage),
        cartService: new CartService(),
      };
    },
    methods: {},
  });
</script>
