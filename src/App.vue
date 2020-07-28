<template>
  <div id="app">
    <AlertMessage></AlertMessage>
    <router-view />
  </div>
</template>

<script>
import AlertMessage from '../src/components/front/AlertMessage.vue';

export default {
  name: 'App',
  components: {
    AlertMessage
  }
};
</script>

<style lang="scss">
@import './assets/scss/all.scss';
</style>
