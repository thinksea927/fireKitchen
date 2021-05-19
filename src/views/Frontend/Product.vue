<template>
  <div class="product bg-primary-1 py-5">
    <loading :active.sync="isLoading"></loading>
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-7">
          <div class="product-img" :style= "{backgroundImage:`url('${product.imageUrl[0]}')`}"
              style="height: 300px;
              background-size: cover;
              background-position: center"></div>
        </div>
        <div class="col-12 col-md-5 d-flex flex-column justify-content-center mt-3 mt-md-0">
          <div class="d-flex align-items-center">
          </div>
          <h4 class="font-noto font-weight-bold"> {{ product.title}}</h4>
          <p class="font-weight-light">
            {{ product.content }}
          </p>
          <div class="row my-3">
            <div class="product-price col-12 col-lg-6 d-flex flex-wrap
            justify-content-center align-items-center">
              <span class="h4 text-danger mb-0">NT$ {{ product.price | currency }}</span>
              <del class="text-muted ml-2">
                <small>原價NT$ {{ product.origin_price | currency }}</small>
              </del>
            </div>
            <div class="input-group col-12 col-lg-6 mt-3 mt-lg-0 align-items-center">
              <div class="input-group-prepend">
                <button type="button" class="btn btn-outline-secondary"
                @click="product.quantity -= 1"
                :disabled="product.quantity<=1">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input type="text" class="form-control text-center" v-model="product.quantity"/>
              <div class="input-group-append">
                <button type="button" class="btn btn-outline-secondary"
                @click="product.quantity ++">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <button class="btn btn-primary mt-3"
          @click.prevent="addToCart(product.id, product.quantity)"
          :disabled="status.loadingItem === product.id">加入購物車</button>
        </div>
      </div>
    </div>
    <hr/>
    <section class="alacartetext-center py-5">
      <div class="container py-5">
        <h4>是不是還想吃點什麼？...</h4>
        <p>份量剛好的單點餐食，最適合給想再加點的您</p>
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3"
            v-for="item in alacarteProducts" :key="item.id">
            <div class="card text-center">
              <div class="alacarte-img text-left rounded-lg"
              :style= "{backgroundImage:`url('${item.imageUrl[0]}')`}"
              style="height: 200px;
              background-size: cover;
              background-position: center">
              </div>
              <div class="card-body">
                <h5 class="font-noto font-weight-bold mb-0">
                  {{ item.title }}
                </h5>
              </div>
              <del class="text-muted">
                <small>原價NT$ {{ item.origin_price | currency }}</small>
              </del>
              <span class="text-danger font-weight-bold">
              NT$ {{ item.price | currency}}</span>
              <button class="btn btn-primary mt-3"
              @click.prevent="addToCart(item.id, 1)"
              :disabled="status.loadingItem === item.id">加入購物車</button>
          </div>
        </div>
        </div>
        </div>
      </section>
    </div>
</template>
<style lang="scss">
.product-quantity {
  input {
    width: 5rem;
    border: 0;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
  }
  button {
    border: 1px solid gray;
    &:nth-of-type(1) {
      border-radius: 5px 0 0 5px;
    }
    &:nth-of-type(2) {
      border-radius: 0 5px 5px 0;
    }
  }
}
.btn-light:disabled{
  border-color: black;
}
</style>
<script>
export default {
  data() {
    return {
      isLoading: false,
      product: {
        imageUrl: [],
        price: 0,
        origin_price: 0,
      },
      status: {
        loadingItem: '',
      },
      products: [],
      alacarteProducts: [],
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          this.products = res.data.data ?? [];
          this.isLoading = false;
          this.alacarteFilter();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'info');
        });
    },
    alacarteFilter() {
      this.alacarteProducts = this.products.filter((item) => item.category === '單點');
    },
    getProduct() {
      const { id } = this.$route.params;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          this.product = res.data.data ?? {};
          this.isLoading = false;
          this.$set(this.product, 'quantity', 1);
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'info');
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
          this.$bus.$emit('cartNumbers');
          this.$bus.$emit('toast-message', '加入購物車成功！', 'primary');
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'info');
        });
    },
  },
  created() {
    this.getProduct();
    this.getProducts();
  },
};
</script>
