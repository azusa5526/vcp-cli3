import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import productsModule from './products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    shoppingCart: []
  },
  actions: {
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },

    getShoppingCart(context) {
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('SHOPPINGCART', response.data.data);
        context.commit('LOADING', false);
      });
    }
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },

    SHOPPINGCART(state, axiosData) {
      state.shoppingCart = axiosData;
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },

    shoppingCart(state) {
      return state.shoppingCart;
    }
  },
  modules: {
    productsModule
  }
});
