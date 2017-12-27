<style scoped>
.list-attribute {
    background-color: #F5F7FA;
    position: absolute;
    top: 103px;
    left: 300px;
    border: 1px solid #DADADA;
    width: 800px;
    z-index:2;
    color: #24292e;
  }

  .list-attribute .list-item {
    position: relative;
    border-top: 1px dotted #DADADA;
  }

  .list-attribute .list-item dd,
  dt {
    margin: auto 10px;
    display: inline-block;
    font-size: 12px;
    line-height: 30px;
  }

  .list-attribute .list-item dt {
    font-size: 14px;
  }

  .list-item dd ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

  .list-item dd ul li {
    display: inline-block;
    cursor: pointer;
    margin: 2px 20px 2px 0;
    border: 1px solid transparent;
    padding: 0 5px;
  }
  .list-item dd ul li:hover {
   color:#34C0E3;
   border: 1px solid #34C0E3;
   cursor: pointer;
  }
</style>

<template>
  <div>
      <dl class="list-attribute">
        <div class="list-item">
          <dt>已选</dt>
          <dd>
            <ul>
              <li v-for="(item,key) in selectName" :key="key">{{item}}</li>
            </ul>
          </dd>
        </div>
        <div class="list-item" v-for="(item,key) in listProp" :key="key">
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
