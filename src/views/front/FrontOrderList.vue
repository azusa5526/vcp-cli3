<template>
  <div class="orderList-wrap">
    <loading :active.sync="isLoading"></loading>
    <form>
      <div class="form-title">
        RECIPIENT INFO
        <span style="font-size: 0.8rem;">[ REQUIRED ]</span>
      </div>
      <div class="form-group">
        <label for="useremail">EMAIL</label>
        <input
          :class="{'is-invalid' : errors.has('tel')}"
          class="form-control mb-1"
          id="useremail"
          name="email"
          placeholder="PLEASE INPUT EMAIL"
          type="email"
          v-model="form.user.email"
          v-validate="'required|email'"
        />
        <span class="text-danger-light" v-if="errors.has('email')">{{errors.first('email')}}</span>
      </div>

      <div class="form-group">
        <label for="username">ORDERER NAME</label>
        <input
          :class="{'is-invalid' : errors.has('name')}"
          class="form-control mb-1"
          id="username"
          name="name"
          placeholder="INPUT NAME"
          type="text"
          v-model="form.user.name"
          v-validate="'required'"
        />
        <span class="text-danger-light" v-if="errors.has('name')">NAME MUST BE INPUT</span>
      </div>

      <div class="form-group">
        <label for="usertel">PHONE NUMBER</label>
        <input
          :class="{'is-invalid' : errors.has('tel')}"
          class="form-control mb-1"
          id="usertel"
          name="tel"
          placeholder="PLEASE INPUT PHONE NUMBER"
          type="tel"
          v-model="form.user.tel"
          v-validate="'required'"
        />
        <span class="text-danger-light" v-if="errors.has('tel')">PHONE NUMBER MUST BE INPUT</span>
      </div>
    </form>

    <form>
      <div class="form-title">
        SHIPPING INFO
        <span style="font-size: 0.8rem;">[ REQUIRED ]</span>
      </div>
      <div class="form-group">
        <label for="useraddress">ADDRESS</label>
        <input
          :class="{'is-invalid' : errors.has('address')}"
          class="form-control mb-1"
          id="useraddress"
          name="address"
          placeholder="PLEASE INPUT ADDRESS"
          type="address"
          v-model="form.user.address"
          v-validate="'required'"
        />
        <span class="text-danger-light" v-if="errors.has('address')">ADDRESS MUST BE INPUT</span>
      </div>

      <div id="twzipcode"></div>
    </form>

    <form>
      <div class="form-title">MESSAGE</div>
      <div class="form-group">
        <textarea class="form-control mb-1" cols="30" id name rows="5" v-model="form.message"></textarea>
      </div>

      <div class="d-flex justify-content-between step-control">
        <router-link class="btn btn-primary" to="front_cart_items">BACK TO CART</router-link>
        <button @click.prevent="createOrder" class="btn btn-fourth-dark">SEND ORDER</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isLoading: false,
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
    createOrder () {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`;
      const order = vm.form;
      vm.isLoading = true;

      vm.$validator.validate().then(valid => {
        if (valid) {
          vm.$http.post(api, { data: order }).then(response => {
            if (response.data.success) {
              vm.$bus.$emit('message:push', 'Order created', 'primary');
              vm.$router.push(`front_checkout/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
        } else {
          vm.isLoading = false;
        }
      });
    }
  }
};
</script>
