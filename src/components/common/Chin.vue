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
  <div class="comment-Chin">
    <el-row type="flex" justify="end" align="middle">
      <el-col :md="3" :lg="4" :xl="4" class="hidden-sm-and-down comment-Chin-title">
        <div>
          <h3>{{chinTitle}}</h3>
        </div>
      </el-col>
      <el-col class="comment-Chin-list">
        <el-date-picker v-model="dateTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" size="small"
          @change="timeSelectChanged"></el-date-picker>
        <span >
          <el-select v-model="productStyle">
            <el-option v-for="item in chinOptions[0]" :key="item.value" :label="item.label" :value="item.value" @change="chinSelectChanged(productStyle)">
            </el-option>
          </el-select>
        </span>
           <span>
          <el-select v-model="extraShown">
            <el-option v-for="item in chinOptions[1]" :key="item.value" :label="item.label" :value="item.value" @change="chinSelectChanged(extraShown)">
            </el-option>
          </el-select>
        </span>
           <span>
          <el-select v-model="timeLen">
            <el-option v-for="item in chinOptions[2]" :key="item.value" :label="item.label" :value="item.value" @change="chinSelectChanged(timeLen)">
            </el-option>
          </el-select>
        </span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
  } from "vuex";
  export default {
    props: {
      chinTitle: {
        type: String
      },
      chinOptions: {
        type: Array,
        required: true
      },
      chinSelect: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        productStyle: "",
        extraShown:'',
        timeLen:'',
        dateTime: ""
      };
    },
    methods: {
      timeSelectChanged() {
        console.log(this.dateTime, this.chinSelect)
      },
      chinSelectChanged(v){
        console.log(v)
       
      }
    }
  }

</script>
