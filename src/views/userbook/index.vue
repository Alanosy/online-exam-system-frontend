<template>
  <div class="qb">
    <div class="sf">
      <div class="xx">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="考试名称">
            <el-input v-model="searchTitle" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchUserBook">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

<<<<<<< HEAD
    <div style="padding:10px 0 0 50px;">
      <el-table :data="data.records" border style="width: 1000px; ">
        <el-table-column prop="xh" label="序号" align="center" width="80">
        </el-table-column>
        <el-table-column prop="title" align="center" label="试卷名称" width="250">
        </el-table-column>
        <el-table-column prop="numberOfErrors" align="center" label="错题数量">
        </el-table-column>
        <el-table-column prop="createTime" align="center" label="创建时间">
        </el-table-column>
        <el-table-column align="center" label="操作">

=======
<div style="padding:10px 0 0 50px;">
      <el-table :data="data.records" style="width: 1000px; ">

      <el-table-column
        prop="xh"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="title"
        align="center"
        label="试卷名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="numberOfErrors"
        align="center"
        label="错题数量">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        
>>>>>>> a707502114d2c2f06a777a19ab80198ca239a51c
          <template slot-scope="{row}">
            <el-button type="text" size="small" style="font-size: 14px" @click="updateRow(row)">查看</el-button>
            <el-button type="text" size="small" style="color: red; font-size: 14px"
            @click="screenInfo()">重刷</el-button>
          </template>

        </el-table-column>


      </el-table>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]" :page-size="data.size" layout="total, sizes, prev, pager, next, jumper"
        :total="data.total">
      </el-pagination>
    </div>
    <el-dialog title="查看" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="序号  " :label-width="formLabelWidth">
              <el-input v-model="form.xh" :disabled="true">

              </el-input>
            </el-form-item>

          </el-form>

        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="试卷名称" :label-width="formLabelWidth">
              <el-input v-model="form.sjmc" :disabled="true"></el-input>
            </el-form-item>

          </el-form>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="错题数量" :label-width="formLabelWidth">
              <el-input v-model="form.ctsl" :disabled="true"></el-input>
            </el-form-item>

          </el-form>

        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-input v-model="form.cjsj" :disabled="true"></el-input>
            </el-form-item>

          </el-form>
        </el-col>

      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { userbookPaging, userbookDel, userbookUpdate, userbookAdd } from "@/api/userbook";
export default {
 
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      data: null,
      input: '',
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        xh: '1',
        sjmc: '数学第一次测试',
        ctsl: '4',
        cjsj: '2024.2.1',
      }, {
        xh: '2',
        sjmc: '英语第一次测试',
        ctsl: '4',
        cjsj: '2024.2.1',
      }, {
        xh: '3',
        sjmc: '语文第一次测试',
        ctsl: '4',
        cjsj: '2024.2.1',
      }, {
        xh: '4',
        sjmc: '历史第一次测试',
        ctsl: '4',
        cjsj: '2024.2.1',
      }],
      dialogVisible: false,
      form: {
        name: '',
      },
      cancle() { },
      updateRow(row) {
        this.dialogFormVisible = true
        this.form = row
      },
      searchTitle: "",
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
    };
  },
  created() {
    this.getUserBookPage();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 分页查询
    async getUserBookPage(pageNum, pageSize, examName = null) {
      const params = { pageNum: pageNum, pageSize: pageSize,examNamee: examName };
      const res = await userbookPaging(params);
      this.data = res.data;
    },
    searchUserBook() {
      this.getUserBookPage(this.pageNum, this.pageSize, this.searchTitle);
    },
    onSubmit() {
      console.log('submit!');
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },

    screenInfo(row, index, done) {
      console.info("=====", row);
      this.$router.push({ name: "Chongshua", query: { zhi: row } });
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
}
</script>
<style scoped>
.qb {
  margin-top: 20px;
  width: 100%;
  height: 8000px;
}

.sf {
  width: 100%;
  height: 80px;
}

.xx {
  width: 1200px;
  height: 40px;
  padding: 20px 0px 0px 50px;
}

.block {
  padding: 30px 0 0 50px;
}
</style>