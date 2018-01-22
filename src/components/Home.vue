<style>
  #Home .comment-header .el-menu--horizontal {
    border-bottom: 0px;
  }

  #Home .comment-Body {
    position: relative;
    color: #fff;
    height: 700px;
    background: linear-gradient(45deg, rgb(36, 41, 46) 0, rgba(52, 192, 227, 1) 100%);
  }

  #Home .comment-Body .container {
    text-align: center;
    height: 100%;
    top: 200px;
    width: 270px;
    position: absolute;
    left: calc(50% - 135px);
  }

  #Home .comment-Body::after {
    background: url('../assets/home-back-image.png') repeat center center;
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: .4;
  }

  #Home .comment-Body .container .btn-shadow {
    padding: 10px 20px;
    background-color: rgb(52, 192, 227);
    box-shadow: inset 0 -4px 0 rgb(44, 148, 173);
    border-radius: 4px;
    border: 0;
    font-size: 18px;
    color: #fff;
  }

  #Home .comment-Body .container .btn-text {
    color: #909399;
  }

</style>
<template>
  <div id="Home">
    <common-header activeIndex="/"></common-header>
    <div class="comment-Body">
      <div class="container">
        <h1>宝儿后台管理系统</h1>
        <h2>更简洁、更直观、更迅捷</h2>
        <p>
          <a class="btn-shadow">宝儿v2管理系统</a>
        </p>
        <li style="list-style:none;">
          <a class="btn-text" href="http://www.alibaba.com">宝儿v1管理系统</a>
        </li>
      </div>
    </div>
    <commonFooter></commonFooter>
  </div>
</template>
<script>
  import commonHeader from "./common/Header.vue";
  import commonFooter from './common/Footer.vue';
  export default {
    components: {
      commonHeader,
      commonFooter
    },
    name: "Home",
    data() {
      return {};
    },
    created() {},
  };

</script>
