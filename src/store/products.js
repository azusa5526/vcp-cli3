import axios from 'axios';
import router from '../router';

export default {
  namespaced: true,
  state: {
    allProducts: [],
    activedProducts: [],
    categoryFilteredProducts: [],
    categoryFilter: '',
    productsFilter: []
  },
  actions: {
    getAllProducts(context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      context.commit('LOADING', true, { root: true });

      axios.get(api).then((response) => {
        context.commit('ALLPRODUCTS', response.data.products);
        context.commit('LOADING', false, { root: true });
      });
    },

    getCategoryFilteredProducts(context, filter) {
      context.commit('ACTIVEDPRODUCTS');
      context.commit('CATEGORYFILTEREDPRODUCTS', filter);
    },

    getSingleProduct(context, { id, categoryFilter }) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      context.commit('ACTIVEDPRODUCTS');
      context.commit('CATEGORYFILTEREDPRODUCTS', categoryFilter);
      axios.get(api).then((response) => {
        if (response.data.success) {
          router.push(`../front_single_product/${response.data.product.id}`);
        }
      });
    },

    updateCategoryFilter(context, filter) {
      context.commit('CATEGORYFILTER', filter);
    },

    updateProductsFilter(context, filter) {
      context.commit('PRODUCTSFILTER', filter);
    }
  },
  mutations: {
    ALLPRODUCTS(state, axiosData) {
      state.allProducts = axiosData;
    },

    ACTIVEDPRODUCTS(state) {
      state.activedProducts = state.allProducts.filter(function (item) {
        return item.is_enabled;
      });
    },

    CATEGORYFILTEREDPRODUCTS(state, filter) {
      if (filter === 'all') {
        state.categoryFilteredProducts = state.activedProducts.reverse();
      } else {
        state.categoryFilteredProducts = state.activedProducts.filter(function (item) {
          return item.category.indexOf(filter) !== -1;
        }).reverse();
      }
      localStorage.setItem('cateFilteredList', JSON.stringify(state.categoryFilteredProducts));
    },

    CATEGORYFILTER(state, filter) {
      state.categoryFilter = filter;
    },

    PRODUCTSFILTER(state, filter) {
      state.productsFilter = filter;
    }
  },
  getters: {
    allProducts(state) {
      return state.allProducts;
    },

    categoryFilteredProducts(state) {
      return state.categoryFilteredProducts;
    },

    categoryFilter(state) {
      return state.categoryFilter;
    },

    productsFilter(state) {
      return state.productsFilter;
    }
  }
};
