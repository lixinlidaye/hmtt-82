<template>
  <div class='login'>
      <el-card class="login-card">
          <div class="logo">
              <img src="../../assets/img/logo_index.png" alt="黑马头条">
          </div>
          <!-- 表单组件  el-form表单容器 -->
          <!-- 数据校验 首先要给el-form 一个model属性 表示数据对象 -->
          <el-form ref='loginForm' :model="loginForm" :rules="loginRules" style='margin-top:20px'>
              <!-- 表单项 -->
              <!-- prop 绑定需要验证校验的字段名 但是不写loginForm.mobile  只写mobile -->
              <el-form-item prop="mobile">
                  <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input v-model="loginForm.code" placeholder="请输入验证码"  style="width:250px"></el-input>
                 <el-button style="float:right">获取验证码</el-button>
              </el-form-item>
              <el-form-item prop="check">
                  <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
               <el-form-item>
                 <el-button @click="login" type="primary" style="width:100%">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let func = (rule, value, callBack) => {
      if (value) {
        callBack()
      } else {
        callBack(new Error('你必须无条件同意被坑'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      // 定义 rules 校验规则 表单是根据规则去校验的
      loginRules: {
        mobile: [{
          required: true, // 意味着必填
          message: '手机号不能为空' // 如果没有满足要求  就会提示message内容
        }, {
          pattern: /^1[3456789]\d{9}$/, // 正则表达式
          message: '手机号格式不正确'
        }],
        code: [{
          required: true, // 意味着必填
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码必须为六位'
        }],
        check: [{
          validator: func
        }]
      }
    }
  },
  methods: {
    login () {
      // 通过el-Form组件的validata方法 校验整个表单数据
      // 传入一个回调函数 isOk为true 说明 所有的校验负责都成功了
      // 如果为false  说明有错误
      this.$refs.loginForm.validate((isOk) => {
      })
    //   this.$message('提示')
    }
  }
}
</script>

<style lang="less" scoped>
// 用less 需要lang属性
// scoped 只针对当前组件样式起作用
.login {
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
        width: 450px;
        height: 350px;
        .logo {
            text-align: center;
            img {
                height: 45px;
            }

        }
    }
}
</style>
