<template>

    
<div>

    <div>
    <div style="padding-left: 53px; padding-top: 22px">
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="题库名称:">
          <el-input v-model="searchTitle" placeholder="请输入查询内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left: 40px" @click="searchRepo"
            >查询</el-button
          >
          <el-button type="primary" style="margin-left: 40px" @click="screenInfo()"
            >新增</el-button
          >
        </el-form-item>
      </el-form> -->
    </div>
    <!-- table -->
    <div style="margin: auto; width: 90%" align="center">
      <el-table :data="data.records" border>
        <el-table-column fixed prop="id" label="序号" align="center" />
        <el-table-column prop="certificateName" label="证书名称" align="center" />
        <el-table-column prop="certificationNuit" label="证书颁发单位" align="center" />
        <el-table-column prop="certificationNuit" label="证书颁发单位" align="center" />


        <el-table-column prop="examName" label="考试名称" align="center" />
        <el-table-column prop="createTime" label="获奖时间" align="center" />
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              style="font-size: 14px"
              @click="preview(row)"
              >预览证书</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <span class="demonstration" />
      <el-pagination
        :current-page="data.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="data.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    
    <!-- 删除弹框 -->
    <!-- <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog> -->

    <!--编辑弹窗-->

    <!-- <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="form">
            <el-form-item label="题库名称" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRepo">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>

     <el-dialog
      title="证书预览和下载"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <div id="pdfDom">
        <div class="proBox">
          <p class="tit"><center>荣誉证书</center></p>
          <p class="con">
            <span>恭喜</span>
            <span class="con-name">{{ jwtInfo.realName }}</span
            >同学：<br />
          </p>
          <p class="con-text"><span>在{{currentdata.examName}}考试中荣获</span></p>
          <p class="con-height">
            <span
              ><center>{{ level }}</center></span>
          </p>
          <p class="con-text">荣誉称号，特发此状，以资鼓励。</p>

          <div class="con-unit">
            <p class="time">{{ currentdata.createTime }}</p>
          </div>
          <div class="chapter" v-show="isShow">
            <canvas id="chapterCanvas" width="150" height="150"></canvas>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-switch
          inactive-color="#67c23a"
          v-model="downType"
          active-text="图片下载"
          inactive-text="pdf下载"
          style="margin-right: 20px"
        >
        </el-switch>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getPdf('#pdfDom')">下载</el-button>
      </span>
    </el-dialog> 
  </div>

    </div>
    
</div>    
</template>

<script>
import {certificateMy} from "@/api/certificate"
import {getTokenInfo} from "@/utils/jwtUtils"
export default {
  data() {
    return {
        pageNum:1,
        pageSize:10,
        data:null,
    //从本地缓存中获得当前登录账号和等级
      userName: localStorage.getItem("username"),
      level:localStorage.getItem("level"),
      //获取当前日期
        start: "",
      dialogVisible: false,
      pageData: null, //接收html格式代码
      htmlTitle: "荣誉证书",
      isShow: true,
      isCanvas: false,
      downType: true, // false为 pdf , true为图片
      currentdata: {},
      currentUser: "",
      jwtInfo:{},
    };
  },
  created() {
    this.getCerPage();

    this.jwtInfo = getTokenInfo()
    console.log("jwt",this.jwtInfo)

  },
  methods: {
    
    // 分页查询
    async getCerPage(pageNum, pageSize) {
      const params = { pageNum: pageNum, pageSize: pageSize};
      const res = await certificateMy(params);
      this.data = res.data;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    preview(row) {

     this.currentdata = row
      var vm = this;
     //获取当前日期
      var data = new Date(new Date().setHours(0, 0, 0, 0));
      vm.start =
        data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();
      console.log(vm.start);
      
      this.dialogVisible = true;
      this.$nextTick(() => {
        if (!this.isCanvas) {
          // 只绘画一次
          this.isCanvas = true;
          this.getChapter();
        }
      });
    },
  },
};

</script>

<style>
.border{
width:90%;
height:550px;
margin:auto;margin-top:40px;
box-shadow: 0px 0px 7px 4px #f0f2f5;
}
::v-deep .el-dialog__body {
  padding: 0px;
  display: flex;
  justify-content: center;
}
#pdfDom {
  /* 要想pdf周边留白，要在这里设置 */
  padding: 20px;
  width: 750px;
}
.proBox {
  /* 奖状的模板 */
  background: url("../../assets/img/zs.jpeg") no-repeat;

  background-size: cover;
  width: 750px;
  height: 525px;
  padding: 90px 94px;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
  color: #000;
  font-family: SimSun;
}
.tit {
  color: #cf0c0c;
  font-size: 36px;
  font-weight: 700;
  position: relative;
  top: -6px;
  left: 8px;
  letter-spacing: 20px;
  font-family: STHeiti;
  margin: 20px 0;
}
.proid {
  text-align: right;
  margin: 0;
  font-weight: 500;
}

.con {
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  margin: 10px 0;
  line-height: 32px;
  text-indent: 2em;
}
.con-text {
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  margin: 10px 0;
  line-height: 32px;
  text-indent: 5em;
}
.con-name {
  font-family: 华文行楷, STXingkai;
  border-bottom: 2px solid #000;
}
.con-height {
  font-family: 华文行楷, STXingkai;
  font-weight: 700;
  font-size: 2em
}
.con-unit {
  font-size: 18px;
  font-weight: 700;
  position: absolute;
  right: 130px;
  bottom: 100px;
  text-align: center;
  letter-spacing: 3px;
}
.con-unit p {
  margin: 5px 0;
}
.con-footer {
  font-size: 18px;
  font-weight: 700;
  position: absolute;
  bottom: 45px;
  left: 0;
  right: 0;
  text-align: center;
}
.chapter {
  border-radius: 50%;
  position: absolute;
  bottom: 75px;
  right: 134px;
}
.button{
   margin: 50px 50px;
   position: absolute;
 font-family: 华文行楷, STXingkai;
  font-weight: 700;
  font-size: 2em
}
.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
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
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
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

.el-pagination button,
.el-pagination span:not([class*="suffix"]) {
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
.el-pagination span:not([class*="suffix"]) {
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