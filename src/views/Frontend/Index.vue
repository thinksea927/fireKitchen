<template>
  <div class="home">
    <header class="header index-header">
    <loading :active.sync="isLoading"></loading>
      <div class="container">
        <div class="header-title text-white">
          <!-- <span class="position-absolute callout bg-warning p-1">全台首家</span> -->
          <h1 class="display-1 font-noto font-weight-bold">低碳早午餐</h1>
          <h3 class="px-1 font-noto">
            直火烹飪的感動，鎖住新鮮食材的高級美味</h3>
          <h5 class="font-weight-light">減肥不再只是雞胸肉沙拉，低碳不用再控制你的嘴巴</h5>
        </div>
        <router-link to="/products" class="header-button btn btn-info btn-lg mt-5 pl-4 pr-4">
        看菜單</router-link>
      </div>
    </header>
    <main>
      <section class="newest position-relative py-5">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="new-img"></div>
            </div>
            <div class="col-12 col-md-6 d-flex flex-column justify-content-center mt-5 mt-md-0 ">
              <h3 class="h3 underline mb-0 pb-1">最新推出
                <span class="font-jose">Newest</span></h3>
              <div class="d-flex align-items-center mt-3">
                <span class="h5 mb-0 mr-1 text-info">新品上市 </span>
                <span class="badge badge-info">生酮可</span>
              </div>
              <h4 class="font-noto font-weight-bold">碳烤厚牛肉無澱粉漢堡</h4>
              <p class="font-weight-light">
                我們採用日本研發出的低醣高纖專用粉來製作漢堡皮，中間夾用一貫擅長的直火碳烤方式處理的牛排，佐以生菜及特製醬料，希望給正在低碳飲食的大家也可以吃到漢堡的感動！
              </p>
              <span class="h4 text-info p-1">NT$ 290</span>
              <router-link :to="`/product/${newProducts[0].id}`"
              class="btn btn-info w-50">立即點餐</router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- 熱賣推薦 -->
      <section class="hot text-center py-5">
        <div class="container">
          <h3 class="h3 mb-0">熱賣推薦
            <span class="font-jose">Special Offers</span></h3>
          <hr class="line" />
          <p class="mt-3">精選每週熱賣的三樣餐點推薦給您，立即享受美食不用等</p>
          <div class="row">
            <div class="col-12 col-md-6 col-lg-4"
              v-for="item in randomProducts" :key="item.id + 1">
              <div class="hot-img text-left rounded-lg"
              :style= "{backgroundImage:`url('${item.imageUrl[0]}')`}"
              style="height: 300px;
              background-size: cover;
              background-position: center">
              </div>
              <div class="card pb-3">
                <div class="card-body">
                  <h4 class="font-noto font-weight-bold">
                    {{ item.title }}
                  </h4>
                </div>
                <del class="text-muted">
                  <small>NT$ {{ item.origin_price | currency }}</small>
                </del>
                <span class="text-danger font-weight-bold pb-3">
                熱賣特價：NT$ {{ item.price | currency}}</span>
              </div>
              <router-link :to="`/product/${item.id}`" class="btn btn-primary pointer px-5">
                  立即點餐</router-link>
              <!-- <button type="button" class="btn btn-primary px-5">立即點餐</button> -->
            </div>
          </div>
        </div>
      </section>
      <!-- 主廚介紹 -->
      <section class="chef position-relative pt-3">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6 d-flex flex-column justify-content-center">
              <span class="text-center text-white">Chef</span>
              <h3 class="font-jose text-white text-center pb-1">Antony J. Burner</h3>
              <span class="text-white">
                因能精準掌握每個食材的火侯，且喜愛以大火烹飪，每次客人看他料理都是一種享受，所以大家又稱他為
                <span class="font-jose">Fire Antony</span></span>
              <ul class="mt-3">
                <li class="text-white font-weight-lighter">
                  2001年，Antony
                  餐廳被《倫敦薩加特美食指南》評選為「英國頂級餐廳」，同時也獲得了第三顆米其林之星
                </li>
                <li class="text-white font-weight-lighter">
                  2006年 Antony 被伊莉莎白二世授予大英帝國勳章中的官佐勳章
                </li>
                <li class="text-white font-weight-lighter">
                  2010年9月，Antony 獲得「英國餐飲業年度最有影響力的人物」稱號。
                </li>
              </ul>
            </div>
            <div class="col-12 col-md-6 d-flex align-items-center">
              <!-- <img src="/assets/images/antony2.png" class="antony-img" alt="" /> -->
              <div class="chef-img">
                <img src="../../assets/images/chef.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 食材履歷 -->
      <div class="resume bg-light-1 py-5">
        <div class="container py-5">
          <div class="row">
            <div class="col-4 text-center">
              <i class="fas fa-grin-wink"></i>
              <p class="mt-3">我們的團隊</p>
              <hr class="border-dark">
              <h5 class="font-noto font-weight-bold text-dark">合作超過 5 年</h5>
              <p>團隊已合作超過五年，每個人都在愉快的環境中烹飪。</p>
            </div>
            <div class="col-4 text-center">
              <i class="fas fa-pepper-hot"></i>
              <p class="mt-3">我們的食材</p>
              <hr class="border-dark">
              <h5 class="font-noto font-weight-bold text-dark">主廚親自挑選</h5>
              <p>與台灣小農與世界各地合作的食材與香料，順應自然，採用當令食材。</p>
            </div>
            <div class="col-4 text-center">
              <i class="fas fa-hand-holding-heart"></i>
              <p class="mt-3">我們的價值</p>
              <hr class="border-dark">
              <h5 class="font-noto font-weight-bold text-dark">人類與地球和平健康</h5>
              <p>我們倡導健康飲食、地球友善。</p>
            </div>
          </div>
        </div>
      </div>
      <!-- full-width banner -->
      <section class="banner py-1">
        <div class="container py-3">
          <div
            class="border border-0 text-white bg-info-5
          text-center pt-2 pb-2 rounded-lg w-100"
          >
            <i class="fas fa-comment-dollar"></i>
            最新折扣：本月推廣「168斷食」，輸入折扣碼「ilove168」，優先享有打八折優惠（限外帶訂單）。
          </div>
          <p class="font-noto pt-3 text-white">
            <span class="h4 font-noto font-weight-bold">您的168斷食就交給我們了！</span>
            我們每樣餐點都精心設計搭配過，採用優良蛋白質、新鮮蔬果及天然的調味料，您在這可以找到適合您的「低碳」或是「生酮」餐點，
            尤其適合正在實行168斷食，斷食後的第一餐很重要，您不用煩惱如何配餐，我們直接提供給您輕盈美味且營養滿滿的一餐。
          </p>
          <router-link to="/products" class="d-flex justify-content-center pt-3">
            <div class="btn btn-info">馬上點餐</div>
          </router-link>
        </div>
      </section>
      <!-- 顧客推薦 -->
      <!-- <testmonial/> -->
      <div class="customer bg-primary-1">
        <div class="container d-flex">
          <div class="row py-xl-5">
            <div class="col-12 col-sm-6 col-xl-3 mb-3 mb-xl-0 pointer">
              <div class="customer-text">
                <i class="fas fa-quote-left"></i>
                <p class="font-weight-light">
                  我是肉食主義者，這是朋友介紹我去吃的，吃的出來肉都是有精心挑選過的，且烹調的非常軟嫩多汁，人很多，可能需要排隊。
                </p>
              </div>
              <div class="customer-img"></div>
              <p class="text-center mb-1">陳小姐</p>
              <div class="star-group text-center">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-3 mb-3 mb-xl-0 pointer">
              <div class="customer-text">
                <i class="fas fa-quote-left"></i>
                <p class="font-weight-light">
                  餐廳在我公司旁邊而已，很有健康飲食概念，主廚很帥，我常招待我的歐美客人用餐，客人都很滿意，是我的第一首選。
                </p>
              </div>
              <div class="customer-img"></div>
              <p class="text-center mb-1">Jonathan</p>
              <div class="star-group text-center">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-3 mb-3 mb-xl-0 pointer">
              <div class="customer-text">
                <i class="fas fa-quote-left"></i>
                <p class="font-weight-light">
                  我很喜歡吃速食，這邊居然有低碳水的漢堡麵包，再搭配零卡可樂，真的很滿足！
                </p>
              </div>
              <div class="customer-img"></div>
              <p class="text-center mb-1">Beyonce M.</p>
              <div class="star-group text-center">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-3 mb-3 mb-xl-0 pointer">
              <div class="customer-text">
                <i class="fas fa-quote-left"></i>
                <p class="font-weight-light">
                  健身的好朋友！每道菜都很健康又營養，其他店家的低熱量便當都不好吃，所以在我生酮或是168飲食的時候，中午都會選擇吃這家！
                </p>
              </div>
              <div class="customer-img"></div>
              <p class="text-center mb-1">小武</p>
              <div class="star-group text-center">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
