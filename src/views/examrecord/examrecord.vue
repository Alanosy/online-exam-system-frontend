<template>
<div class="qb">
<div class="sf">
    <div class="xx">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="考试名称">
    <el-input v-model="formInline.user" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
    </div>
</div>

<div style="padding:10px 0 0 50px;">
        <el-table
      :data="tableData"
      border
      style="width: 1000px; ">
      <el-table-column
        prop="xh"
        label="序号"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sjmc"
        align="center"
        label="试卷名称"
        width="250">
      </el-table-column>
      <el-table-column
        prop="ctsl"
        align="center"
        label="用时">
      </el-table-column>
      <el-table-column
        prop="cjsj"
        align="center"
        label="得分">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" style="font-size:14px" type="text" size="small">查看</el-button>
      </template>
      

      </el-table-column>
       
    
    </el-table>
</div>
<div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  
</div>

</template>


<script>
  export default {
      methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
  
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    },
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [{
            xh: '1',
            sjmc: '数学第一次测试',
            ctsl: '2小时',
            cjsj: '88',
          }, {
            xh: '2',
            sjmc: '英语第一次测试',
            ctsl: '2.5小时',
            cjsj: '77',
          }, {
            xh: '3',
            sjmc: '语文第一次测试',
            ctsl: '3小时',
            cjsj: '60',
          }, {
            xh: '4',
            sjmc: '历史第一次测试',
            ctsl: '4小时',
            cjsj: '66',
          }]
      }
      
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style scoped>
.qb{
    width: 100%;
    height: 8000px;
}
.sf{
    width: 100%;
    height: 80px;
}
.xx{
    width: 1200px;
    height: 40px;
    padding: 20px 0px 0px 50px;
}
.block{
    padding: 30px 0 0 50px;
}
</style>