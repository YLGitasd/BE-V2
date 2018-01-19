<style>
/* ！样式顺序是根据标签顺序添加的 */

#weekport .portheader {
  position: fixed;
  top: 0px;
  width: 100%;
}
/* 周报列表样式 */
#weekport .portList {
  margin: 100px auto;
  width: 80%;
}
#weekport .portList .v-note-wrapper {
  z-index: 0;
}
#weekport .portList .el-icon-document:before {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

/* portbody周报样式 悬浮层*/

#weekport .portbody {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(229, 229, 229, 0.95);
  z-index: 9999;
  overflow: scroll;
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

#weekport > .portbody > .beat-rows > .beat-rows-prev > button > i {
  font-size: 3em;
}

#weekport > .portbody > .beat-rows > .beat-rows-next {
  position: absolute;
  right: 15px;
  padding: 10px;
}

#weekport > .portbody > .beat-rows > .beat-rows-next > button > i {
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
     <el-card class="portList">
      <div slot="header">
        <i class="el-icon-document">周报列表</i>
        <div style="float: right;">
          <el-input style="width:198px;margin-right:20px;" placeholder="搜索文章" v-model="search" 
          clearable  @change="weekportSearch" @focus="searchInfo"></el-input>
          <el-button icon="el-icon-plus" :disabled="buttonGroup.increase" @click="increaseArticle">增加</el-button>
          <el-button icon="el-icon-view" :disabled="buttonGroup.view" @click="viewArticle">查看</el-button>
          <el-button icon="el-icon-edit" :disabled="buttonGroup.editor" @click="editArticle">编辑</el-button>
          <el-button icon="el-icon-check" :disabled="buttonGroup.check" @click="checkArticle">审阅</el-button>
        </div>
      </div>
      <div>
        <el-table v-show="!showEditor" ref="multipleTable" :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index"width="50"></el-table-column>
          <el-table-column prop="date" label="上传时间"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="editor" label="发布者"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="verifier" label="审核人"></el-table-column>
          <el-table-column prop="readers" label="阅读人数"></el-table-column>
        </el-table>
        <el-form v-show="showEditor" ref="form" :model="form" label-width="80px">
          <el-form-item label="文章标题">
            <el-input class="article-title" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="文章内容">
            <mavon-editor ref="md" :subfield="false" @imgAdd="imageAdd" v-model="form.mdString"></mavon-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">{{buttonGroup.text}}</el-button>
            <el-button @click="showEditor = !showEditor">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="portbody" v-show="showWraper">
      <div class="close-button" @click="closeArticle">
        <i class="el-icon-close"></i>
      </div>
      <!-- 周报容器：body-wraper -->
      <div class="body-wraper" v-html="markdownParser"></div>
      <div class="beat-rows">
        <div class="beat-rows-prev"  @click="prevArticle">
          <el-button type="text" :disabled="buttonGroup.prevarow" icon="el-icon-arrow-left"></el-button>
        </div>
        <div class="beat-rows-next" @click="nextArticle">
          <el-button type="text" :disabled="buttonGroup.nextarow" icon="el-icon-arrow-right"></el-button>
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
import moment from "moment";
export default {
  components: {
    commonHeader
  },
  data() {
    return {
      isScroll: false,
      showWraper: false,
      markdownParser: "",
      search: "",
      showEditor: false,
      form: {
        title: "",
        editor: "顾园园",
        mdString: "",
        date: moment().format("YYYY-MM-DD")
      },
      order: 0,
      selection: [],
      buttonGroup: {
        text: "创建文章",
        prevarow: false,
        nextarow: false,
        increase: false,
        view: true,
        editor: true,
        check: true
      },
      tableData: []
    };
  },
  watch: {
    selection: "buttonDisable",
    order: function(val){
      if(val == this.tableData.length){
        this.buttonGroup.prevarow = true;
      }else{
        this.buttonGroup.prevarow = false;
      }
     if (val==1) {
        this.buttonGroup.nextarow = true;
      } else {
        this.buttonGroup.nextarow = false;
      }
    }
  },
  mounted() {
    this.$http.get("weekreport").then(response => {
      this.tableData = response.data;
    });
  },
  methods: {
    buttonDisable() {
      var selectionLength = this.selection.length;
      if (selectionLength == 0) {
        this.buttonGroup = {
          increase: false,
          view: true,
          editor: true,
          check: true
        };
      } else if (selectionLength == 1) {
        this.buttonGroup = {
          increase: true,
          view: false,
          editor: false,
          check: false
        };
      } else {
        this.buttonGroup = {
          increase: true,
          view: true,
          editor: true,
          check: false
        };
      }
    },
    searchInfo() {
      this.$message({
        message: "支持3种格式 例如：'2018','2018-01'和'2018 01'",
        type: "warning"
      });
    },
    weekportSearch() {
      this.$http
        .get("weekreport/filter", { params: { tags: this.search } })
        .then(response => {
          this.tableData = response.data;
        });
    },
    increaseArticle() {
      this.buttonGroup.text = "创建文章";
      this.showEditor = true;
    },
    closeArticle() {
      this.showWraper = false;
      this.$refs.multipleTable.clearSelection();
    },
    viewArticle() {
      var parms = this.selection[0];
      this.$http.get("weekreport/view", { params: parms }).then(response => {
        this.markdownParser = marked(response.data[1]);
        this.showWraper = true;
      });
    },
    editArticle() {
      this.buttonGroup.text = "编辑文章";
      var parms = this.selection[0];
      this.$http.get("weekreport/view", { params: parms }).then(response => {
        this.showEditor = true;
        this.form.title = response.data[0];
        this.form.mdString = response.data[1];
      });
    },
    checkArticle() {
      this.buttonGroup.text = "提交审阅";
    },
    prevArticle() {
      ++this.order;
      this.$http
        .get("weekreport/switch", { params: { order: this.order } })
        .then(response => {
          this.markdownParser = marked(response.data);
        });

    },
    nextArticle() {
      --this.order;
        this.$http
          .get("weekreport/switch", { params: { order: this.order } })
          .then(response => {
            this.markdownParser = marked(response.data);
          });
    },
    handleSelectionChange(row) {
      this.selection = row;
      if(this.selection.length ==1){
        this.order = this.selection[0].id;
      }
    },
    submitForm() {
      // 提交文档信息到服务
      var information = this.$refs.form.model;
      this.$http.post("weekreport/editor", information).then(response => {
        console.log(response);
      });
    },
    imageAdd(pos, $file) {
      // 添加图片 并上传到七牛云 返回链接
      console.log(pos, $file);
      var formdata = new FormData();
      formdata.append("image", $file);
      this.$http.post("qiniu/image", formdata).then(response => {
        this.$refs.md.$img2Url(pos, response.data);
      });
    }
  }
};
</script>
