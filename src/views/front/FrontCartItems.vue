<template>
  <div class="item-wrap">
    <table class="table">
      <thead>
        <tr>
          <th class="d-md-table-cell d-none">THUMB NAIL</th>
          <th>NAME</th>
          <th class="d-sm-table-cell d-none" width="120px">QUANTITY</th>
          <th width="25%">SUB</th>
          <th width="60px">REMOVE</th>
        </tr>
      </thead>

      <tbody class="cart-items">
        <tr :key="item.id" v-for="item in shoppingCart.carts">
          <td class="align-middle d-md-table-cell d-none">
            <div
              :style="{backgroundImage: `url(${item.product.imageUrl})`}"
              class="product-preview d-md-block d-none"
            ></div>
          </td>
          <td class="align-middle text-left">
            {{item.product.title}}
            <div class="text-primary" v-if="item.coupon">COUPON APPLIED: {{item.coupon.title}}</div>
          </td>
          <td class="align-middle d-sm-table-cell d-none qty-adjust">
            <button @click="quantitySub(item)" class="btn btn-outline-secondary">-</button>
            <input :value="item.qty" readonly="readonly" type="text" />
            <button @click="quantityPlus(item)" class="btn btn-outline-secondary">+</button>
          </td>
          <td class="align-middle">
            {{item.product.price | currency}} /{{item.total | currency}}
            <div class="text-primary" v-if="item.coupon">{{item.final_total | currency}}</div>
          </td>

          <td class="align-middle">
            <button
              @click="removeCartItem(item.id)"
              class="btn btn-outline-danger-light btn-sm"
              type="button"
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="d-md-table-cell d-none"></td>
          <td class="d-sm-table-cell d-none"></td>
          <td class="text-right" colspan="2">GRAND TOTAL</td>
          <td class="text-right" width="100px">{{shoppingCart.total | currency}}</td>
        </tr>
        <tr v-if="shoppingCart.total !== shoppingCart.final_total">
          <td class="d-md-table-cell d-none"></td>
          <td class="d-sm-table-cell d-none"></td>
          <td class="text-right text-primary" colspan="2">DISCOUNT PRICE</td>
          <td class="text-right text-primary">{{shoppingCart.final_total | currency}}</td>
        </tr>
      </tfoot>
    </table>

    <div class="input-group mb-3 input-group-sm">
      <input
        class="form-control"
        placeholder="PLEASE INPUT COUPON CODE"
        type="text"
        v-model="couponCode"
      />
      <div class="input-group-append">
        <button @click="addCouponCode" class="btn btn-primary" type="button">APPLY CODE</button>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4 step-control">
      <router-link class="btn btn-primary" to="/frontProducts/all">BACK TO SHOP</router-link>
      <router-link class="btn btn-fourth-dark" to="front_orderlist" v-if="cartHasItem">FILL INFO</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    };
  },

  methods: {
    updateCart(cartItemId, productId, qty) {
      const vm = this;
      const rmApi = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${cartItemId}`;
      const addApi = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const cart = {
        product_id: productId,
        qty
      };
      vm.$store.dispatch('updateLoading', true);

      vm.$http.delete(rmApi).then((response) => {
        if (response.data.success) {
          vm.$http.post(addApi, { data: cart }).then((response) => {
            if (response.data.success) {
              vm.getShoppingCart();
            } else {
              vm.$bus.$emit('message:push', 'Fail update(add) cart Qty', 'third');
              vm.$store.dispatch('updateLoading', false);
            }
          });
        } else {
          vm.$bus.$emit('message:push', 'Fail update(del) cart Qty', 'third');
          this.$store.dispatch('updateLoading', false);
        }
      });
    },

    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      vm.$store.dispatch('updateLoading', true);

      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit('message:push', 'Remove item succefully', 'primary');
          vm.$store.dispatch('updateLoading', false);
          vm.getShoppingCart();
        } else {
          vm.$bus.$emit('message:push', 'Fail delete item from cart', 'third');
          vm.$store.dispatch('updateLoading', false);
        }
      });
    },

    addToCart(id, qty) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const cart = {
        product_id: id,
        qty
      };

      vm.$http.post(api, { data: cart }).then((response) => {
        if (response.data.success) {
          vm.getShoppingCart();
        } else {
          vm.$bus.$emit('message:push', 'Fail update cart Qty', 'third');
        }
      });
    },

    addCouponCode() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`;
      const coupon = {
        code: vm.couponCode
      };
      vm.$store.dispatch('updateLoading', true);

      vm.$http.post(api, { data: coupon }).then((response) => {
        if (response.data.success) {
          vm.getShoppingCart();
          vm.$store.dispatch('updateLoading', false);
          vm.$bus.$emit('message:push', 'Apply coupon succefully', 'primary');
        } else {
          vm.$store.dispatch('updateLoading', false);
          vm.$bus.$emit('message:push', 'Coupon code not found', 'third');
        }
      });
    },

    quantitySub(item) {
      const vm = this;
      if (item.qty > 1) {
        vm.updateCart(item.id, item.product_id, item.qty - 1);
      }
    },

    quantityPlus(item) {
      const vm = this;
      if (item.qty < 5) {
        vm.updateCart(item.id, item.product_id, item.qty + 1);
      }
    },
    ...mapActions(['getShoppingCart'])
  },

  computed: {
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
    },
    ...mapGetters(['shoppingCart'])
  },

  created() {
    this.getShoppingCart();
  }
};
</script>
