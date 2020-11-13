<template>
  <div>
    <ion-grid>
      <ion-row>
        <ion-col v-for="product in menu.getItems()" :key="product.id">
          <ion-card>
            <img :src="product.images[0].src" v-if="product.images.length" />
            <ion-card-header>
              <ion-card-subtitle>{{ product.formatPrice() }}</ion-card-subtitle>
              <ion-card-title>{{ product.name }}</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              <p class="product-description">
                {{ product.description }}
              </p>
              <div class="text-center mt-2 add-to-cart-btn">
                <ion-button fill="clear" @click="addToCart(product)">
                  <ion-icon :icon="cartOutline" />
                  <span style="margin-left: 10px">Add to cart</span>
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, reactive } from "vue";
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
    IonIcon,
    toastController,
  } from "@ionic/vue";
  import { cartOutline } from "ionicons/icons";
  import AuthService from "@/services/authService";
  import MenuService from "@/services/menuService";
  import ApiClient from "@/services/apiClient";
  import MenuItem from "@/models/menuItem";
  import CartService from "@/services/cartService";

  export default defineComponent({
    name: "MenuList",
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
      IonIcon,
    },
    async setup() {
      const authService = inject<AuthService>("authService");
      const cartService = inject<CartService>("cartService");
      const menuService = new MenuService(new ApiClient());

      const menu = reactive(await menuService.get());

      const addToCart = async (menuItem: MenuItem) => {
        cartService?.add(menuItem, 1);
        const toast = await toastController.create({
          message: `${menuItem.name} is added to the cart`,
          duration: 2000,
        });
        await toast.present();
      };

      return {
        authService,
        cartService,
        menuService,
        menu,
        addToCart,
        cartOutline,
      };
    },
  });
</script>

<style scoped>
  ion-card {
    height: 100%;
  }
  ion-card > img {
    object-fit: cover;
  }
  ion-card-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.9rem;
  }
  ion-card-content {
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
  }
  ion-col {
    margin-bottom: 10px;
  }
  .add-to-cart-btn {
    justify-self: self-end;
  }
</style>
