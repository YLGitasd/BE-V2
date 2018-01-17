<style>
  #PropertyDeal .comment-Chin {
    position: fixed;
    box-sizing: border-box;
    top: 61px;
    width: 100%;
    z-index: 10;
    padding: 10px 30px;
    background-color: #f5f7fa;
  }

  #PropertyDeal .comment-Chin-title h3 {
    margin: 0px;
  }

  #PropertyDeal .comment-Chin-list {
    text-align: right;
  }

  #PropertyDeal .comment-Chin-list>span {
    display: inline-block;
    width: 150px;
    margin: 3px;
  }

  @media screen and (min-width: 660px) and (max-width: 768px) {
    #PropertyDeal .comment-Chin-list>span:nth-child(even) {
      width: 100px;
    }
  }

  @media screen and (min-width: 450px) and (max-width: 659px) {
    #PropertyDeal .comment-Chin-list>span {
      width: 40%;
    }
  }

  @media screen and (max-width: 449px) {
    #PropertyDeal .comment-Chin-list>span {
      width: 80%;
    }
  }
  /* comment-Body样式 */

  #PropertyDeal .comment-Body {
    margin-top: 118px;
  }

  #PropertyDeal .el-tabs--border-card>.el-tabs__header {
    width: 100%;
    position: fixed;
    border: 1px solid #d8dce5;
    margin: -1px 2px;
    top: 119px;
    z-index: 10;
  }

  #PropertyDeal .comment-Body .el-table__header-wrapper {
    margin-top: calc(39px - 15px);
    z-index: 10;
    position: fixed;
  }

  #PropertyDeal .comment-Body .el-table__body-wrapper {
    margin-top: 65px;
  }

  #PropertyDeal .el-pagination {
    text-align: center;
  }

</style>

