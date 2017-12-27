<style>
  /* comment-Chin选框样式 */

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
    top: 119px;
    z-index: 10;
  }

  #product .comment-Body .el-table__header-wrapper {
    top: 158px;
    z-index: 10;
    position: fixed;
  }

  #product .comment-Body .el-table__body-wrapper {
    top: 65px;
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
          <el-date-picker v-model="dateTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="small"
            @change="chinSelectChanged({name:'dateTime',value:dateTime})"></el-date-picker>
          <span>
            <el-select v-model="productStyle" @change="chinSelectChanged({name:'productStyle',value:productStyle})">
              <el-option v-for="item in chinOptions[0]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="extraShown" @change="chinSelectChanged({name:'extraShown',value:extraShown})">
              <el-option v-for="item in chinOptions[1]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="timeLen" @change="chinSelectChanged({name:'timeLen',value:timeLen})">
              <el-option v-for="item in chinOptions[2]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
        </el-col>
      </el-row>
    </div>
    <el-tabs class="comment-Body" v-model="activeName" @tab-click="tabMenuSelect" type="border-card">
      <el-tab-pane label="热销产品" name="hotseller">
        <commonTable :tableData="tableBody" :tableTitle="tableTitle" :tableExpend="tableExpend"></commonTable>
      </el-tab-pane>
      <el-tab-pane label="热搜产品" name="search">
        <commonTable :tableData="tableBody" :tableTitle="tableTitle" :tableExpend="tableExpend"></commonTable>
      </el-tab-pane>
      <el-pagination :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
        :total="400">
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
        return this.$store.state.products.chinOptions
      },
      tableTitle() {
        return this.$store.state.products.tableData.tableTitle
      },
      tableBody() {
        return this.$store.state.products.tableData.tableBody
      }
    },
    data() {
      return {
        productStyle: "牛仔裤",
        extraShown: '热销排名',
        dateTime: new Date(Date.now() - 8.64e7),
        timeLen: 7,
        chinData: [],
        tableExpend: "",
        TableTotal: 20,
        activeName: "hotseller"
      }
    },
    created() {
      this.tabMenuSelect({
        name: this.activeName
      })
      this.$store.dispatch('fetchProductList')
    },
    methods: {
      getChinOptions(value) {
        let b = [
          ['牛仔裤', '休闲裤', '打底裤'],
          ['热销排名', ...value, '支付子订单数'],
          [7, 14]
        ]
        return b.map(function (item, key) {
          return item.map(function (item) {
            if (typeof item == 'number') {
              return {
                label: `近${item}天`,
                value: item
              }
            } else {
              return {
                label: item,
                value: item
              }
            }

          })
        })
      },
      tabMenuSelect(v) {
        var a = v.name == 'search' ? ['流量指数', '搜索人气'] : ['支付转化率指数', '交易增长幅度']
        var c = this.getChinOptions(a)
        this.$store.commit('TAB_MENU_SELECT', v)
        this.$store.commit('GET_CHIN_OPTIONS', c)
        this.$store.commit('SET_CHIN_SELECT', {
          name: 'extraShown',
          value: '热销排名'
        })
        this.extraShown = '热销排名'
        this.$store.dispatch('fetchProductList')

      },
      chinSelectChanged(v) {
        console.log(this.dateTime)
        this.$store.commit('SET_CHIN_SELECT', v)
        this.$store.dispatch('fetchProductList')
      }
    }
  }

</script>
