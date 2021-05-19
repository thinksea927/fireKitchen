<template>
  <div class="container">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="item in swiperLists" :key="item.id">
        <p>{{ item.name }}</p>
        <p>{{ item.comment }}</p>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'Testmonial',
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // Some Swiper option/callback...
      },
      swiperLists: [
        {
          id: '0001',
          name: '陳小姐',
          comment: '我是肉食主義者，這是朋友介紹我去吃的，吃的出來肉都是有精心挑選過的，且烹調的非常軟嫩多汁，人很多，可能需要排隊。',
        },
        {
          id: '0002',
          name: '陳小姐',
          comment: '我是肉食主義者，這是朋友介紹我去吃的，吃的出來肉都是有精心挑選過的，且烹調的非常軟嫩多汁，人很多，可能需要排隊。',
        },
        {
          id: '0003',
          name: '陳小姐',
          comment: '我是肉食主義者，這是朋友介紹我去吃的，吃的出來肉都是有精心挑選過的，且烹調的非常軟嫩多汁，人很多，可能需要排隊。',
        },
      ],
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    console.log('Current Swiper instance object', this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
};
</script>
<style lang="scss">
@import "~@/assets/main";
</style>
