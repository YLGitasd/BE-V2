<style>


</style>
<template>
  <div class="HomePage">
    <common-header activeIndex="/"></common-header>
    <br>
    <br>
    <br>
    <br>
    <el-date-picker v-model="week.value" :type="week.type" :format="week.format" :placeholder="week.placeholder">
    </el-date-picker>
    <el-date-picker v-model="month.value" :type="month.type" :format="month.format" :placeholder="month.placeholder">
    </el-date-picker>
    <el-button icon="el-icon-plus" @click="dialogFormVisible = true">增加</el-button>
    <el-dialog title="文档信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = false">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%">
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

  </div>
</template>
<script>
  import commonHeader from './common/Header.vue';
  export default {
    components: {
      commonHeader
    },
    name: 'HomePage',

    data() {
      return {
        activeIndex: '/',
        week: {
          placeholder: '选择周',
          format: 'yyyy 第 WW 周',
          type: 'week',
          value: ''
        },
        month: {
          placeholder: '选择月',
          format: 'yyyy 第 MM 月',
          type: 'month',
          value: ''
        },
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [{
          date: '2016-05-03',
          title: '冬款注意事项',
          author: '王小虎',
          status: 200,
          verifier: '张三',
          amount: 200
        }, {
          date: '2016-05-02',
          title: '那些你不知道的潜力款',
          author: '王小虎',
          status: 200,
          verifier: '张三',
          amount: 203
        }, {
          date: '2016-05-04',
          title: '抓住热门冬款的尾巴',
          author: '王小虎',
          status: 302,
          verifier: '张三',
          amount: 233
        }, {
          date: '2016-05-01',
          title: '新一期热门春款新品',
          author: '王小虎',
          status: 200,
          verifier: '张三',
          amount: 23
        }, {
          date: '2016-05-08',
          title: '春款牛仔注意事项',
          author: '王小虎',
          status: 200,
          verifier: '张三',
          amount: 333
        }]
      }
    },
    created() {},
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(row) {

        console.log(row)
      }
    }
  }

</script>
