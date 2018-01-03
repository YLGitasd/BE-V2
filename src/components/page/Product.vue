<style>
  /*product comment-Chin选框样式 */

  #product .comment-Chin {
    position: fixed;
    box-sizing: border-box;
    top: 61px;
    width: 100%;
    z-index: 10;
    padding: 10px 30px;
    background-color: #F5F7FA;
  }

  #product .comment-Chin-title h3 {
    margin: 0px;
  }

  #product .comment-Chin-list {
    text-align: right;
  }

  #product .comment-Chin-list>span {
    display: inline-block;
    width: 150px;
    margin: 3px;
  }

  @media screen and (min-width: 660px) and (max-width: 768px) {
    #product .comment-Chin-list>span:nth-child(even) {
      width: 100px;
    }
  }

  @media screen and (min-width: 450px) and (max-width: 659px) {
    #product .comment-Chin-list>span {
      width: 40%;
    }
  }

  @media screen and (max-width: 449px) {
    #product .comment-Chin-list>span {
      width: 80%;
    }
  }
  /* comment-Body样式 */

  #product .comment-Body {
    margin-top: 118px;
  }

  #product .el-tabs--border-card>.el-tabs__header {
    width: 100%;
    position: fixed;
    border: 1px solid #d8dce5;
    margin:-1px 2px;
    top: 119px;
    z-index: 10;
  }

  #product .comment-Body .el-table__header-wrapper {
    margin-top: calc(39px - 15px);
    z-index: 10;
    position: fixed;
  }

  #product .comment-Body .el-table__body-wrapper {
    margin-top: 65px;
  }
  #product .el-pagination{
    text-align: center;
  }
</style>
<template>
  <div id="product">
    <common-header activeIndex="product"></common-header>
    <div class="comment-Chin">
      <el-row type="flex" justify="end" align="middle">
        <el-col :md="3" :lg="4" :xl="4" class="hidden-sm-and-down comment-Chin-title">
          <div>
            <h3>类目趋势</h3>
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
    <el-tabs class="comment-Body" v-model="params.name" @tab-click="tabMenuSelect" type="border-card">
      <el-tab-pane label="热销产品" name="hotseller">
        <commonTable :tableData="tableBody" :tableTitle="tableTitle"></commonTable>
      </el-tab-pane>
      <el-tab-pane label="热搜产品" name="search">
        <commonTable :tableData="tableBody" :tableTitle="tableTitle"></commonTable>
      </el-tab-pane>
      <el-pagination @size-change="sizeChange" :page-size="params.pageSize" @current-change="currentChange" :current-page="params.pageCurrent"
        :page-sizes="[20, 50, 100]" :total="tableTotal" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-tabs>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from "vuex";
  import commonHeader from "../common/Header.vue";
  import commonTable from "../common/Table.vue";
  export default {
    components: {
      commonHeader,
      commonTable
    },
    computed: {
      chinOptions() {
        return this.$store.getters.chinOptions
      },
      tableTitle() {
        return this.$store.state.products.tableData.tableTitle
      },
      tableBody() {
        return this.$store.state.products.tableData.tableBody
      },
      tableTotal() {
        return this.$store.state.products.tableData.tableTotal
      }
    },
    data() {
      return {
        params: {
          name: "hotseller",
          productStyle: "牛仔裤",
          extraShown: '热销排名',
          dateTime: new Date(Date.now() - 8.64e7),
          timeLen: 7,
          pageSize: 20,
          pageCurrent: 1
        }
      }
    },
    watch: {
      params: {
        handler: 'chinSelectChanged',
        deep: true
      }
    },
    created() {
      this.tabMenuSelect()
      this.$store.dispatch('fetchProductList')
    },
    methods: {
      tabMenuSelect() {
        this.params.extraShown = '热销排名'
        this.$store.commit('SET_CHIN_SELECT', this.params)
      },
      chinSelectChanged() {
        this.$store.commit('SET_CHIN_SELECT', this.params)
        this.$store.dispatch('fetchProductList')
      },
      sizeChange(val) {
        this.params.pageSize = val
        this.$store.commit('SET_CHIN_SELECT', this.params)
      },
      currentChange(val) {
        this.params.pageCurrent = val
        this.$store.commit('SET_CHIN_SELECT', this.params)
      }
    }
  }

</script>
