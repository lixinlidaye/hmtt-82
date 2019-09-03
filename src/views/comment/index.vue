<template>
  <!-- 最外层 el-card 卡片组件 -->
  <el-card v-loading="loading">
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
      <el-row type='flex' justify='center' style='margin:15px'>
          <!-- 分页组件  -->
            <el-pagination
            @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total"
            background
            layout="prev, pager, next">
            </el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false, // 控制进度条的状态
      list: [],
      page: {
        page: 1, // 当前页码
        pageSize: 10, // 当前每页条数
        total: 0 // 总条数
      }
    }
  },
  methods: {
    changePage (newPage) {
      // 给当前页码更新最新值
      this.page.page = newPage
      this.getComments() // 获取最新页码的数据
    },
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论?`, '提示').then(() => {
        this.$http({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
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
      this.loading = true // 请求数据前 把进度条打开
      // query 参数 就相当于get参数 路径参数 url 参数
      this.$http({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.page, per_page: this.page.pageSize }
      }).then(result => {
        this.loading = false
        // console.log(result.data)
        this.list = result.data.results
        this.page.total = result.data.total_count
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
