<template>
  <div class="container pt-5">
    <loading :active.sync="isLoading"/>
    <h3 class="text-dark mb-5">訂單列表</h3>
    <table class="table border border-dark table-hover mt-3">
      <thead class="bg-dark text-white rounded-sm">
        <tr class="text-center">
          <th class="font-weight-light">下單時間</th>
          <th class="font-weight-light">下單品項</th>
          <th class="font-weight-light">付款方式</th>
          <th class="font-weight-light">應付金額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orderList" :key="item.id">
          <td class="text-center">{{ item.created.datetime}}</td>
          <td class="text-center">{{ item.products[0].product.title}}</td>
          <td class="text-center">{{ item.payment}}</td>
          <td class="text-center">{{ item.amount}}</td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <pagination :pages="pagination" @emit-pages="getOrders"></pagination>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      orderList: [],
      pagination: {},
      isLoading: false,
    };
  },
  props: ['token'],
  methods: {
    getOrders(num = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${num}`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          this.orderList = res.data.data ?? [];
          this.pagination = res.data.meta.pagination ?? {};
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'info');
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
