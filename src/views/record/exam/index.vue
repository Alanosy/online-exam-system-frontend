<template>
  <div class="app-container">
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
      <el-table-column prop="id" label="序号" align="center" width="80">
      </el-table-column>
      <el-table-column prop="title" align="center" label="试卷名称" width="250">
      </el-table-column>
      <el-table-column prop="passedScore" align="center" label="及格分">
      </el-table-column>
      <el-table-column prop="examDuration" align="center" label="考试时长">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            style="font-size: 14px"
            @click="screenInfo(row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="data.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="data.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { recordExamPaging, recordExamDetail } from "@/api/record";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: {},
      input: "",

      formInline: {
        user: "",
        region: "",
      },

      dialogVisible: false,
      form: {
        name: "",
      },
      cancle() {},
      updateRow(row) {
        this.dialogFormVisible = true;
        this.form = row;
      },
      diaTitle: "新增",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },

  created() {
    this.getExamRecordPaging();
  },
  methods: {
    // 分页查询
    async getExamRecordPaging(pageNum, pageSize) {
      const params = { pageNum: pageNum, pageSize: pageSize };
      const res = await recordExamPaging(params);
      this.data = res.data;
    },
    screenInfo(row) {
      console.info("=====", row);
      localStorage.setItem("record_exam_examId", row.id);
      this.$router.push({ name: "Newk", query: { zhi: row } });
    },

    handleSizeChange(val) {
      // 设置每页多少条逻辑
      this.pageSize = val;
      this.getExamRecordPaging(this.pageNum, val);
    },
    handleCurrentChange(val) {
      // 设置当前页逻辑
      this.pageNum = val;
      this.getExamRecordPaging(val, this.pageSize);
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  computed: {
    tables() {
      //在你的数据表格中定义tabels
      const input = this.input;
      if (input) {
        // console.log("input输入的搜索内容：" + this.input)
        return this.tableData.filter((data) => {
          console.log("object:" + Object.keys(data));
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(input) > -1;
          });
        });
      }
      return this.tableData;
    },
  },
};
</script>
<style scoped></style>
