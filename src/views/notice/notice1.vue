<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @LastEditTime: 2024-04-15 15:36:22
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div style="margin-top:30px">

        <div style=" padding-left: 53px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="证书名称:   ">
                    <el-select v-model="formInline.user" placeholder="证书名称">
                        <el-option label="区域一" value="shanghai" />
                        <el-option label="区域二" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item label="试题类型:   ">
                    <el-select v-model="formInline.region" placeholder="试题类型">
                        <el-option label="区域一" value="shanghai" />
                        <el-option label="区域二" value="beijing" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="margin-left: 40px;" @click="chaxun">查询</el-button>
                    <el-button type="primary" style="margin-left: 40px;" @click="dialogTableVisible = true">新增</el-button>
                    <el-button type="primary" style="margin-left: 40px;" @click="daoru">导入</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- table -->
        <div style="margin: auto;width: 1200px; " align="center">
            <el-table :data="tableData" border>
                <el-table-column fixed prop="date" label="序号" align="center" />
                <el-table-column prop="name" label="证书名称" align="center" />
                <el-table-column prop="count" label="认证单位" align="center" />
                <el-table-column prop="class" label="所属题库" align="center" />
                <el-table-column prop="time" label="创建时间" align="center" />
                <el-table-column prop="zip" label="邮编" align="center" />
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="{row}">
                        <el-button type="text" size="small" style="font-size: 14px" @click="updateRow(row)">编辑</el-button>

                        <el-button type="text" @click="open">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <span class="demonstration" />
            <el-pagination :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
                layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>

        <!--新增弹窗-->

    <el-dialog
    :title="diaTitle"
      :visible.sync="dialogTableVisible">
      <el-row >
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="序号  " :label-width="formLabelWidth">
              <el-input v-model="form.date" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>

        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="认证名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="认证单位" :label-width="formLabelWidth">
              <el-input v-model="form.count" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>

        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="所属题库" :label-width="formLabelWidth">
              <el-input v-model="form.class" autocomplete="off"></el-input>
         

            </el-form-item>

          </el-form>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-input v-model="form.time" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>

        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="邮编" :label-width="formLabelWidth">
              <el-input v-model="form.zip" autocomplete="off"></el-input>
         

            </el-form-item>

          </el-form>
        </el-col>
        
      </el-row>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    
    
    <!--编辑弹窗-->

    <el-dialog title="编辑"  :visible.sync="dialogFormVisible">
      <el-row >
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="序号  " :label-width="formLabelWidth">
              <el-input v-model="form.date" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>

        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="证书名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="认证单位" :label-width="formLabelWidth">
              <el-input v-model="form.count" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>

        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="所属题库 " :label-width="formLabelWidth">
              <el-input v-model="form.class" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-input v-model="form.time" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>

        </el-col>
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="邮编 " :label-width="formLabelWidth">
              <el-input v-model="form.zip" autocomplete="off"></el-input>
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
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onSubmit() {
      console.log("submit!");
    },
    open() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          date: "1001",
          name: "好好学习班",
          count: "好好学习，天天向上",
          class: "2201班",
          time: "2024.2.28",
          zip:"1",
        },
        {
          date: "1001",
          name: "好好学习班",
          count: "好好学习，天天向上",
          class: "2201班",
          time: "2024.2.28",
          zip:"1",
        },
        {
          date: "1001",
          name: "好好学习班",
          count: "好好学习，天天向上",
          class: "2201班",
          time: "2024.2.28",
          zip:"1",
        },
        {
          date: "1001",
          name: "好好学习班",
          count: "好好学习，天天向上",
          class: "2201班",
          time: "2024.2.28",
          zip:"1",
        },
        {
          date: "1001",
          name: "好好学习班",
          count: "好好学习，天天向上",
          class: "2201班",
          time: "2024.2.28",
          zip:"1",
        },
      ],
      formInline: {
        user: "",
        region: "",
      },
      cancle(){},
      updateRow(row){
      this.dialogFormVisible=true
      this.form=row
    },
      diaTitle:'新增',
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
    };
  },

};
</script>

<style>

.el-table--border,
.el-table--group {
    border: 1px solid #161616;
}

.el-table thead {
    color: #333;
    font-weight: 500;
}

.el-table {
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    color: #333;

}

.el-pagination {
    white-space: nowrap;
    padding: 40px 53px;
    color: #303133;
    font-weight: 700;
}

.el-pagination button,
.el-pagination span:not([class*=suffix]) {
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 20px;
    line-height: 27px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.el-pagination__total {
    margin-right: 10px;
    font-weight: 800;
    color: #606266;
}

.el-pagination button,
.el-pagination span:not([class*=suffix]) {
    display: inline-block;
    font-size: 10px;
    min-width: 30.5px;
    height: 36px;
    line-height: 28px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.el-pagination__jump {
    margin-left: 24px;
    font-weight: 400;
    color: #333;
}

.el-pager li {
    padding: 0 4px;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 36px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
}
</style>
