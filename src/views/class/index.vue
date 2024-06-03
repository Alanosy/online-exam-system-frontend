<template>
  <div class="app-container">
    <!-- form -->

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="班级">
        <el-input v-model="formInline.searchTitle" placeholder="输入班级名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchExam">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button :title="diaTitle" type="primary" @click="dialogTableVisible = true">
          新增</el-button>
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
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="gradeName" label="班级名称" align="center" />
      <el-table-column prop="code" label="班级口令" align="center" />
      <el-table-column prop="userName" label="创建用户" align="center" />
      <el-table-column align="center" label="操作">
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
            @click="delClass(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
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
    <!--新增弹窗-->

    <el-dialog :title="diaTitle" :visible.sync="dialogTableVisible">
      <el-row>
        <el-form :model="addForm">
          <el-form-item label="班级名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.gradeName" autocomplete="off" />
          </el-form-item>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass">确 定</el-button>
      </div>
    </el-dialog>

    <!--编辑弹窗-->

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="班级名称" :label-width="formLabelWidth">
              <el-input v-model="form.gradeName" autocomplete="off" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateClass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { classPaging, classDel, classUpdate, classAdd } from '@/api/class_'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: {},
      diaTitle: '新增',
      dialogTableVisible: false,
      dialogFormVisible: false,
      addForm: {
        gradeName: ''
      },
      formInline: {
        searchTitle: ''
      },
      form: {
        gradeName: ''
      },
      formLabelWidth: '110px'
    }
  },

  computed: {
    // tables() {
    //   //在你的数据表格中定义tabels
    //   const input = this.input;
    //   const input1 = this.input1;
    //   if (input) {
    //     // console.log("input输入的搜索内容：" + this.input)
    //     return this.tableData.filter((data) => {
    //       console.log("object:" + Object.keys(data));
    //       return Object.keys(data).some((key) => {
    //         return String(data[key]).toLowerCase().indexOf(input) > -1;
    //       });
    //     });
    //   }
    //   if (input1) {
    //     // console.log("input输入的搜索内容：" + this.input)
    //     return this.tableData.filter((data) => {
    //       console.log("object:" + Object.keys(data));
    //       return Object.keys(data).some((key) => {
    //         return String(data[key]).toLowerCase().indexOf(input1) > -1;
    //       });
    //     });
    //   }
    //   return this.tableData;
    // },
  },
  created() {
    this.getClassPage()
  },
  methods: {
    // 分页查询
    async getClassPage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, gradeName: title }
      const res = await classPaging(params)
      this.data = res.data
    },
    addClass() {
      const data = { gradeName: this.addForm.gradeName }
      classAdd(data).then((res) => {
        if (res.code) {
          this.getClassPage(this.pageNum, this.pageSize)
          this.dialogTableVisible = false
          this.$message({
            type: 'success',
            message: '新增成功!'
          })
        } else {
          this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    },
    delClass(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          classDel(row.id).then((res) => {
            if (res.code) {
              this.getClassPage(this.pageNum, this.pageSize)
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
    updateClass() {
      classUpdate(this.form.id, { gradeName: this.form.gradeName })
        .then((res) => {
          if (res.code) {
            this.getClassPage(this.pageNum, this.pageSize)
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
    updateRow(row) {
      this.dialogFormVisible = true
      this.form = row
    },
    searchExam() {
      this.getClassPage(this.pageNum, this.pageSize, this.formInline.searchTitle)
    },
    handleClick(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val
      this.getClassPage(this.pageNum, val)
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val
      this.getClassPage(val, this.pageSize)
    }
  }
}
</script>

<style>
.el-table--border,
.el-table--group {
  border: 1px solid #b3b3b3;
}

.bj {
  margin-top: 40px;
  margin-left: 30px;
}
</style>
