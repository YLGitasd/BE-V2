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

#property-deal .el-tale .cell {
  width: 250px;
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
          <el-date-picker v-model="params.dateTime" type="month" placeholder="选择日期" value-format="yyyy-MM-dd" size="small" @change="fetchData"></el-date-picker>
          <span>
            <el-select v-model="params.productStyle" @change="selectChanged">
              <el-option v-for="item in chinOptions[0]" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="params.listProper" @change="fetchData">
              <el-option v-for="item in chinOptions[1]" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="params.atribute" size='mini' placeholder="选择属性分类">
              <el-option v-for="item in chinOptions[0]" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </span>
          <span>
            <el-select v-model="params.extraShown" size='mini' placeholder="选择属性分类">
              <el-option v-for="item in chinOptions[0]" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </span>
        </el-col>
      </el-row>
    </div>
    <el-tabs class="comment-Body" v-model="params.name" type="border-card">
      <el-tab-pane label="属性成交量" name="dealSpread">
        <div>
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
        </div>
      </el-tab-pane>
      <el-tab-pane label="属性趋势" name="dealTrend">
          <div style="width:100%;height:800px;" id="properTrend"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import commonHeader from "../common/Header.vue";
  export default {
    components: {
      commonHeader
    },
    data() {
      return {
        params: {
          name: "dealSpread",
          dateTime: "2017-02-02",
          listProper: "",
          productStyle: "牛仔裤",
          atribute:"",
          extraShown:""
        },
        propertitle: [],
        properdata: [],
        activeName: ["厚薄"],
        total: [],
        chinOptions: [
          ["牛仔裤", "休闲裤", "打底裤", "半身裙", "大码女装", "连衣裙", "棉裤羽绒裤", "西装裤正装裤", "成交量分布"],
          []
        ]
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      selectChanged() {
        this.params.listProper = "";
        this.fetchData();
      },
      fetchData() {
        this.$http
          .get("property-deal", {
            params: this.params
          })
          .then(response => {
            if (response.data.list) {
              this.chinOptions[1] = Object.values(response.data.list);
              this.params.listProper = this.chinOptions[1][0];
            }
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
          });
      },
      initChart(){
        var option = {
          color:['#F20030','#FFF200','#2BD4FF'],
          title: {
            text: '类目属性关系图',
            subtext: '数据来自生e经',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer:{
              type:'cross'
            },
            formatter:function(params){
              var res = params[0].name;
              res+='<br/>'+params[0].seriesName+':'+params[0].value;
              res+='<br/>'+params[1].seriesName+':'+params[1].value;
              res+='<br/>'+params[2].seriesName+':'+(params[2].value*100).toFixed(2);
              return res
            }
          },
          legend: {
            data: [],
            right: 50
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
              xAxisIndex: [0, 1,2]
            },
            {
              type: 'inside',
              start: 50,
              xAxisIndex: [0, 1,2]
            }
          ],
          grid: [{
            left: 60,
            right: 50,
            height: '23%'
          }, {
            left: 60,
            right: 50,
            top: '38%',
            height: '23%',
          }, {
            left: 60,
            right: 50,
            top: '68%',
            height: '23%',
          }],
          xAxis: [{
             gridIndex: 0,
              type: 'category',
              boundaryGap: false,
              axisLine: {
                onZero: true
              },
              data: []
            },
            {
              gridIndex: 1,
              type: 'category',
              boundaryGap: false,
              axisLine: {
                onZero: true
              },
              data: []
            },
            {
              gridIndex: 2,
              type: 'category',
              boundaryGap: false,
              axisLine: {
                onZero: true
              },
              data: []
            }
          ],
          yAxis: [{
              name: '',
              nameGap:6,
              type: 'value',
              nameTextStyle:{
                fontWeight:'bold',
                fontSize:14
              },
              axisLabel: {
                formatter: function (val) {
                    return (val/10000) + '万';
                }
            }
            },
            {
              gridIndex: 1,
              name: '',
              nameGap:6,
              type: 'value',
               nameTextStyle:{
                fontWeight:'bold',
                fontSize:14
              },
               axisLabel: {
                formatter: function (val) {
                    return (val/10000) + '万';
                }
            }
            },
             {
              gridIndex: 2,
              name: '',
              nameGap:6,
              type: 'value',
               nameTextStyle:{
                fontWeight:'bold',
                fontSize:14
              },
              axisLabel: {
                formatter: function (val) {
                    return (val* 100).toFixed(1) + '%'
            }
            }
             }],
          series: [{
              name: '',
              type: 'line',
              smooth: true,
              symbolSize: 8,
              hoverAnimation: false,
              data: []
            },
            {
              name: '',
              type: 'line',
              smooth: true,
              xAxisIndex: 1,
              yAxisIndex: 1,
              symbolSize: 8,
              hoverAnimation: false,
              data: []
            },
            {
              name: '',
              type: 'line',
              smooth: true,
              xAxisIndex: 2,
              yAxisIndex: 2,
              symbolSize: 8,
              hoverAnimation: false,
              data: []
            }
          ]
        }
      },
      InputCategory() { //类目输入时后两项清空原属性
        this.options1.splice(0, this.options1.length)
        this.options2.splice(0, this.options1.length)
        var data= {
          category: this.value0,
          attribute: 'list'
        }
        this.$http.post('proper/trend', {
          data
        }, {
          emulateJSON: true
        }).then((response) => {
          this.options1 = Object.keys(response.body.data).map(function (item) {
            return {
              label: response.body.data[item],
              value: response.body.data[item]
            }
          })
        })
      },
      InputAttribute() { //属性输入时前父选项不变,子选项清空
        this.options2 = []
        var data = this.data
        var data= {
          category: this.value0,
          attribute: this.value1,
          feature: 'list'
        }
        this.$http.post('proper/trend', {
          data
        }, {
          emulateJSON: true
        }).then((response) => {
          this.options2 = Object.keys(response.body.data).map(function (item) {
            return {
              label: response.body.data[item],
              value: response.body.data[item]
            }
          })
        })
      },
      InputFeature() {
        var data= {
          category: this.value0,
          attribute: this.value1,
          feature: this.value2,
          variable: this.value3
        }
        this.$http.post('proper/trend', {
          data
        }, {
          emulateJSON: true
        }).then((response) => {
          this.option.xAxis[0].data= this.option.xAxis[1].data=this.option.xAxis[2].data = Object.keys(response.body.data1).map(function (item) {
            var data = new Date(response.body.data1[item]['日期'])
            return [data.getFullYear(), data.getMonth() + 1].join('-')
          })
          var _this=this
           this.option.series[0].data= Object.keys(response.body.data0).map(function (item) {
            return response.body.data0[item][_this.value3]
          })
           this.option.series[0].name=this.option.yAxis[0].name=this.value1
          this.option.series[1].data=Object.keys(response.body.data1).map(function (item) {
            return response.body.data1[item][_this.value3]
          })
           this.option.series[1].name=this.option.yAxis[1].name=this.value2
           this.option.series[2].data = Object.keys(response.body.data2).map(function (item) {
            return response.body.data2[item][_this.value3]
          })
            this.option.series[2].name=this.option.yAxis[2].name='占比'
             this.option.legend.data=[this.value1,this.value2,'占比']   
        })
      }
    }
  };

</script>
