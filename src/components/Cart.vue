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
                  }}
                </ion-card-subtitle>
                <ion-card-title>{{ cartItem.menuItem.name }}</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ cartItem.menuItem.description }}
                <div>
                  <ion-button
                      fill="outline"
                      class="action-btn"
                      @click="removeFromCart(cartItem)"
                  >
                    Remove from cart
                  </ion-button>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div class="total-wrapper">
        <div>Total: {{ cartService.total() }}</div>
        <ion-button @click="checkout()">
          Checkout
        </ion-button>
      </div>
    </div>
    <div class="wrapper" v-else>
      <ion-img src="/assets/empty-cart.svg"/>
      <p>The cart is empty</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
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
  toastController,
} from "@ionic/vue";
import AuthService from "@/services/authService";
import CartService from "@/services/cartService";
import CartItem from "@/models/cartItem";
import {useRouter} from "vue-router";

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
    const router = useRouter();

    const removeFromCart = async (cartItem: CartItem) => {
      cartService?.remove(cartItem);
      const toast = await toastController.create({
        message: `${cartItem.menuItem.name} was removed from the cart`,
        duration: 2000,
      });
      await toast.present();
    };

    const checkout = async () => {
      if (authService?.isLoggedIn()) {
        await router.push('/checkout');
      } else {
        const toast = await toastController.create({
          message: 'To continue with checkout, please login first in the Auth tab.',
          duration: 2000,
        });
        await toast.present();
      }
    };

    return {
      authService,
      cartService,
      removeFromCart,
      checkout
    };
  },
});
</script>

<style scoped>
.total-wrapper {
  margin: 0 15px 15px 15px;
}
</style>
