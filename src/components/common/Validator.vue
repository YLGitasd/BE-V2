<style scoped>
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
.comment-validator > .el-card > .el-card__header {
  background-color: #f5f7fa;
}
</style>
<template>
  <div class="comment-validator">
    <el-card>
      <div slot="header">
        <a style="fontSize:18px;fontWeight: bold;">{{header}}</a>
      </div>
      <div>
        <el-form :model="userForm" ref="ruleForm" v-on:submit.prevent="onLogin">
          <el-form-item v-show="type!=='login'" prop="id">
            <el-input v-model="userForm.id" placeholder="请输入邀请码"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input v-model="userForm.name"  placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item v-show="type!=='modify'" prop="password">
            <el-input type="password"  placeholder="密码" v-model="userForm.password" @keyup.enter.native="onLogin"></el-input>
          </el-form-item>
           <el-form-item v-show="type=='register'" prop="checkPass">
            <el-input type="password" placeholder="确认密码"  v-model="userForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item>
            <button @click="onSubmit" style="width:100%;" class="btn-shadow">{{userForm.btntext}}</button>
          </el-form-item>
        </el-form>
        <div style="fontSize:14px;height:18px;">
          <a style="color:rgb(44, 148, 173)" @click="switchModify">{{footer.left}}</a>
          <div style="float:right;">
            {{footer.switch}}
            <a style="color:rgb(44, 148, 173)" @click="transfer">{{footer.right}}</a>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
          type:'login',
          header:'密码登录',
          userForm:{
            id:"",
            name: "",
            password: "",
            checkPass:"",
            btntext:"登录"
          },
          footer:{
            left:'忘记密码»',
            switch:' 还没有用户账号？',
            right:'点击注册»'
          }
      };
    },
    methods: {
      onSubmit() {
        this.$http.post("/user/"+this.type, this.userForm).then(response => {
          console.log(response)
          // if (response.data.code == 200) {
          //   this.$message(response.data.msg);
          //   this.$store.commit("SET_USER", response.data.user);
          //   this.$router.push({
          //     name: "StoreViews",
          //     path: "/fullviews"
          //   });
          // }
        })
      },
      switchModify(){
        this.type = 'modify'
        this.header = '找回密码'
        this.userForm.btntext='找回密码'
        this.footer.left= ''
        this.footer.switch='想起来了？'
        this.footer.right='去登录»'
      },
      switchRegister(){
        this.type = 'register'
        this.header = '用户注册'
        this.userForm.btntext='注册'
        this.footer.left= ''
        this.footer.switch='已有帐号？'
        this.footer.right='去登录»'
      },
      switchLogin(){
        this.type = 'login'
        this.header = '密码登录'
        this.userForm.btntext='登录'
        this.footer.left= '忘记密码»'
        this.footer.switch='还没有用户账号？'
        this.footer.right='点击注册»'
      },
      transfer(){
        if(this.type == 'login'){
          this.switchRegister()
        }else if(this.type == 'register'){
          this.switchLogin()
        }else{
          this.switchLogin()
        }
      }
    }
  };

</script>
