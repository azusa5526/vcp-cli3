/* eslint-disable indent */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/views/back/Login';
import Dashboard from '@/components/back/Dashboard';
import Products from '@/views/back/Products';
import OrderList from '@/views/back/OrderList';
import Coupon from '@/views/back/Coupon';

import FrontEnd from '@/components/front/FrontEnd';
import FrontHome from '@/views/front/FrontHome';
import FrontProducts from '@/views/front/FrontProducts';
import FrontShoppingCart from '@/views/front/FrontShoppingCart';
import FrontOrderList from '@/views/front/FrontOrderList';
import FrontCheckout from '@/views/front/FrontCheckout';
import FrontCheckOrder from '@/views/front/FrontCheckOrder';
import FrontCartItems from '@/views/front/FrontCartItems';
import FrontSingleProduct from '@/views/front/FrontSingleProduct';

Vue.use(VueRouter);

const routes = [{
    path: '*',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'FrontEnd',
    component: FrontEnd,
    children: [{
        path: 'home',
        name: 'Home',
        component: FrontHome
      },
      {
        path: 'frontProducts/:categoryFilter',
        name: 'FrontProducts',
        component: FrontProducts
      },

      {
        path: 'front_single_product/:productID',
        name: 'FrontSingleProduct',
        component: FrontSingleProduct
      },

      {
        path: 'shopping_cart',
        name: 'shoppingCart',
        component: FrontShoppingCart,
        children: [{
            path: 'front_cart_items',
            name: 'FrontCartItems',
            component: FrontCartItems
          },
          {
            path: 'front_orderlist',
            name: 'FrontOrderList',
            component: FrontOrderList
          },
          {
            path: 'front_checkout/:orderId',
            name: 'FrontCheckout',
            component: FrontCheckout
          }

        ]
      },

      {
        path: 'Front_check_order',
        name: 'FrontCheckOrder',
        component: FrontCheckOrder
      }

    ]
  },

  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [{
        path: 'products',
        name: 'Products',
        component: Products,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'order_list',
        name: 'OrderList',
        component: OrderList,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: Coupon,
        meta: {
          requiresAuth: true
        }
      }

    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
