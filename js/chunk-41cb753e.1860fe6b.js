(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-41cb753e"],{"686c":function(t,e,a){},6991:function(t,e,a){"use strict";a("686c")},8994:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"products"},[a("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),t._m(0),a("main",[a("div",{staticClass:"hot-sale d-flex align-items-center text-center "},[a("div",{staticClass:"container"},[a("div",{staticClass:"blur text-white d-inline-block p-3 p-md-5 border border-dark"},[a("span",{staticClass:"h3 bg-info rounded-lg px-5"},[t._v("好評熱賣中")]),a("h2",{staticClass:"font-noto font-weight-bold mt-3"},[t._v("鮮蔬沙拉碗每日現貨供應")]),a("h5",{staticClass:"font-weight-light"},[t._v("嚴選當季產蔬菜，每日新鮮配送")]),t._m(1),a("h4",{staticClass:"p-1 m-0"},[t._v("NT$80")]),a("button",{staticClass:"btn btn-primary mt-3 px-5",attrs:{type:"button",disabled:t.status.loadingItem===t.hotsaleProduct},on:{click:function(e){return e.preventDefault(),t.addToCart(t.hotsaleProduct)}}},[t._v("加入購物車")])])])]),a("div",{staticClass:"menu bg-light-1 pt-5 pb-5"},[a("div",{staticClass:"container text-center"},[t._m(2),a("ul",{staticClass:"nav nav-pills mb-3 justify-content-center"},[a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link mx-3 active",attrs:{id:"pills-all-tab","data-toggle":"pill",href:"#pills-all",role:"tab","aria-controls":"pills-all","aria-selected":"true"},on:{click:function(e){return e.preventDefault(),t.toFilter(t.type="all")}}},[t._v("全部餐點")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link mx-3",attrs:{id:"pills-beef-tab","data-toggle":"pill",href:"#pills-beef",role:"tab","aria-controls":"pills-beef","aria-selected":"false"},on:{click:function(e){return e.preventDefault(),t.toFilter(t.type="beef")}}},[t._v("牛肉")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link mx-3",attrs:{id:"pills-chicken-tab","data-toggle":"pill",href:"#pills-chicken",role:"tab","aria-controls":"pills-chicken","aria-selected":"false"},on:{click:function(e){return e.preventDefault(),t.toFilter(t.type="chicken")}}},[t._v("雞肉")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link mx-3",attrs:{id:"pills-fish-tab","data-toggle":"pill",href:"#pills-fish",role:"tab","aria-controls":"pills-fish","aria-selected":"false"},on:{click:function(e){return e.preventDefault(),t.toFilter(t.type="fish")}}},[t._v("海鮮")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link mx-3",attrs:{id:"pills-others-tab","data-toggle":"pill",href:"#pills-others",role:"tab","aria-controls":"pills-others","aria-selected":"false"},on:{click:function(e){return e.preventDefault(),t.toFilter(t.type="others")}}},[t._v("其他")])]),a("li",{staticClass:"nav-item"},[a("a",{staticClass:"nav-link mx-3",attrs:{id:"pills-alacarte-tab","data-toggle":"pill",href:"#pills-alacarte",role:"tab","aria-controls":"pills-alacarte","aria-selected":"false"},on:{click:function(e){return e.preventDefault(),t.toFilter(t.type="alacarte")}}},[t._v("單點")])])]),a("div",{staticClass:"row"},t._l(t.typeProducts,(function(e){return a("div",{key:e.id,staticClass:"col-12 col-md-6 col-lg-4 my-3"},[a("div",{staticClass:"card"},[a("div",{staticClass:"text-left rounded-top",staticStyle:{height:"300px","background-size":"cover","background-position":"center"},style:{backgroundImage:"url('"+e.imageUrl[0]+"')"}}),a("div",{staticClass:"card-body"},[a("h4",{staticClass:"font-noto font-weight-bold"},[t._v(" "+t._s(e.title)+" ")])]),a("del",{staticClass:"text-muted"},[a("small",[t._v("原價NT$ "+t._s(t._f("currency")(e.origin_price)))])]),a("span",{staticClass:"text-info font-weight-bold pb-3"},[t._v(" 特價：NT$ "+t._s(t._f("currency")(e.price)))]),a("div",{staticClass:"bg-black d-flex justify-content-around rounded-bottom py-3"},[a("router-link",{staticClass:"btn btn-outline-light",attrs:{to:"/product/"+e.id}},[t._v(" 更多資訊")]),a("button",{staticClass:"btn btn-outline-primary",attrs:{type:"button",disabled:t.status.loadingItem===e.id},on:{click:function(a){return a.preventDefault(),t.addToCart(e.id)}}},[t._v("加入購物車")])],1)])])})),0)])])])],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",{staticClass:"header products-header"},[a("div",{staticClass:"container text-white text-center"},[a("h3",{staticClass:"font-weight-lighter spacing-5"},[t._v(" Experince the taste of")]),a("h3",{staticClass:"d-inline-block bg-white text-dark font-weight-lighter\n      spacing-5 p-2"},[t._v("fire!")]),a("h5",{staticClass:"font-noto font-weight-lighter"},[t._v("火的溫度，火的味道")]),a("h5",{staticClass:"font-noto font-weight-lighter"},[t._v("原始的風味，原本的味道")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"font-weight-lighter"},[t._v("產地：花椰菜-彰化、小黃瓜-雲林、高麗菜-斗六 "),a("br"),t._v(" 蔬菜種類不固定，詳情請見當日餐廳公告 ")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h3",[t._v("美味餐點 "),a("span",{staticClass:"font-jose"},[t._v("Menu")])])}],r=(a("99af"),a("4de4"),{data:function(){return{products:[],type:"",typeProducts:[],isLoading:!0,status:{loadingItem:""},hotsaleProduct:"DM077d33GjHgeajwy7sjb7aDlop4UBOddvm3ml8f1YPJmdKqRxKkJMmc15utYUuU"}},methods:{getProducts:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0;var a="".concat("https://course-ec-api.hexschool.io/api","/").concat("3802fa0c-830d-47a0-a19f-9616c3fcd8ae","/ec/products?page=").concat(e);this.axios.get(a).then((function(e){var a;t.isLoading=!1,t.products=null!==(a=e.data.data)&&void 0!==a?a:[],t.typeProducts=t.products}))},addToCart:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.status.loadingItem=t,this.isLoading=!0;var i="".concat("https://course-ec-api.hexschool.io/api","/").concat("3802fa0c-830d-47a0-a19f-9616c3fcd8ae","/ec/shopping"),s={product:t,quantity:a};this.axios.post(i,s).then((function(){e.status.loadingItem="",e.isLoading=!1,e.$bus.$emit("cartNumbers"),e.$bus.$emit("toast-message","加入購物車成功！","white")})).catch((function(t){e.isLoading=!1,e.$bus.$emit("toast-message","".concat(t.response.data.errors),"info")}))},toFilter:function(){switch(this.type){case"all":this.typeProducts=this.products;break;case"beef":this.typeProducts=this.products.filter((function(t){return"牛肉"===t.category}));break;case"pork":this.typeProducts=this.products.filter((function(t){return"豬肉"===t.category}));break;case"chicken":this.typeProducts=this.products.filter((function(t){return"雞肉"===t.category}));break;case"fish":this.typeProducts=this.products.filter((function(t){return"海鮮"===t.category}));break;case"alacarte":this.typeProducts=this.products.filter((function(t){return"單點"===t.category}));break;case"others":this.typeProducts=this.products.filter((function(t){return"其他"===t.category}));break;default:break}}},created:function(){this.getProducts()}}),n=r,c=(a("6991"),a("2877")),l=Object(c["a"])(n,i,s,!1,null,null,null);e["default"]=l.exports},"99af":function(t,e,a){"use strict";var i=a("23e7"),s=a("d039"),r=a("e8b5"),n=a("861d"),c=a("7b0b"),l=a("50c4"),o=a("8418"),d=a("65f0"),u=a("1dde"),f=a("b622"),p=a("2d00"),h=f("isConcatSpreadable"),v=9007199254740991,g="Maximum allowed index exceeded",b=p>=51||!s((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),m=u("concat"),C=function(t){if(!n(t))return!1;var e=t[h];return void 0!==e?!!e:r(t)},y=!b||!m;i({target:"Array",proto:!0,forced:y},{concat:function(t){var e,a,i,s,r,n=c(this),u=d(n,0),f=0;for(e=-1,i=arguments.length;e<i;e++)if(r=-1===e?n:arguments[e],C(r)){if(s=l(r.length),f+s>v)throw TypeError(g);for(a=0;a<s;a++,f++)a in r&&o(u,f,r[a])}else{if(f>=v)throw TypeError(g);o(u,f++,r)}return u.length=f,u}})}}]);
//# sourceMappingURL=chunk-41cb753e.1860fe6b.js.map