import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Frontend/Home.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/Frontend/Index.vue'),
      },
      {
        path: '/products',
        component: () => import('../views/Frontend/Products.vue'),
      },
      // 記得要改成動態
      {
        path: '/product/:id',
        component: () => import('../views/Frontend/Product.vue'),
      },
      {
        path: '/cart',
        component: () => import('../views/Frontend/Cart.vue'),
      },
      {
        path: '/cart-form',
        component: () => import('../views/Frontend/CartForm.vue'),
      },
      // 記得要改成動態
      {
        path: '/cart-check/:id',
        component: () => import('../views/Frontend/CartCheck.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Backend/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/Backend/Orders.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/Backend/Coupons.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
