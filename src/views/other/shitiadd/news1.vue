<template>
<div>
     <!-- 添加 -->
  <div class="tj">
     <el-form ref="form" :model="form"  label-width="80px" style="padding:20px" >
     <el-form-item label="题库类型" style="margin-bottom: 10px;">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="归属题库" style="margin-bottom: 10px;">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="题目内容" style="margin-bottom: 10px;">
    <el-input v-model="form.name" ></el-input>
  </el-form-item>
 
  <el-form-item label="试题图片" style="margin-bottom: 10px;">
     <el-upload
            :action="上传图片接口地址"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="imgSuccess"
            :on-error="imgError"
            :on-remove="imgRemove">
            <i class="el-icon-plus"></i>
   </el-upload>
    </el-form-item>

  
  <el-form-item label="试题解析" style="margin-bottom: 25px;" >
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <div class="anniu">
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </div>
  </el-form>
 </div>
 <!-- 表格 -->
  <div class="table">
   <el-form
    :model="formData"
    ref="formRef"
    :rules="rules"
    label-width="108px"
    :inline="true"
    >
    <el-table
    :data="formData.tableData"
    style="width: 80%;" border
    >
    <el-table-column type="index" width="55" align="center">
    </el-table-column>
    
    <el-table-column label="显示答案" prop="answe" width="200" resizable align="center" header-align="center">
      <template slot-scope="scope">
       <el-form-item  >
      <el-radio-group v-model="scope.row.resource">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
    </el-form-item> 
      </template>
    </el-table-column>

    <el-table-column label="选项图片" prop="top"  width="200" resizable align="center" header-align="center">
      <template >
         <el-form-item >
              <el-upload
                :action="上传图片接口地址"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="imgSuccess"
                :on-error="imgError"
                :on-remove="imgRemove">    
                <i class="el-icon-plus"></i>        
      </el-upload>
    </el-form-item>
      </template>
    </el-table-column>


     <el-table-column label="内容" prop="name" resizable align="center" header-align="center">
      <template slot-scope="scope">
        <el-form-item :prop="'tableData.' + scope.$index + '.name'" :rules="rules.name">
          <el-input type="text" size="small"
           placeholder="请输入内容" v-model="scope.row.name" 
           style="width: 500px;"></el-input>
        </el-form-item>
      </template>
    </el-table-column>

    </el-table>
    <el-form-item class="footer">
    <el-button type="primary" @click="save">保存</el-button>
    <el-button>取消</el-button>
    </el-form-item>
   </el-form>

  </div>
   

</div>


    
</template>

<script>
  export default {
    data() {
      return {
        formData:{
        tableData:[
          {
              resource:"",
              name:"",
              },
          { resource:"",
              name:"",},
        ]
      },
      rules:{
        name:[
        { required: true, message: '请输入内容', trigger: 'blur' },
        ],
        age:[
        { required: true, message: '请输入年龄', trigger: 'blur' },
        ],
        sex:[
        { required: true, message: '请输入性别', trigger: 'blur' },
        ],
      },


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
       
    }
    },
 
    // 上传成功
    imgSuccess(res, file, fileList) {
      this.fileList = fileList;
      //这里我是用一个fileList数组存取，当保存的时候进行图片路径处理
    },
    // 上传失败
    imgError(res) {
      this.$message({
        type: "error",
        message: "附件上传失败",
      });
    },

    // 删除图片
    imgRemove(file, fileList) {
      this.fileList = fileList;
    },
    // 附件上传图片预览事件，这个就是将路径直接放进一个弹窗显示出来就可以了

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 处理图片路径
    setImgUrl(imgArr) {
      let arr = [];
      if (imgArr.length>0) {
        for (let i = 0; i < imgArr.length; i++) {
        const element = imgArr[i];
        arr.push(element.response.data.url);
        //这个地方根据后台返回的数据进行取值，可以先打印一下
      }
      return arr.join();
      } else {
        return ''
      }
      
    },

    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
    
</script>

<style >
.footer{
    margin-top: 20px;
}

.table{
    width: 85%;
    height: 400px;
   
    margin: auto;
    margin-top:85px
}
.anniu{
    margin-top: 38px;
    
}

.tj{
    width: 85%;
    height: 400px;
    background-color: #d9d9d9cf;
    margin: auto;
    margin-top:30px
}

.el-table .el-upload--picture-card {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-table--border{
        border: 1px solid #bdbdbd;
        border-right: true;
        border-bottom: ture;
}


       

</style>