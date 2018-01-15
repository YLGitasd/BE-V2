<style>
.comment-header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
}
</style>

<template>
  <div class="comment-header">
    <el-menu  background-color="#24292E" text-color="#fff" active-text-color="#34c0e3" mode="horizontal"
             :default-active="activeIndex" :router="true" @select="handleSelect">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="fullviews">全景洞察</el-menu-item>
      <el-menu-item index="product">类目趋势</el-menu-item>
      <el-menu-item index="world">行业热词榜</el-menu-item>
      <el-menu-item index="property">属性洞察</el-menu-item>
      <el-menu-item index="property-deal">生e经</el-menu-item>
      <el-menu-item index="weekport">文件夹</el-menu-item>
      <el-menu-item index="tool-box">工具箱</el-menu-item>
      <el-menu-item index="user" style="positon:absolute;right:10px;">用户</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    activeIndex: {
      type: String,
      default: "/"
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      // this.$store.commit('CLICK_MENU',{name:})
    }
  }
};
</script>
