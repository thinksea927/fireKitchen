<template>
  <div>
    <div class="d-flex" style="min-height: 100vh">
      <div class="d-flex flex-column bg-black" style="width:300px;min-width: 300px">
        <nav class="navbar mt-5 mb-3">
          <router-link to="/admin/products" class="navbar-brand mx-auto">
            <img src="../assets/images/logo-text.png" class="d-block w-100">
            <h5 class="text-dark text-center">後台管理系統</h5>
          </router-link>
        </nav>
        <div class="hr-style"></div>
        <ul class="d-flex flex-column px-0" id="checkul">
          <li class="text-center path-active">
            <router-link to="/admin/products"
            class="py-3 text-decoration-none d-block" >
            產品列表</router-link>
          </li>
          <li class="text-center path-active">
            <router-link to="/admin/Coupons"
            class="py-3 text-decoration-none d-block">
            優惠券列表</router-link>
          </li>
          <li class="text-center path-activ">
            <router-link to="/admin/Orders" class="py-3 text-decoration-none d-block">
            訂單列表</router-link>
          </li>
          <li class="text-center">
            <a href="#" class="py-3 text-decoration-none d-block"
            @click.prevent="signout">登出</a>
          </li>
          <button class="btn btn-secondary mx-auto my-5" style="width: 80px"
          @click.prevent="backtoHome">回前台</button>
        </ul>
      </div>
        <router-view :token='token' v-if="checkSuccess"></router-view>
    </div>
  </div>
</template>
<style lang="scss">
$dark: #b18000;

.text-black{
  color: black;
}

li{
  list-style: none;
  a{
    color: white;
  }
  &:hover{
    background-color: rgba(131, 116, 63, 0.2);
    a{
      color: $dark;
    }
  }
}
.hr-style{
  border-top: 1px solid $dark;
  width: 90%;
  margin: 0 auto;
}
ul .router-link-active{
  position: relative;
  color: $dark;
  &:after{
    content: '';
    display: block;
    position: absolute;
    top: 1rem;
    left: 0rem;
    width: 6px;
    height: 1.5rem;
    background-color: $dark;
  }
}

</style>
<script>
export default {
  data() {
    return {
      token: '',
      checkSuccess: false,
      pathCheck: '',
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)fireKitchenToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const api = `${process.env.VUE_APP_APIPATH}/auth/check`;

      this.axios.post(api, { api_token: this.token }).then((res) => {
        if (res.data.success) {
          this.checkSuccess = true;
        }
      })
        .catch(() => {
          this.$router.push('/login');
        });
    },
    signout() {
      document.cookie = 'fireKitchenToken=;expires=; path=/';
      this.$router.push('/login');
      this.$bus.$emit('toast-message', '你已登出', 'white');
    },
    backtoHome() {
      this.$router.push('/');
    },
  },
};
</script>
