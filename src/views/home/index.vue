<template>
<!-- 最外层容器 -->
 <el-container>
   <!-- 左侧导航 -->
   <el-aside style="width:200px; background:#323745;"><layout-aside></layout-aside></el-aside>
   <!-- 右侧 -->
   <el-container>
     <!-- 头部 -->
     <el-header><layout-header></layout-header></el-header>
     <!-- 主要区域 -->
     <el-main style="margin:0;padding:0;"> <router-view></router-view> </el-main>
   </el-container>
 </el-container>
</template>

<script>
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
export default {
  // components: {
  //   'layout-aside': layoutAside,
  //   'layout-header': layoutHeader
  // }
//   methods: {
//     handleOpen (key, keyPath) {
//       console.log(key, keyPath)
//       },
//     handleClose (key, keyPath) {
//       console.log(key, keyPath)
//       }
//   }
}
</script>

<style>

</style>
