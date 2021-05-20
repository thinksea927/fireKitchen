<template>
  <div class="fullHeight d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12 col-md-6 border border-dark rounded-lg py-5 px-5">
          <validation-observer v-slot="{ invalid }">
            <form @submit.prevent="signin">
              <div class="logo-text">
                <img src="../assets/images/logo-text.png" alt="" class="w-50 d-block mx-auto">
              </div>
              <h3 class="text-center text-dark mt-1">後台登入系統</h3>
              <div class="form-group text-left">
                <validation-provider name="E-mail" rules="required|email"
                v-slot="{ errors, classes }">
                  <label for="Email1">Email</label>
                  <input
                    class="form-control"
                    :class="classes"
                    id="Email1"
                    type="email"
                    placeholder="請輸入您的E-mail"
                    v-model="user.email"
                    requied="requied"
                  />
                  <span class="invalid-feedback" v-if="errors[0]">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="form-group text-left">
                <validation-provider name="密碼" rules="required" v-slot="{ errors, classes }">
                  <label for="Password1">密碼</label>
                  <input
                    class="form-control"
                    id="Password1"
                    type="password"
                    placeholder="請輸入您的密碼"
                    v-model="user.password"
                    :class="classes"
                  />
                  <span class="invalid-feedback" v-if="errors[0]">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="d-flex justify-content-end">
              <button class="btn btn-outline-primary mr-3" type="reset">取消</button>
              <button
                class="btn btn-primary px-3"
                type="submit"
                @keyup.enter="submit"
                :disabled="invalid"
              >
                登入
              </button>
              </div>
              <p class="text-white-50 mt-5 mb-0 text-center">
              Copyright © 2020 Fire Kitchen. All rights reserved.</p>
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
      user: {
        email: '',
        password: '',
      },
      token: '',
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/auth/login`;

      this.axios.post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `fireKitchenToken=${token};expires=${new Date(expired * 1000)};path=/`;
          this.$bus.$emit('toast-message', '登入成功', 'white');
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          this.$bus.$emit('toast-message', `登入失敗 ${err.message}`, 'black');
        });
    },
  },
};
</script>
