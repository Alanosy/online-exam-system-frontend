<template>
<div>
  <!-- form -->
<div class="bj">
 <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="真实姓名">
    <el-input v-model="input" placeholder="输入姓名"></el-input>
  </el-form-item>
  <el-form-item label="班级">
    <el-input v-model="input1" placeholder="输入班级"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit" style="margin-left:20px">查询</el-button>
  </el-form-item>
</el-form>
</div>
<!-- table -->
<div style="width:90%;margin: auto;margin-top:20px">
<el-table
    :data="tables"
    border
    
    >
    <el-table-column
    
      prop="date"
      label="序号"
     align="center"
     width="120px"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名"
      width="180px"
      align="center"
     >
    </el-table-column>
    <el-table-column
      prop="real"
      label="真实姓名"
      align="center"
      width="180px"
      >
    </el-table-column>
    <el-table-column
      prop="class"
      label="班级"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="time"
      label="注册时间"
      align="center"
     >
    </el-table-column>
    <el-table-column
     align="center"
      label="操作"
     >
      <template >
        <el-button type="text" size="small" style="color:red;font-size:14px" @click="open">移除班级</el-button>
      
      </template>
    </el-table-column>
  </el-table>
</div>
<!-- 分页 -->
<div style="margin-top:25px;margin-left:52px">
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
<!-- 删除弹框 -->
     <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow" >确 定</el-button>
            </span>
        </el-dialog>

</div>


</template>

<script>
export default {
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        input: "",
        input1: "",
        
        tableData: [{
          date: '1001',
          name: '王虎',
          real: '王虎',
          class: '2201班',
          time: '2024.2.28',
          
        }, {
           date: '1001',
          name: '虎',
          real: '王虎',
          class: '2201班',
          time: '2024.2.28'
        }, {
           date: '1001',
          name: '王小米',
          real: '王虎',
          class: '2201班',
          time: '2024.2.28'
        }, {
           date: '1001',
          name: '小虎',
          real: '王虎',
          class: '2201班',
          time: '2024.2.28'
        }],
        formInline: {
          user: '',
          region: ''
        }
        
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      open(index) {
      
      this.$confirm("此操作将永久删除此班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
     handleClick(row) {
        console.log(row);
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

    },
    computed: {
    tables() {
      //在你的数据表格中定义tabels
      const input = this.input;
       const input1 = this.input1;
      if (input) {
        // console.log("input输入的搜索内容：" + this.input)
        return this.tableData.filter((data) => {
          console.log("object:" + Object.keys(data));
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(input) > -1;
          });
        });
      }
      if (input1) {
        // console.log("input输入的搜索内容：" + this.input)
        return this.tableData.filter((data) => {
          console.log("object:" + Object.keys(data));
          return Object.keys(data).some((key) => {
            return String(data[key]).toLowerCase().indexOf(input1) > -1;
          });
        });
      }

      return this.tableData;
    }
  },

  }


</script>

<style>

.el-table--border, .el-table--group {
    border: 1px solid #b3b3b3;
}
.bj{
      margin-top: 40px;
    margin-left: 61px;;
}
</style>
