<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top">
      <router-link class="navbar-logo" to="/home">
        <span>
          <i class="fab fa-vuejs"></i>CP. BACK
        </span>
      </router-link>
      <button
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler"
        data-target="#navbarsExampleDefault"
        data-toggle="collapse"
        type="button"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav align-items-center mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">PRODUCT LIST</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/order_list">ORDER LIST</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon">COUPON LIST</router-link>
          </li>
        </ul>

        <ul class="navbar-nav align-items-center ml-3">
          <li>
            <a @click="signOut" class="text-fourth nav-link mr-2" href="#" v-if="is_login">
              SIGN OUT
              <i class="fas fa-sign-out-alt ml-1"></i>
            </a>
            <router-link class="text-secondary nav-link mr-2" to="/login" v-else>
              SIGN IN
              <i class="fas fa-sign-in-alt ml-1"></i>
            </router-link>
          </li>
          <li>
            <router-link class="text-secondary nav-link mr-2" to="/home" v-if="is_login">
              FRONT END
              <i class="fas fa-store-alt ml-1"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_login: false
    };
  },

  methods: {
    checkLoginStatus() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;

      vm.$http.post(api).then((response) => {
        vm.is_login = response.data.success;
      });
    },

    signOut() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/logout`;

      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.is_login = false;
          vm.$router.push('/home');
        }
      });
    }
  },

  created() {
    this.checkLoginStatus();
  }
};
</script>
