<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: st 2946594574@qq.com
 * @LastEditTime: 2024-06-03 15:49:27
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

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
      <el-table-column fixed label="序号" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="题库名称" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            style="font-size: 14px"
            @click="updateRow(row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            style="color: red; font-size: 14px"
            @click="delRepo(row)"
          >删除</el-button>
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

    <!--编辑弹窗-->

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="题库名称" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRepo">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="新增题库"
      :visible.sync="addRepoDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-row :gutter="20">
        <el-col>
          <el-form>
            <el-form-item label="题库名称:" :label-width="formLabelWidth">
              <el-input
                v-model="addTitle"
                autocomplete="off"
                style="width: 80%"
              />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addRepoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRepo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { repoPaging, repoDel, repoUpdate, repoAdd } from '@/api/repo'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: {},
      addTitle: '',
      delVisible: false,
      searchTitle: '',
      Obj:{},
      formInline: {
        user: '',
        region: ''
      },
      cancle() {},
      updateRow(row) {
        this.dialogFormVisible = true
        this.form = row
      },
      diaTitle: '新增',
      form: {
        title: ''
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
    addRepo() {
      repoAdd({ title: this.addTitle })
        .then((res) => {
          if (res.code) {
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
        .catch(() => {})
    },
    // 编辑题库
    updateRepo() {
      repoUpdate(this.form.id, { title: this.form.title })
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          repoDel(row.id).then((res) => {
            if (res.code) {
              this.getRepoPage(this.pageNum, this.pageSize)
              this.tableData.splice(index, 1)
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
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },

    searchRepo() {
      this.getRepoPage(this.pageNum, this.pageSize, this.searchTitle)
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
