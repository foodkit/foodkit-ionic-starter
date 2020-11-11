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

      <div class="wrapper" v-if="authService.isLoggedIn()">
        <span>You are logged in</span>
        <div style="margin-top: 30px">
          <ion-button class="logout-btn" @click="logout()">Logout</ion-button>
        </div>
      </div>
      <div class="wrapper" v-else>
        <ion-img src="/assets/people.svg" />
        <div style="margin-top: 30px">
          <ion-button @click="showLoginModal()">Login</ion-button>
          <ion-button @click="showRegistrationModal()">Register</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, inject } from "vue";
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
    setup() {
      const authService = inject<AuthService>("authService");

      const showLoginModal = async () => {
        const modal = await modalController.create({
          component: LoginModal,
        });
        return modal.present();
      };

      const showRegistrationModal = async () => {
        const modal = await modalController.create({
          component: RegistrationModal,
        });
        return modal.present();
      };

      const logout = () => {
        authService?.logout();
      };

      return {
        authService,
        showLoginModal,
        showRegistrationModal,
        logout,
      };
    },
  });
</script>

<style scoped>
  .wrapper {
    margin: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .logout-btn {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
