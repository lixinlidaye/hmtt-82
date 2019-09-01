<template>
  <!-- 用el-row el-col -->
    <el-row class="layout-header" type='flex' justify='space-between'>
        <!-- span 是给col的宽度  elementUI将页面分为2 4 分 -->
        <el-col class="left" :span="6">
            <i class="el-icon-s-unfold"></i>
            <span>爱谁谁有限公司</span>
        </el-col>
        <el-col class="right" :span="2">
            <!-- <img class="head-img" src="../../assets/img/avatar.jpg" alt=""> -->
            <!-- 属性不给: 就相当于字符串 -->
            <img class="head-img" :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
        <el-dropdown trigger="click">
            <!-- 匿名插槽 -->
            <span class="el-dropdown-link">
            {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-position">git地址</el-dropdown-item>
            <el-dropdown-item icon="el-icon-more">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    // 获取用户数据
    getUserInfor () {
      let token = window.localStorage.getItem('user-token') // 获取token
      this.$http({
        url: '/user/profile',
        header: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        this.userInfo = res.data.data
      })
    }
  },
  created () {
    this.getUserInfor()
  }
}
</script>

<style lang='less' scoped>
    .layout-header {
        padding:8px 0;
        .left {
            .el-icon-s-unfold{
                font-size:22px;
                margin-right: 3px;
            }
            display: flex;
            align-items: center;
        }
        .right {
            display: flex;
            align-items: center;
            .head-img{
                border-radius: 50%;
                margin-right: 5px;
                width: 40px;
                height: 40px;
            }
        }
    }
</style>