$dark: #b18000;
$info: #ca001d;
$primary: #fcbf02;

.underline {
  border-bottom: 3px solid $primary;
  width: 50%;
}
.line {
  border: 0;
  height: 1px;
  background: $dark;
  width: 50%;
}
.circle-img {
  width: 5rem;
  height: 5rem;
}
.header.index-header {
  background-image: linear-gradient(rgba(1, 1, 1, 0.5), rgba(0, 0, 0, 0.5)),
    url("~@/assets/images/index-banner.jpg");
  background-position: center center;
  background-size: cover;
  height: 58vh;
  display: flex;
  align-items: center;
  position: relative;
}

footer .fire-logo {
  height: 120px;
}
.callout {
  transform: translateY(-100%) rotate(-30deg);
}
main{
  overflow: hidden;
}
.newest::after {
  content: "";
  position: absolute;
  clip-path: polygon(100% 14%, 100% 42%, 0 61%, 0 3%);
  background: #fcbf0280;
  display: inline-block;
  top: 45%;
  height: 500px;
  width: 100%;
  z-index: -1;
}
.new-img {
  background: url("~@/assets/images/hamburger.jpg") center center no-repeat;
  background-size: cover;
  height: 400px;
  border-radius: 1rem;
  box-shadow: 1px 1px 15px 5px rgba(0, 0, 0, 0.3);
}
.chef::after {
  content: "";
  clip-path: polygon(100% 0%, 100% 90%, 0 90%, 0 13%);
  background: black;
  background-size: 30%;
  display: inline-block;
  position: absolute;
  top: -25px;
  height: 506px;
  width: 100%;
  z-index: -1;
}
.chef-img{
  width: 100%;
  img{
    width: 100%;
    display: block;
  }
}

