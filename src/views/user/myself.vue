<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-05-13 10:12:29
 * @LastEditors: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @LastEditTime: 2024-05-13 13:43:33
 * @FilePath: \online-exam-system-frontend\src\views\myself\myself
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    style="
      width: 1000px;
      height: 500px;
      background-color: rgb(240 242 245);
      margin: auto;
      margin-top: 40px;
      display: flex;
    "
  >
    <div style="width: 60%; height: 100%">
      <ul style="list-style: none; font-size: large; font-weight: 500">
        <li style="padding-top: 50px; padding-left: 80px">
          用户名: {{ this.data.userName }}
        </li>
        <li style="padding-top: 50px; padding-left: 80px">
          真实姓名:{{ this.data.realName }}
        </li>
        <li style="padding-top: 50px; padding-left: 80px" v-if="isAdmin">
          班级: {{ this.data.gradeName }}
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            size="mini"
            style="margin-left: 15px"
            @click="addClassBt"
          />
        </li>
        <li style="padding-top: 50px; padding-left: 80px">
          注册时间: {{ this.data.createTime }}
        </li>
        <li style="padding-top: 50px; padding-left: 80px">
          <el-button type="primary" icon="el-icon-edit" @click="fileDialogVisible = true"
            >编辑头像</el-button
          >
        </li>
      </ul>
      <!-- 编辑个人信息 -->
      <el-dialog
        width="400px"
        :show-close="false"
        :close-on-click-modal="false"
        title="上传头像"
        :visible.sync="fileDialogVisible"
      >
        <el-upload
          class="upload-demo"
          drag
          action="xxxxxx"
          multiple
          :limit="1"
          accept="png, jpg, jpeg, bmp"
          :auto-upload="false"
          :on-remove="handleRemove"
          :on-change="handleFileChange"
          :file-list="fileList"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">
            只能上传"png", "jpg", "jpeg", "bmp"文件，且不超过2MB。注:右上角头像，重新登录更新
           
          </div>
 
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="fileDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="importAvatar">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加班级 -->
      <el-dialog title="加入班级" :visible.sync="addClassDialogVisible">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form :model="form">
              <el-form-item label="班级口令" :label-width="formLabelWidth">
                <el-input v-model="form.code" autocomplete="off" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addClassDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addClass">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <img
        style="
          width: 150px;
          height: 150px;
          margin-right: 60px;
          margin-top: 55px;
          border-radius: 200px;
        "
        :src="this.data.avatar"
        alt=""
      />

      <div style="margin-left: 53px; margin-top: 38px; font-size: 20px">头 像</div>
    </div>
  </div>
</template>

<script>
import { getInfo, userAddClass, uploadAvatar } from '@/api/user'
import {trackPresence} from '@/api/user'
import {  getTokenInfo } from '@/utils/jwtUtils'
export default {
  data() {
    return {
      imageUrl: '',
      fileDialogVisible: false,
      fileList: [],
      data: {},
      form: {
        code: ''
      },
      isAdmin: true,
      addClassDialogVisible: false
    }
  },
  created() {
    if(localStorage.getItem('roles') == "admin" || localStorage.getItem('roles') == "teacher")
    {
      this.isAdmin = false
    }
    this.getInfoFun()

  },
  methods: {
    async getInfoFun(){
      const res = await getInfo()
      if (res.code) {
        this.data = res.data
      }else{
        this.$message.error('获取个人信息失败')
      }
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList // 收集文件信息
    },
    // 移除文件处理方法
    handleRemove(file, fileList) {
      if (fileList.length == 0) {
        this.hasFiles = false
      }
    },
    // 上传文件逻辑
    importAvatar() {
      if (this.fileList.length > 0) {
        const formData = new FormData() // 创建FormData对象
        formData.append('file', this.fileList[0].raw) // 添加文件到formData
        uploadAvatar(formData).then((res) => {
           if(res.code){
              const userInfo = getTokenInfo()
              trackPresence({ userId: userInfo.id }).then(response => {
                if (response.code) {
                  setToken(response.data)
                }
              })
                .catch(error => {
                  console.error('心跳发送失败:', error)
                })
            this.getInfoFun()
            this.$message.success('文件上传成功！')
            this.fileDialogVisible = false // 关闭对话框
            // 可以在这里处理成功后的逻辑，如刷新数据等
           }
          })
          .catch((error) => {
            console.error('文件上传失败：', error)
            this.$message.error('文件上传失败！')
          })
      } else {
        this.$message.warning('请选择文件后再上传！')
      }
    },

    addClassBt() {
      this.addClassDialogVisible = true
    },
    addClass() {
      const params = { code: this.form.code }
      userAddClass(params).then((res) => {
        if (res.code) {
          this.addClassDialogVisible = false
          this.getInfoFun()
          this.$message({
            type: 'success',
            message: '加入成功'
          })
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

<style>
/* 修改个人头像 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
