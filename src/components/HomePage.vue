<style>
  .article-title {
    width: 200px;
  }

  .article-piture {
    width: 200px;
    height: 100px;
    border: 1px solid #dcdfe6;
  }

  .HomePage .v-note-wrapper {
    z-index: 0;
  }

  .HomePage .el-icon-document:before {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }

</style>
<template>
  <div class="HomePage">
    <common-header activeIndex="/"></common-header>
    <el-card style="margin:100px auto;width:80%;">
      <div slot="header">
        <i class="el-icon-document">周报列表</i>
        <div style="float: right;">
          <el-input style="width:168px;margin-right:20px;" placeholder="搜索" v-model="input"></el-input>
          <el-button icon="el-icon-plus" :disabled="buttonGroup.increase" @click="increaseArticle">增加</el-button>
          <el-button icon="el-icon-view" :disabled="buttonGroup.view" @click="viewArticle">查看</el-button>
          <el-button icon="el-icon-edit" :disabled="buttonGroup.editor" @click="editorArticle">编辑</el-button>
          <el-button icon="el-icon-delete" :disabled="buttonGroup.delete" @click="deleteArticle">删除</el-button>
        </div>
      </div>
      <div>
        <el-table v-show="!showEditor" :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="date" label="上传时间">
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="author" label="发布者">
          </el-table-column>
          <el-table-column prop="status" label="状态">
          </el-table-column>
          <el-table-column prop="verifier" label="审核人">
          </el-table-column>
          <el-table-column prop="amount" label="阅读人数">
          </el-table-column>
        </el-table>
        <el-form v-show="showEditor" ref="form" :model="form" label-width="80px">
          <el-form-item label="文章标题">
            <el-input class="article-title" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="文章内容">
            <mavon-editor ref="md" @imgAdd="imageAdd" v-model="form.mdString"></mavon-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">创建文章</el-button>
            <el-button @click="showEditor = !showEditor">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
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
        activeIndex: "/",
        input: '',
        showEditor: false,
        form: {
          title: "",
          author: "顾园园",
          mdString: ""
        },
        selection: [],
        buttonGroup: {
          increase: false,
          view: true,
          editor: true,
          delete: true
        },
        tableData: [{
            date: "2016-05-03",
            title: "冬款注意事项",
            author: "王小虎",
            status: 200,
            verifier: "张三",
            amount: 200
          },
          {
            date: "2016-05-02",
            title: "那些你不知道的潜力款",
            author: "王小虎",
            status: 200,
            verifier: "张三",
            amount: 203
          },
          {
            date: "2016-05-04",
            title: "抓住热门冬款的尾巴",
            author: "王小虎",
            status: 302,
            verifier: "张三",
            amount: 233
          },
          {
            date: "2016-05-01",
            title: "新一期热门春款新品",
            author: "王小虎",
            status: 200,
            verifier: "张三",
            amount: 23
          },
          {
            date: "2016-05-08",
            title: "春款牛仔注意事项",
            author: "王小虎",
            status: 200,
            verifier: "张三",
            amount: 333
          }
        ]
      };
    },
    watch: {
      selection: 'buttonDisable'
    },
    created() {},
    methods: {
      buttonDisable() {
        var selectionLength = this.selection.length
        if (selectionLength == 0) {
          this.buttonGroup = {
            increase: false,
            view: true,
            editor: true,
            delete: true
          }
        } else if (selectionLength == 1) {
          this.buttonGroup = {
            increase: true,
            view: false,
            editor: false,
            delete: false
          }
        } else {
          this.buttonGroup = {
            increase: true,
            view: true,
            editor: true,
            delete: false
          }
        }
      },
      increaseArticle() {
        this.showEditor = true
      },
      viewArticle() {
        var parms = this.selection[0]
        this.$http.get('weekreport/view',{params: {parms}}).then((response)=>{
          console.log(response)
        })
      },
      editorArticle(row) {
        console.log(row);
      },
      deleteArticle(row) {
        console.log()
      },
      handleSelectionChange(row) {
        this.selection = row
      },
      submitForm() {
        // 提交文档信息到服务
        var information = this.$refs.form.model;
        this.$http
          .post("weekreport/editor", information)
          .then(response => {
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
