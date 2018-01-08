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
</style>
<template>
  <div class="HomePage">
    <common-header activeIndex="/"></common-header>
    <div style="margin:100px auto;width:60%;">
      <el-date-picker v-model="week.value" :type="week.type" :format="week.format" :placeholder="week.placeholder">
      </el-date-picker>
      <el-button icon="el-icon-plus" @click="show = !show">增加</el-button>
      <el-table v-show="!show" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="date" label="上传时间" width="150">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="200">
        </el-table-column>
        <el-table-column prop="author" label="发布者" width="120">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="verifier" label="审核人" width="100">
        </el-table-column>
        <el-table-column prop="amount" label="阅读人数" width="120">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <i @click="handleClick(scope.row)" class="el-icon-view"></i>
            <i class="el-icon-edit-outline"></i>
          </template>
        </el-table-column>
      </el-table>

      <el-form v-show="show" ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input class="article-title" v-model="form.title"></el-input>
        </el-form-item>
        <!-- <el-form-item label="文章主图">
          <el-upload class="article-piture" action="" list-type="picture"></el-upload>
        </el-form-item> -->
        <el-form-item label="编辑文件">
           <mavon-editor @imgAdd="imageAdd" v-model="form.value"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="creatArticle">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      week: {
        placeholder: "选择周",
        format: "yyyy-MM-dd",
        type: "datetimerange",
        value: ""
      },
      show: false,
      form: {
        title: "",
        author: "",
        value: ""
      },
      tableData: [
        {
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
  created() {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(row) {
      console.log(row);
    },
    creatArticle() {
      // 提交文档信息到服务
      console.log(this.$refs.form.model);
      var information = this.$refs.form.model;
      this.$http
        .post("weekreport/editor", information, {
          headers: { "Content-Type": "multipart/form-data" }
        })
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
        console.log(response);
      });
    }
  }
};
</script>
