<template>
  <!-- 最外层 el-card 卡片组件 -->
  <el-card>
      <bread-crumb slot="header">
        <!-- 面包屑的具名 插槽  -->
        <template slot="title">评论列表</template>
      </bread-crumb>
      <!-- 表格 -->
      <el-table :data="list">
          <el-table-column label="标题" prop='title' width="600"></el-table-column>
          <el-table-column label="评论状态" prop='comment_status' :formatter="formatter"></el-table-column>
          <el-table-column label="总评论数" prop='total_comment_count'></el-table-column>
          <el-table-column label="粉丝评论数" prop='fans_comment_count'></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="obj">
              <el-button size="small" type='text'>修改评论</el-button>
              <el-button size="small" type='text' @click="openOrClose(obj.row)" :style="{color:obj.row.comment_status ? '#E6A23C' : '#409EFF'}">{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
              </template>
          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论?`, '提示').then(() => {
        this.$http({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id },
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          this.getComments()
        })
      })
    },
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      // query 参数 就相当于get参数 路径参数 url 参数
      this.$http({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        // console.log(result.data)
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getComments()
  }
}

</script>

<style>

</style>
