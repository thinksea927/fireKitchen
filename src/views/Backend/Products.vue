<template>
  <div class="container pt-5">
    <loading :active.sync="isLoading"/>
    <h3 class="text-dark mb-0">產品列表管理</h3>
    <div class="text-right">
      <button class="btn btn-dark" @click="openModal('new')">+ 新增產品</button>
    </div>
    <table class="table border border-dark table-hover mt-3">
      <thead class="bg-dark text-black rounded-sm">
        <tr class="text-center">
          <th class="font-weight-light">分類</th>
          <th class="font-weight-light">產品名稱</th>
          <th class="font-weight-light">原價</th>
          <th class="font-weight-light">售價</th>
          <th class="font-weight-light">是否啟用</th>
          <th class="font-weight-light">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="text-center">{{ item.category }}</td>
          <td class="text-center">{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td class="text-center">
            <span class="text-success" v-if="item.enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-outline-dark btn-sm" @click="openModal('edit', item)">
                編輯</button
              ><button class="btn btn-outline-secondary btn-sm" @click="openModal('delete', item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!--  pagination-->
    <pagination :pages="pagination" @emit-pages="getProducts"/>
    <!--  Modal-->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-black">
            <h5 class="modal-title" id="modalLabel"><span>新增產品</span></h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <h6>圖片<small class="text-info">(至少1張)</small></h6>
                <div class="form-group" v-for="i in 5" :key="i">
                  <label :for="`image${i}`">輸入圖片 {{i}} 網址</label
                  ><input
                    class="form-control imageUrl"
                    :id="`image${i}`"
                    type="text"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl[i - 1]"
                  /><img class="img-fluid" />
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片</label
                  ><input
                    class="form-control"
                    id="customFile"
                    type="file"
                    ref="file"
                    @change="uploadFile"
                  /><img class="img-fluid" alt="alt" :src="tempProduct.imageUrl[0]"
                  v-if="tempProduct.imageUrl[0]"/>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title"><small class="text-info">*</small>標題</label
                  >
                  <input
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    placeholder="請輸入標題"
                    required
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category"><small class="text-info">*</small>分類</label
                    ><input
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label
                    ><input
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      type="unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price"><small class="text-info">*</small>原價</label
                    ><input
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      type="number"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price"><small class="text-info">*</small>售價</label
                    ><input
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      type="number"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <label for="content"><small class="text-info">*</small>說明內容</label
                  ><textarea
                    class="form-control"
                    id="description"
                    v-model="tempProduct.content"
                    type="text"
                    placeholder="請輸入說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="description"><small class="text-info">*</small>產品描述</label
                  ><textarea
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    type="text"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      id="is_enabled"
                      v-model="tempProduct.enabled"
                      type="checkbox"
                    /><label class="form-check-label" for="is_enabled">
                      <small class="text-info">*</small>是否啟用
                    </label>
                  </div>
                </div>
                <div class="form-group"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-dark" type="button" data-dismiss="modal">
              取消</button
            ><button class="btn btn-dark" type="button" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delmodalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-info text-black">
            <h5 class="modal-title" id="delmodalLabel"><span>刪除產品</span></h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除<strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-secondary" type="button" data-dismiss="modal">
              取消</button
            ><button class="btn btn-danger" type="button" @click="delProduct">確認刪除</button>
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
      products: [],
      tempProduct: {
        imageUrl: [],
      },
      pagination: {},
      isNew: false,
      isLoading: false,
    };
  },
  props: ['token'],
  methods: {
    getProduct(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;
      this.axios.get(api)
        .then((res) => {
          this.tempProduct = res.data.data ?? {};
          this.isLoading = false;
          // Vue loading overlay doesn't allow it to have focusable el. that's
          // why we need to move modal('show') here
          $('#productModal').modal('show');
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'info');
        });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {
            imageUrl: [],
          };
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.getProduct(item.id);
          break;
        case 'delete':
          this.tempProduct = { ...item };
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },
    updateProduct() {
      if (this.tempProduct.id) {
        this.isLoading = true;
        this.products.forEach((item) => {
          if (item.id === this.tempProduct.id) {
            const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
            this.axios.patch(api, this.tempProduct)
              .then(() => {
                this.getProducts();
                this.isLoading = false;
                this.$bus.$emit('toast-message', '更新產品成功', 'black');
              })
              .catch((err) => {
                this.isLoading = false;
                this.$bus.$emit('toast-message', `更新產品失敗喔!${err}`, 'info');
              });
          }
        });
      } else {
        this.isLoading = true;
        const id = new Date().getTime();
        const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product`;
        this.tempProduct.id = id;
        this.axios.post(api, this.tempProduct)
          .then(() => {
            this.getProducts();
            this.isLoading = false;
            this.$bus.$emit('toast-message', '建立新產品成功', 'black');
          })
          .catch((err) => {
            this.isLoading = false;
            this.$bus.$emit('toast-message', `建立產品失敗喔!${err}`, 'info');
          });
      }
      $('#productModal').modal('hide');
    },
    delProduct() {
      if (this.tempProduct.id) {
        this.isLoading = true;
        this.products.forEach((item) => {
          if (item.id === this.tempProduct.id) {
            const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
            this.axios.delete(api)
              .then(() => {
                this.getProducts();
                this.isLoading = false;
                this.$bus.$emit('toast-message', '刪除產品成功', 'black');
              })
              .catch((err) => {
                this.isLoading = false;
                this.$bus.$emit('toast-message', `刪除產品失敗喔!${err}`, 'info');
              });
          }
        });
      } else {
        this.$bus.$emit('toast-message', '取不到產品id，請回報', 'info');
      }
      $('#delProductModal').modal('hide');
    },
    getProducts(num = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${num}`;
      this.axios.get(api)
        .then((res) => {
          this.products = res.data.data ?? [];
          this.pagination = res.data.meta.pagination ?? {};
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'info');
        });
    },
    uploadFile() {
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();

      // 用append的方式把欄位加進表單中
      formData.append('file', uploadedFile);
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`;
      this.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        if (res.status === 200) {
          this.tempProduct.imageUrl.push(res.data.data.path);
        }
        this.$bus.$emit('toast-message', '新增圖片成功', 'black');
      }).catch((err) => {
        this.$bus.$emit('toast-message', `新增圖片失敗喔!${err}`, 'info');
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
