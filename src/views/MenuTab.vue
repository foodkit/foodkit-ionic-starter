<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Menu</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <MenuList/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import MenuList from '@/components/MenuList.vue';

export default  {
  name: 'MenuTab',
  components: { MenuList, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>