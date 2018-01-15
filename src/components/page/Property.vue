<style>
/*property comment-Chin选框样式 */

#property .comment-Chin {
  position: fixed;
  box-sizing: border-box;
  top: 61px;
  width: 100%;
  z-index: 10;
  padding: 10px 30px;
  background-color: #f5f7fa;
}

#property .comment-Chin-title h3 {
  margin: 0px;
}

#property .comment-Chin-list {
  text-align: right;
}

#property .comment-Chin-list > span {
  display: inline-block;
  width: 150px;
  margin: 3px;
}

@media screen and (min-width: 660px) and (max-width: 768px) {
  #property .comment-Chin-list > span:nth-child(even) {
    width: 100px;
  }
}

@media screen and (min-width: 450px) and (max-width: 659px) {
  #property.comment-Chin-list > span {
    width: 40%;
  }
}

@media screen and (max-width: 449px) {
  #property.comment-Chin-list > span {
    width: 80%;
  }
}
/* comment-Body样式 */

#property .comment-Body {
  margin-top: 118px;
}

#property .el-tabs--border-card > .el-tabs__header {
  width: 100%;
  position: fixed;
  border: 1px solid #d8dce5;
  margin: -1px 2px;
  top: 119px;
  z-index: 10;
}

#property .comment-Body .el-table__header-wrapper {
  margin-top: calc(39px - 15px);
  z-index: 10;
  position: fixed;
}

#property .comment-Body .el-table__body-wrapper {
  margin-top: 65px;
}

#property .el-pagination {
  text-align: center;
}
</style>
<template>
  <div id="property">
    <common-header activeIndex="property"></common-header>
    <div class="comment-Chin">
      <el-row type="flex" justify="end" align="middle">
        <el-col :md="3" :lg="4" :xl="4" class="hidden-sm-and-down comment-Chin-title">
          <div>
            <h3>属性洞察</h3>
          </div>
        </el-col>
        <el-col class="comment-Chin-list">
          <el-date-picker v-model="params.dateTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="small"></el-date-picker>
          <span>
            <el-select v-model="params.productStyle">
              <el-option v-for="item in chinOptions[0]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-cascader v-model="selectName" :options="selectOptions" @change="handleAttributes"></el-cascader>
          </span>
          <span>
            <el-select v-model="params.extraShown">
              <el-option v-for="item in chinOptions[1]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="params.timeLen">
              <el-option v-for="item in chinOptions[2]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
        </el-col>
      </el-row>
    </div>
    <el-tabs class="comment-Body" type="border-card" v-model="params.name">
      <el-tab-pane label="属性详情" name="detail">
        <commonTable :tableData="tableBody" :tableTitle="tableTitle"></commonTable>
      </el-tab-pane>
      <el-pagination @size-change="sizeChange" :page-size="params.pageSize" @current-change="currentChange" :current-page="params.pageCurrent"
        :page-sizes="[20, 50, 100]" :total="tableTotal" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import commonHeader from "../common/Header.vue";
import commonTable from "../common/Table.vue";
export default {
  components: {
    commonHeader,
    commonTable
  },
  computed: {
    tableTitle() {
      return this.$store.state.property.tableData.tableTitle;
    },
    tableBody() {
      return this.$store.state.property.tableData.tableBody;
    },
    tableTotal() {
      return this.$store.state.property.tableData.tableTotal;
    }
  },
  data() {
    return {
      params: {
        name: "detail",
        dateTime: new Date(Date.now() - 8.64e7),
        productStyle: "牛仔裤",
        extraShown: "热销排名",
        classification: "款式",
        attributes: "铅笔裤",
        timeLen: 7,
        pageSize: 20,
        pageCurrent: 1
      },
      chinOptions: [[], [], []],
      selectOptions: [
        {
          label: "款式",
          value: "款式",
          children: [
            {
              value: "铅笔裤",
              label: "铅笔裤"
            },
            {
              value: "哈伦裤",
              label: "哈伦裤"
            },
            {
              value: "阔脚裤",
              label: "阔脚裤"
            },
            {
              value: "连衣裤",
              label: "连衣裤"
            },
            {
              value: "背带裤",
              label: "背带裤"
            },
            {
              value: "直筒",
              label: "直筒"
            },
            {
              value: "灯笼裤",
              label: "灯笼裤"
            },
            {
              value: "微喇裤",
              label: "微喇裤"
            },
            {
              value: "工装裤",
              label: "工装裤"
            },
            {
              value: "垮裤",
              label: "垮裤"
            }
          ]
        },
        {
          label: "厚薄",
          value: "厚薄",
          children: [
            {
              value: "超薄",
              label: "超薄"
            },
            {
              value: "薄款",
              label: "薄款"
            },
            {
              value: "常规",
              label: "常规"
            },
            {
              value: "加厚",
              label: "加厚"
            }
          ]
        },
        {
          label: "裤长",
          value: "裤长",
          children: [
            {
              value: "长裤",
              label: "长裤"
            },
            {
              value: "短裤",
              label: "短裤"
            },
            {
              value: "超短裤",
              label: "超短裤"
            },
            {
              value: "五分裤",
              label: "五分裤"
            },
            {
              value: "九分裤",
              label: "九分裤"
            },
            {
              value: "七分裤",
              label: "七分裤"
            }
          ]
        },
        {
          label: "腰型",
          value: "腰型",
          children: [
            {
              value: "高腰",
              label: "高腰"
            },
            {
              value: "低腰",
              label: "低腰"
            },
            {
              value: "中腰",
              label: "中腰"
            }
          ]
        }
      ],
      selectName: ["款式", "铅笔裤"]
    };
  },
  watch: {
    params: {
      handler: "chinSelectChanged",
      deep: true
    }
  },
  created() {
    this.$store.dispatch("fetchPropertyList");
  },
  methods: {
    chinSelectChanged() {
      this.$store.commit("SET_CHIN_SELECT", this.params);
      this.$store.dispatch("fetchPropertyList");
    },
    handleAttributes(val) {
      this.params.classification = val[0];
      this.params.attributes = val[1];
    },
    sizeChange(val) {
      this.params.pageSize = val;
      this.$store.commit("SET_CHIN_SELECT", this.params);
    },
    currentChange(val) {
      this.params.pageCurrent = val;
      this.$store.commit("SET_CHIN_SELECT", this.params);
    }
  }
};
</script>
