<style scoped>
.comment-validator {
   margin: 10% 5%;
   width: 300px;
   position: absolute;
   right: 5%;
}
@media screen  and (max-width: 420px){
  .comment-validator {
    margin: 10% 5%;
    width: 90%;
    right: 0%;
  }
}
</style>
<template>
  <div class="comment-validator">
    <el-card>
      <div class="comment-validator-title">
        <b> 密码登录</b>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-on:submit.prevent="onLogin">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="onLogin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onLogin">登录</el-button>
        </el-form-item>
        <el-button type="text">注册</el-button>
        <el-button type="text">找回密码</el-button>
        <el-button type="text">无用户登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
    data() {
      return {
        ruleForm: {
          name: '',
          password: '',
        },
        rules: {
          name: [{
            required: true,
            message: '请输入用户名 ',
            trigger: 'blur'
          }, ],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      };
    },
    methods:{
       onLogin() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {    
            this.$http.post('/user/login',this.ruleForm).then((response) => {
              if(response.data.code ==200){
                this.$message(response.data.msg)
                this.$store.commit('SET_USER',response.data.user)
                this.$router.push({ name: 'StoreViews', path: '/fullviews'})
              }
            })
          }
        })
       }    
    }
}
</script>
