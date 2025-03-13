<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @LastEditTime: 2024-06-03 10:48:37
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline">
      <el-form-item label="试卷名称：      ">
        <el-input v-model="searchTitle" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchExamStu">查询</el-button>
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
    <el-table-column  align="center" type="selection" width="55" />
      <el-table-column fixed label="序号" align="center" width="80">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="试卷名称" align="center" />
      <el-table-column prop="examDuration" label="考试时间" align="center" />
      <el-table-column prop="grossScore" label="总分" align="center"  />
      <el-table-column prop="passedScore" label="及格分" align="center" />
      <!-- <el-table-column prop="radioCount" label="单选题数量" align="center" width="100"  />
      <el-table-column prop="multiCount" label="多选题数量" align="center" width="100" />
      <el-table-column prop="judgeCount" label="判断题数量" align="center" width="100" />
      <el-table-column prop="saqCount" label="简答题数量" align="center" width="100" /> -->
      <el-table-column prop="startTime" label="开始时间" align="center" />
      <el-table-column prop="endTime" label="结束时间" align="center" />
      <!-- <el-table-column prop="createTime" label="创建时间" align="center" /> -->
      <el-table-column fixed="right" label="操作" align="center" width="120">
        <template slot-scope="{ row }">
          <el-button
            :type="getExamStatus(row).type"
            :disabled="getExamStatus(row).disabled"
            plain
            size="small"
            @click="screenInfo(row)"
          >{{ getExamStatus(row).text }}</el-button>
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
import { getGradeExamList } from '@/api/exam'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: {},
      searchTitle: '',
      formInline: {
        user: '',
        region: ''
      },
      formInline: {
        user: '',
        region: ''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getExamGradePage()
  },
  methods: {
    // 分页查询
    async getExamGradePage(pageNum, pageSize, searchTitle = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: searchTitle }
      const res = await getGradeExamList(params)
      // 倒序显示
      if (res.data && res.data.records) {
        res.data.records = res.data.records.reverse()
      }
      this.data = res.data
    },

    // 考试状态判断
    getExamStatus(row) {
      const now = new Date().getTime()
      const endTime = new Date(row.endTime).getTime()
      const startTime = new Date(row.startTime).getTime()

      if (now > endTime) {
        return {
          text: '已结束',
          type: 'info',
          disabled: true
        }
      } else if (now < startTime) {
        return {
          text: '未开始',
          type: 'warning',
          disabled: true
        }
      } else {
        return {
          text: '开始考试',
          type: 'success',
          disabled: false
        }
      }
    },
    searchExamStu() {
      this.getExamGradePage(this.pageNum, this.pageSize, this.searchTitle)
    },
    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val
      this.getExamGradePage(this.pageNum, val)
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val
      this.getExamGradePage(val, this.pageSize)
    },
    handleClick(row) {
      // console.log(row);
    },

    screenInfo(row) {
      const status = this.getExamStatus(row)
      if (status.disabled) {
        return
      }
      localStorage.setItem('examInfo_examId', row.id)
      this.$router.push({ name: 'text', query: { zhi: row }})
    },
  }
}
</script>

<style>
.el-table .cell {
  white-space: nowrap;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style>
