
<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="题库名称：      ">
        <el-input v-model="repoTitle" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryRepo()">查询</el-button>
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
      <el-table-column prop="repoTitle" label="题库标题" align="center" />
      <el-table-column prop="totalCount" label="试题总数" align="center" />

      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            plain
            :disabled="row.totalCount == 0"
            size="small"
            @click="screenInfo(row.id, row.repoTitle)"
          >开始刷题</el-button>
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
import { exercisePaging } from '@/api/exercise'
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: {},
      repoTitle: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },

  created() {
    this.getExercisePage()
  },
  methods: {
    queryRepo() {
      this.getExercisePage(this.pageNum, this.pageSize, this.repoTitle)
    },
    // 分页查询
    async getExercisePage(pageNum, pageSize, title = null) {
      const params = { pageNum: pageNum, pageSize: pageSize, title: title }
      const res = await exercisePaging(params)
      this.data = res.data
    },
    screenInfo(id, repoTitle) {
      this.$router.push({ name: 'start-exercise', query: { repoId: id, repoTitle: repoTitle }})
    },
    handleSizeChange(val) {
      this.getExercisePage(this.pageNum, val, this.title)
    },
    handleCurrentChange(val) {
      this.getExercisePage(val, this.pageSize, this.title)
    },
    handleClick(row) {
      (row)
    }
  }
}
</script>

<style></style>
