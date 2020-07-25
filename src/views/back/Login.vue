<template>
  <div>
    <div class="login">
      <form class="form-wrap" @submit.prevent="signin">
        <div class="login-img">
          <h1>
            <i class="fab fa-vuejs"></i>CP.com
          </h1>
        </div>

        <div class="login-content">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control mb-3"
            v-model="user.username"
            placeholder="Email address"
            required
            autofocus
          />
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword "
            class="form-control mb-3"
            v-model="user.password"
            placeholder="Password"
            required
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
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    };
  },

  methods: {
    signin () {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/admin/signin`;
      vm.isLoading = true;

      vm.$http.post(api, vm.user).then(response => {
        vm.isLoading = false;
        if (response.data.success) {
          vm.$router.push('/home');
        } else if (response.data.error.code === 'auth/wrong-password') {
          vm.$bus.$emit(
            'message:push',
            'Account or password is invalid',
            'third'
          );
        }
      });
    }
  }
};
</script>
