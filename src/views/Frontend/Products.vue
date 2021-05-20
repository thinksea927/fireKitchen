<template>
  <div class="products">
    <loading :active.sync="isLoading"></loading>
    <header class="header products-header">
      <div class="container text-white text-center">
        <h3 class="font-weight-lighter spacing-5">
          Experince the taste of</h3>
        <h3 class="d-inline-block bg-white text-dark font-weight-lighter
        spacing-5 p-2">fire!</h3>
        <h5 class="font-noto font-weight-lighter">火的溫度，火的味道</h5>
        <h5 class="font-noto font-weight-lighter">原始的風味，原本的味道</h5>
      </div>

    </header>
    <main>
      <div class="hot-sale d-flex align-items-center text-center ">
        <div class="container">
          <div class="blur text-white d-inline-block p-3 p-md-5 border border-dark">
            <span class="h3 bg-info rounded-lg px-5">好評熱賣中</span>
            <h2 class="font-noto font-weight-bold mt-3">鮮蔬沙拉碗每日現貨供應</h2>
            <h5 class="font-weight-light">嚴選當季產蔬菜，每日新鮮配送</h5>
            <p class="font-weight-lighter">產地：花椰菜-彰化、小黃瓜-雲林、高麗菜-斗六 <br/>
            蔬菜種類不固定，詳情請見當日餐廳公告
            </p>
            <h4 class="p-1 m-0">NT$80</h4>
            <button type="button" class="btn btn-primary mt-3 px-5"
              @click.prevent="addToCart(hotsaleProduct)"
              :disabled="status.loadingItem === hotsaleProduct">加入購物車</button>
          </div>
        </div>
      </div>
      <!-- 菜單 -->
      <div class="menu bg-light-1 pt-5 pb-5">
        <div class="container text-center">
          <h3>美味餐點
            <span class="font-jose">Menu</span>
          </h3>
          <ul class="nav nav-pills mb-3 justify-content-center">
            <li class="nav-item">
              <a class="nav-link mx-3 active" id="pills-all-tab" data-toggle="pill"
              href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true"
              @click.prevent="toFilter(type = 'all')">全部餐點</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-3" id="pills-beef-tab" data-toggle="pill"
              href="#pills-beef" role="tab" aria-controls="pills-beef" aria-selected="false"
              @click.prevent="toFilter(type = 'beef')">牛肉</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-3" id="pills-chicken-tab" data-toggle="pill"
              href="#pills-chicken" role="tab" aria-controls="pills-chicken" aria-selected="false"
              @click.prevent="toFilter(type = 'chicken')">雞肉</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-3" id="pills-fish-tab" data-toggle="pill"
              href="#pills-fish" role="tab" aria-controls="pills-fish" aria-selected="false"
              @click.prevent="toFilter(type = 'fish')">海鮮</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-3" id="pills-others-tab" data-toggle="pill"
              href="#pills-others" role="tab" aria-controls="pills-others" aria-selected="false"
              @click.prevent="toFilter(type = 'others')">其他</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-3" id="pills-alacarte-tab" data-toggle="pill"
              href="#pills-alacarte" role="tab" aria-controls="pills-alacarte" aria-selected="false"
              @click.prevent="toFilter(type = 'alacarte')">單點</a>
            </li>
          </ul>
          <div class="row">
            <div class="col-12 col-md-6 col-lg-4 my-3" v-for="item in typeProducts" :key="item.id">
              <div class="card">
                <div class="text-left rounded-top"
                :style= "{backgroundImage:`url('${item.imageUrl[0]}')`}"
                style="height: 300px;
                background-size: cover;
                background-position: center">
                  <!-- <span class="badge badge-secondary">生酮可</span> -->
                </div>
                <div class="card-body">
                  <h4 class="font-noto font-weight-bold">
                    {{ item.title }}
                  </h4>
                </div>
                <del class="text-muted">
                  <small>原價NT$ {{ item.origin_price | currency }}</small>
                </del>
                <span class="text-info font-weight-bold pb-3">
                  特價：NT$ {{ item.price| currency }}</span>
                <div class="bg-black d-flex justify-content-around rounded-bottom py-3">
                  <router-link :to="`/product/${item.id}`" class="btn btn-outline-light">
                  更多資訊</router-link>
                  <button type="button" class="btn btn-outline-primary"
                  @click.prevent="addToCart(item.id)"
                :disabled="status.loadingItem === item.id">加入購物車</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<style lang="scss">
.products-header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("~@/assets/images/products-banner.jpg");
  background-position: center center;
  background-size: cover;
  // background-attachment: fixed;
  height: 30vh;
  display: flex;
  align-items: center;
  position: relative;
  text-transform: uppercase;
}
.products .hot-sale {
  background-image: url("~@/assets/images/salad2.jpg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 500px;
}
.blur{
  box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}
a.nav-link{
  color: black;
}
.menu li{
  position: relative;
}
.menu li+li:after{
  content: "";
  background-color: #656565;
  display: block;
  width: 1px;
  height: 20px;
  position: absolute;
  top: 10px;
  left: 0;
}
.menu .col-12{
  transition: all 0.5s;
}
.menu .col-12:hover{
  transform: translateY(-0.5rem);
  button.btn{
    background: #fcbf02;
    color: black;
  }
}

</style>
<script>
export default {
  data() {
    return {
      products: [],
      type: '',
      typeProducts: [],
      isLoading: true,
      status: {
        loadingItem: '',
      },
      hotsaleProduct: 'DM077d33GjHgeajwy7sjb7aDlop4UBOddvm3ml8f1YPJmdKqRxKkJMmc15utYUuU',
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;
      this.axios.get(api)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data ?? [];
          this.typeProducts = this.products;
        });
    },
    addToCart(id, quantity = 1) {
      this.status.loadingItem = id;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      this.axios.post(api, cart)
        .then(() => {
          this.status.loadingItem = '';
          this.isLoading = false;
          this.$bus.$emit('cartNumbers');
          this.$bus.$emit('toast-message', '加入購物車成功！', 'white');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'info');
        });
    },
    toFilter() {
      switch (this.type) {
        case 'all':
          this.typeProducts = this.products;
          break;
        case 'beef':
          this.typeProducts = this.products.filter((item) => item.category === '牛肉');
          break;
        case 'pork':
          this.typeProducts = this.products.filter((item) => item.category === '豬肉');
          break;
        case 'chicken':
          this.typeProducts = this.products.filter((item) => item.category === '雞肉');
          break;
        case 'fish':
          this.typeProducts = this.products.filter((item) => item.category === '海鮮');
          break;
        case 'alacarte':
          this.typeProducts = this.products.filter((item) => item.category === '單點');
          break;
        case 'others':
          this.typeProducts = this.products.filter((item) => item.category === '其他');
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
