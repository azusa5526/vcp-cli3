<template>
  <div class="d-flex flex-column min-vh-full">
    <FrontNavbar></FrontNavbar>

    <div class="container-fluid px-0">
      <main class="main">
        <router-view></router-view>
      </main>
    </div>

    <FrontFooter class="mt-auto"></FrontFooter>
  </div>
</template>

<script>
import FrontNavbar from './FrontNavbar.vue';
import FrontFooter from './FrontFooter.vue';

export default {
  components: {
    FrontNavbar,
    FrontFooter
  },

  data() {
    return {};
  }
};
</script>
