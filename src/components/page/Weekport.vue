<style>
/* ！样式顺序是根据标签顺序添加的 */

#weekport .portheader {
  position: fixed;
  top: 0px;
  width: 100%;
}
/* portbody周报样式 悬浮层*/

#weekport .portbody {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(229, 229, 229, 0.95);
  z-index: 99994;
  overflow: auto;
  padding-top: 60px;
}

#weekport .portbody a {
  color: #0366d6;
  text-decoration-line: none;
}

#weekport > .portbody > .close-button {
  /*悬浮层右上角关闭按钮*/
  position: fixed;
  top: 0px;
  padding: 10px;
  right: 15px;
}

#weekport > .portbody > .close-button > i {
  font-size: 3em;
}

#weekport > .portbody > .body-wraper {
  /*悬浮层周报容器*/
  width: 1024px;
  margin: 0 auto;
}

#weekport > .portbody > .beat-rows {
  /*悬浮层水平方向 /前进、后退/ 按钮*/
  position: fixed;
  width: 100%;
  top: 50%;
}

#weekport > .portbody > .beat-rows > .beat-rows-prev {
  position: absolute;
  left: 15px;
  padding: 10px;
}

#weekport > .portbody > .beat-rows > .beat-rows-prev > i {
  font-size: 3em;
}

#weekport > .portbody > .beat-rows > .beat-rows-next {
  position: absolute;
  right: 15px;
  padding: 10px;
}

#weekport > .portbody > .beat-rows > .beat-rows-next > i {
  font-size: 3em;
}

#weekport > .portbody > .beat-skips {
  /*悬浮层右下角 /跳转按钮组包括：回到顶部、第一页、最后一页，控制按钮*/
  position: fixed;
  bottom: 0;
  color: #e4e7ed;
  right: 15px;
  padding: 10px;
}

#weekport > .portbody > .beat-skips > .skips-to-top {
  position: relative;
  background-color: #24292e;
  border-radius: 4px;

  right: 0px;
  margin: 10px;
}

#weekport > .portbody > .beat-skips > .skips-to-top > i {
  font-size: 48px;
}

#weekport > .portbody > .beat-skips > .icon-toggles {
  position: relative;
  right: 0px;
  background-color: #24292e;
  margin: 10px;
  border-radius: 4px;
}

#weekport > .portbody > .beat-skips > .icon-toggles > i {
  font-size: 48px;
}
</style>
<template>
  <div id="weekport">
    <common-header class="portheader" activeIndex="weekport"></common-header>
    <div style="margin-top:100px;">
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>

    <div class="portbody" v-show="showWraper">
      <div class="close-button">
        <i class="el-icon-close"></i>
      </div>
      <!-- 周报容器：body-wraper -->
      <div class="body-wraper" v-html="markdownParser"></div>
      <div class="beat-rows">
        <div class="beat-rows-prev">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="beat-rows-next">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="beat-skips">
        <div class="skips-to-top">
          <i class="el-icon-arrow-up"></i>
        </div>
        <div v-show="false" class="icon-toggles">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commonHeader from "../common/Header.vue";
import marked from "marked";
export default {
  components: {
    commonHeader
  },
  data() {
    return {
      isScroll: false,
      showWraper: false,
      markdownParser: ""
    };
  },
  mounted() {
    this.$http.get("weekreport").then(response => {
      this.markdownParser = marked(response.data, {
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      });
    });
  },
  methods: {
    closeArticle() {}
  }
};
</script>