@media screen and (max-width: 1200px){
  .chef::after{
    height: 434px;
    top: -30px;
  }
}
@media screen and (max-width: 768px){
  .chef::after{
    height: 610px;
    top: -30px;
  }
  .chef-img{
    img{
      width: 60%;
      margin: 0 auto;
    }
  }
}
@media screen and (max-width: 576px){
  .chef::after{
    display: none;
  }
  .chef .row{
    background: #000;
    padding: 1rem 0 1rem 0;
  }
}
.banner {
  background-image: linear-gradient(rgba(138, 104, 86, 0.8), rgba(0, 0, 0, 0.5)),
    url("~@/assets/images/banner.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
}

.hot {
  margin: 5rem 0 5rem 0;
}
.hot a {
  text-decoration: none;
  color: initial;
}
.hot-img {
  height: 300px;
  transform: scale(1.05) translateY(1rem);
  transition: all 0.8s;
}
.hot .card {
  transition: all 0.5s 0.2s;
}
.hot{
  .btn {
    transform: translateY(-1rem);
  }
}
.hot .col-12:hover {
  .hot-img {
    transform: scale(1.07) translateY(0rem);
  }
  .card {
    transform: translateY(-0.5rem);
  }
  .btn {
    box-shadow: 1px 1px 5px 5px $primary;
  }
}
.hot .card:hover {
  .more {
    opacity: 1;
  }
  .card-hover::after {
    opacity: 1;
  }
}
.more {
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  border-radius: 99rem;
  border: 3px solid white;
  padding: 1rem;
  background: #000;
  z-index: 1;
  transition: 0.8s;
}
.card-hover:after {
  opacity: 0;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.8s;
}
.antony-img {
  position: absolute;
  width: 25rem;
  top: 2%;
  left: 67%;
}
.resume i.fas {
  color: $dark;
  font-size: 2rem;
}

.customer {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.customer .container .row .col-12:nth-child(1){
  .customer-img{
    background: url("~@/assets/images/person1.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    height: 100px;
    width: 100px;
    border-radius: 99rem;
    margin: 0 auto;
    margin-top: -3rem;
    box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.1);
    // filter:grayscale(1);
  }
}

.customer .container .row .col-12:nth-child(2){
  .customer-img{
    background: url("~@/assets/images/person2.jpg") no-repeat;
    background-size: cover;
    background-position: center -10px;
    height: 100px;
    width: 100px;
    border-radius: 99rem;
    margin: 0 auto;
    margin-top: -3rem;
    box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.1);
  }
}
.customer .container .row .col-12:nth-child(3){
  .customer-img{
    background: url("~@/assets/images/person3.jpg") no-repeat;
    background-size: cover;
    background-position: center;
    height: 100px;
    width: 100px;
    border-radius: 99rem;
    margin: 0 auto;
    margin-top: -3rem;
    box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.1);
  }
}
.customer .container .row .col-12:nth-child(4){
  .customer-img{
    background: url("~@/assets/images/person4.jpg") no-repeat;
    background-size: cover;
    background-position: center -10px;
    height: 100px;
    width: 100px;
    border-radius: 99rem;
    margin: 0 auto;
    margin-top: -3rem;
    box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.1);
  }
}

