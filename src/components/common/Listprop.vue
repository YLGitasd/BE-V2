<style scoped>
.attribute-list {
    background-color: #F5F7FA;
    position: absolute;
    top: 103px;
    left: 300px;
    height: 0px;
    overflow: hidden;
    width: 800px;
    z-index:11;
    color: #24292e;
  }

  .attribute-list .list-body {
    position: relative;
    border-top: 1px dotted #DADADA;
  }

  .attribute-list .list-body dd,
  dt {
    margin: auto 10px;
    display: inline-block;
    font-size: 12px;
    line-height: 30px;
  }

  .attribute-list .list-body dt {
    font-size: 14px;
  }

  .list-body dd ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

  .list-body dd ul li {
    display: inline-block;
    cursor: pointer;
    margin: 2px 20px 2px 0;
    border: 1px solid transparent;
    padding: 0 5px;
  }
  .list-body dd ul li:hover {
   color:#34C0E3;
   border: 1px solid #34C0E3;
   cursor: pointer;
  }
</style>

<template>
  <div>
      <dl class="attribute-list" style="height:220px;">
        <div class="list-title">
          <dt>已选</dt>
          <dd>
            <ul>
              <li v-for="(item,key) in selectName" :key="key">{{item}}</li>
              <i class="el-icon-arrow-down"></i>
              <i class="el-icon-arrow-up"></i>
            </ul>
          </dd>
        </div>
        <div class="list-body" v-for="(item,key) in listProp" :key="key">
          <dt>
            <b>{{item.label}}</b>
          </dt>
          <dd>
            <ul>
              <li v-for="(value,k) in item.data" :key="k">{{value}}</li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
</template>
<script>
export default {
  props:{
      listProp: {
        type: Array,
        required:true
      },
      selectName:{
        type: Array,
        required:true,
        default:['铅笔裤']
      }
  }
}
</script>
