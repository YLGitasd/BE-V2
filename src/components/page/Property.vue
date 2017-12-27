<style scoped>
  .comment-Chin {
    padding: 10px 30px;
    background-color: #F5F7FA;
  }

  .comment-Chin-title h3 {
    margin: 0px;
  }

  .comment-Chin-list {
    text-align: right;
  }

  .comment-Chin-list span {
    display: inline-block;
    width: 150px;
    margin: 3px;
  }

  @media screen and (min-width: 660px) and (max-width: 768px) {
    .comment-Chin-list span:nth-child(even) {
      width: 100px;
    }
  }

  @media screen and (min-width: 450px) and (max-width: 659px) {
    .comment-Chin-list span {
      width: 40%;
    }
  }

  @media screen and (max-width: 449px) {
    .comment-Chin-list span {
      width: 80%;
    }
  }
</style>
<template>
  <div>
    <common-header activeIndex="property"></common-header>
    <div class="comment-Chin">
      <el-row type="flex" justify="end" align="middle">
        <el-col :md="3" :lg="4" :xl="4" class="hidden-sm-and-down comment-Chin-title">
          <div>
            <h3>属性洞察</h3>
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
    <common-listprop :listProp="list" :selectName="selectName"></common-listprop>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="属性详情" name="detail">
        <commonTable :tableData="tableBody" :tableTitle="tableTitle" :tableExpend="tableExpend"></commonTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import commonHeader from "../common/Header.vue";
  import commonTable from "../common/Table.vue";
  import commonListprop from "../common/Listprop.vue";
  export default {
    components: {
      commonHeader,
      commonTable,
      commonListprop
    },
    data() {
      return {
        dateTime: '',
        productStyle: '',
        extraShown: '',
        timeLen: '',
        activeName: 'detail',
        tableBody: [],
        tableTitle: [],
        tableExpend: '',
        total: 0,
        chinOptions: [
          [],
          [],
          []
        ],
        selectName:['铅笔裤'],
        list:[
          {label:'款式',value:'kuanshi',data:['铅笔裤','哈伦裤','阔脚裤','连衣裤','背带裤','直筒','灯笼裤','微喇裤','工装裤','垮裤']},
          {label:'厚薄',value:'houbao',data:['超薄','薄款','常规','加厚']},
          {label:'裤长',value:'kuchang',data:['长裤','短裤','超短裤','五分裤','九分裤','七分裤']},
          {label:'腰型',value:'yaoxing',data:['高腰','低腰','中腰']}
        ]
      }
    },
    methods: {
      chinSelectChanged() {
        this.$http.get('property', {
          params: {
            name: 'shuxing',
            num: 7
          }
        }).then((response) => {
          let data = response.data
          let [body, title, total] = [[], [], 0]
        if (data) {
          for (let j in data) {
            for (let k in data[j]) {
              if (k === 'total') {
                total = data[j][k]
              } else {
                title.push(k)
              }
            }
            break
          }
          for (let i in data) {
            body.push(data[i])
          }
          this.tableBody = body
          this.tableTitle = title
          this.total = total
        }
        })
      }
    }
  };

</script>
