<template>
  <div class="checkout-wrap">
    <form @submit.prevent="payOrder">
      <div class="orderTable-title">
        <h4>OEDER LIST</h4>
      </div>

      <table class="table">
        <thead>
          <th class="text-left">NAME</th>
          <th class="text-center">QTY</th>
          <th class="text-center sub-td">SUB</th>
        </thead>
        <tbody>
          <tr :key="item.id" v-for="item in order.products">
            <td class="align-middle text-left">{{item.product.title}}</td>
            <td class="align-middle text-center">{{item.qty}} {{item.product.unit}}</td>
            <td class="align-middle text-right">{{item.final_total | currency}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="text-right" colspan="2">GRAND TOTAL</td>
            <td class="text-right">{{order.total | currency}}</td>
          </tr>
        </tfoot>
      </table>

      <div class="orderTable-title">
        <h4>RECIPIENT INFO</h4>
      </div>

      <table class="table">
        <tbody>
          <tr>
            <th width="130px">ORDER NUM</th>
            <td>{{order.id}}</td>
          </tr>
          <tr>
            <th>EMAIL</th>
            <td>{{order.user.email}}</td>
          </tr>
          <tr>
            <th>ORDERER NAME</th>
            <td>{{order.user.name}}</td>
          </tr>
          <tr>
            <th>PHONE NUMBER</th>
            <td>{{order.user.tel}}</td>
          </tr>
          <tr>
            <th>ADDRESS</th>
            <td>{{order.user.address}}</td>
          </tr>
          <tr>
            <th>PAYMENT STATUS</th>
            <td>
              <span class="text-success" v-if="order.is_paid">PAID</span>
              <span class="text-danger-light" v-else>OUTSTANDING PAYMENT</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right">
        <button class="btn btn-primary" v-if="!order.is_paid">PAY ORDER</button>
      </div>
    </form>

    <div
      aria-hidden="true"
      aria-labelledby="exampleModalCenterTitle"
      class="modal fade"
      id="paymentCompeleted"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h4>AWESOME</h4>
            <p>YOUR PAYMENT COMPLETED</p>
            <button @click="goToProducts" class="btn btn-primary">COUNTINUE SHOPPING!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      orderId: '',
      order: {
        user: {}
      }
    };
  },

  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/order/${vm.orderId}`;
      this.$store.dispatch('updateLoading', true);
      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.order = response.data.order;
          this.$store.dispatch('updateLoading', false);
        }
      });
    },

    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/pay/${vm.orderId}`;
      this.$store.dispatch('updateLoading', true);
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.getOrder();
          this.$store.dispatch('updateLoading', false);
          $('#paymentCompeleted').modal('show');
        } else {
          this.$store.dispatch('updateLoading', false);
        }
      });
    },

    goToProducts() {
      $('#paymentCompeleted').modal('hide');
      this.$router.push('/frontProducts/all');
    }
  },

  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  }
};
</script>
