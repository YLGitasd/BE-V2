<style>
  

</style>
<template>
  <div class="HomePage">
    <common-header activeIndex="/"></common-header>
    <el-card style="margin:100px auto;width:80%;">
      主页
    </el-card>
  </div>
</template>
<script>
  import commonHeader from "./common/Header.vue";
  export default {
    components: {
      commonHeader
    },
    name: "HomePage",
    data() {
      return {
      };
    },
    created() {},
  };

</script>
