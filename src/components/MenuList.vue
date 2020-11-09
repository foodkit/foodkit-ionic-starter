<template>
  <div>
    <ion-grid>
      <ion-row>
        <ion-col v-for="product in menu.getItems()" :key="product.id">
          <ion-card>
            <img :src="product.images[0].src" v-if="product.images.length" />
            <ion-card-header>
              <ion-card-subtitle>{{ product.price }}</ion-card-subtitle>
              <ion-card-title>{{ product.name }}</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              {{ product.description }}
              <div>
                <ion-button>Add to cart</ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script>
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
  import MenuService from "@/services/menuService";
  import ApiClient from "@/services/apiClient";
  import Menu from "@/models/menu";

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
    },
    data() {
      return {
        authService: new AuthService(new ApiClient(), localStorage),
        menuService: new MenuService(new ApiClient()),
        menu: new Menu(),
      };
    },
    async mounted() {
      this.menu = await this.menuService.get();
    },
  });
</script>
