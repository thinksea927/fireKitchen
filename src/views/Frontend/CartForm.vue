<template>
  <div class="cart-form cart-height bg-primary-1">
    <loading :active.sync="isLoading"/>
    <div class="container py-5">
      <div class="d-flex align-items-center">
        <h5>訂單明細</h5>
        <router-link to="/cart" class="ml-auto">
          <button class="btn btn-outline-dark rounded-pill">
            <i class="fas fa-chevron-left"></i>
            <span class="ml-2">回購物車</span>
          </button>
        </router-link>
      </div>
      <hr />
      <div class="row mt-5">
        <div class="col-12 col-lg-6 border border-dark">
          <h4 class="text-center my-3">訂單明細</h4>
          <div class="d-flex align-items-center py-1"  v-for="item in carts" :key="item.product.id">
            <div class="d-block" :style="{backgroundImage:
              `url('${item.product.imageUrl[0]}')`}"
              style="height: 50px; width: 50px; background-size: cover;
              background-position: center">
            </div>
            <div class="d-flex flex-column w-50 mx-3">
              <span class="font-noto">
                {{ item.product.title }}
              </span>
              <small class="text-muted">
                $ {{ item.product.price | currency }}
              </small>
            </div>
            <span class="font-weight-bold"> X {{ item.quantity }} </span>
            <span class="font-weight-bold ml-auto">NT$ {{item.product.price*item.quantity }}</span>
          </div>
          <hr />
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="請輸入折扣碼..."
            v-model="couponCode" :disabled="inputDisabled" />
            <div class="input-group-append">
              <span class="input-group-text pointer" @click="checkCoupon">確認</span>
            </div>
          </div>
          <div class="alert alert-success" role="alert" v-if="coupon.code">
            成功享有此折扣！
            <!-- <span @click="closeAlert" class="close-alert pointer position-absolute">
              X </span> -->
          </div>
          <ul class="pl-0">
            <li class="d-flex justify-content-between">
              <p>小計</p>
              <p>NT$ {{ cartTotal }}</p>
            </li>
            <li class="d-flex justify-content-between" v-if="this.coupon.enabled">
              <p>折扣</p>
              <p class="text-danger"> - NT$ {{ cartTotal * (100 - this.coupon.percent) / 100}}</p>
            </li>
          </ul>
          <hr />
          <div class="d-flex justify-content-between">
            <p class="h5">總金額</p>
            <p class="h5 text-info" v-if="this.coupon.percent">
              NT$ {{ cartTotal - cartTotal * (100 - this.coupon.percent) / 100 }} </p>
            <p class="h5 text-info" v-else>
              NT$ {{ cartTotal}} </p>
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <h5 class="text-center my-3">訂餐者資料</h5>
          <validation-observer v-slot="{ invalid }">
            <form @submit.prevent="cartSubmit">
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="name" class="mb-2"><span class="text-danger">*</span>姓名</label
                  ><input
                    type="name"
                    id="name"
                    name="姓名"
                    placeholder="請輸入訂餐者姓名"
                    class="form-control required"
                    :class="classes"
                    v-model="form.name"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required|email" v-slot="{ errors, classes }">
                  <label for="email" class="mb-2"><span class="text-danger">*</span>E-mail</label
                  ><input
                    type="email"
                    id="email"
                    name="Email"
                    placeholder="請輸入 Email"
                    class="form-control required"
                    :class="classes"
                    v-model.trim="form.email"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="address" class="mb-2"><span class="text-danger">*</span>
                  收件人地址</label>
                  <input type="text" class="form-control rounded-0" id="address" name="收件人地址"
                  v-model.trim="form.address" :class="classes" placeholder="請輸入收件人地址">
                  <span v-if="errors[0]" class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider rules="required|min:10" v-slot="{ errors, classes }">
                  <label for="tel" class="mb-2"><span class="text-danger">*</span>手機號碼</label
                  ><input
                    type="tel"
                    id="tel"
                    name="手機號碼"
                    placeholder="請輸入手機號碼"
                    class="form-control required"
                    :class="classes"
                    v-model="form.tel"
                  />
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <span
                  ><label for="payment"><span class="text-danger">*</span>付款方式</label
                  ><select
                    id="payment"
                    name="付款方式"
                    class="form-control untouched pristine required"
                    v-model="form.payment"
                    ><option selected="selected" disabled="disabled" value="">請選擇付款方式</option
                    ><option value="WebATM">WebATM</option
                    ><option value="CVS">超商付款</option
                    ><option value="CreditCard">信用卡</option>
                  </select></span
                >
              </div>
              <div class="form-group">
                <label for="message">備註</label
                ><textarea id="message" rows="5" placeholder="備註" class="form-control"
                v-model="form.message"></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button class="btn btn-dark text-white px-5" :disabled="invalid">
                  確認付款
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carts: [],
      cartTotal: '',
      form: {
        name: '',
        email: '',
        address: '',
        tel: '',
        payment: '',
        message: '',
      },
      isLoading: false,
      coupon: {},
      couponCode: '',
      inputDisabled: false,
    };
  },
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          this.carts = res.data.data ?? [];
          this.countTotal();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'danger');
        });
    },
    countTotal() {
      let total = 0;
      this.carts.forEach((item) => {
        total += item.product.price * item.quantity;
      });
      this.cartTotal = total;
    },
    checkCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      this.axios.post(api, { code: this.couponCode })
        .then((res) => {
          this.coupon = res.data.data ?? {};
          this.inputDisabled = true;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'danger');
        });
    },
    cartSubmit() {
      const order = { ...this.form };
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`;
      this.isLoading = true;
      this.axios.post(api, order)
        .then((res) => {
          this.isLoading = false;
          this.$bus.$emit('cartNumbers');
          this.$bus.$emit('toast-message', '送出訂單成功！', 'primary');
          this.$router.push(`/cart-check/${res.data.data.id}`);
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `送出訂單失敗，請洽客服人員 02-8563253, 錯誤訊息如下：${err}`, 'info');
        });
    },
  },
  created() {
    this.getCarts();
  },

};
</script>
