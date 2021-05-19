<template>
  <div class="toasts-show">
    <div class="toast-custom show fade" role="alert" v-for="(item, i) in messages"
    :id="`toast-${i}`" :key="i"
    aria-live="assertive" aria-atomic="true">
      <!-- <div class="toast-header align-items-center" :class="`bg-${ item.status }`"> -->
      <div class="toast-custom-header">
        <button type="button" class="btn close-custom d-block ml-auto p-0 pr-1"
        @click="closeToast(`toast-${i}`)"
          data-dismiss="toast" aria-label="Close" :class="`text-${ item.status }`">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="toast-body pt-1 pb-3 text-center" :class="`text-${ item.status }`">
        {{ item.message }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.toasts-show{
  position: fixed;
  top: 1rem;
  right: 1rem;
  min-width: 15rem;
  z-index: 11000;
  backdrop-filter: blur(5px);
}
.toast-custom{
  background-color: #fcbf021c;
  border-radius: 0.5rem;
}

</style>

<script>
/* global $ */
export default {
  data() {
    return {
      messages: [],
    };
  },
  created() {
    const vm = this;
    this.$bus.$on('toast-message', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 3000);
    },
    closeToast(el) {
      $(`#${el}`).toast('hide');
    },
  },
};
</script>
