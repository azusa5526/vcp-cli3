<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
    <AlertMessage></AlertMessage>

    <router-view />
  </div>
</template>

<script>
import AlertMessage from '../src/components/front/AlertMessage.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    AlertMessage
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['isLoading'])
  }
};
</script>

<style lang="scss">
@import './assets/scss/all.scss';
</style>
