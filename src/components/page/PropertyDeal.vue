<style>
#property-deal .comment-Chin {
  position: fixed;
  box-sizing: border-box;
  top: 61px;
  width: 100%;
  z-index: 10;
  padding: 10px 30px;
  background-color: #f5f7fa;
}

#property-deal .comment-Chin-title h3 {
  margin: 0px;
}

#property-deal .comment-Chin-list {
  text-align: right;
}

#property-deal .comment-Chin-list > span {
  display: inline-block;
  width: 150px;
  margin: 3px;
}

#property-deal .comment-Body {
  border: 1px solid #e4e7ed;
  margin: 119px 2px 0;
  padding: 2px 15px;
}
</style>

<template>
  <div id="property-deal">
    <common-header activeIndex="property-deal"></common-header>
    <div class="comment-Chin">
      <el-row type="flex" justify="end" align="middle">
        <el-col :md="3" :lg="4" :xl="4" class="hidden-sm-and-down comment-Chin-title">
          <div>
            <h3>生e经</h3>
          </div>
        </el-col>
        <el-col class="comment-Chin-list">
          <el-date-picker v-model="dateTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="small"
            @change="chinSelectChanged({name:'dateTime',value:dateTime})"></el-date-picker>
          <span>
            <el-select v-model="productStyle" @change="chinSelectChanged({name:'productStyle',value:productStyle})">
              <el-option v-for="item in chinOptions[0]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="listProper" @change="chinSelectChanged({name:'listProper',value:listProper})">
              <el-option v-for="item in chinOptions[1]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
        </el-col>
      </el-row>
    </div>
      <common-listprop :listProp="listgroup" :selectName="activeName"></common-listprop>
      <div class="comment-Body">
        <el-table :data="properdata">
          <el-table-column :prop="propertitle[0]" :label="propertitle[0]">
            <template slot-scope="scope">
              <!-- <el-progress type="circle" :percentage="25"></el-progress> -->
              {{scope.row[scope.column.label]}}
            </template>
          </el-table-column>
          <el-table-column :prop="propertitle[1]" :label="propertitle[1]">
            <template slot-scope="scope">
              <el-progress :percentage="+(scope.row[scope.column.label]*100/total[0]).toFixed(1)"></el-progress>
              {{scope.row[scope.column.label]}}
            </template>
          </el-table-column>
          <el-table-column :prop="propertitle[2]" :label="propertitle[2]">
            <template slot-scope="scope">
              <el-progress :percentage="+(scope.row[scope.column.label]*100/total[1]).toFixed(1)"></el-progress>
              {{scope.row[scope.column.label]}}
            </template>
          </el-table-column>
          <el-table-column :prop="propertitle[3]" :label="propertitle[3]">
            <template slot-scope="scope">
              <el-progress :percentage="+(scope.row[scope.column.label]*100/total[2]).toFixed(1)"></el-progress>
              {{scope.row[scope.column.label]}}
            </template>
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>
<script>
import commonHeader from "../common/Header.vue";
import commonListprop from "../common/Listprop.vue";
export default {
  components: {
    commonHeader,
    commonListprop
  },
  data() {
    return {
      listgroup: [],
      propertitle: [],
      properdata: [],
      activeName: ["厚薄"],
      total: [11199615, 1778621725, 15299],
      listProper: "",
      productStyle: "",
      dateTime: new Date(Date.now() - 8.64e7),
      chinOptions: [[], []]
    };
  },
  created() {
    this.$http
      .get("property-deal", {
        params: {
          name: "deal"
        }
      })
      .then(response => {
        this.listgroup = [
          {
            label: "属性",
            value: "属性",
            data: response.data.data
          }
        ];
        let proper = response.data.data1;
        this.propertitle = Object.keys(proper[0]);
        this.properdata = Object.values(response.data.data1);
        console.log(this.properdata);
      });
  },
  methods: {}
};
</script>
