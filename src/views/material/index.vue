<template>
  <el-card class="material">
      <bread-crumb slot="header">
      <template slot="title">
         素材管理
      </template>
      </bread-crumb>
    <el-upload :show-file-list="false" :http-request="uploadImg" action="" class='upload-btn'>
      <el-button size='small' type='primary'>上传图片</el-button>
    </el-upload>
      <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="全部素材" name="all">
            <!-- 全部素材的内容 -->
            <div class="card-list">

              <el-card class="img-card" v-for="item in list" :key="item.id">

              <img :src="item.url" alt="">

              <el-row class='operate' type='flex' align="middle" justify='space-around'>

                <i @click='collectOrCancel(item)' :style="{color:item.is_collected ? 'red' : ''}" class="el-icon-star-on"></i>
                <i @click='delImg(item)' class="el-icon-delete-solid"></i>

              </el-row>

              </el-card>
            </div>
          <el-row type="flex" justify='center'>
            <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total"
              background
              layout="prev, pager, next">
            </el-pagination>
          </el-row>

          </el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect">
            <div class="card-list">
              <el-card class="img-card" v-for="item in list" :key="item.id">
              <img :src="item.url" alt="">
              </el-card>
            </div>
          <el-row type="flex" justify='center'>
            <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total"
              background
              layout="prev, pager, next">
            </el-pagination>
          </el-row>
          </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 选择完图片执行
    uploadImg (params) {
      // formadata类型
      let obj = new FormData()
      obj.append('image', params.file)
      this.$http({
        url: '/user/images', // 同样的地址 不同类型
        method: 'post',
        data: obj
      }).then(() => {
        this.getMaterial()
      })
    },
    // 收藏或者取消收藏
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${mess}收藏这张图片?`, '提示').then(() => {
        // 确定收藏或者取消收藏
        this.$http({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: { collect: !item.is_collected } // 取相反
        }).then(() => {
          this.getMaterial() // 重新加载
        })
      })
    },
    delImg (item) {
      this.$confirm('您确定删除此图片吗?', '提示').then(() => {
        // 确定要删除
        this.$http({
          url: `/user/images/${item.id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial() // 请求最新的数据
    },
    //  切换页签
    changeTab () {
      // this.activeName是最新的页签
      // 加载不同类型的数据
      // all => 所有数据
      // collect => 去加载收藏数据
      this.page.page = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$http({
        url: '/user/images',
        params: {
          page: this.page.page, // 默认第一次第一页
          per_page: this.page.pageSize, // 默认10条
          collect: this.activeName === 'collect'
          // collect 为false 就是查全部数据 collect 为true 就是查收藏数据
        }
      }).then(result => {
        this.list = result.data.results // 接收数据
        this.page.total = result.data.total_count // 将图片总数赋值总页
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.material {
  .upload-btn {
    position: absolute;
    right: 20px;
    margin-top: -10px;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card {
      width: 180px;
      height: 180px;
      margin: 30px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .operate {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 30px;
        font-size: 20px;
        background: #f4f5f6;
      }
    }
  }
}
</style>
