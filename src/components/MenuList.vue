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
              {{ product.description }}
              <div>
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

      const addToCart = (menuItem: MenuItem) => {
        cartService?.add(menuItem, 1);
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
