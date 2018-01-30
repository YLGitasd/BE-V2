<style>
  .comment-header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
  }

  .user-picture {
    height: 40px;
    width: 40px;
    position: absolute;
    top:10px;
    border-radius: 50%;
    border: 2px solid rgb(233,30,99);
    right: 60px;
    background: url('../../assets/defaule_logo.png') no-repeat center;
  }
  .user-container{
    left: 1000px;
  }
  .user-info{
    color:#fff;
    height: 30px;
    position: absolute;
    right: 30px;
    top:15px;
  }
  .user-info span{
    font-size: 14px;
    display: inline-block;
    padding: 4px 10px; 
    border-radius:6px;
  }
  .user-log{
    position: absolute;
    right: 50px;
    color:#fff;
    margin: 15px 20px 0 0;
    padding: 5px 10px;
    border-radius:4px;
    text-decoration-line: none;
    background-color: rgb(52, 192, 227);
    box-shadow: inset 0 -2px 0 rgb(44, 148, 173);
  }
  .comment-header .el-submenu .el-menu-item{
    min-width: auto;
  }
</style>

<template>
  <div class="comment-header">
    <el-menu background-color="#24292E" text-color="#fff" menu-trigger="click" active-text-color="#34c0e3" mode="horizontal"
      :default-active="activeIndex" :router="true" @select="handleSelect">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="fullviews" :route="{path: '/fullviews',name:'StoreViews'}">全景洞察</el-menu-item>
      <el-menu-item index="product" :route="{path: '/product',name:'ProductTrend'}">类目趋势</el-menu-item>
      <el-menu-item index="world" :route="{path: '/world',name:'ProductWorld'}">行业热词榜</el-menu-item>
      <el-menu-item index="property" :route="{path: '/property',name:'ProductProperty'}">属性洞察</el-menu-item>
      <el-menu-item index="property-deal" :route="{path: '/property-deal',name:'ProductPropertyDeal'}">生e经</el-menu-item>
      <el-menu-item index="weekport" :route="{path: '/weekport',name:'WeekportTrend'}">文件夹</el-menu-item>
      <el-menu-item index="tool-box" :route="{path: '/tool-box',name:'ToolBox'}">工具箱</el-menu-item>
      <el-submenu  v-if="isLogin" index="user" class="user-container">
        <template slot="title"><span>{{user.name}}</span></template>
        <el-menu-item index="login">添加子用户</el-menu-item>
      </el-submenu>
      <router-link v-else class="user-log" :to="{ name: 'User', params: { type: 'login' }}">登录</router-link>
    </el-menu>
     <div v-show="isLogin" class="user-picture"></div>
    <!-- <div class="user-container">
      <div v-if="isLogin">
      <div class="user-picture"></div>
      <el-dropdown trigger="click" class="user-info">
        <span class="el-dropdown-link">
          {{user.name}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
    </div> -->
  </div>
</template>
<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from "vuex";
  export default {
    props: {
      activeIndex: {
        type: String,
        default: "/"
      }
    },
    data(){
      return{
        isLogin:false
      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      })
    },
    created() {
      console.log(this.user)
      this.isLogin = Boolean(this.$store.state.user.id)
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      signRegUser(){
        
      },
      signLogUser(){

      }
    }
  };

</script>
