<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: 魏进 3413105907@qq.com
 * @LastEditTime: 2024-06-06 20:15:30
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

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
    <el-table-column  align="center" type="selection" width="55" />
      <el-table-column fixed label="序号" align="center" width="80">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="repoTitle" label="题库标题" align="center" />
      <el-table-column prop="totalCount" label="试题总数" align="center" />
      <!-- <el-table-column prop="exerciseCount" label="已练习题数" align="center" /> -->
      <!-- <el-table-column prop="address" label="判断题数量" align="center" />
                <el-table-column prop="zip" label="简答题数量" align="center" /> -->
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="success" plain
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

      // formInline: {
      //     user: '',
      //     region: ''
      // },
      dialogTableVisible: false,
      dialogFormVisible: false,
      // form: {
      //   name: '',
      //   region: '',
      //   date1: '',
      //   date2: '',
      //   delivery: false,
      //   type: [],
      //   resource: '',
      //   desc: ''
      // },
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
      console.info('=====', id, repoTitle)
      this.$router.push({ name: 'shua', query: { repoId: id, repoTitle: repoTitle }})
    },
    handleSizeChange(val) {
      this.getExercisePage(this.pageNum, val, this.title)
    },
    handleCurrentChange(val) {
      this.getExercisePage(val, this.pageSize, this.title)
    },
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>

<style></style>
