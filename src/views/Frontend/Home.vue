<template>
  <div class="home">
    <navbar></navbar>
    <router-view></router-view>
    <homefooter></homefooter>
  </div>
</template>
<style lang="scss">
body {
  font-family: 'Noto Sans TC', 'Noto Serif TC', 'Josefin Sans', serif, sans-serif;
}
.home {
  display: flex;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
}

</style>

<script>
import navbar from '@/components/Navbar.vue';
import homefooter from '@/components/Footer.vue';

export default {
  components: {
    navbar,
    homefooter,
  },
};
</script>
