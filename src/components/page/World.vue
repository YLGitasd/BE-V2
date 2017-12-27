<style>
   /* comment-Chin选框样式 */

  #world .comment-Chin {
    position: fixed;
    box-sizing: border-box;
    top: 61px;
    width: 100%;
    z-index: 10;
    padding: 10px 30px;
    background-color: #F5F7FA;
  }

  #world .comment-Chin-title h3 {
    margin: 0px;
  }

  #world .comment-Chin-list {
    text-align: right;
  }

  #world .comment-Chin-list>span {
    display: inline-block;
    width: 150px;
    margin: 3px;
  }

  @media screen and (min-width: 660px) and (max-width: 768px) {
    #world .comment-Chin-list>span:nth-child(even) {
      width: 100px;
    }
  }

  @media screen and (min-width: 450px) and (max-width: 659px) {
      /* comment-Chin选框样式 */

  #world .comment-Chin {
    position: fixed;
    box-sizing: border-box;
    top: 61px;
    width: 100%;
    z-index: 10;
    padding: 10px 30px;
    background-color: #F5F7FA;
  }

  #world .comment-Chin-title h3 {
    margin: 0px;
  }

  #world .comment-Chin-list {
    text-align: right;
  }

  #world .comment-Chin-list>span {
    display: inline-block;
    width: 150px;
    margin: 3px;
  }

  @media screen and (min-width: 660px) and (max-width: 768px) {
    #world .comment-Chin-list>span:nth-child(even) {
      width: 100px;
    }
  }

  @media screen and (min-width: 450px) and (max-width: 659px) {
    #world .comment-Chin-list>span {
      width: 40%;
    }
  }

  @media screen and (max-width: 449px) {
    #world .comment-Chin-list>span {
      width: 80%;
    }
  }
  /* comment-Body样式 */

  #world .comment-Body {
    margin-top: 118px;
  }

  #world .el-tabs--border-card>.el-tabs__header {
    width: 100%;
    position: fixed;
    top: 119px;
    z-index: 10;
  }

  #world .comment-Body .el-table__header-wrapper {
    top: 158px;
    z-index: 10;
    position: fixed;
  }

  #world .comment-Body .el-table__body-wrapper {
    top: 65px;
  } .comment-Chin-list>span {
      width: 40%;
    }
  }

  @media screen and (max-width: 449px) {
    #world .comment-Chin-list>span {
      width: 80%;
    }
  }
  /* comment-Body样式 */

  #world .comment-Body {
    margin-top: 118px;
  }

  #world .el-tabs--border-card>.el-tabs__header {
    width: 100%;
    position: fixed;
    top: 119px;
    z-index: 10;
  }

  #world .comment-Body .el-table__header-wrapper {
    top: 158px;
    z-index: 10;
    position: fixed;
  }

  #world .comment-Body .el-table__body-wrapper {
    top: 65px;
  }
</style>
<template>
  <div id="world">
    <common-header activeIndex="world"></common-header>
    <div class="comment-Chin">
      <el-row type="flex" justify="end" align="middle">
        <el-col :md="3" :lg="4" :xl="4" class="hidden-sm-and-down comment-Chin-title">
          <div>
            <h3>行业热词榜 /
              <small>{{attribute}}</small>
            </h3>
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
            <el-select v-model="attribute" @change="chinSelectChanged({name:'attribute',value:attribute})">
              <el-option v-for="item in chinOptions[3]" :key="item.value" :label="item.label" :value="item.value">
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
      <el-tab-pane label="热搜搜索词" name="concern">
        <commonTable v-show="activeName=='concern'" :tableData="tableBody" :tableTitle="tableTitle" :tableExpend="tableExpend"></commonTable>
      </el-tab-pane>
      <el-tab-pane label="飙升搜索词" name="increase">
        <commonTable v-show="activeName=='increase'" :tableData="tableBody" :tableTitle="tableTitle" :tableExpend="tableExpend"></commonTable>
      </el-tab-pane>
      <el-tab-pane label="急速飙升词" name="flash">
        <commonTable v-show="activeName=='flash'" :tableData="tableBody" :tableTitle="tableTitle" :tableExpend="tableExpend"></commonTable>
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
        attribute: '热搜搜索词',
        tableExpend: "",
        TableTotal: 20,
        activeName: "concern",
        mapTokey: {//映射选取向后台传参数5个键对应五个
          '搜索词': [
            ['相关搜索词数', '点击率'],
            ['相关搜索词数', '词均搜索增长幅度']
          ],
          '长尾词': [
            ['相关搜索词数', '点击率'],
            ['相关搜索词数', '词均搜索增长幅度']
          ],
          '核心词': [
            ['商城点击占比', '点击率'],
            ['搜索增长幅度', '点击率']
          ],
          '修饰词': [
            ['相关搜索词数', '点击率'],
            ['相关搜索词数', '词均搜索增长幅度']
          ],
          '品牌词': [
            ['商城点击占比', '点击率'],
            ['搜索增长幅度', '点击率']
          ]
        }
      };
    },
    created() {
      this.tabMenuSelect({
        name: this.activeName
      })
      this.$store.dispatch('fetchWorldList')
    },
    methods: {
      getChinOptions(pre,value) {
        let b = [
          ['牛仔裤', '休闲裤', '打底裤'],
          ['热销排名', '搜索人气', ...value, '点击人气', '支付转化率', '直通车参考价'],
          [7, 14],
          [`${pre || '热搜'}搜索词`, `${pre || '热搜'}长尾词`, `${pre || '热搜'}核心词`, `${pre || '热搜'}修饰词`, `${pre || '热搜'}品牌词`]
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
          var key1 = this.attribute.substring(2,5)
          var key2 = v.name == 'concern' ? 0 : 1
          var a = this.mapTokey[key1][key2]
          var pre = v.name == 'increase' ? '飙升' : '热搜'
          this.attribute = v.name == 'increase' ? '飙升搜索词' : '热搜搜索词'
          this.$store.commit('GET_CHIN_OPTIONS', this.getChinOptions(pre,a))
          this.$store.commit('TAB_MENU_SELECT', v)
          this.$store.commit('SET_CHIN_SELECT', {
          name: 'extraShown',
          value: '热销排名'
          })
          this.$store.commit('SET_CHIN_SELECT', {
          name: 'attribute',
          value: this.attribute
          })
        this.extraShown = '热销排名'
        this.$store.dispatch('fetchWorldList')
      },
      chinSelectChanged(v) {
        this.$store.commit('SET_CHIN_SELECT', v)
        this.$store.dispatch('fetchWorldList')
      }
    }
  }

</script>
