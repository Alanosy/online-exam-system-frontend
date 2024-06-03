<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: st 2946594574@qq.com
 * @LastEditTime: 2024-05-06 11:57:34
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="考试名称">
        <el-input v-model="input" />
      </el-form-item>

      <!-- <el-form-item label="考试时间" style="margin-left: 15px">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="searchExam">查询</el-button>
        <el-button type="primary" @click="screenInfo()">新增</el-button>
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
      <el-table-column prop="title" label="试卷名称" align="center" />
      <el-table-column prop="examDuration" label="考试时间" align="center" />
      <el-table-column prop="maxCount" label="最多切屏次数" align="center" />
      <el-table-column prop="grossScore" label="总分" align="center" />
      <el-table-column prop="passedScore" label="及格分" align="center" />
      <el-table-column prop="radioCount" label="单选题数量" align="center" />
      <el-table-column prop="multiCount" label="多选题数量" align="center" />
      <el-table-column prop="judgeCount" label="判断题数量" align="center" />
      <el-table-column prop="saqCount" label="简答题数量" align="center" />
      <el-table-column prop="startTime" label="开始时间" align="center" />
      <el-table-column prop="endTime" label="结束时间" align="center" />
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
            @click="delExam(row)"
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

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="考试标题  " :label-width="formLabelWidth">
              <el-input v-model="form.title" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="考试时长" :label-width="formLabelWidth">
              <el-input v-model="form.examDuration" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="最大切屏次数" :label-width="formLabelWidth">
              <el-input v-model="form.maxCount" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="及格分" :label-width="formLabelWidth">
              <el-input v-model="form.passedScore" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!-- <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="考试班级" :label-width="formLabelWidth">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-form>
        </el-col> -->
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="单选题分数" :label-width="formLabelWidth">
              <el-input v-model="form.radioScore" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="多选题分数" :label-width="formLabelWidth">
              <el-input v-model="form.multiScore" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="判断题分数" :label-width="formLabelWidth">
              <el-input v-model="form.judgeScore" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="简答题分数" :label-width="formLabelWidth">
              <el-input v-model="form.saqScore" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div style="display: flex; justify-content: flex-end; with: 100%">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateExam()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { examPaging, repoAdd, examUpdate, examDel } from '@/api/exam'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: {},
      input: '',
      formInline: {
        user: '',
        region: '',
        date1: '',
        date2: ''
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      dialogVisible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: ''
      },
      cancle() {},
      updateRow(row) {
        this.dialogFormVisible = true
        this.form = row
      },
      diaTitle: '新增',
      form: {},
      formLabelWidth: '110px'
    }
  },
  computed: {
    tables() {
      // 在你的数据表格中定义tabels
      const input = this.input
      if (input) {
        // console.log("input输入的搜索内容：" + this.input)
        return this.tableData.filter((data) => {
          // console.log("object:" + Object.keys(data));
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(input) > -1
          })
        })
      }
      return this.tableData
    }
  },
  created() {
    this.getExamPage()
  },
  methods: {
    delExam(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          examDel(row.id).then((res) => {
            if (res.code) {
              this.getExamPage(this.pageNum, this.pageSize)
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
    updateExam() {
      const data = {
        examDuration: this.form.examDuration,

        judgeScore: this.form.judgeScore,

        maxCount: this.form.maxCount,

        multiScore: this.form.multiScore,

        passedScore: this.form.passedScore,

        radioScore: this.form.radioScore,

        saqScore: this.form.saqScore,

        title: this.form.title
      }
      examUpdate(this.form.id, data).then((res) => {
        if (res.code) {
          this.getExamPage(this.pageNum, this.pageSize)
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message({
            type: 'info',
            message: res.msg
          })
        }
      })
    },
    // 分页查询
    async getExamPage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: title }
      const res = await examPaging(params)
      this.data = res.data
    },
    searchExam() {
      this.getExamPage(this.pageNum, this.pageSize, this.input)
    },
    onSubmit() {
      console.log('submit!')
    },
    screenInfo(row) {
      console.info('=====', row)
      this.$router.push({ name: 'ksAdd', query: { zhi: row }})
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val
      this.getExamPage(this.pageNum, val)
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val
      this.getExamPage(val, this.pageSize)
    }
  }
}
</script>
<style></style>
