<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form>
        <ion-item>
          <ion-label>Username</ion-label>
          <ion-input v-model="form.username"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Password</ion-label>
          <ion-input type="password" v-model="form.password"></ion-input>
        </ion-item>
        <ion-button @click="login()">Login</ion-button>
      </form>
    </ion-content>
  </div>
</template>

<script>
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
  import { defineComponent } from "vue";
  import AuthService from "@/services/authService";
  import ApiClient from "@/services/apiClient";

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
    data() {
      return {
        form: {
          username: "",
          password: "",
        },
        authService: new AuthService(new ApiClient(), localStorage),
      };
    },
    methods: {
      async login() {
        const loggedIn = await this.authService.login(
          this.form.username,
          this.form.password
        );

        if (loggedIn) {
          modalController.dismiss();
          const toast = await toastController.create({
            message: "Logged in!",
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
      },
    },
  });
</script>
