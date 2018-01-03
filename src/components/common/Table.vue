<style scoped>

.comment-table a {
  color: #0366D6;
  text-decoration-line: none;
}
</style>
<!--
table 模板为多个类目共用，每个类目的数据结构又不相同这里使用v-if配合路由切换tabel的显示隐藏;
-->
<template>
  <!--第一个模板：类目趋势-->
  <el-table v-if="$route.name==='ProductTrend'" :data="tableData" class="comment-table">
    <el-table-column label="排名" width="50" header-align="center" align="center">
      <template slot-scope="scope">
        <el-tooltip placement="left" effect="light">
          <div slot="content">点击显示商品
            <br>发展周期</div>
          <span style="cursor:pointer;">{{scope.row.热销排名}}</span>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="主图缩略图" header-align="center" align="center" width="80">
      <template slot-scope="scope">
        <a target="_blank" alt="" :href="scope.row.主图缩略图">
          <img style="height:44px;" :src="scope.row.主图缩略图" alt="店铺图片">
        </a>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip :label="tableTitle[2]" header-align="center" align="center">
      <template slot-scope="scope">
        <a target="_blank" :href="scope.row.宝贝链接" alt="">{{scope.row.商品信息}}</a>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="所属店铺" :label="tableTitle[3]" header-align="center" align="center" width="150">
      <template slot-scope="scope">
        <a target="_blank" :href="scope.row.店铺链接">{{scope.row.所属店铺}}</a>
      </template>
    </el-table-column>
    <el-table-column :prop="tableTitle[4]" :label="tableTitle[4]" :formatter="contentFormatter" header-align="right" align="right"
      width="120"></el-table-column>
    <el-table-column :prop="tableTitle[5]" :label="tableTitle[5]" :formatter="contentFormatter" header-align="right" align="right"
      width="120"></el-table-column>
    <el-table-column :prop="tableTitle[6]" :label="tableTitle[6]" :formatter="contentFormatter" header-align="right" align="right"
      width="120"></el-table-column>
    <el-table-column v-for="(title,id) in tableTitle" :key="id" v-if="title.slice(0,2) === '日期'" :prop="title" :render-header="renderHeader"
      :formatter="contentFormatter" align="right" header-align="right" width="60"></el-table-column>
    <el-table-column header-align="center" align="center" label="操作" width="120">
      <template slot-scope="scope">
        <a target="_blank" :href="scope.row.查看详情" value='' alt=""> 查看详情</a>
        <br>
        <a target="_blank" :href="scope.row.同款货源" alt="">同款货源</a>
      </template>
    </el-table-column>
  </el-table>
  <!--第二个模板：行业热词榜-->
  <el-table v-else-if="$route.name==='ProductWorld'" :data="tableData" class="comment-table">
    <el-table-column v-for="(title,key) in tableTitle" :key="key" :prop="title" :label="title" :formatter="contentFormatter"
      :render-header="renderHeader"></el-table-column>
  </el-table>
  <!--第三个模板：属性洞察-->
  <el-table v-else :data="tableData" class="comment-table">
    <el-table-column prop="热销排名" label="排名" width="50" header-align="center" align="center"></el-table-column>
    <el-table-column :label="tableTitle[0]" header-align="center" align="center" width="80">
      <template slot-scope="scope">
        <a target="_blank" :href="scope.row.主图缩略图" alt="没图抱歉">
          <img style="height:44px;" :src="scope.row.主图缩略图" alt="没图抱歉">
        </a>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip :label="tableTitle[2]" header-align="center" align="center">
      <template slot-scope="scope">
        <a target="_blank" :href="scope.row.宝贝链接" alt="">{{scope.row.商品信息}}</a>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="所属店铺" :label="tableTitle[3]" header-align="center" align="center" width="150">
      <template slot-scope="scope">
        <a target="_blank" :href="scope.row.店铺链接">{{scope.row.所属店铺}}</a>
      </template>
    </el-table-column>
    <el-table-column :prop="tableTitle[4]" :label="tableTitle[4]" :formatter="contentFormatter" header-align="right" align="right"
      width="120"></el-table-column>
    <el-table-column :prop="tableTitle[5]" :label="tableTitle[5]" :formatter="contentFormatter" header-align="right" align="right"
      width="120"></el-table-column>
    <el-table-column :prop="tableTitle[6]" :label="tableTitle[6]" :formatter="contentFormatter" header-align="right" align="right"
      width="120"></el-table-column>
    <el-table-column v-for="(title,key) in tableTitle" :key="key" v-if="title.slice(0,2)=='日期'" :prop="title" :render-header="renderHeader"
      :formatter="contentFormatter" align="right" header-align="right" width="60"></el-table-column>
    <el-table-column header-align="center" align="center" label="操作" width="120">
      <template slot-scope="scope">
        <a target="_blank" :href="scope.row.查看详情" value='' alt=""> 查看详情</a>
        <br>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    props: {
      tableData: {
        type: Array,
        required: true
      },
      tableTitle: {
        type: Array,
        required: true
      },
      picDetail: ''
    },
    methods: {
      renderHeader(h, { //elememt-ui中tabel组件的renderHeader方法
        column,
        $index
      }) {
        //格式化显示表头
        return column.label = column.property.indexOf('日期') === 0 ? column.property.slice(-4, -2) + "-" + column.property.slice(-2) : column.property
      },
      contentFormatter(row, column, cellValue) { //elememt-ui中tabel组件的contentFormatter方法
        let reg = String(cellValue).replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); //格式化显示千分符
        let percent = Math.round(cellValue * 100) + "%"; //格式化百分数
        console.log(column.property==undefined)
        if (column.property.slice(0, 2) == "日期") {
          if (cellValue == null) {
            return "";
          } else {
            const fm = this.$store.state.products.params.extraShown;
            switch (fm) {
              case "支付子订单数":
                return (cellValue = reg);
                break;
              case "交易增长幅度":
                return (cellValue = percent);
                break;
              case "支付转化率指数":
                return (cellValue = reg);
                break;
              case '支付转化率':
                return cellValue = percent;
                break;
              case '点击率':
                return cellValue = percent;
                break;
              case '词均搜索增长幅度':
                return cellValue = percent;
                break;
              case '搜索增长幅度':
                return cellValue = percent;
                break;
              case '相关搜索词数':
                return cellValue = reg;
                break;
              case '搜索人气':
                return cellValue = reg;
                break;
              case '点击人气':
                return cellValue = reg;
                break;
              case '直通车参考价':
                return cellValue = '￥' + parseFloat(cellValue).toFixed(2);
                break;
              case '支付件数':
                return cellValue = cellValue;
                break;
              default:
                return (cellValue = cellValue);
                break;
            }
          }
        } else {
          switch (column.property) {
            case "支付子订单数":
              return (cellValue = reg);
              break;
            case "交易增长幅度":
              return (cellValue = percent);
              break;
            case "支付转化率指数":
              return (cellValue = reg);
              break;
            case '支付转化率':
              return cellValue = percent;
              break;
            case '点击率':
              return cellValue = percent;
              break;
            case '词均搜索增长幅度':
              return cellValue = percent;
              break;
            case '搜索增长幅度':
              return cellValue = percent;
              break;
            case '相关搜索词数':
              return cellValue = reg;
              break;
            case '搜索人气':
              return cellValue = reg;
              break;
            case '点击人气':
              return cellValue = reg;
              break;
            case '直通车参考价':
              return cellValue = '￥' + parseFloat(cellValue).toFixed(2);
              break;
            case '支付件数':
              return cellValue = reg;
              break;
            default:
              return (cellValue = cellValue);
              break;
          }
        }
      }
    }
  }

</script>
