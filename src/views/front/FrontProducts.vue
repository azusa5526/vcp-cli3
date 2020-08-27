<template>
  <div>
    <FrontSlidesProducts></FrontSlidesProducts>

    <div class="row mt-4 justify-content-center">
      <div class="col-xl-2 col-lg-3 col-md-3 col-sm-12 col-12 mb-3 side-wrap">
        <FrontSidebar></FrontSidebar>
      </div>

      <div class="col-xl-10 col-lg-9 col-md-9 col-sm-12 col-12 product-wrap">
        <div class="row">
          <div
            :key="index"
            class="col-2xl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-4 product-hover card-wrap"
            v-for="(item, index) in productsInWindowList"
          >
            <a
              :href="'#/front_single_product/' + item.id"
              @click="getSingleProduct(item.id)"
              @click.middle="getSingleProduct(item.id)"
              class="link-block"
            >
              <div class="card border-0 shadow-sm">
                <div class="promote-wrap" v-if="item.category.indexOf('hero') !== -1">
                  <img src="@/assets/img/hero_promote_b.png" />
                  <h6 class="promote-content">HREO</h6>
                </div>

                <div
                  :style="{backgroundImage: `url(${item.imageUrl})`}"
                  style="height: 300px; background-size: contain; background-position: center; background-repeat: no-repeat; background-color: #FFFFFF;"
                ></div>
                <div class="card-body">
                  <h5 class="card-title">{{item.title}}</h5>
                  <p class="card-text">{{item.content}}</p>
                </div>

                <div class="card-footer d-flex justify-content-between align-items-baseline">
                  <div class="h5 mb-0" v-if="!item.price">{{item.origin_price | currency}}</div>
                  <del class="h6 mb-0" v-if="item.price">{{item.origin_price | currency}}</del>
                  <div class="h5 mb-0" v-if="item.price">{{item.price | currency}}</div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div class="row justify-content-center">
          <Pgnation
            class="my-4"
            :pagination="pgnation"
            @changePage="changeCurrentPage"
            v-if="filteredProducts.length !== 0"
          ></Pgnation>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FrontSidebar from '@/components/front/FrontSidebar.vue';
import Pgnation from '@/components/front/Pgnation.vue';
import FrontSlidesProducts from './FrontSlidesProducts.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    FrontSidebar,
    Pgnation,
    FrontSlidesProducts
  },

  data() {
    return {
      status: {
        noProductsInWindow: false
      },
      pgnation: {
        current_page: 1,
        has_next: false,
        has_pre: false,
        total_pages: 1,
        page_size: 12
      },

      filteredProducts: [],
      productsInWindow: []
    };
  },

  methods: {
    getSingleProduct(id) {
      const categoryFilter = this.$route.params.categoryFilter;
      this.$store.dispatch('productsModule/getSingleProduct', { id, categoryFilter });
    },

    productsFilterList() {
      const vm = this;
      this.$store.dispatch('productsModule/getCategoryFilteredProducts', this.categoryFilter);
      let tempProducts = this.categoryFilteredProducts;

      if (vm.productsFilter.length === 0) {
        return tempProducts;
      } else {
        for (const filter of vm.productsFilter) {
          tempProducts = tempProducts.filter(function (item) {
            return item.category.indexOf(filter) !== -1;
          });
        }
        return tempProducts;
      }
    },

    pgnationCounter() {
      const vm = this;
      const productsLength = vm.filteredProducts.length;

      vm.pgnation.total_pages = Number(Math.floor(productsLength / vm.pgnation.page_size) + 1);

      if (vm.pgnation.current_page < vm.pgnation.total_pages) {
        vm.pgnation.has_next = true;
      } else {
        vm.pgnation.has_next = false;
      }

      if (vm.pgnation.current_page > 1) {
        vm.pgnation.has_pre = true;
      } else {
        vm.pgnation.has_pre = false;
      }
    },

    pageSpliter() {
      const vm = this;
      const pageMinIndex =
        vm.pgnation.current_page * vm.pgnation.page_size - vm.pgnation.page_size + 1;
      const pageMaxIndex = vm.pgnation.current_page * vm.pgnation.page_size;

      vm.productsInWindow = [];
      vm.filteredProducts.forEach(function (item, index) {
        const num = index + 1;
        if (num >= pageMinIndex && num <= pageMaxIndex) {
          vm.productsInWindow.push(item);
        }
      });
    },

    changeCurrentPage(targetPage) {
      const vm = this;
      vm.pgnation.current_page = Number(targetPage);
      vm.pgnationCounter();
      vm.pageSpliter();
    },
    ...mapActions('productsModule', ['getAllProducts'])
  },

  computed: {
    productsInWindowList() {
      const vm = this;
      const productsInWindow = [];

      vm.filteredProducts = vm.productsFilterList();

      const pageMinIndex =
        vm.pgnation.current_page * vm.pgnation.page_size - vm.pgnation.page_size + 1;
      const pageMaxIndex = vm.pgnation.current_page * vm.pgnation.page_size;

      vm.filteredProducts.forEach(function (item, index) {
        const num = index + 1;
        if (num >= pageMinIndex && num <= pageMaxIndex) {
          productsInWindow.push(item);
        }
      });
      vm.pgnationCounter();
      vm.pageSpliter();
      return productsInWindow;
    },
    ...mapGetters('productsModule', ['allProducts', 'categoryFilteredProducts', 'categoryFilter', 'productsFilter'])
  },

  watch: {
    categoryFilter: {
      handler() {
        this.pgnation.current_page = 1;
      }
    },

    productsInWindow: {
      handler() {
        if (this.productsInWindow.length === 0) {
          this.status.noProductsInWindow = true;
        } else {
          this.status.noProductsInWindow = false;
        }
      }
    }
  },

  created() {
    this.getAllProducts();
    this.changeCurrentPage(1);
  }
};
</script>
