<style>
  #fullviews .Fullviews>.el-card>.el-card__header {
    background-color: #f5f7fa;
  }

  #fullviews .Fullviews {
    padding: 20px;
  }

  #fullviews .fullviews-chart {
    margin-top: 60px;
    padding: 10px 30px;
  }

  #fullviews .el-picker-panel__sidebar {
    width: 140px;
  }

  #fullviews .el-picker-panel [slot="sidebar"]+.el-picker-panel__body,
  #fullviews .el-picker-panel__sidebar+.el-picker-panel__body {
    margin-left: 140px;
  }

  #fullviews .el-picker-panel {
    line-height: 0px;
  }

  #fullviews .el-icon-printer:before,
  #fullviews .el-icon-picture-outline:before {
    font-size: 1.5rem;
    color: #24292e;
    margin-right: 1rem;
  }

  #fullviews .grid-content {
    border-radius: 4px;
    min-height: 36px;
    box-sizing: border-box;
    background-color: #f5f7fa;
  }

</style>
<template>
  <div id="fullviews">
    <common-header activeIndex="fullviews"></common-header>
    <div class="fullviews-chart">
      <el-row>
        <el-col :span="12">
          <div class="Fullviews">
            <el-card>
              <div slot="header">
                <i class="el-icon-printer">店铺一览</i>
                <div style="float: right;">
                  <el-date-picker v-model="storeDateRange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="storePickerOptions"
                    value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" @change="storeDateRangeChange">
                  </el-date-picker>
                </div>
              </div>
              <div id="myEchartBar" style="width:100%;height:450px;"></div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="Fullviews">
            <el-card>
              <div slot="header">
                <i class="el-icon-picture-outline">店铺详情</i>
                <div style="float: right;">
                  <el-select v-model="storeName" placeholder="请选择">
                    <el-option v-for="item in storeOption" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div id="myEchartLine" style="width:100%;height:450px;"></div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="fullviews-range">
      <el-row type="flex" justify="space-around">
        <el-col :span="4">
          <div class="grid-content">
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import moment from "moment";
  import commonHeader from "../common/Header.vue";
  import myEchart from "echarts";
  export default {
    components: {
      commonHeader
    },
    name: "StoreViews",
    data() {
      return {
        color: [
          "#F97C80",
          "#F97C80",
          "#F97C80",
          "#F4A972",
          "#F4A972",
          "#F4A972",
          "#8CE0E2",
          "#8CE0E2",
          "#8CE0E2",
          "#AB95D5",
          "#AB95D5",
          "#AB95D5",
          "#82C2F2",
          "#82C2F2",
          "#82C2F2",
          "#606266",
          "#606266",
          "#606266",
          "#606266"
        ],
        storePickerOptions: {
          shortcuts: [{
              text: "最近一周",
              onClick(picker) {
                const end = new Date(Date.now() - 8.64e7);
                const start = new Date();
                start.setTime(start.getTime() - 8.64e7 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date(Date.now() - 8.64e7);
                const start = new Date();
                start.setTime(start.getTime() - 8.64e7 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date(Date.now() - 8.64e7);
                const start = new Date();
                start.setTime(start.getTime() - 8.64e7 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        storeDateRange: [new Date(Date.now() - 7 * 8.64e7), new Date(Date.now() - 8.64e7)],
        options: [{
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        storeName: "芮丽娅旗舰店",
        storeOption:[]
      };
    },
    mounted() {
      this.$http
        .get("fullviews", {
          params: {
            chartStyle: "bar",
            dateRange: this.storeDateRange
          }
        })
        .then(response => {
          this.setSerias(response.data);
        });
    },
    methods: {
      storeDateRangeChange() {
        console.log(this.storeDateRange)
      },
      setSerias(fulldata) {
        var myechart = myEchart.init(document.getElementById("myEchartBar"));
        var legendData = Object.keys(fulldata[0]).slice(-2);
        var xAxisData = Object.values(fulldata).map(items => {
          return items["店铺"];
        });
        this.storeOption = xAxisData
        var seriasData0 = Object.values(fulldata).map(items => {
          return items["销售额"];
        });
        var seriasData1 = Object.values(fulldata).map(items => {
          return items["件数"];
        });
        // 指定图表的配置项和数据
        var option = {
          color: this.color,
          tooltip: {
            trigger: "axis"
          },
          grid: {
            containLabel: true,
            left: "3%",
            right: "4%",
            bottom: "3%"
          },
          legend: {
            itemWidth: 20,
            selectedMode: "single",
            data: legendData
          },
          xAxis: [{
            type: "category",
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            axisLabel: {
              rotate: -65
            },
            data: xAxisData
          }],
          yAxis: {
            type: "value",
            name: legendData[0],
            position: "left",
            axisTick: {
              show: false
            }
          },
          dataZoom: [{
            type: "inside",
            start: 0,
            end: 45
          }],
          series: [
            this.getSerias(legendData[0], seriasData0),
            this.getSerias(legendData[1], seriasData1)
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myechart.setOption(option);
        // 处理点击事件并且跳转到相应的百度搜索页面
        var _this = this;
        myechart.on("click", function (params) {
          _this.getLineSerias(params);
        });
        myechart.on("legendselectchanged", function (params) {
          option.yAxis.name = params.name;
          myechart.setOption(option);
        });
      },
      getSerias(name, data) {
        if (typeof name === "string" && data instanceof Array === true) {
          return {
            name: name,
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            data: data.map((item, key) => {
              return {
                value: item,
                itemStyle: {
                  normal: {
                    color: this.color[key]
                  }
                }
              };
            })
          };
        }
      },
      getLineSerias(params) {
        let storename = params.name || '芮丽娅旗舰店'
        this.$http
          .get("fullviews", {
            params: {
              chartStyle: "line",
              storeName: storename
            }
          })
          .then(response => {
            var fulldata = response.data;
            var storeNameX = Object.keys(fulldata).map(items => {
              return moment(new Date(+items)).format('YYYY-MM-DD')
            })
            
            var seriasData0 = Object.values(fulldata).map(items => {
              return items["销售额"]
            })
            var seriasData1 = Object.values(fulldata).map(items => {
              return items["件数"]
            })
            var myechartline = myEchart.init(
              document.getElementById("myEchartLine")
            )
            var optionline = {
              color: ["#F97C80", "#F4A972", "#8CE0E2", "#AB95D5", "#82C2F2"],
              tooltip: {
                trigger: "axis"
              },
              legend: {
                itemWidth: 20,
                selectedMode: "single",
                data: ["在大理", "标准版"]
              },
              grid: {
                containLabel: true,
                left: "3%",
                right: "4%",
                bottom: "3%"
              },
              xAxis: {
                type: "category",
                axisTick: {
                  alignWithLabel: true,
                  show: false
                },
                data: storeNameX
              },
              yAxis: {
                axisTick: {
                  show: false
                },
                type: "value"
              },
              series: [{
                  name: "件数",
                  smooth: true,
                  type: "line",
                  symbolSize: 8,
                  symbol: "circle",
                  data: seriasData1
                },
                {
                  name: "销售额",
                  smooth: true,
                  type: "line",
                  symbolSize: 8,
                  symbol: "circle",
                  data: seriasData0
                }
              ]
            };
            myechartline.setOption(optionline);
          });
      }
    }
  };

</script>
