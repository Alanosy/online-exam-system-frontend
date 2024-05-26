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
          <li style="padding-top: 50px; padding-left: 80px">
            班级:{{ this.data.gradeName }}
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              style="margin-left: 15px"
              @click="addClassBt"
            ></el-button>
          </li>
          <li style="padding-top: 50px; padding-left: 80px">
            注册时间: {{ this.data.createTime }}
          </li>
        </ul>
        <!-- 添加班级 -->
        <el-dialog title="加入班级" :visible.sync="addClassDialogVisible">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form :model="form">
                <el-form-item label="班级口令" :label-width="formLabelWidth">
                  <el-input v-model="form.code" autocomplete="off"></el-input>
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
  import { getInfo,userAddClass } from "@/api/user";
  export default {
    data() {
      return {
        data: null,
        form: {
          code: "",
        },
        addClassDialogVisible:false
      };
    },
    created() {
      getInfo().then((res) => {
        console.log(res);
        if (res.code) {
          this.data = res.data;
        }
      });
    },
    methods: {
      addClassBt() {
        this.addClassDialogVisible = true;
      },
      addClass(){
          const params = {code :this.form.code}
          userAddClass(params).then((res)=>{
              if(res.code){
                  this.addClassDialogVisible = false;
                  this.$message({
                      type:'success',
                      message:'加入成功'
                  })
              }else{
                  this.$message({
                      type:'error',
                      message:res.msg
                  })
              }
          })
      }
    },
  };
  </script>
  
  <style></style>
  