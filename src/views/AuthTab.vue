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
        <div>
          <ion-button @click="logout()">Logout</ion-button>
        </div>
      </div>
      <div v-else>
        <ion-button @click="showLoginModal()">Login</ion-button>
        <ion-button @click="showRegistrationModal()">Register</ion-button>
      </div>
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
    IonButton,
    modalController,
  } from "@ionic/vue";
  import LoginModal from "@/components/modals/LoginModal.vue";
  import RegistrationModal from "@/components/modals/RegistrationModal.vue";
  import AuthService from "@/services/authService";
  import ApiClient from "@/services/apiClient";

  export default defineComponent({
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
      logout() {
        this.authService.logout();
      },
    },
  });
</script>

<style scoped>
  ion-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
