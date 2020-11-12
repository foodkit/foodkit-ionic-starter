<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form class="p-4">
        <ion-item>
          <ion-label>Username</ion-label>
          <ion-input v-model="form.username" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Password</ion-label>
          <ion-input
            type="password"
            v-model="form.password"
            required
          ></ion-input>
        </ion-item>
        <div class="text-center">
          <ion-button class="action-btn" @click.prevent="login()"
            >Login</ion-button
          >
        </div>
      </form>
    </ion-content>
  </div>
</template>

<script lang="ts">
  import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    toastController,
    modalController,
  } from "@ionic/vue";
  import { defineComponent, inject, ref } from "vue";
  import AuthService from "@/services/authService";

  export default defineComponent({
    name: "LoginModal",
    components: {
      IonContent,
      IonHeader,
      IonTitle,
      IonToolbar,
      IonItem,
      IonLabel,
      IonInput,
      IonButton,
    },
    setup() {
      const authService = inject<AuthService>("authService");

      const form = ref({
        username: "",
        password: "",
      });

      const login = async () => {
        const loggedIn = await authService?.login(
          form.value.username,
          form.value.password
        );

        if (loggedIn) {
          modalController.dismiss();
          const toast = await toastController.create({
            message: "Logged in",
            duration: 2000,
          });
          await toast.present();
        } else {
          const toast = await toastController.create({
            message: "Invalid username or password",
            duration: 2000,
          });
          await toast.present();
        }
      };

      return {
        authService,
        form,
        login,
      };
    },
  });
</script>
