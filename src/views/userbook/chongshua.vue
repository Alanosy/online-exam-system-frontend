<template>
  <div style="width: 100%; height: 100%; background-color: #f0f2f5; padding: 20px 0 0">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card style="margin-bottom: 10px">
          错题本
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
    <el-row>
      <el-col :span="24">
        <el-card class="qu-content content-h">
          <!-- 题干 -->
          <p v-if="quData.content">{{ quData.content }}</p>
          <p v-if="quData.image != null && quData.image != ''">
            <el-image :src="quData.image" style="max-width: 100%" />
          </p>
          <div v-if="quData.quType === 1 || quData.quType === 3">
            <!-- 选项 -->
            <el-radio-group v-model="radioValue">
              <el-radio v-for="item in quData.answerList" :key="item.id" :label="item.id"
                >{{ numberToLetter(item.sort) }}.{{ item.content }}
                <div v-if="item.image != null && item.image != ''" style="clear: both">
                  <el-image :src="item.image" style="max-width: 100%" />
                </div>
              </el-radio>
            </el-radio-group>
          </div>
          <div v-if="(flag == true && quData.quType === 1) || quData.quType === 3">
            <!-- <div>
              <span>我的答案:{{ myAnswers }}</span>
            </div> -->
            <div>
              <span>正确答案:{{ numberToLetter(this.failQuData.rightAnswers) }}</span>
            </div>
            <div>
              <span>试题分析:{{ this.failQuData.analysis }}</span>
            </div>
          </div>
          <div v-if="quData.quType === 2">
            <el-checkbox-group v-model="multiValue">
              <el-checkbox
                v-for="item in quData.answerList"
                :key="item.id"
                :label="item.id"
                >{{ numberToLetter(item.sort) }}.{{ item.content }}
                <div v-if="item.image != null && item.image != ''" style="clear: both">
                  <el-image :src="item.image" style="max-width: 100%" />
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <div v-if="flag == true && quData.quType === 2">
            <!-- <div>
              <span>我的答案:{{ myAnswers }}</span>
            </div> -->
            <div>
              <span>正确答案:{{ this.failQuData.rightAnswers }}</span>
            </div>
            <div>
              <span>试题分析:{{ this.failQuData.analysis }}</span>
            </div>
          </div>

          <div v-if="quData.quType === 4">
            <el-input
              v-model="saqTextarea"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
            />
            <!-- <el-checkbox-group v-model="multiValue"> -->
            <!-- <el-checkbox
                v-for="item in quData.answerList"
                :key="item.id"
                :label="item.id"
                >{{  numberToLetter(item.sort)  }}.{{ item.content }}
                <div v-if="item.image != null && item.image != ''" style="clear: both">
                  <el-image :src="item.image" style="max-width: 100%" />
                </div>
              </el-checkbox> -->
            <!-- </el-checkbox-group> -->
          </div>
          <div v-if="flag == true && quData.quType === 4">
            <!-- <div>
              <span>我的答案:{{ myAnswers }}</span>
            </div> -->
            <div>
              <span>正确答案:{{ this.failQuData.rightAnswers }}</span>
            </div>
            <div>
              <span>试题分析:{{ this.failQuData.analysis }}</span>
            </div>
          </div>
          <div style="margin-top: 20px">
            <!-- <el-button type="primary" @click="handPrevious()">
              上一题
            </el-button> -->
            <el-button type="warning" icon="el-icon-right" @click="handNext()">
              下一题
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { fullBook, getSingleQu, getUserBookList } from "@/api/userbook";
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
      nextText: false,
      userBookList: [],
      index: 0,
      quDataLen: 0,
      examId: "",
      failQuData: {},
      flag: false,
      // 当前题目内容
      quData: {
        answerList: [],
      },
      // 试卷信息
      radioValue: "",
      showAnswer: false,
      // 多选选定值
      multiValue: [],
      // 已答ID
      answeredIds: [],
      saqTextarea: "",
      myAnswers: "",
      lastIndex: 0,
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
    handHandExam() {
      const that = this;

      // 交卷保存答案

      const msg = "确认要交卷吗？";

      that
        .$confirm(msg, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.$router.push({ name: "Wrongbook" });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "交卷已取消，您可以继续作答！",
          });
        });
    },
    fullBookFun() {
      fullBook().then((res) => {});
    },
    getSingleQuFun(quId) {
      getSingleQu(quId).then((res) => {
        this.quData = res.data;
      });
    },
    getUserBookListFun() {
      getUserBookList(this.examId).then((res) => {
        this.userBookList = res.data;
        this.quDataLen = res.data.length;
        this.getSingleQuFun(res.data[this.index]["quId"]);
        this.lastIndex = this.userBookList.length;
      });
    },
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
      if (!this.flag) {
        this.index = this.index + 1;
        this.handSave(this.index);
      } else {
        if (this.index >= this.lastIndex) {
          this.handHandExam();
        }
        this.handSave(this.index);
      }
    },

    /**
     * 上一题
     */
    handPrevious() {
      this.index = this.index - 1;
      this.handSave(this.index);
    },
    // 保存答案
    handSave(index) {
      console.log("index:" + index);
      console.log("this.lastIndex:" + this.lastIndex);
      if (index - 1 >= this.lastIndex) {
        this.handHandExam();
        //   this.$router.push({ name: 'Wrongbook' })
      } else {
        const answers = this.multiValue;
        if (this.radioValue !== "") {
          answers.push(this.radioValue);
        }

        const params = {
          examId: this.examId,
          quId: this.userBookList[index - 1]["quId"],
          answer: this.quData.quType == 4 ? this.saqTextarea : answers.join(","),
        };

        // this.myAnswers = params.answer;
        if (!this.flag) {
          fullBook(params).then((res) => {
            if (res.code) {
              this.failQuData = res.data;

              if (res.data.correct) {
                this.$message({
                  type: "info",
                  message: res.msg,
                });
              } else {
                this.$message({
                  type: "success",
                  message: res.msg,
                });
              }
            } else {
              this.$message({
                type: "success",
                message: res.msg,
              });
            }
          });
        }

        if (this.flag == true) {
          // 查找详情
          this.fetchQuData(index);
          this.flag = false;
        } else {
          this.flag = true;
        }
      }
      // });
    },
    // 试卷详情
    fetchQuData(index) {
      this.getSingleQuFun(this.userBookList[index]["quId"]);
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
