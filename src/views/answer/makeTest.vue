<template>
<el-container style="height: 700px; border: 1px solid #eee">
  <div class="left">
    <div class="fk">
          <div style="font-size:25px;font-weight:500;margin-left:10px;padding:10px 0 0 0">11</div>
          <div class="sj">
              <div>
             <span>得分</span>
              <span>50</span>
         </div>
          <div>
             <span>耗时</span>
              <span>50</span>
         </div>
          <div>
             <span>提交人</span>
              <span>50</span>
         </div>
         <el-divider></el-divider>
         <p>共 <span style="color: #1890ff">5 </span> 题,
              共 <span style="color: #1890ff">100</span> 分</p>
          <el-row>
              <el-tag v-for="index in 5" :type="index === quIndex ? 'success':''"
                      @click="handleTag(index)" class="type_tag">
                {{ index }}
              </el-tag>
            </el-row>
            <el-button type="success" class="ann">提交批改</el-button>

          </div>
         
       
    </div>
  </div>
  
  <el-container> 
    <el-main class="right">
        <el-col >
        <el-card class="qu_list">
          <div>
            <template v-for="index in 10">
              <div :class="'index' + index">
                
                <!-- 简答 -->
                <el-row :gutter="24">
                    <el-col :span="20" style="text-align: left">
                    <!-- 题目: 序号、类型、题干 -->
                    <div>
                      <div class="qu_num">{{ index }}</div>
                      【 简答题 】
                      <div class="qu_content"> 这里是简答题的题干信息  </div>
                    </div>
                    <div class="content">
                      Model（模型）：是应用程序中用于处理应用程序数据逻辑的部分。通常模型对象负责在数据库中存取数据
View（视图）：是应用程序中处理数据显示的部分。
                    </div>
                    <!-- 题目解析 -->
                    <div class="qu_analysis">
                      <el-card>
                        <div style="display:flex;align-items: center;">
                          <span style="color:#e6a23c;">分数：</span> 
                          <el-input v-model="input" type="number" style="width:100px;margin-left:20px;"></el-input>
                        </div>
                        <div  style="margin-top:18px">
                          <span> 试题解析：</span>
                          <span>这里是试题解析部分</span>
                         </div>
                        
                      </el-card>
                    </div>
                    </el-col>
                    <el-col :span="4">
                    <el-row class="qu_assign_score">
                      本题
                      <el-input-number :controls="false" :min="0" :precision="2" disabled
                                       value="20" class="qu_assign_score_content"/>
                      分
                    </el-row>
                  </el-col>
                   </el-row>
            
              </div>
            </template>
          </div>
          <el-divider/>
        </el-card>
      </el-col>

      
    </el-main>
  </el-container>
</el-container>
</template>

<script>
 export default {
   name: 'ExamProcess',
  data() {
    return {
      input:"",
      quIndex: -1,
    }
  },
  methods: {
    // 点击答题卡题号, 右侧题目滑动
    handleTag(index) {
      // 高亮选中的题目index标签
      this.quIndex = index;
      // 题目滑动到锚定点
      let page = document.querySelector(".index" + index);
      page.scrollIntoView();
    },
  },

  };
</script>

<style scoped lang="scss">
.content{
  width: 97%;
    height: 60px;
    border: 1px solid  #0a84ff;;
    margin-top: 8px;
    margin-left: 10px;
    padding: 10px;
    font-weight: 200;
}
.ann{
  width: 130px;
  margin-top: 25px;
   margin-left: 15px;
}
.sj{
  margin-top:10px;
  margin-left:10px;
  line-height: 22px;
}
.fk{
    width: 200px;
    height: 100%;
    box-shadow: 0 0 15px rgb(197, 197, 197);
    margin: auto;
    margin-top: 20px;
    margin-left: 15px;
}
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
.left{
    width: 17%;
    height: 100%;
        
}
.right{
  width: 70%;
  height: 100%;
  
}
.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 95%;
    margin: 24px 0;
}
 .type_tag{
      margin-right: 5px;
      margin-top: 10px;
    }
 
    
// 试题内容样式
  .qu_list{
    height: 100%;
    width: 100%;
    overflow: auto;
    page-break-after:always;

    .qu_num {
      display: inline-block;
      // background: url('~@/assets/images/tkxl/btbj.png') no-repeat 100% 100%;
      background-size: contain;
      height: 30px;
      width: 30px;
      line-height: 25px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      margin-right: 15px;
      flex-shrink: 0;
    }

    .qu_content{
      padding-left: 10px;
    }

    // 选项组
    .qu_choose_group{
      width: 100%;

      // 单个选项
      .qu_choose{
        display: block;
        margin: 10px;

        // 去除前面的radio
        ::v-deep .el-radio__input .el-radio__inner {
          display: none;
        }

        // 单个选项内容样式
        .qu_choose_tag {
          display: inline-flex;
          width: 90%;
          // 选项标签
          .qu_choose_tag_type {
            font-weight: bold;
            color: #0a84ff;
            width: 10px;
          }
          // 选项内容
          .qu_choose_tag_content{
            padding: 0 10px 10px 10px;
          }
          .qu_choose_tag_img {
            height: auto;
            display: block;
            margin: 10px;
          }

          .qu_choose_tag_el_image {
            clear: both;
            padding-top: 10px;
          }
        }
        // 选项答案
        .qu_choose_answer{
          float: right;
        }
      }
    }


    // 试题解析
    .qu_analysis{
      padding: 10px;

      .qu_analysis_content{
        padding-top: 10px;
      }
    }

    // 试题赋分
    .qu_assign_score{
      background: #f5f5f5;
      height: 100px;
      padding-top: 35px;

      .qu_assign_score_content{
        width: 80px
      }
    }
  }


</style>