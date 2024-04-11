<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-04-01 11:00:21
 * @LastEditors: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @LastEditTime: 2024-04-11 14:37:07
 * @FilePath: \com-project\src\views\notice\notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div>

    <div style=" padding-left: 53px;padding-top: 22px;">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="证书名称:   ">
          <el-select v-model="formInline.region" placeholder="证书名称">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="试题类型:   ">
          <el-select v-model="formInline.user " placeholder="试题类型">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 40px;" @click="onSubmit">查询</el-button>
          <el-button type="primary" style="margin-left: 40px;" @click="onSubmit">新增</el-button>
          <el-button type="primary" style="margin-left: 40px;" @click="onSubmit">导入</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- table -->
    <div style="margin: auto;width: 1200px; " align="center">
      <el-table :data="tableData" border>
        <el-table-column fixed prop="date" label="序号" align="center" />
        <el-table-column prop="name" label="证书名称" align="center" />
        <el-table-column prop="province" label="认证单位" align="center" />
        <el-table-column prop="city" label="所属题库" align="center" />
        <el-table-column prop="address" label="创建时间" align="center" />

        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
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

</template>

<script>
export default {

    data() {
        return {
            formInline: {
                user: '',
                region: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    },



    data() {
        return {
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
        }
    },
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
            },
            {
                date: '',
                name: '',
                province: '',
                city: '',
                address: ''

            },
            {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            }],
            formInline: {
                user: '',
                region: ''
            }
        }
    },


    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        }
    },

    methods: {
        handleClick(row) {
            console.log(row)
        }
    },



    handleClick(row) {
        console.log(row)
    },
}

</script>
<style>
.el-input__inner {
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 18px;
    border: 1px solid #161616;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
}

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

.el-pagination button, .el-pagination span:not([class*=suffix]) {
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

.el-pagination button, .el-pagination span:not([class*=suffix]) {
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