<template>
  <div id="PropertyDeal">
    <common-header activeIndex="property-deal"></common-header>
    <div class="comment-Chin">
      <el-row type="flex" justify="end" align="middle">
      <el-col :md="3" :lg="4" :xl="4" class="hidden-sm-and-down comment-Chin-title">
        <div>
          <h3>生e经</h3>
        </div>
      </el-col>
      <el-col v-if="name=='dealSpread'" class="comment-Chin-list">
        <el-date-picker v-model.lazy="dateTime"  @change="inputchange" type="month" placeholder="选择日期"  size="small"></el-date-picker>
          <span>
            <el-select v-model.lazy="value0" @change="getListGroup">
              <el-option v-for="item in chinOptions[0]" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model.lazy="value2"  @change="inputchange">
              <el-option v-for="item in listgroup" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </span>
      </el-col>
      <el-col v-else class="comment-Chin-list">
        <span>
          <el-select v-model.lazy="productStyle" v-on:change="InputCategory" placeholder="选择类目">
            <el-option v-for="(item,key) in chinOptions[0]" :label="item" :value="item" :key="key"></el-option>
          </el-select>
        </span>
        <span>
          <el-select v-model.lazy="listProper" v-on:change="InputAttribute" placeholder="选择属性分类">
            <el-option v-for="(item,key) in chinOptions[1]" :label="item" :value="item" :key="key"></el-option>
          </el-select>
        </span>
        <span>
          <el-select v-model.lazy="feature" placeholder="选择属性">
            <el-option v-for="(item,key) in chinOptions[2]" :label="item" :value="item" :key="key"></el-option>
          </el-select>
        </span>
        <span>
          <el-select v-model.lazy="variable" v-on:change="InputFeature" placeholder="选取行业属性">
            <el-option v-for="(item,key) in chinOptions[3]" :label="item" :value="item" :key="key"></el-option>
          </el-select>
        </span>
      </el-col>
    </el-row>
    </div>
    <el-tabs class="comment-Body" v-model="name" type="border-card">
       <el-tab-pane label="属性成交量" name="dealSpread">
         <el-table :data="properdata">
            <el-table-column :prop="propertitle[0]" :label="propertitle[0]">
              <template slot-scope="scope">
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
      </el-tab-pane>
      <el-tab-pane label="属性趋势" name="dealTrend">
        <div style="width:1900px;height:calc(100vh - 150px);" id="properTrend"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import commonHeader from "../common/Header.vue";
  import Mychart from "echarts";
  export default {
    components: {
      commonHeader
    },
    data() {
      return {
        name:'dealSpread',
        value0:'牛仔裤',
        value2:'',
        dateTime: "2017-10-05",
        productStyle: '',
        listProper: '',
        feature: '',
        variable: '',
        listgroup:[],
        chinOptions:[
          ['牛仔裤','休闲裤','打底裤','半身裙','大码女装','连衣裙','棉裤羽绒裤','西装裤正装裤','成交量分布'],
          [],
          [],
          ["成交量","销售额","高质宝贝数"]
        ],
        properdata: [],
        propertitle: [],
        option: {
          color: ['#F97C80', '#F4A972', '#8CE0E2'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            formatter: function (params) {
              var res = params[0].name;
              res += '<br/>' + params[0].seriesName + ':' + params[0].value;
              res += '<br/>' + params[1].seriesName + ':' + params[1].value;
              res += '<br/>' + params[2].seriesName + ':' + (params[2].value * 100).toFixed(2);
              return res
            }
          },
          axisPointer: {
            link: {
              xAxisIndex: 'all'
            }
          },
          dataZoom: [{
              type: 'slider',
              start: 50,
              labelPrecision: 2,
              xAxisIndex: [0, 1, 2]
            },
            {
              type: 'inside',
              start: 50,
              xAxisIndex: [0, 1, 2]
            }
          ],
          grid: [{
            left:'4%',
            right:'2%',
            height: '23%'
          }, {
            left:'4%',
            right:'2%',
            top: '38%',
            height: '23%',
          }, {
            left:'4%',
            right:'2%',
            top: '68%',
            height: '23%',
          }],
          xAxis: [{
              gridIndex: 0,
              data: []
            },
            {
              gridIndex: 1,
              data: []
            },
            {
              gridIndex: 2,
              data: []
            }
          ],
          yAxis: [{
              name: '',
              axisLabel: {
                formatter: function (val) {
                  return (val / 10000) + '万';
                }
              }
            },
            {
              gridIndex: 1,
              name: '',
              axisLabel: {
                formatter: function (val) {
                  return (val / 10000) + '万';
                }
              }
            },
            {
              gridIndex: 2,
              name: '',
              axisLabel: {
                formatter: function (val) {
                  return (val * 100).toFixed(1) + '%'
                }
              }
            }
          ],
          series: [{
              name: '',
              type: 'line',
              smooth: true,
              data: []
            },
            {
              name: '',
              type: 'line',
              smooth: true,
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: []
            },
            {
              name: '',
              type: 'line',
              smooth: true,
              xAxisIndex: 2,
              yAxisIndex: 2,
              data: []
            }
          ]
        }
      }
    },
    mounted(){
      this.getListGroup()
    },
    methods: {
      InputCategory() { //类目输入时后两项清空原属性
        this.$set(this.chinOptions,1,[])
        this.$set(this.chinOptions,2,[])
        this.listProper = ''
        this.feature = ''
        var data = {
          category: this.productStyle,
          attribute: 'list'
        }
        this.$http.get('property-deal-trend', {params:
          data
        }, {
          emulateJSON: true
        }).then((response) => {
          var opt1 = Object.values(response.data.data)
          this.$set(this.chinOptions,1,opt1)
        })
      },
      InputAttribute() { //属性输入时前父选项不变,子选项清空
        this.$set(this.chinOptions,2,[])
         this.feature = ''
        var data = {
          category: this.productStyle,
          attribute: this.listProper,
          feature: 'list'
        }
        this.$http.get('property-deal-trend', {params:
          data
        }, {
          emulateJSON: true
        }).then((response) => {
          var opt2 = Object.values(response.data.data)
          this.$set(this.chinOptions,2,opt2)
        })
      },
      InputFeature() {
        var data = {
          category: this.productStyle,
          attribute: this.listProper,
          feature: this.feature,
          variable: this.variable
        }
        this.$http.get('property-deal-trend', {params:
          data
        }).then((response) => {
            this.option.xAxis[0].data= this.option.xAxis[1].data=this.option.xAxis[2].data = Object.keys(response.data.data1).map(function (item) {
            var data = new Date(response.data.data1[item]['日期'])
            return [data.getFullYear(), data.getMonth() + 1].join('-')
          })
          var _this=this
           this.option.series[0].data= Object.keys(response.data.data0).map(function (item) {
            return response.data.data0[item][_this.variable]
          })
           this.option.series[0].name=this.option.yAxis[0].name=this.listProper
          this.option.series[1].data=Object.keys(response.data.data1).map(function (item) {
            return response.data.data1[item][_this.variable]
          })
           this.option.series[1].name=this.option.yAxis[1].name=this.feature
           this.option.series[2].data = Object.keys(response.data.data2).map(function (item) {
            return response.data.data2[item][_this.variable]
          })
            this.option.series[2].name=this.option.yAxis[2].name='占比'
            var myechart = Mychart.init(document.getElementById("properTrend"));
            myechart.setOption(this.option)
        })
      },
      getListGroup() {
        var data = {
          "date": this.dateTime,
          "category": this.value0,
          "attribute": 'list'
        }
        this.$http.get('property-deal-list', {params:data}).then((response) => {
          this.listgroup = Object.values(response.data.data)
          this.value2 = this.listgroup[0]
          this.inputchange()
        })
      },
      inputchange() {
        var data = {
          "date": this.dateTime,
          "category": this.value0,
          "attribute": this.value2,
          "variable": 'all'
        }
        this.$http.get('property-deal-list', {params:data}).then((response) => {
          if(response.data.size == 4){
            this.$message('抱歉此条件无数据！');
          }else{
            let proper = response.data.data;
            this.propertitle = Object.keys(proper[0]);

            this.properdata = Object.values(response.data.data);
            var properdeal = response.data.data;
            var c = 0;
            var x = 0;
            var g = 0;
            for (var i in properdeal) {
              for (var j in properdeal[i]) {
                switch (j) {
                  case "成交量":
                    c += properdeal[i][j];
                    break;
                  case "销售额":
                    x += properdeal[i][j];
                    break;
                  case "高质宝贝数":
                    g += properdeal[i][j];
                    break;
                  default:
                    break;
                }
              }
            }
            this.total = [c, x, g];
          }
        })
      }
    }
  }

</script>