.customer-text {
  background: rgba(255, 255, 255, 1);
  padding: 3rem;
  border-radius: 1rem;
  min-height: 18rem;
}
@media screen and (max-width: 1200px){
  .customer-text{
    min-height: 15rem;
  }
}
@media screen and (max-width: 768px){
  .customer-text{
    min-height: 18rem;
  }
}
@media screen and (max-width: 576px){
  .customer-text{
    min-height: 10rem;
  }
}
.customer-text .fa-quote-left {
  font-size: 3rem;
  color: white;
  width: 100%;
  position: absolute;
  transform: translate(-2rem, -5rem);
  opacity: 0;
}
.star-group {
  color: $primary;
  font-size: 0.8rem;
}
.customer .col-12,
.customer-text,
.fa-quote-left {
  transition: all 0.5s;
}
.fa-quote-left {
  transition: all 0.5s 0.2s;
}
.customer .container .row .col-12:hover {
  transform: scale(1.1);
  // .customer-img{
    // filter: grayscale(0);
  // }
  .customer-text {
    background: rgba(252, 191, 2, 0.5);
  }
  .fa-quote-left {
    opacity: 1;
  }
}
</style>
<script>
export default {
  data() {
    return {
      isLoading: false,
      products: [],
      randomProducts: [],
      newProducts: [
        {
          id: '',
        },
      ],
      newTitle: '碳烤厚牛肉無澱粉漢堡',
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`;
      this.isLoading = true;
      this.axios.get(api)
        .then((res) => {
          this.products = res.data.data ?? [];
          this.newProducts = this.products.filter((item) => item.title === this.newTitle);
          this.getRandom();
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          this.$bus.$emit('toast-message', `${err.response.data.errors}`, 'danger');
        });
    },
    getRandom() {
      for (let i = 0; i < 3; i += 1) {
        const idx = Math.floor(Math.random() * this.products.length);
        this.randomProducts.push(this.products[idx]);
        this.products.splice(idx, 1);
      }
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
