<style>
  #User .comment-header .el-menu--horizontal {
    border-bottom: 0px;
  }

  #User .comment-Body {
    position: relative;
    color: #fff;
    height: 700px;
    background: linear-gradient(45deg, rgb(36, 41, 46) 0, rgba(52, 192, 227, 1) 100%);
  }
  #User .comment-Body a {
    text-decoration: none;
    color:rgb(44, 148, 173);
    font-size:14px;
  }
  #User .comment-Body .container {
    /* text-align: center; */
    height: 100%;
    top: 200px;
    width: 350px;
    position: absolute;
    left: calc(50% - 175px);
  }

  #User .comment-Body::after {
    background: url('../assets/home-back-image.png') repeat center center;
    content: '';
    z-index: -1;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: .4;
  }

  #User .comment-Body .container .btn-shadow {
    padding: 10px 20px;
    background-color: rgb(52, 192, 227);
    box-shadow: inset 0 -4px 0 rgb(44, 148, 173);
    border-radius: 4px;
    border: 0;
    font-size: 18px;
    color: #fff;
  }

  #User .comment-Body .container .btn-text {
    color: #909399;
  }

  .comment-validator {
    text-align: left;
    z-index: 10;
    width: 100%;
  }

  @media screen and (max-width: 420px) {
    .comment-validator {
      width: 90%;
      right: 0%;
    }
  }

  .comment-validator>.el-card>.el-card__header {
    background-color: #f5f7fa;
  }

</style>
<template>
  <div id="User">
    <common-header activeIndex='user'></common-header>
    <div class="comment-Body">
      <div class="container">
        <div class="comment-validator">
          <el-card>
            <div slot="header">
              <span style="fontSize:18px;fontWeight: bold;">{{header}}</span>
            </div>
            <div>
              <el-form :model="userForm" ref="ruleForm" v-on:submit.prevent="onSubmit">
                <el-form-item v-show="type!=='login'" prop="id">
                  <el-input v-model="userForm.id" placeholder="请输入邀请码"></el-input>
                </el-form-item>
                <el-form-item prop="name">
                  <el-input v-model="userForm.name" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item v-show="type!=='modify'" prop="password">
                  <el-input type="password" placeholder="密码" v-model="userForm.password" @keyup.enter.native="onSubmit"></el-input>
                </el-form-item>
                <el-form-item v-show="type=='register'" prop="checkPass">
                  <el-input type="password" placeholder="确认密码" v-model="userForm.checkPass"></el-input>
                </el-form-item>
                <el-form-item>
                  <button @click.prevent="onSubmit" style="width:100%;" class="btn-shadow">{{userForm.btntext}}</button>
                </el-form-item>
              </el-form>
              <div style="height:18px;">
                <router-link :to="{ name: 'User', params: { type: footer.left.params }}">{{footer.left.text}}</router-link>
                <div style="float:right;">
                  {{footer.switch}}
                  <router-link :to="{ name: 'User', params: { type: footer.right.params }}">{{footer.right.text}}</router-link>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <commonFooter></commonFooter>
  </div>
</template>
<script>
  import commonHeader from "./common/Header.vue";
  import commonFooter from './common/Footer.vue';
  export default {
    components: {
      commonHeader,
      commonFooter
    },
    name: "User",
    props: {
      type: {
        type: String,
        default: "login"
      }
    },
    data() {
      return {
        header: '密码登录',
        userForm: {
          id: "",
          name: "",
          password: "",
          checkPass: "",
          btntext: "登录"
        },
        footer: {
          left: {params:'modify',text:'忘记密码»'},
          switch: ' 还没有用户账号？',
          right:  {params:'register',text:'点击注册»'},
        }
      };
    },
    watch: {
      type:'switchType'
    },
    created() {

    },
    beforeDestroy(){
      
    },
    methods: {
      switchType(){
         if (this.type == 'login') {
          this.header = '密码登录'
          this.userForm.btntext = '登录'
          this.footer.left.text = '忘记密码»'
          this.footer.left.params = 'modify'
          this.footer.switch = '还没有用户账号？'
          this.footer.right.text = '点击注册»'
          this.footer.right.params = 'register'
        } else if (this.type == 'register') {
          this.header = '用户注册'
          this.userForm.btntext = '注册'
          this.footer.left.text = ''
          this.footer.switch = '已有帐号？'
          this.footer.right.text = '去登录»'
          this.footer.right.params = 'login'
        } else {
          this.header = '找回密码'
          this.userForm.btntext = '找回密码'
          this.footer.left.text = ''
          this.footer.switch = '想起来了？'
          this.footer.right.text = '去登录»'
          this.footer.right.params = 'login'
        }
      },
      onSubmit() {
        this.$http.post(this.type, this.userForm).then(response => {
          if (this.type=='login' && response.data.code == 200) {
            this.$message(response.data.msg);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push({
              name: "StoreViews",
              path: "/fullviews"
            });
          }else if(this.type=='modify' && response.data.code == 200){
            this.$message(response.data.msg);
            this.$message(response.data.password);
          }else if(this.type=='register' && response.data.code == 200){
            this.$message(response.data.msg);
            this.$router.push({
              name: "User",
              path: "/user/login"
            });
          }else{
            if(response.data.code==404){
              this.$message(response.data.msg);
            }else{
              this.$message('未知服务错误')
            }
            
          }
        })
      }
    }
  };

</script>
