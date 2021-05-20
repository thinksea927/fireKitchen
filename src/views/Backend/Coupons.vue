<template>
  <div class="container pt-5">
    <loading :active.sync="isLoading"/>
    <h3 class="text-dark mb-0">優惠券列表管理</h3>
    <div class="text-right">
      <button class="btn btn-dark" @click="openModal('new')">+ 新增優惠券</button>
    </div>
    <table class="table border border-dark table-hover mt-3">
      <thead class="bg-dark text-white rounded-sm">
        <tr class="text-center">
          <th class="font-weight-light">名稱</th>
          <th class="font-weight-light">折扣百分比</th>
          <th class="font-weight-light">優惠碼</th>
          <th class="font-weight-light">到期日</th>
          <th class="font-weight-light">是否啟用</th>
          <th class="font-weight-light">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in couponsList" :key="item.id">
          <td class="text-center">{{ item.title }}</td>
          <td class="text-center">{{ item.percent }}</td>
          <td class="text-center">{{ item.code }}</td>
          <td class="text-center">{{ item.deadline.datetime }}</td>
          <td>
            <span class="text-success" v-if="item.enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-dark btn-sm"
              @click="openModal('edit', item)">編輯</button>
              <button class="btn btn-outline-secondary btn-sm"
              @click="openModal('delete', item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <pagination :pages="pagination" @emit-pages="getCoupons"></pagination>
    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="modalLabel"><span>建立優惠券</span></h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group text-left">
                  <label for="couponName">優惠券名稱</label>
                  <input
                    class="form-control"
                    id="couponName"
                    v-model="tempCoupon.title"
                    type="text"
                    placeholder="請輸入優惠券名稱"
                  />
                </div>
                <div class="form-group text-left">
                  <label for="couponCode">優惠碼</label>
                  <input
                    class="form-control"
                    id="couponCode"
                    v-model="tempCoupon.code"
                    type="text"
                    placeholder="請輸入優惠碼"
                  />
                </div>
                <div class="form-group text-left">
                  <label for="conponDeadline">到期日</label>
                  <input class="form-control" id="conponDeadline" v-model="due_date" type="date" />
                </div>
                <div class="form-group text-left">
                  <label for="couponDeadlineTime">到期時間</label>
                  <input
                    class="form-control"
                    id="couponDeadlineTime"
                    v-model="due_time"
                    type="time"
                    step="1"
                  />
                </div>
                <div class="form-group text-left">
                  <label for="couponDiscount">折扣百分比</label>
                  <input
                    class="form-control"
                    id="couponDiscount"
                    v-model="tempCoupon.percent"
                    type="number"
                    placeholder="請輸入折扣百分比"
                  />
                </div>
                <div class="form-group text-left"></div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    id="is_enabled"
                    v-model="tempCoupon.enabled"
                    type="checkbox"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-dark" type="button" data-dismiss="modal">
              取消</button
            ><button class="btn btn-dark" type="button" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delmodalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="delmodalLabel"><span>刪除優惠券</span></h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除<strong class="text-danger">{{ tempCoupon.title }}</strong>
            優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" type="button" data-dismiss="modal">
              取消</button
            ><button class="btn btn-danger" type="button" @click="delCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global $ */
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      couponsList: [],
      pagination: {},
      isLoading: false,
      tempCoupon: {
        title: '',
        percent: 50,
        deadline_at: 0,
        code: '',
      },
      due_date: '',
      due_time: '',
    };
  },
  methods: {
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempCoupon = {};
          $('#couponModal').modal('show');
          break;
        case 'edit': {
          this.tempCoupon = { ...item };
          // 使用 split 切割相關時間戳，返回陣列
          const deadlineAt = this.tempCoupon.deadline.datetime.split(' ');
          console.log(deadlineAt);
          [this.due_date, this.due_time] = deadlineAt;
          console.log(this.due_date);
          $('#couponModal').modal('show');
          break;
        }
        case 'delete':
          this.tempCoupon = { ...item };
          $('#delCouponModal').modal('show');
          break;
        default:
          break;
      }
    },
    updateCoupon() {
      this.isLoading = true;
      // 重組，因為要符合API規定
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
      if (this.tempCoupon.id) {
        this.couponsList.forEach((item) => {
          if (item.id === this.tempCoupon.id) {
            const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${item.id}`;
            this.$http.patch(api, this.tempCoupon)
              .then(() => {
                this.getCoupons();
                this.$bus.$emit('toast-message', '已成功更新優惠券', 'black');
                this.isLoading = false;
              })
              .catch((err) => {
                this.isLoading = false;
                this.$bus.$emit('toast-message', `更新優惠券失敗喔!${err}`, 'danger');
              });
          }
        });
      } else {
        const id = new Date().getTime();
        const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
        this.tempCoupon.id = id;
        if (this.tempCoupon.enabled === undefined) { this.tempCoupon.enabled = false; }
        this.$http.post(api, this.tempCoupon)
          .then(() => {
            this.getCoupons();
            this.isLoading = false;
            this.$bus.$emit('toast-message', '已成功新增優惠券', 'black');
          })
          .catch((err) => {
            this.isLoading = false;
            this.$bus.$emit('toast-message', `新增優惠券失敗喔!${err}`, 'info');
          });
      }
      this.due_date = {};
      this.due_time = {};
      $('#couponModal').modal('hide');
    },
    getCoupons(num = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${num}`;
      this.axios.get(api)
        .then((res) => {
          this.couponsList = res.data.data ?? [];
          this.pagination = res.data.meta.pagination ?? {};
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `取得優惠券失敗喔!${err}`, 'info');
        });
    },
    delCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;
      this.axios.delete(api)
        .then(() => {
          this.getCoupons();
          this.isLoading = false;
          this.$bus.$emit('toast-message', '已成功刪除', 'black');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `刪除失敗喔!${err}`, 'info');
        });
      $('#delCouponModal').modal('hide');
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
