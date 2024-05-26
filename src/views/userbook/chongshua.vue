<template>
  <div style="width: 100%; height: 100%; background-color: #f0f2f5; padding: 20px 0 0">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card style="margin-bottom: 10px">
          {{ repoTitle }} 错题本
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
      >
      <el-col :span="24">
        <el-card class="qu-content content-h">
          <!-- {{ quData.sort + 1 }}. -->
          <p v-if="quData.content">{{ quData.content }}</p>
          <p v-if="quData.image != null && quData.image != ''">
            <el-image :src="quData.image" style="max-width: 100%" />
          </p>
          <!-- v-if="quData.quType === 1 || quData.quType === 3" v-model="radioValue" -->
          <div>
            <el-radio-group>
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
            <!-- v-if="showPrevious" -->
            <el-button type="primary" @click="handPrevious()">
              上一题
            </el-button>
            <!-- v-if="showNext" -->
            <el-button
             
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
      userBookList: [],
      index: 0,
      examId: "",
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
    this.examId = localStorage.getItem("userbook_examId");
    this.getUserBookListFun();
    // this.getSingleQuFun()
  },

  methods: {
    fullBookFun() {
      fullBook().then((res) => {});
    },
    getSingleQuFun(quId) {
      // console.log(this.userBookList[0],"quId");
      getSingleQu(quId).then((res) => {
        this.quData = res.data;
      });
    },
    getUserBookListFun() {
      getUserBookList(this.examId).then((res) => {
        this.userBookList = res.data;
        this.getSingleQuFun(res.data[this.index]["quId"]);
      });
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
    numberToLetter(sort) {
      switch (sort) {
        case 0:
          return "A";
        case 1:
          return "B";
        case 2:
          return "C";
        case 3:
          return "D";
        case 4:
          return "E";
        case 5:
          return "F";
        default:
          return ""; // 默认值，或者可以处理其他情况
      }
    },
    /**
     * 下一题
     */
    handNext() {
      this.index = this.index + 1;
      this.handSave(this.index);
    },

    /**
     * 上一题
     */
    handPrevious() {
      this.index = this.index - 1;
      this.handSave(this.index);

      // const index = this.cardItem.sort - 1;
      // this.handSave(this.allItem[index]);
    },
    // 保存答案
    handSave(index) {
      // if (item.id === this.allItem[0].id) {
      //   this.showPrevious = false;
      // } else {
      //   this.showPrevious = true;
      // }

      // 最后一个索引
      // const last = this.quData.length - 1;

      // if (item.id === this.allItem[last].id) {
      //   this.showNext = false;
      // } else {
      //   this.showNext = true;
      // }

      // const answers = this.multiValue;
      // if (this.radioValue !== "") {
      //   answers.push(this.radioValue);
      // }
      // console.log("1a");
      // console.log(this.cardItem);
      // const params = {
      //   examId: this.paperId,
      //   quId: this.cardItem.questionId,
      //   answer: answers.join(","),
      //   // answer: "",
      // };
      // fillAnswer(params).then((res) => {
      //   if(res.code){
      //     sessionStorage.setItem("exam_"+this.cardItem.questionId, 1);
      //   }else{
      //     sessionStorage.setItem("exam_"+this.cardItem.questionId, 0);
      //   }
      //   // 必须选择一个值
      //   if (answers.length > 0) {
      //     // 加入已答列表
      //     this.cardItem.answered = true;
      //   }

      //   // 最后一个动作，交卷
      //   if (callback) {
      //     callback();
      //   }

      // 查找详情
      this.fetchQuData(index);
      // });
    },
    // 试卷详情
    fetchQuData(index) {
      // 打开
      // const loading = Loading.service({
      //   text: "拼命加载中",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });

      // 获得详情
      // this.cardItem = item;
      // const examId = localStorage.getItem("examId");
      // 查找下个详情
      // const params = { examId: examId, questionId: item.questionId };
      this.getSingleQuFun(this.userBookList[index]["quId"])
      // quDetail(params).then((response) => {
      //   // console.log(response);
      //   console.log("=================");
      //   console.log(response.data);
      //   console.log("=================");
      //   this.quData = response.data;
      //   this.radioValue = "";
      //   this.multiValue = [];

      //   // 填充该题目的答案
      //   this.quData.answerList.forEach((item) => {
      //     console.log(item, "ttt");
      //     if ((this.quData.quType === 1 || this.quData.quType === 3) && item.checkout) {
      //       this.radioValue = item.id;
      //     }
      //     if (this.quData.quType === 2 && item.checkout) {
      //       this.multiValue.push(item.id);
      //     }
      //   });

      //   // 关闭详情
      //   loading.close();
      // });
    },
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
