<template>
  <div class="login-body">
    <div class="login-container">
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
          <el-checkbox v-model="checked"  @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {reactive, ref, toRefs } from 'vue'

export default {
  name: 'login',
  components:{

  },
  setup() {
    const loginForm = ref(null)
    const state = reactive({
      ruleForm: {
        username: '',
        password: ''
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
    const submitForm = async () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          axios.post('/adminUser/login', {
            userName: state.ruleForm.username || '',
            passwordMd5: md5(state.ruleForm.password)
          }).then(res => {
            localSet('token', res)
            window.location.href = '/'
          })
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
  width: 500px;
  height: 309px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
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

.el-checkbox {
  --el-checkbox-checked-text-color:#8AAA9F;
  --el-checkbox-checked-input-border-color:#8AAA9F;
  --el-checkbox-checked-bg-color:#8AAA9F;
  --el-checkbox-input-border-color-hover:#8AAA9F;
}
</style>