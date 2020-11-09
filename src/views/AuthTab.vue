<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Auth</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Auth</ion-title>
        </ion-toolbar>
      </ion-header>

      <div v-if="authService.isLoggedIn()">
        <span>You are logged in</span>
      </div>
      <div v-else>
        <ion-button @click="showLoginModal()">Login</ion-button>
        <ion-button @click="showRegistrationModal()">Register</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    modalController,
  } from "@ionic/vue";
  import AuthService from "@/services/authService";
  import ApiClient from "@/services/apiClient";
  import LoginModal from "@/components/modals/LoginModal.vue";
  import RegistrationModal from "@/components/modals/RegistrationModal.vue";

  export default {
    name: "AuthTab",
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonButton,
      IonPage,
    },
    data() {
      return {
        authService: new AuthService(new ApiClient(), localStorage),
      };
    },
    methods: {
      async showLoginModal() {
        const modal = await modalController.create({
          component: LoginModal,
        });
        return modal.present();
      },
      async showRegistrationModal() {
        const modal = await modalController.create({
          component: RegistrationModal,
        });
        return modal.present();
      },
    },
  };
</script>

<style scoped>
  ion-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
