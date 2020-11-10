<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="menuTab" href="/menu">
          <ion-icon :icon="gridOutline" />
          <ion-label>Menu</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="cartTab" href="/cart">
          <ion-icon :icon="cartOutline" />
          <ion-label>Cart</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="authTab" href="/auth">
          <ion-icon :icon="personOutline" />
          <ion-label>Auth</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
  } from "@ionic/vue";
  import { gridOutline, cartOutline, personOutline } from "ionicons/icons";

  export default {
    name: "Tabs",
    components: {
      IonLabel,
      IonTabs,
      IonTabBar,
      IonTabButton,
      IonIcon,
      IonPage,
    },
    setup() {
      return {
        gridOutline,
        cartOutline,
        personOutline,
      };
    },
  };
</script>
