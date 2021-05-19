<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': pages.current_page === 1}">
          <a class="page-link" href="#" @click.prevent="emitPages(pages.current_page - 1)"
          >Previous</a></li>
        <li class="page-item" v-for="i in pages.total_pages" :key="i"
        :class="{ 'active': pages.current_page === i}">
          <a class="page-link" href="#" @click.prevent="emitPages(i)">{{i}}</a></li>
        <li class="page-item" :class="{'disabled': pages.current_page === pages.total_pages}">
          <a class="page-link" href="#" @click.prevent="emitPages(pages.current_page + 1)">
          Next</a></li>
      </ul>
    </nav>
  </div>
</template>
<style lang="scss">
@import "~@/assets/main";

.page-item{
  .page-link{
    color: $dark;
  }
  border: 1px solid $dark;
}
li.page-item.active{
  .page-link{
    background-color: $dark;
    border-color: $dark;
  }
}

</style>
<script>
export default {
  name: 'Pagination',
  props: ['pages'],
  methods: {
    emitPages(i) {
      this.$emit('emit-pages', i);
    },
  },
};
</script>
