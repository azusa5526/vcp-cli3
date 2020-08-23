import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    allProducts: []
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },

    getAllProducts(context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`;
      context.commit('LOADING', true);

      axios.get(api).then((response) => {
        context.commit('ALLPRODUCTS', response.data.products);
        context.commit('LOADING', false);
      });
    }
  },

  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },

    ALLPRODUCTS(state, axiosData) {
      state.allProducts = axiosData;
    }
  },

  getters: {
    isLoading(state) {
      return state.isLoading;
    },

    allProducts(state) {
      return state.allProducts;
    }
  },
  modules: {}
});
