<style>
  .Fullviews>.el-card>.el-card__header {
    background-color: #F5F7FA;
  }

</style>
<template>
  <div>
    <common-header activeIndex="fullviews"></common-header>
    <el-row>
      <el-col :span="12">
        <div class="Fullviews">
          <el-card style="margin-top:100px; width:700px;">
            <div slot="header">
              <i class="el-icon-printer"></i>
            </div>
            <div id="myEchartBar" style="width:700px;height:500px;margin:-20px;"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="Fullviews">
          <el-card style="margin-top:100px; width:700px;">
            <div slot="header">
              <i class="el-icon-picture-outline"></i>
            </div>
            <div id="myEchartLine" style="width:700px;height:500px;margin:-20px;"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import commonHeader from '../common/Header.vue';
  import myEchart from "echarts";
  export default {
    components: {
      commonHeader
    },
    name: 'StoreViews',
    data() {
      return {
        color: ['#F97C80', '#F97C80', '#F97C80', '#F4A972', '#F4A972', '#F4A972', '#8CE0E2', '#8CE0E2', '#8CE0E2',
          '#AB95D5', '#AB95D5', '#AB95D5', '#82C2F2', '#82C2F2', '#82C2F2'
        ]
      }
    },
    mounted() {
      this.$http.get('fullviews', {
        params: {
          name: 'total'
        }
      }).then((response) => {
        this.setSerias(response.data)
      })
    },
    methods: {
      setSerias(fulldata) {
        var myechart = myEchart.init(document.getElementById('myEchartBar'));
        var legendData = Object.keys(fulldata[0]).slice(-2)
        var xAxisData = Object.values(fulldata).map(items => {
          return items['店铺']
        })
        var xAxisData = Object.values(fulldata).map(items => {
          return items['店铺']
        })
        var seriasData0 = Object.values(fulldata).map(items => {
          return items['销售额']
        })
        var seriasData1 = Object.values(fulldata).map(items => {
          return items['件数']
        })
        // 指定图表的配置项和数据
        var option = {
          color: this.color,
          title: {
            // text: '2000-2016年中国汽车销量及增长率'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            containLabel: true,
            left: '3%',
            right: '4%',
            bottom: '3%'
          },
          legend: {
            itemWidth: 20,
            selectedMode: 'single',
            data: legendData
          },
          xAxis: [{
            type: 'category',
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
            type: 'value',
            name: legendData[0],
            position: 'left',
            axisTick: {
              show: false
            }
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 45
          }],
          series: [this.getSerias(legendData[0], seriasData0),
            this.getSerias(legendData[1], seriasData1)
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myechart.setOption(option);
        // 处理点击事件并且跳转到相应的百度搜索页面
        var _this = this
        myechart.on('click', function (params) {
          _this.getLineSerias(params)
        });
        myechart.on('legendselectchanged', function (params) {
          option.yAxis.name = params.name
          myechart.setOption(option);
        });
      },
      getSerias(name, data) {
        if (typeof name === 'string' && data instanceof Array === true) {
          return {
            name: name,
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top',
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
              }
            })
          }
        }
      },
      getLineSerias(params) {
        console.log(params)
        this.$http.get('fullviews', {
          params: {
            name: 'single'
          }
        }).then((response) => {
          console.log(response)
        })
      }
    }
  }

</script>
