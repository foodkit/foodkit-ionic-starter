<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registration</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form class="p-4">
        <ion-item>
          <ion-label>Email</ion-label>
          <ion-input type="email" v-model="form.email" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Phone Number</ion-label>
          <ion-input v-model="form.phoneNumber" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>First Name</ion-label>
          <ion-input v-model="form.firstName" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Last Name</ion-label>
          <ion-input v-model="form.lastName" required></ion-input>
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
          <ion-button class="action-btn" @click.prevent="register()"
            >Register</ion-button
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
    name: "RegistrationModal",
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
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        password: "",
      });

      const register = async () => {
        const isRegistered = await authService?.register(
          form.value.email,
          form.value.phoneNumber,
          form.value.firstName,
          form.value.lastName,
          form.value.password
        );

        if (isRegistered) {
          modalController.dismiss();
          const toast = await toastController.create({
            message: "Registration successful",
            duration: 2000,
          });
          await toast.present();
        } else {
          const toast = await toastController.create({
            message: "Error occurred",
            duration: 2000,
          });
          await toast.present();
        }
      };

      return {
        authService,
        form,
        register,
      };
    },
  });
</script>
