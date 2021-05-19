<template>
  <div class="cart cart-height bg-primary-1">
    <loading :active.sync="isLoading"></loading>
    <div class="container py-5">
      <div class="d-flex align-items-center">
        <h4 class="mb-0">購物車</h4>
        <router-link to="/products" class="ml-auto">
          <button class="btn btn-outline-dark rounded-pill">
            <i class="fas fa-chevron-left"></i>
            <span class="ml-2">繼續點餐</span>
          </button>
        </router-link>
      </div>
      <hr />
      <div class="cart-wrapper" v-if="carts.length">
        <div class="row py-5" v-for="item in carts" :key="item.product.id">
          <div class="col-12 col-md-6 d-flex align-items-center">
            <div class="d-block w-100" :style="{backgroundImage:
            `url('${item.product.imageUrl[0]}')`}"
                style="height: 100px; background-size: cover; background-position: center">
            </div>
            <span class="font-noto w-50 text-center px-3">
              {{ item.product.title }}
            </span>
          </div>
          <div class="col-12 col-md-6 d-flex align-items-center mt-3 mt-md-0">
            <!-- <div class="product-quantity d-flex"> -->
            <div class="input-group w-50">
              <div class="input-group-prepend">
                <button type="button" class="btn btn-outline-secondary" @click="item.quantity -= 1;
                updateCarts(item.product.id, item.quantity)"
                :disabled="item.quantity <=1">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input type="text" class="form-control text-center" v-model="item.quantity"/>
              <div class="input-group-append">
                <button type="button" class="btn btn-outline-secondary" @click="item.quantity ++;
                updateCarts(item.product.id, item.quantity)">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <span class="ml-5 text-dark">NT$ {{ item.product.price | currency}}</span>
            <div class="icon-wrapper pointer ml-auto pointer"
            @click="deleteCarts(item.product.id)">
              <i class="fas fa-trash-alt"></i>
            </div>
          </div>
        </div>
        <div class="d-flex mt-3">
          <router-link to="/cart-form" class="btn btn-dark text-white px-5 ml-auto">
            確認購物車
          </router-link>
        </div>
      </div>
      <div class="cart-wrapper" v-else>
        <h4 class="text-center">
          您的購物車目前是空的
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carts: [
        {
          product: {
            imageUrl: '',
            price: '',
          },
        },
      ],
      isLoading: false,
      status: {
        loadingItem: '',
      },
    };
  },
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          this.carts = res.data.data ?? [];
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'info');
        });
    },
    updateCarts(id, quantity = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      const tempCart = {
        product: id,
        quantity,
      };
      this.axios.patch(api, tempCart)
        .then(() => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', '更新購物車成功', 'primary');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `更新購物車失敗，請洽客服人員 02-8563253，錯誤訊息如下：${err}`, 'info');
        });
    },
    deleteCarts(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      const tempCart = {
        product: id,
      };
      this.axios.delete(api, tempCart)
        .then(() => {
          this.$bus.$emit('cartNumbers');
          this.isLoading = false;
          this.$bus.$emit('toast-message', '成功刪除購物車項目', 'primary');
          this.getCarts();
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `刪除購物車失敗，請洽客服人員 02-8563253，錯誤訊息如下：${err}`, 'info');
        });
    },
  },
  created() {
    this.getCarts();
  },
};
</script>
