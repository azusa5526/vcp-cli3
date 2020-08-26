<template>
  <div>
    <div class="login">
      <form @submit.prevent="signin" class="form-wrap">
        <div class="login-img">
          <h1>
            <i class="fab fa-vuejs"></i>CP.com
          </h1>
        </div>

        <div class="login-content">
          <label class="sr-only" for="inputEmail">Email address</label>
          <input
            autofocus
            class="form-control mb-3"
            id="inputEmail"
            placeholder="Email address"
            required
            type="email"
            v-model="user.username"
          />
          <label class="sr-only" for="inputPassword">Password</label>
          <input
            class="form-control mb-3"
            id="inputPassword "
            placeholder="Password"
            required
            type="password"
            v-model="user.password"
          />
          <div class="checkbox mb-3">
            <label class="remember-text">
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            <i class="fas fa-circle-notch fa-spin" v-if="isLoading"></i> Sign in
          </button>
          <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    };
  },

  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/admin/signin`;
      vm.$store.dispatch('updateLoading', true);

      vm.$http.post(api, vm.user).then((response) => {
        this.$store.dispatch('updateLoading', false);
        if (response.data.success) {
          vm.$router.push('/home');
        } else if (response.data.error.code === 'auth/wrong-password') {
          vm.$bus.$emit('message:push', 'Account or password is invalid', 'third');
        }
      });
    }
  },

  computed: {
    ...mapGetters(['isLoading'])
  }
};
</script>
