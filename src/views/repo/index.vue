<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="题库名称:">
        <el-input v-model="searchTitle" placeholder="请输入查询内容" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchRepo">查询</el-button>
        <el-button type="primary" @click="addRepoDialogVisible = true">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->

    <el-table
      :data="data.records"
      border
      fit
      highlight-current-row
      :header-cell-style="{
        background: '#f2f3f4',
        color: '#555',
        'font-weight': 'bold',
        'line-height': '32px',
      }"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column fixed label="序号" align="center" width="80">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="题库名称" align="center" />
      <el-table-column prop="realName" label="创建人" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" style="font-size: 14px" @click="updateRow(row)">编辑</el-button>
          <el-button type="text" size="small" style="color: red; font-size: 14px" @click="delRepo(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="data.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="data.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 新增题库 -->
    <RepoDialog v-model="addRepoDialogVisible" title="新增题库" :on-confirm="addRepo" />
    <RepoDialog v-model="dialogFormVisible" title="编辑题库" :update-data="form" :on-confirm="updateRepo" />

  </div>
</template>

<script>
import { repoPaging, repoDel, repoUpdate, repoAdd } from '@/api/repo'
import RepoDialog from '@/components/repo/repoDialog/index.vue'
export default {
  components: {
    RepoDialog
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      isExercise: true,
      data: {},
      addTitle: '',
      delVisible: false,
      searchTitle: '',
      Obj: {},
      formInline: {
        searchTitle: ''
      },
      cancle() { },

      diaTitle: '新增',
      form: {
        title: '',
        isExercise: 0
      },
      formLabelWidth: '120px',
      dialogVisible: false,
      addRepoDialogVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false
    }
  },
  computed: {
    tables() {
      // 在你的数据表格中定义tabels
      const input = this.input
      if (input) {
        return this.tableData.filter((data) => {
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(input) > -1
          })
        })
      }
      return this.tableData
    }
  },
  created() {
    this.getRepoPage()
  },
  methods: {
    // 分页查询
    async getRepoPage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: title }
      const res = await repoPaging(params)
      this.data = res.data
    },
    searchRepo() {
      this.getRepoPage(this.pageNum, this.pageSize, this.searchTitle)
    },
    updateRow(row) {
      this.dialogFormVisible = true
      this.form = row
    },
    addRepo(repoForm) {
      ('接收到的 repoForm 数据:', repoForm)
      const data = {
        'title': repoForm.repoTitle,
        'isExercise': repoForm.isExercise ? 1 : 0
      }
      repoAdd(data)
        .then((res) => {
          if (res.code) {
            this.addTitle = ''
            this.addRepoDialogVisible = false
            this.getRepoPage(this.pageNum, this.pageSize)
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(() => { })
    },
    // 编辑题库
    updateRepo(repoForm) {
      const data = {
        'title': repoForm.repoTitle,
        'isExercise': repoForm.isExercise ? 1 : 0
      }
      repoUpdate(this.form.id, data)
        .then((res) => {
          if (res.code) {
            this.getRepoPage(this.pageNum, this.pageSize)
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '编辑成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消编辑'
          })
        })
    },
    // 删除题库
    delRepo(row) {
      this.$confirm('此操作将永久删除该题库, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          repoDel(row.id).then((res) => {
            if (res.code) {
              this.getRepoPage(this.pageNum, this.pageSize)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'info',
                message: res.msg
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleClose(done) {
      done()
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val
      this.getRepoPage(this.pageNum, val)
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val
      this.getRepoPage(val, this.pageSize)
    }
  }
}
</script>
<style></style>
