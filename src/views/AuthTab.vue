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
      
      <RegistrationForm/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import RegistrationForm from '@/components/RegistrationForm.vue';

export default  {
  name: 'AuthTab',
  components: { RegistrationForm, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>