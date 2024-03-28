<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-03-04 10:53:12
 * @LastEditors: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @LastEditTime: 2024-03-28 14:54:58
 * @FilePath: \com-project\src\views\dashboard\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text"><el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人" />
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form></div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column

        prop="date"
        label="日期"
        align="center"
      />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
      />
      <el-table-column
        prop="province"
        label="省份"
        align="center"
      />
      <el-table-column
        prop="city"
        label="市区"
        align="center"
      />
      <el-table-column
        prop="address"
        label="地址"
        align="center"
      />
      <el-table-column
        prop="zip"
        label="邮编"
        align="center"
      />
      <el-table-column
        prop="operation"
        label="操作"
        width="200"
        align="center"
      >

        <el-button type="primary" icon="el-icon-edit" circle color="pink" />
        <el-button type="danger" icon="el-icon-delete" circle />

      </el-table-column>
    </el-table>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
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
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]

    }
  },
  methods: {
    setUser() {
      this.formInline.user = '张三'
      console.log(this.formInline)
    },

    onSubmit() {
      console.log('submit!')
    },
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
