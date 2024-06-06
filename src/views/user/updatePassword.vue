<template>
  <div class="app-container">

    <el-form class="kj">
      <div class="sg">
        <el-form :model="addForm">
          <el-form-item label="原密码" :label-width="formLabelWidth">
            <el-input v-model="input1" autocomplete="off" />
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input v-model="input2" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth">
            <el-input v-model="input3" type="password" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
      <div class="an">
        <!-- <el-button>取消</el-button> -->
        <el-button type="primary" @click="updatePassword">确认</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
import { changePassword } from '@/api/user'

export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: ''
    }
  },
  methods: {
    updatePassword() {
      const data = { originPassword: this.input1, newPassword: this.input2, checkedPassword: this.input3 }
      changePassword(data).then((res) => {
        if (res.code) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$router.push({ path: '/login', query: { zhi: 1 }})
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.kj {
  width: 400px;
  height: 450px;
  margin: auto;
  background-color: aliceblue;
  margin-top: 20px;
}
.z {
  height: 100px;
  font-size: 20px;
}
.sg {
  width: 90%;
  height: 350px;
  margin: auto;
  padding: 50px 0 0 0;
}
.an {
  display: flex;
  justify-content: center;
  margin: auto;
  width: 150px;
  height: 50px;
}
</style>
