<template>
  <div class="fsp-container-fluid">
    <loading :active.sync="isLoading"></loading>

    <div class="hero-decorate mt-3" style="border-top: #F68657 5px solid;" v-if="isHero"></div>
    <div :class="{'mt-3' : !isHero}" class="product-header">
      <div class="row justify-content-center">
        <div class="product-wrap col-12 col-md-6">
          <div class="product-img">
            <div class="abs-wrap">
              <img :src="product.imageUrl"/>
            </div>
          </div>
        </div>

        <div class="product-info col-12 col-md-6">
          <div class="product-title">
            <h2>
              <span class="hero-title" v-if="isHero">HERO</span>
              {{product.title}}
            </h2>
          </div>

          <div class="product-price d-flex justify-content-between align-items-baseline">
            <div
              class="h4 text-fourth-dark mb-0"
              v-if="!product.price"
            >{{product.origin_price | currency}}</div>
            <del class="h5 mb-0" v-if="product.price">{{product.origin_price | currency}}</del>
            <div
              class="h4 text-fourth-dark mr-2 mb-0"
              v-if="product.price"
            >{{product.price | currency}}</div>
          </div>

          <pre class="product-content">{{product.content}}</pre>

          <div class="product-input">
            <div class="quantity">
              <span class="quantity-title">QUANTITY</span>
              <button @click="quantitySub(product)" class="btn btn-outline-third">-</button>
              <input :value="product.num" readonly="readonly" type="text" />
              <button @click="quantityPlus(product)" class="btn btn-outline-third">+</button>
            </div>

            <div class="buy-option">
              <button
                @click="addToCart(product.id, true, product.num)"
                class="btn btn-primary mr-1percent"
                type="button"
              >
                <i class="fas fa-circle-notch fa-spin" v-if="clickedButton === 'direct'"></i> BUY NOW
              </button>
              <button
                @click="addToCart(product.id, false, product.num)"
                class="btn btn-fourth-dark"
                type="button"
              >
                <i class="fas fa-circle-notch fa-spin" v-if="clickedButton === 'non-direct'"></i> ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-decorate mb-3" style="border-bottom: #F68657 5px solid;" v-if="isHero"></div>

    <div class="product-description">
      <div class="row my-3">
        <div class="description-title col-12">
          <h3>PRODUCT INFO</h3>
        </div>

        <div class="col-12">
          <pre>{{product.description}}</pre>
        </div>
      </div>
    </div>

    <div class="recommand-products">
      <div class="row mb-3">
        <div class="recommand-title mt-1 mb-3 col-12">
          <h5>MAYBE YOU WILL LIKE...</h5>
        </div>

        <div
          :key="index"
          class="col-md-3 col-sm-6 col-12 mb-4 recommand-hover"
          v-for="(item, index) in recommandProducts"
        >
          <a
            :href="'#/front_single_product/' + item.id"
            @click="getRecommandProduct(item.id)"
            class="link-block"
          >
            <div class="card shadow-sm">
              <div
                :style="{backgroundImage: `url(${item.imageUrl})`}"
                style="height: 200px; background-size: contain; background-repeat: no-repeat; background-position: center;"
              ></div>
              <div class="card-body">
                <h6 class="card-title">{{item.title}}</h6>
              </div>

              <div class="card-footer d-flex justify-content-end">
                <div class="h6" v-if="!item.price">{{item.origin_price | currency}}</div>
                <div class="h6" v-if="item.price">{{item.price | currency}}</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      productId: '',
      recommandProducts: [],
      localCateProducts: [],
      product: {
        num: 1
      },
      clickedButton: '',
      shoppingCart: [],
      isHero: false
    };
  },

  watch: {
    $route (to, from) {
      this.productId = this.$route.params.productID;
      this.getSingleProduct();
    }
  },

  methods: {
    hero () {
      const vm = this;
      if (vm.product.category.indexOf('hero') !== -1) {
        vm.isHero = true;
      } else {
        vm.isHero = false;
      }
    },

    getSingleProduct () {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${vm.productId}`;
      vm.isLoading = true;
      vm.randomProduct(vm.localCateProducts, 4);

      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.product = response.data.product;
          vm.$set(vm.product, 'num', 1);
          vm.isLoading = false;
          vm.hero();
        }
      });
    },

    getRecommandProduct (id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;

      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.$router.push(
            `../front_single_product/${response.data.product.id}`
          );
        }
      });
    },

    getCart () {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      vm.isLoading = true;

      vm.$http.get(api).then(response => {
        vm.shoppingCart = response.data.data;
        vm.isLoading = false;
      });
    },

    addToCart (id, direct, qty = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      const cart = {
        product_id: id,
        qty
      };

      if (direct) {
        vm.clickedButton = 'direct';
      } else {
        vm.clickedButton = 'non-direct';
      }

      vm.shoppingCart.carts.filter(function (item) {
        if (item.product.id === cart.product_id) {
          cart.qty = item.qty + cart.qty;
          vm.removeCartItem(item.id);
          vm.getCart();
        }
      });

      vm.$http.post(api, { data: cart }).then(response => {
        if (response.data.success) {
          vm.getCart();
          vm.$bus.$emit(
            'message:push',
            'Successfully add to cart',
            'secondary'
          );
          vm.clickedButton = '';
          vm.product.num = 1;

          if (direct) {
            vm.$router.push('../shopping_cart/front_cart_items');
          }
        } else {
          vm.$bus.$emit('message:push', 'Fail to add to cart', 'third');
          vm.clickedButton = '';
        }
      });
    },

    removeCartItem (id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`;
      vm.isLoading = true;

      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          vm.isLoading = false;
        } else {
          vm.isLoading = false;
        }
      });
    },

    quantitySub (product) {
      const vm = this;
      if (vm.product.num > 1) {
        vm.product.num--;
      }
    },

    quantityPlus (product) {
      const vm = this;
      if (vm.product.num < 5) {
        vm.product.num++;
      }
    },

    randomProduct (arr, num) {
      const newArr = [];
      if (arr.length <= num) {
        num = arr.length;
      }

      rand(num);

      function rand (selectQty) {
        if (selectQty === 0) {
          return;
        }

        const index = Math.floor(Math.random() * arr.length);
        let flag = true;

        newArr.forEach(function (item) {
          if (item === arr[index]) {
            flag = false;
          }
        });

        if (flag) {
          newArr.push(arr[index]);
          selectQty--;
        }
        rand(selectQty);
      }

      this.recommandProducts = newArr;
    }

  },

  created () {
    this.productId = this.$route.params.productID;
    this.localCateProducts = JSON.parse(
      localStorage.getItem('cateFilteredList')
    );
    this.getSingleProduct();
    this.getCart();
  }

};
</script>
