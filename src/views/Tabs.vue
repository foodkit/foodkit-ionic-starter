<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="menuTab" href="/menu">
          <ion-icon :icon="gridOutline" />
          <ion-label>Menu</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="authTab" href="/auth">
          <ion-icon :icon="person" />
          <ion-label>Auth</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { gridOutline, person } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      gridOutline, 
      person, 
    }
  }
}
</script>