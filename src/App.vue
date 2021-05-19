<template>
  <div id="app">
    <toast />
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~@/assets/main';
</style>

<script>
import toast from '@/components/Toast.vue';

export default {
  components: {
    toast,
  },
  data() {
    return {};
  },
};
</script>
