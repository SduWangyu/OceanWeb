<template>
  <div class="login-body">
    <div class="login-container">
      <div class="container">
        <div class="head">
          <img src="../../../assets/mylogo.png" style="width: 70%;">
        </div>
        <el-form label-position="left" label-width="auto" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="padding: 15px;">
            <el-button style="width: 80%;" color="#8AAA9F" type="primary" @click="submitForm">立即登录</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button size="medium" type="text">免费注册</el-button>
          <el-button size="medium" type="text" style="float: right;">忘记密码?</el-button>
        </div>
      </div>
    </div>
  </div>
  <Dialog/>
</template>

<script>
// @ is an alias to /src
import {reactive, ref, toRefs } from 'vue'
import md5 from 'js-md5';
import axios from 'axios'
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {provide} from "vue";
import Dialog from "../../../components/Dialog";

export default {
  name: 'login',
  components:{
    Dialog,
  },
  unmounted() {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  setup() {
    const logErrorMsg = ref("")
    const store = useStore()
    const router = useRouter()
    const loginForm = ref(null)
    const userdata = {}
    const logError = ref(false)
    const logStatus = ref()
    const state = reactive({
      ruleForm: {
        username: '15192684903',
        password: 'oceanstellar123'
      },
      checked: true,
      rules: {
        username: [
          { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
      }
    })
    provide("isShow",logError)
    provide("msg",logErrorMsg)
    function submitForm(){
      loginForm.value.validate((valid)=>{
        if (valid) {
          console.log(state.ruleForm)
          axios({
            url: 'https://openapi.mp.usr.cn/usrCloud/user/login',
            method: 'post',
            data: JSON.stringify({'account': state.ruleForm.username, 'password': md5(state.ruleForm.password)}),
            headers:
                {
                  'Content-Type': 'application/json'
                }
          }).then((returnData) => {
            console.log(returnData.data)
            logStatus.value = returnData.data.status
            switch (logStatus.value){
              case 0:
                userdata.account = returnData.data.data.account
                userdata.token = returnData.data.data.token
                userdata.uid = returnData.data.data.uid
                userdata.tel = returnData.data.data.tel
                store.commit('loginSet',userdata);
                router.push({ name: 'admin' });
                break
              case 1000:
                logErrorMsg.value = "密码错误"
                logError.value = true
                break
              default:
                alert("sss")
            }
          });
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    }

    const resetForm = () => {
      loginForm.value.resetFields();
    }
    return {
      ...toRefs(state),
      loginForm,
      submitForm,
      resetForm
    }
  }
}
</script>
<style scoped>

.login-body {
  position:absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #fff;
  /*background-image: url("../../../assets/background.png");*/
  /*background-size: 100% 100%;*/
}
.login-container {
  width: 45em;
  height: 25em;
  background-color: #fff;
  border-radius: 4px;
  display: flex; align-items: center;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.container{
  margin:auto;
}

.login-form {
  width: 60%;
  margin: 0 auto;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.login-form .el-form-item {
  margin-bottom: 12px;
}
.el-button--small{
  min-height: 40px;
}
.el-input--small .el-input__inner {
  height: 40px;
  line-height: 40px;
}
.el-button--text {
  color: #8AAA9F;
}
</style>