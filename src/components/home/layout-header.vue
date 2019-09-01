<template>
  <!-- 用el-row el-col -->
    <el-row class="layout-header" type='flex' justify='space-between'>
        <el-col class="left" :span="6">
            <i class="el-icon-s-unfole"></i>
            <span>爱谁谁有限公司</span>
        </el-col>
        <el-col class="right" :span="2">
            <img class="head-img" src="../../assets/img/avatar.jpg" alt="">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
             下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
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

}
</script>

<style lang='less' scoped>
    .layout-header {
        padding:8px 0;
        .left {
            .icon{
                font-size:22px;
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
