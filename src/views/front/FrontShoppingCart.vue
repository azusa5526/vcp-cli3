<template>
  <div class="row justify-content-center">
    <div class="container my-4" v-if="cartHasItem">
      <div class="cart-wrap">
        <div class="shopping-step mb-4">
          <div :class="{'active-step' : activedPage === 'FrontCartItems'}" class="step">
            <h5>
              CHECK CART
              <i class="fas fa-search ml-1"></i>
            </h5>
          </div>
          <div :class="{'active-step' : activedPage === 'FrontOrderList'}" class="step">
            <h5>
              FILL INFO
              <i class="fas fa-pen-nib ml-1"></i>
            </h5>
          </div>
          <div :class="{'active-step' : activedPage === 'FrontCheckout'}" class="step">
            <h5>
              PAYMENT LIST
              <i class="fas fa-credit-card ml-1"></i>
            </h5>
          </div>
        </div>

        <router-view></router-view>
      </div>
    </div>

    <div class="emptyCart-wrap" v-if="!cartHasItem">
      <h4>SHOPPING CART IS EMPTY</h4>
      <router-link class="btn btn-primary shopping-link" to="/frontProducts/all">SHOPPING NOW!</router-link>
      <img src="@/assets/img/emptyCart.png" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoppingCart: [],
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      activePage: this.$route.name
    };
  },

  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;

      this.$store.dispatch('updateLoading', true);
      vm.$http.get(api).then((response) => {
        vm.shoppingCart = response.data.data;
        this.$store.dispatch('updateLoading', false);
      });
    }
  },

  computed: {
    activedPage() {
      return this.$route.name;
    },

    cartHasItem() {
      const vm = this;
      if (vm.shoppingCart.carts === undefined) {
        return 0;
      } else {
        if (vm.shoppingCart.carts.length === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  },

  created() {
    this.getCart();
  }
};
</script>
