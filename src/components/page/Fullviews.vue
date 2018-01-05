<style>


</style>
<template>
  <div class="Fullviews">
    <common-header activeIndex="fullviews"></common-header>
    <el-card style="margin-top:100px; width:400px;">
      <div slot="header">
        <i class="el-icon-printer"></i>
      </div>
      <div id="myEchart" style="width:400px;height:500px;margin:-20px;"></div>
    </el-card>
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
        color:['#F97C80', '#F97C80', '#F97C80', '#F4A972','#F4A972','#F4A972', '#8CE0E2','#8CE0E2','#8CE0E2', '#AB95D5', '#AB95D5','#AB95D5','#82C2F2','#82C2F2','#82C2F2']
      }
    },
    mounted() {
      var myechart = myEchart.init(document.getElementById('myEchart'));
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
          containLabel: true
        },
        legend: {
          itemWidth: 20,
          selectedMode: 'single',
          data: ['增速', '销量']
        },
        xAxis: [{
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisTick: {
            show: false
          },
          data: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011',
            '2012', '2013', '2014', '2015', '2016'
          ]
        }],
        yAxis: {
          type: 'value',
          name: '增速',
          position: 'left',
          axisTick: {
            show: false
          }
        },
        series: [this.getSerias('增速', [45, 37, 35, 32, 25, 21, 15, 13, 13, 13, 11, 6, 6, 4,  4, 2, 1]),
          this.getSerias('销量', [209, 236, 325, 439, 507, 576, 722, 879, 938, 1364, 1806, 1851, 1931, 2198, 2349, 2460,
            2735
          ])
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myechart.setOption(option);
      // 处理点击事件并且跳转到相应的百度搜索页面
      myechart.on('click', function (params) {
        console.log(params)
      });
      myechart.on('legendselectchanged', function (params) {
        option.yAxis.name = params.name
        myechart.setOption(option);
      });
    },
    methods: {
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
      }
    }
  }

</script>
