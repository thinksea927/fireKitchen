<template>
  <div class="cart-check cart-height bg-primary-1">
    <loading :active.sync="isLoading"/>
    <div class="container">
      <h3 class="text-center mt-5">付款成功！</h3>
      <p class="text-center">
        您的美食訂單已經安排製作中，請於
        <span class="h3 text-info font-weight-bold px-1">{{ pickupTime }}</span>
        後至餐廳領取。
      </p>
      <p class="text-center text-danger">*** 領取時請出示此手機畫面 ***</p>
      <hr />
      <div class="row">
        <div class="col-12 col-md-6 order-md-2 py-3 bg-white">
          <ul class="pl-0 mb-0">
            <li class="d-flex justify-content-between">
              <h5>訂單號碼</h5>
              <p class="h5 font-weight-bold"> {{ order.created.timestamp }}</p>
            </li>
            <hr class="mt-0" />
            <li class="d-flex justify-content-between text-muted">
              <p>訂餐者姓名</p>
              <p>{{ order.user.name }}</p>
            </li>
            <li class="d-flex justify-content-between text-muted">
              <p>E-mail</p>
              <p>{{ order.user.email }}</p>
            </li>
            <li class="d-flex justify-content-between text-muted">
              <p>手機號碼</p>
              <p>{{ order.user.tel}}</p>
            </li>
          </ul>
          <hr class="mt-0" />
          <ul class="pl-0 mb-0">
            <li class="d-flex justify-content-between text-muted">
              <p>付款金額</p>
              <p>NT$ {{ order.amount }}</p>
            </li>
            <li class="d-flex justify-content-between text-muted">
              <p>付款方式</p>
              <p>{{ order.payment }}</p>
            </li>
            <li class="d-flex justify-content-between text-muted">
              <p>下單時間</p>
              <p>{{ order.created.datetime }}</p>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-6 order-md-1 mt-3 mt-md-0 px-5">
          <h5 class="text-center my-3">訂單明細</h5>
          <div class="d-flex align-items-center py-1"
          v-for="item in order.products" :key="item.product.title">
            <div class="d-block" :style="{backgroundImage:
              `url('${item.product.imageUrl[0]}')`}"
              style="height: 50px; width: 50px; background-size: cover;
              background-position: center">
            </div>
            <div class="d-flex flex-column mx-3">
              <span>
                {{ item.product.title }}
              </span>
              <small class="text-muted">
                $ {{ item.product.price | currency }}
              </small>
            </div>
            <span class="font-weight-bold ml-auto"> X {{ item.quantity }} </span>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <p class="h5">總金額</p>
            <p class="h5 text-info"> NT$ {{ order.amount }} </p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end my-5">
        <router-link to="/#">
          <div class="btn btn-outline-dark px-5 mr-3">
            回到首頁
          </div>
        </router-link>
        <router-link to="/products">
          <div class="btn btn-dark text-white px-5">
            繼續點餐
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: {
        user: {},
        created: {},
      },
      orderId: '',
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/${this.orderId}`;
      this.axios.get(api)
        .then((res) => {
          this.order = res.data.data ?? {};
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'danger');
        });
    },
  },
  created() {
    this.orderId = this.$route.params.id;
    this.getOrder();
  },
  computed: {
    pickupTime() {
      const tempTime = this.order.created.timestamp * 1000 + 40 * 60 * 1000;
      const m = (new Date(tempTime).getMinutes() < 10 ? '0' : '')
      + new Date(tempTime).getMinutes();
      const h = new Date(tempTime).getHours();
      return `${h}：${m}`;
    },
  },
};
</script>
