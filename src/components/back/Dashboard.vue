<template>
  <div>
    <Navbar></Navbar>
    <div class="container-fluid">
      <main class="main">
        <div class="dashboard-content-wrap">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';

export default {
  components: {
    Navbar
  },

  data() {
    return {};
  }
};
</script>
