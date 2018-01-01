<style scoped>
  .grid-content {
    box-sizing: border-box;
    min-height: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 3px;
    border: 1px solid #dcdfe6;
    font-size: 12px;
    word-wrap: break-word;
    white-space: pre;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .grid-content:empty::before {
    content: attr(data-placeholder);
    color: #C0C4CC;
  }

  .grid-content:focus::before {
    content: none;
  }

</style>
<template>
  <div class="tool-box">
    <common-header activeIndex="tool-box"></common-header>
    <br>
    <br>
    <br>
    <br>
    <br>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="违禁词" name="illegal">
        <el-row :gutter="10" type="flex" justify="space-around">
          <el-col :xs="9" :sm="9" :md="9" :lg="11" :xl="11">
            <common-textarea v-model="content" :contenteditable="true" @change="handleChange"></common-textarea>
          </el-col>
          <el-col :xs="9" :sm="9" :md="9" :lg="11" :xl="11">
            <div class="grid-content">
              <span v-for="(item,key) in myData" :key="key" v-bind:style="{color:item.style}">{{item.value}}</span>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="录入信息" name="information">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="录入信息" prop="information" auto-complete="off">
            <el-input type="textarea" v-model="ruleForm2.information"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button style="backgroundColor:#F5F7FA;" @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="测试公式" name="betatest">
        <b> 选择：</b>
        <el-radio-group v-model="productName" @change="handleSelect">
          <el-radio label="牛仔裤">牛仔裤</el-radio>
          <el-radio label="打底裤">打底裤</el-radio>
        </el-radio-group>
        <br>
        <b> 输入</b>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <div>
          <b>结果：</b>{{result}}</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import commonHeader from "../common/Header.vue"
  import commonTextarea from "../common/Textarea.vue"
  export default {
    components: {
      commonHeader,
      commonTextarea
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (this.ruleForm2.information !== '') {
          this.$refs.ruleForm2.validateField('information');
        }
      };
      return {
        activeName: "illegal",
        value: "",
        content: "",
        array: [
          ['最佳', '最具', '最爱', '最赚', '最优', '最好', '最大', '最高级', '最高档', '最高', '最奢侈', '最低级', '最低价', '最低', '最底']
          ['最便宜', '最流行', '最受欢迎', '最时尚', '最聚拢', '最符合', '最舒适', '最先进', '最先', '最后', '最新科技', '最新科学', '最新'],
          ['中国', '全网', '国际', '国内', '全球级', '独家', '国家级', '销量', '排名', '国家', '全球', '宇宙级', '世界级', '绝对', '精确', '顶级'],
          ['NO.1', 'No.1', 'no.1', 'TOP.1', 'Top.1', 'top.1', '第一', '唯一', '独一', '首个', '首选', '首发', '首次', '首款', '首家'],
          ['一流', '仅此一天', '仅此一次', '仅此一款', '一波'],
          ['史无前例', '前无古人', '永久', '万能', '祖传', '特效', '无敌', '纯天然', '100%', '高档', '正品', '真皮', '超赚', '精准'],
          ['大牌', '金牌', '名牌', '王牌', '领袖品牌', '领先', '领导者', '缔造者', '创领品牌', '上市', '巨星', '著名', '掌门人'],
          ['至尊', '巅峰', '奢侈', '优秀', '资深', '领袖', '之王', '王者', '冠军', '老字号', '驰名商标', '特供', '专供', '免检', '检测', '免抽检', '推荐'],
          ['就没', '再不抢就', '疯抢', '抢疯', '卖疯', '抢购', '抢爆', '秒杀', '有惊喜', '点击', '领奖', '恭喜', '获奖', '免单', '领取奖品', '获取', '最']
        ],
        rule: /最(佳|具|爱|赚|优|好|大|高级|高档|高|奢侈|低级|低价|低|底|便宜|流行|受欢迎|时尚|聚拢|符合|舒适|先进|先|后|新科技|新科学|新)|((中国|全网|国际|国内|全球级|独家|国家级|销量|排名|国家|全球|宇宙级|世界级|绝对|精确|顶级)|(NO.1|No.1|no.1|TOP.1|Top.1|top.1|第一|唯一|独一|首个|首选|首发|首次|首款|首家)|(一流|仅此一天|仅此一次|仅此一款|一波))|(史无前例|前无古人|永久|万能|祖传|特效|无敌|纯天然|100%|高档|正品|真皮|超赚|精准|大牌|金牌|名牌|王牌|领袖品牌|领先|领导者|缔造者|创领品牌|上市|巨星|著名|掌门人|至尊|巅峰|奢侈|优秀|资深|领袖|之王|王者|冠军|老字号|驰名商标|特供|专供|免检|检测|免抽检|推荐|就没|再不抢就|疯抢|抢疯|卖疯|抢购|抢爆|秒杀|有惊喜|点击|领奖|恭喜|获奖|免单|领取奖品|获取|最)/g,
        myData: [],
        productName: '牛仔裤',
        input: '',
        result: '',
        file: {},
        textarea2: '',
        ruleForm2: {
          information: ''
        },
        rules2: {
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }]
        }
      }
    },
    mounted() {
      this.handleSelect()
    },
    methods: {
      handleClick(item) {
        console.log(item.name)
      },
      handleChange(value) {
        this.myData = []
        var string = value
        console.log(string.replace(this.rule, '♫$&♀'))
        string.replace(this.rule, '♫$&♀').split('♀').map((item) => {
          var _item0 = item.split('♫')[0]
          var _item1 = item.split('♫')[1]
          this.myData.push({
            'style': 'black',
            'value': _item0
          }, {
            'style': 'red',
            'value': _item1
          })
        })
      },
      handleSelect() {
        this.$http.get('tool-box', {
          params: {
            name: 'betatest',
            product: this.productName
          }
        }).then((response) => {
          console.log(response)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('验证成功')
            this.$http.post('property-deal', this.ruleForm2).then(response => {
              console.log(response)
              this.$notify({title:'录入信息',message: response.data})
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }

</script>
