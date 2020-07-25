<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="dashboard-table-wrap mb-3">
      <div class="text-right mb-3">
        <button class="btn btn-primary" @click="openModal(true)">ADD COUPON</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>COUPON NAME</th>
            <th width="15%" class="text-center">DISCOUNT RATE</th>
            <th width="15%">DUE TO</th>
            <th width="15%">ACTIVE</th>
            <th width="15%">EDIT</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>{{item.title}}</td>
            <td class="text-center">{{item.percent}}%</td>
            <td class="text-center">{{item.due_date}}</td>
            <td class="text-center">
              <span class="text-success" v-if="item.is_enabled">ENABLE</span>
              <span class="text-danger" v-else>DISABLE</span>
            </td>
            <td class="text-center">
              <button
                class="btn btn-outline-primary btn-sm mr-1"
                @click="openModal(false, item)"
              >EDIT</button>
              <button
                class="btn btn btn-outline-danger btn-sm"
                @click="openDeleteCouponModal(item)"
              >DELE</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pagination="pagination" @changePage="getCoupons"></Pagination>

    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>ADD COUPON</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">COUPON TITLE</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="INPUT COUPON TITLE"
                    v-model="tempCoupon.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="category">COUPON CODE</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="INPUT COUPON CODE"
                      v-model="tempCoupon.code"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="origin_price">DUE TO</label>
                    <input
                      type="date"
                      class="form-control"
                      id="origin_price"
                      placeholder="INPUT DUE TO"
                      v-model="tempCoupon.due_date"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="origin_price">DISCOUNT RATE</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="INPUT DISCOUNT RATE"
                      v-model="tempCoupon.percent"
                    />
                  </div>
                </div>

                <hr />

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">ENABLE</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-third" data-dismiss="modal">CANCEL</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              <i class="fas fa-circle-notch fa-spin" v-if="status.itemUpdating"></i> ACCEPT
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>DELETE COUPON</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            DELETE
            <strong class="text-danger">{{tempCoupon.title}}</strong> ( COUPON CANNOT BE RESTORE AFTER DELETION )
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-third" data-dismiss="modal">CANCEL</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">ACCEPT</button>
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
      isLoading: false,
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
      vm.isLoading = true;

      vm.$http.get(api).then(response => {
        vm.isLoading = false;
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
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
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
