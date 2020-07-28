<template>
  <div class="productList-wrap">
    <loading :active.sync="isLoading"></loading>

    <div class="dashboard-table-wrap my-3">
      <div class="text-right mb-3">
        <button @click="openModal(true)" class="btn btn-primary">ADD PRODUCT</button>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th width="15%">CATEGORY</th>
            <th>PROD NAME</th>
            <th width="10%">ORIG PRICE</th>
            <th width="10%">SELL PRICE</th>
            <th width="8%">ACTIVE</th>
            <th width="15%">EDIT</th>
          </tr>
        </thead>

        <tbody>
          <tr :key="item.id" v-for="item in products">
            <td>{{item.category}}</td>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price | currency}}</td>
            <td class="text-right">{{item.price | currency}}</td>
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
                @click="openDeleteProductModal(item)"
                class="btn btn btn-outline-danger btn-sm"
              >DELE</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination :pagination="pagination" @changePage="getProducts"></Pagination>

    <div
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      id="productModal"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>ADD PRODUCT</span>
            </h5>
            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">IMAGE LINK</label>
                  <input
                    class="form-control"
                    id="image"
                    placeholder="INPUT IMG LINK"
                    type="text"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    or UPLOAD IMG
                    <i class="fas fa-circle-notch fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input
                    @change="uploadFile"
                    class="form-control"
                    id="customFile"
                    ref="files"
                    type="file"
                  />
                </div>
                <img :src="tempProduct.imageUrl" alt class="img-fluid" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">PRODUCT TITLE</label>
                  <input
                    class="form-control"
                    id="title"
                    placeholder="PRODUCT TITLE"
                    type="text"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">CATEGORY</label>
                    <input
                      class="form-control"
                      id="category"
                      placeholder="INPUT CATEGORY"
                      type="text"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">UNIT</label>
                    <input
                      class="form-control"
                      id="unit"
                      placeholder="INPUT UNIT"
                      type="unit"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">ORIG PRICE</label>
                    <input
                      class="form-control"
                      id="origin_price"
                      placeholder="INPUT ORIG PRICE"
                      type="number"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">SELL PRICE</label>
                    <input
                      class="form-control"
                      id="price"
                      placeholder="INPUT SELL PRICE"
                      type="number"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="content">PROD CONTENT</label>
                  <textarea
                    class="form-control"
                    id="content"
                    placeholder="INPUT PROD CONTENT"
                    rows="4"
                    type="text"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="description">PROD DESCRIPTION</label>
                  <textarea
                    class="form-control"
                    id="description"
                    placeholder="INPUT PROD DESCRIPTION"
                    rows="4"
                    type="text"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      :false-value="0"
                      :true-value="1"
                      class="form-check-input"
                      id="is_enabled"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">ENABLE</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-third" data-dismiss="modal" type="button">CANCEL</button>
            <button @click="updateProduct" class="btn btn-primary" type="button">
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
      id="delProductModal"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>DELETE PRODUCT</span>
            </h5>
            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            DELETE
            <strong class="text-danger">{{tempProduct.title}}</strong> ( ITEM CANNOT BE RESTORE AFTER DELETION )
          </div>
          <div class="modal-footer">
            <button @click="deleteProduct" class="btn btn-danger" type="button">ACCEPT</button>
            <button class="btn btn-outline-secondary" data-dismiss="modal" type="button">CANCEL</button>
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
      products: [],
      tempProduct: {},
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
    getProducts (page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/products?page=${page}`;
      vm.isLoading = true;

      vm.$http.get(api).then(response => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },

    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $('#productModal').modal('show');
    },

    openDeleteProductModal (item) {
      this.tempProduct = Object.assign({}, item);
      $('#delProductModal').modal('show');
    },

    updateProduct () {
      const vm = this;
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
      let httpMethod = 'post';

      vm.status.itemUpdating = true;

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }

      vm.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        if (response.data.success) {
          vm.status.itemUpdating = false;
          $('#productModal').modal('hide');
          vm.getProducts(vm.pagination.current_page);
        } else {
          $('#productModal').modal('hide');
          vm.status.itemUpdating = false;
          vm.getProducts(vm.pagination.current_page);
          vm.$bus.$emit('message:push', 'Fail to add to product', 'third');
        }
      });
    },

    deleteProduct () {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          $('#delProductModal').modal('hide');
          vm.getProducts(vm.pagination.current_page);
        } else {
          $('#delProductModal').modal('hide');
          vm.getProducts(vm.pagination.current_page);
          vm.$bus.$emit('message:push', 'Fail to delete to product', 'third');
        }
      });
    },

    uploadFile () {
      const vm = this;
      const uploadedFile = this.$refs.files.files[0];
      const formData = new FormData();

      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;
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
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          } else {
            vm.$bus.$emit('message:push', response.data.message, 'danger');
          }
        });
    }
  },

  created () {
    this.getProducts();
  }
};
</script>
