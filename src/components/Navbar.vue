<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black sticky-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/images/fire-logo2.png" alt="" class="fire-logo" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbar">
        <div class="navbar-nav align-items-center align-items-md-end">
          <router-link to="/" class="nav-link pl-5 text-light">首頁</router-link>
          <router-link to="/products" class="nav-link pl-5 text-light">低碳菜單</router-link>
          <router-link to="/cart" class="nav-link pl-5 text-light">購物車
            <i class="fas fa-shopping-cart"></i>
            <span class="badge badge-pill badge-primary"
            >{{ carts.length }}</span>
          </router-link>
          <router-link to="/login" class="nav-link border border-secondary text-secondary
          rounded-lg mt-3 mt-xl-0 ml-5">
          後台登入</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<style lang="scss">
@import "~@/assets/main";
.fire-logo {
  height: 80px;
}
.nav-link .badge{
  transform: translate(-20%, -60%);
}
</style>

<script>
export default {
  data() {
    return {
      carts: [],
    };
  },
  created() {
    this.getCarts();
    this.$bus.$on('cartNumbers', () => {
      this.getCarts();
    });
  },
  methods: {
    getCarts() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.axios.get(api)
        .then((res) => {
          this.carts = res.data.data;
        })
        .catch((err) => {
          console.log(err.response.data.errors);
        });
    },
  },
};
</script>
