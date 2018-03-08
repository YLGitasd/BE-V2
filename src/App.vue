<template>
  <div id="app">
    <!--需要缓存的内容-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <!--正常的访问走下面-->
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: "app"
}
</script>

<style>
html,
body {
  padding: 0px;
  margin: 0px;
}
</style>
