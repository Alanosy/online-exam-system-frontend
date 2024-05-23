<template>
     <div style="margin-top:30px">
         <div style=" padding-left: 53px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        
        <el-form-item label="用户姓名" style="margin-left:28px">
          <el-input v-model="input" placeholder="输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 40px;" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- table -->
    <div style="margin: auto;width: 1200px; " align="center">
      <el-table :data="tableData" border>
        <el-table-column fixed prop="date" label="序号" align="center" />
        <el-table-column prop="uesrname" label="用户名字" align="center" />
        <el-table-column prop="time" label="考试时间" align="center" />

        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="{row}">
            <el-button type="text" size="small" style="font-size: 14px"  @click="screenInfo()">批改试卷</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
       <div class="block">
      <span class="demonstration" />
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    </div>
    </div>
</template>

<script>
export default {
   data(){
       return{
           tableData: [{
            time: '2016-05-02',
            uesrname: '王小虎',
            date: '01'
          }, {
            date: '2016-05-04',
            uesrname: '王小虎',
            time: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            uesrname: '王小虎',
            time: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            uesrname: '王小虎',
            time: '上海市普陀区金沙江路 1516 弄'
          }]
       }
   },
   methods: {
     screenInfo(row, index, done) {
      console.info("=====", row);
      this.$router.push({ name: "make", query: { zhi: row } });
    },
   }
}
</script>

<style scoped>

</style>