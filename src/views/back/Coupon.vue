<template>
  <div>
    <div class="dashboard-table-wrap mb-3">
      <div class="text-right mb-3">
        <button @click="openModal(true)" class="btn btn-primary">ADD COUPON</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>COUPON NAME</th>
            <th class="text-center" width="15%">DISCOUNT RATE</th>
            <th width="15%">DUE TO</th>
            <th width="15%">ACTIVE</th>
            <th width="15%">EDIT</th>
          </tr>
        </thead>

        <tbody>
          <tr :key="item.id" v-for="item in coupons">
            <td>{{item.title}}</td>
            <td class="text-center">{{item.percent}}%</td>
            <td class="text-center">{{item.due_date}}</td>
            <td class="text-center">
              <span class="text-success" v-if="item.is_enabled">ENABLE</span>
              <span class="text-danger" v-else>DISABLE</span>
            </td>
            <td class="text-center">
              <button
                @click="openModal(false, item)"
                class="btn btn-outline-primary btn-sm mr-1"
              >EDIT</button>
              <button
                @click="openDeleteCouponModal(item)"
                class="btn btn btn-outline-danger btn-sm"
              >DELE</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pagination="pagination" @changePage="getCoupons"></Pagination>

    <div
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      id="couponModal"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>ADD COUPON</span>
            </h5>
            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">COUPON TITLE</label>
                  <input
                    class="form-control"
                    id="title"
                    placeholder="INPUT COUPON TITLE"
                    type="text"
                    v-model="tempCoupon.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="category">COUPON CODE</label>
                    <input
                      class="form-control"
                      id="category"
                      placeholder="INPUT COUPON CODE"
                      type="text"
                      v-model="tempCoupon.code"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="origin_price">DUE TO</label>
                    <input
                      class="form-control"
                      id="origin_price"
                      placeholder="INPUT DUE TO"
                      type="date"
                      v-model="tempCoupon.due_date"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="origin_price">DISCOUNT RATE</label>
                    <input
                      class="form-control"
                      id="origin_price"
                      placeholder="INPUT DISCOUNT RATE"
                      type="number"
                      v-model="tempCoupon.percent"
                    />
                  </div>
                </div>

                <hr />

                <div class="form-group">
                  <div class="form-check">
                    <input
                      :false-value="0"
                      :true-value="1"
                      class="form-check-input"
                      id="is_enabled"
                      type="checkbox"
                      v-model="tempCoupon.is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">ENABLE</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-third" data-dismiss="modal" type="button">CANCEL</button>
            <button @click="updateCoupon" class="btn btn-primary" type="button">
              <i class="fas fa-circle-notch fa-spin" v-if="status.itemUpdating"></i> ACCEPT
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      id="delCouponModal"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>DELETE COUPON</span>
            </h5>
            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            DELETE
            <strong class="text-danger">{{tempCoupon.title}}</strong> ( COUPON CANNOT BE RESTORE AFTER DELETION )
          </div>
          <div class="modal-footer">
            <button class="btn btn-third" data-dismiss="modal" type="button">CANCEL</button>
            <button @click="deleteCoupon" class="btn btn-danger" type="button">ACCEPT</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/back/Pagination.vue';

export default {
  components: {
    Pagination
  },

  data () {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      status: {
        fileUploading: false,
        itemUpdating: false
      },
      pagination: {}
    };
  },

  methods: {
    getCoupons (page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=${page}`;
      this.$store.dispatch('updateLoading', true);

      vm.$http.get(api).then(response => {
        this.$store.dispatch('updateLoading', false);
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },

    openModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },

    openDeleteCouponModal (item) {
      this.tempCoupon = Object.assign({}, item);
      $('#delCouponModal').modal('show');
    },

    updateCoupon () {
      const vm = this;
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
      let httpMethod = 'post';

      vm.status.itemUpdating = true;

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }

      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        if (response.data.success) {
          vm.status.itemUpdating = true;
          $('#couponModal').modal('hide');
          vm.getCoupons(vm.pagination.current_page);
        } else {
          vm.status.itemUpdating = true;
          $('#couponModal').modal('hide');
          vm.getCoupons(vm.pagination.current_page);
          vm.$bus.$emit('message:push', 'Fail to add coupon', 'third');
        }
      });
    },

    deleteCoupon () {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          $('#delCouponModal').modal('hide');
          vm.getCoupons(vm.pagination.current_page);
        } else {
          $('#delCouponModal').modal('hide');
          vm.getCoupons(vm.pagination.current_page);
          vm.$bus.$emit('message:push', 'Fail to delete coupon', 'third');
        }
      });
    },

    uploadFile () {
      const vm = this;
      const uploadedFile = this.$refs.files.files[0];
      const formData = new FormData();
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;

      formData.append('file-to-upload', uploadedFile);
      vm.status.fileUploading = true;

      vm.$http
        .post(url, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then(response => {
          vm.status.fileUploading = false;
          if (response.data.success) {
            vm.$set(vm.tempCoupon, 'imageUrl', response.data.imageUrl);
          } else {
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          }
        });
    }
  },

  created () {
    this.getCoupons();
  }
};
</script>
