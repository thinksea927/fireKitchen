<template>
  <footer class="footer footer-img pt-3 pb-3">
    <div class="container font-weight-light text-center">
      <img src="~@/assets/images/logo-text.png" class="fire-logo-footer" alt="" />
      <h5 class="font-jose font-weight-light text-dark">Original Taste, Original Flavor</h5>
      <div class="d-flex justify-content-center align-items-center mt-3">
          <a href="#" class="pl-2 pr-2">
            <i class="fab fa-facebook-square social-media"></i>
          </a>
          <a href="#" class="pl-2 pr-2">
            <i class="fab fa-instagram-square social-media"></i>
          </a>
          <a href="#" class="pl-2 pr-2">
            <i class="fab fa-twitter-square social-media"></i>
          </a>
        </div>
        <ul class="mt-3">
          <li class="text-dark pb-1">
            <i class="fas fa-thumbtack"></i>
            <span class="ml-2 mb-0">台北市信義區信義路100號</span>
          </li>
          <li class="text-dark pb-1">
            <i class="fas fa-mobile-alt"></i>
            <span class="ml-2 mb-0">02 223 224 225 (營業時間 11:00 ~ 21:00)</span>
          </li>
          <li class="text-dark pb-1">
            <i class="fas fa-envelope-open"></i>
            <span class="ml-2 mb-0">firekitchen@gmails.com</span>
          </li>
        </ul>
        <p class="text-center text-light copyright font-jose mt-3">
            Copyright © 2020 Fire Kitchen. All rights reserved.
        </p>
    </div>
  </footer>
</template>
<style lang="scss">
@import "~@/assets/main";
.footer {
  margin-top: auto;
}
.fire-logo-footer{
  height: 3rem;
}
.footer-img {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)),
    url("~@/assets/images/footer-img2.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center 15rem;
}
footer ul {
  list-style: none;
  padding: 0;
}
.social-media {
  font-size: 2rem;
  color: $dark;
  transition: all 0.5s;
  &:hover {
    color: $primary;
  }
}
.copyright{
  color: rgba(255, 255, 255, 0.5)
}
</style>
