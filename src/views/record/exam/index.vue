<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="考试名称">
        <el-input v-model="searchTitle" placeholder="考试名称" />
      </el-form-item>
 
      <el-form-item>
        <el-button type="primary" @click="searchExam">查询</el-button>
      </el-form-item>
    </el-form>
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
    <el-table-column  align="center" type="selection" width="55" />
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" align="center" label="试卷名称" />
      <el-table-column prop="passedScore" align="center" label="及格分" />
      <el-table-column prop="userScore" align="center" label="用户成绩" />
      <el-table-column prop="examDuration" align="center" label="考试时长" />
      <el-table-column prop="userTime" align="center" label="用户用时">
        <template slot-scope="scope">
          <div>{{ (scope.row.userTime/60).toFixed(2) }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            style="font-size: 14px"
            @click="screenInfo(row)"
          >查看</el-button>
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
  </div>
</template>

<script>
import { recordExamPaging } from '@/api/record'
export default {
  namespaced: true,
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: {},
      input: '',
      searchTitle:"",
      formInline: {
        user: '',
        region: ''
      },

      dialogVisible: false,
      form: {
        name: ''
      },
      cancle() {},
      updateRow(row) {
        this.dialogFormVisible = true
        this.form = row
      },
      diaTitle: '新增',
      dialogTableVisible: false,
      dialogFormVisible: false
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
    this.getExamRecordPaging()
  },
  methods: {
    searchExam(){
      this.getExamRecordPaging(this.pageNum, this.pageSize,this.searchTitle) 
    },
    // 分页查询
    async getExamRecordPaging(pageNum, pageSize,examName) {
      const params = { pageNum: pageNum, pageSize: pageSize ,examName:examName}
      const res = await recordExamPaging(params)
      this.data = res.data
    },
    screenInfo(row) {
      console.info('=====', row)
      localStorage.setItem('record_exam_examId', row.id)
      this.$router.push({ name: 'Newk', query: { zhi: row }})
    },

    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val
      this.getExamRecordPaging(this.pageNum, val)
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val
      this.getExamRecordPaging(val, this.pageSize)
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
</script>
<style scoped></style>
