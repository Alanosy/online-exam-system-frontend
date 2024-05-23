<template>
  <div style="width: 100%; height: 100%; background-color: #f0f2f5; padding: 20px 0 0">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card style="margin-bottom: 10px">
          {{ repoTitle }} 错题aaa
          <el-button
            :loading="loading"
            style="float: right; margin-top: -10px"
            type="primary"
            icon="el-icon-plus"
            @click="handHandExam()"
          >
            {{ handleText }}
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      >w
      <el-col :span="24">
        <el-card class="qu-content content-h">
          <p v-if="quData.content">{{ quData.sort + 1 }}.{{ quData.content }}</p>
          <p v-if="quData.image != null && quData.image != ''">
            <el-image :src="quData.image" style="max-width: 100%" />
          </p>
          <div v-if="quData.quType === 1 || quData.quType === 3">
            <el-radio-group v-model="radioValue">
              <el-radio v-for="item in quData.answerList" :label="item.id"
                >{{ numberToLetter(item.sort + 1) }}.{{ item.content }}
                <div v-if="item.image != null && item.image != ''" style="clear: both">
                  <el-image :src="item.image" style="max-width: 100%" />
                </div>
              </el-radio>
            </el-radio-group>
          </div>

          <div v-if="quData.quType === 2">
            <el-checkbox-group v-model="multiValue">
              <el-checkbox
                v-for="item in quData.answerList"
                :key="item.id"
                :label="item.id"
                >{{ item.abc }}.{{ item.content }}
                <div v-if="item.image != null && item.image != ''" style="clear: both">
                  <el-image :src="item.image" style="max-width: 100%" />
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <div style="margin-top: 20px">
            <el-button v-if="showPrevious" type="primary" @click="handPrevious()">
              上一题
            </el-button>

            <el-button
              v-if="showNext"
              type="warning"
              icon="el-icon-right"
              @click="handNext()"
            >
              下一题
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { fullBook, getSingleQu, userbookPaging, getUserBookList } from "@/api/userbook";
export default {
  data() {
    return {
      repoId: "",
      repoTitle: "",
      routeData: {},
      // 全屏/不全屏
      isFullscreen: false,
      showPrevious: false,
      showNext: true,
      loading: false,
      handleText: "提交",
      pageLoading: false,
      userBookList:[],
      // 当前题目内容
      quData: {
        answerList: [],
      },
      // 试卷信息
      paperData: {
        leftSeconds: 99999,
        radioList: [],
        multiList: [],
        judgeList: [],
      },
    };
  },
  created() {
    this.routeData = this.$route.query.zhi;
    this.getUserBookListFun()
    // this.getSingleQuFun()
  },

  methods: {
    fullBookFun() {
      fullBook().then( (res)=>{

      })

    },
    getSingleQuFun() {
      console.log(this.userBookList[0],"quId");
      // getSingleQu(this.userBookList[0].quId).then((res)=>{
      //   console.log(res,"resaaa")
      // })
    },
    getUserBookListFun() {
      getUserBookList(this.routeData.examId).then((res)=>{
        this.userBookList = res.data
        console.log(res.data[0].quId,"aaaa")
      })
    },
    //   handHandExam() {
    //     const that = this;

    //     // 交卷保存答案
    //     this.handSave(this.cardItem, function () {
    //       const notAnswered = that.countNotAnswered();

    //       let msg = "确认要交卷吗？";

    //       if (notAnswered > 0) {
    //         msg = "您还有" + notAnswered + "题未作答，确认要交卷吗?";
    //       }

    //       that
    //         .$confirm(msg, "提示", {
    //           confirmButtonText: "确定",
    //           cancelButtonText: "取消",
    //           type: "warning",
    //         })
    //         .then(() => {
    //           that.doHandler();
    //         })
    //         .catch(() => {
    //           that.$message({
    //             type: "info",
    //             message: "交卷已取消，您可以继续作答！",
    //           });
    //         });
    //     });
    //   },
    //   numberToLetter(sort) {
    //     switch (sort) {
    //       case 1:
    //         return "A";
    //       case 2:
    //         return "B";
    //       case 3:
    //         return "C";
    //       case 4:
    //         return "D";
    //       case 5:
    //         return "E";
    //       case 6:
    //         return "F";
    //       default:
    //         return ""; // 默认值，或者可以处理其他情况
    //     }
    //   },
    //   /**
    //    * 下一题
    //    */
    //   handNext() {
    //     const index = this.cardItem.sort + 1;
    //     this.handSave(this.allItem[index]);
    //   },

    //   /**
    //    * 上一题
    //    */
    //   handPrevious() {
    //     const index = this.cardItem.sort - 1;
    //     this.handSave(this.allItem[index]);
    //   },
  },
};
</script>
<style scoped>
page {
  background: #ebecee;
}

.btn_anniu {
  width: 50%;
  padding: 10px 0;
  font-size: 19px;
  font-weight: bold;
  border: 0 solid #fff;
  color: #000;
  outline: none;
  background: #fff;
}

.newStyle {
  border-bottom: 2px solid #f0892e;
  color: #f0892e;
  font-size: 21px;
  font-weight: bold;
}

.qu-content div {
  line-height: 30px;
  width: 100%;
}

.el-checkbox-group label,
.el-radio-group label {
  width: 100%;
}

.content-h {
  height: calc(100vh - 110px);
  overflow-y: auto;
}

.card-title {
  background: #eee;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
}

.card-line {
  padding-left: 10px;
}

.card-line span {
  cursor: pointer;
  margin: 2px;
}

::v-deep .el-radio,
.el-checkbox {
  padding: 9px 20px 9px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  margin-bottom: 10px;
  width: 100%;
}

.is-checked {
  border: #409eff 1px solid;
}

.el-radio img,
.el-checkbox img {
  max-width: 200px;
  max-height: 200px;
  border: #dcdfe6 1px dotted;
}

::v-deep .el-checkbox__inner {
  display: none;
}

::v-deep .el-radio__inner {
  display: none;
}

::v-deep .el-checkbox__label {
  line-height: 30px;
}

::v-deep .el-radio__label {
  line-height: 30px;
}
</style>
