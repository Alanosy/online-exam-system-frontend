<template>
  <div style="width: 100%; height: 100%; background-color: #f0f2f5; padding: 20px 0 0">
    <!-- 开头 -->
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card style="margin-bottom: 10px">
          距离考试结束还有：
          <exam-timer v-model="paperData.leftSeconds" @timeout="doHandler()" />

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

      <el-col :span="5" :xs="24" style="margin-bottom: 10px">
        <el-card class="content-h">
          <p class="card-title">答题卡</p>
          <el-row :gutter="24" class="card-line" style="padding-left: 10px">
            <el-tag type="info">未作答</el-tag>
            <el-tag type="success">已作答</el-tag>
          </el-row>

          <div v-if="paperData.radioList !== undefined && paperData.radioList.length > 0">
            <p class="card-title">单选题</p>
            <el-row :gutter="24" class="card-line">
              <el-tag
                v-for="item in paperData.radioList"
                :type="cardItemClass(item.checkout, item.questionId)"
                @click="handSave(item)"
              >
                {{ item.sort + 1 }}</el-tag
              >
            </el-row>
          </div>

          <div v-if="paperData.multiList !== undefined && paperData.multiList.length > 0">
            <p class="card-title">多选题</p>
            <el-row :gutter="24" class="card-line">
              <el-tag
                v-for="(item, index) in paperData.multiList"
                :key="index"
                :type="cardItemClass(item.checkout, item.questionId)"
                @click="handSave(item)"
                >{{ item.sort + 1 }}</el-tag
              >
            </el-row>
          </div>

          <div v-if="paperData.judgeList !== undefined && paperData.judgeList.length > 0">
            <p class="card-title">判断题</p>
            <el-row :gutter="24" class="card-line">
              <el-tag
                v-for="item in paperData.judgeList"
                :type="cardItemClass(item.checkout, item.questionId)"
                @click="handSave(item)"
                >{{ item.sort + 1 }}</el-tag
              >
            </el-row>
          </div>
          <div
            v-if="
              paperData.saqList != null &&
              paperData.saqList !== undefined &&
              paperData.saqList.length > 0
            "
          >
            <p class="card-title">简答题</p>
            <el-row :gutter="24" class="card-line">
              <el-tag
                v-for="item in paperData.saqList"
                :type="cardItemClass(item.checkout, item.questionId)"
                @click="handSave(item)"
                >{{ item.sort + 1 }}</el-tag
              >
            </el-row>
          </div>
        </el-card>
      </el-col>

      <el-col :span="19" :xs="24">
        <el-card class="qu-content content-h">
          <p v-if="quData.content">{{ quData.sort + 1 }}.{{ quData.content }}</p>
          <p v-if="quData.image != null && quData.image != ''">
            <el-image :src="quData.image" style="max-width: 100%" />
          </p>
          <div v-if="quData.quType === 1 || quData.quType === 3">
            <el-radio-group v-model="radioValue">
              <el-radio v-for="item in quData.answerList" :label="item.id"
                >{{ numberToLetter(item.sort) }}.{{ item.content }}
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
                >{{ numberToLetter(item.sort) }}.{{ item.content }}
                <div v-if="item.image != null && item.image != ''" style="clear: both">
                  <el-image :src="item.image" style="max-width: 100%" />
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <div v-if="quData.quType === 4">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="saqTextarea"
            >
            </el-input>
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
          <div style="margin-top: 20px">
            <el-button
              v-if="showPrevious"
              type="primary"
              icon="el-icon-back"
              @click="handPrevious()"
            >
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
    <!-- 切屏弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="tipsFlag"
      width="480px"
      class="commonDialog multi clickLight"
      center
      :close-on-click-modal="false"
    >
      {{ examMeg }}
      <!-- <div class="dialogTipsbox" v-if="tips === 1">你还有试题未作答，确认要交卷？</div>
      <div class="dialogTipsbox" v-if="tips === 2">
        最多只能切屏{{ switchPage.switchPageTimes }}次，你还可切换{{
          switchPage.remaTimes
        }}次，
        <br />
        超过{{ switchPage.switchPageTimes }}次将强行交卷！
      </div> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="tipsFlag = false" v-if="tips === 1">取 消</el-button>
        <el-button type="primary" @click="onConfirmTip" v-if="tips === 1"
          >确 定</el-button
        >
        <el-button type="primary" @click="onConfirmTip" v-if="tips === 2"
          >我知道了</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  paperDetail,
  quDetail,
  handExam,
  fillAnswer,
  examStart,
  examCheat,
  examQuList,
} from "@/api/exam";
import { Loading } from "element-ui";
import ExamTimer from "@/components/ExamTimer";

export default {
  name: "ExamProcess",
  components: { ExamTimer },
  data() {
    return {
      examId: "",
      receivedRow: null,
      // 全屏/不全屏
      isFullscreen: false,
      showPrevious: false,
      showNext: true,
      loading: false,
      handleText: "交卷",
      saqTextarea: "",
      pageLoading: false,
      // 试卷ID
      paperId: "",
      // 当前答题卡
      cardItem: {},
      allItem: [],
      tipsFlag: false,
      // 当前题目内容
      quData: {
        answerList: [],
      },
      testData: {},
      pkExam: null,
      examMeg: "",
      // 试卷信息
      paperData: {
        leftSeconds: 99999,
        radioList: [],
        multiList: [],
        judgeList: [],
      },
      // 单选选定值
      radioValue: "",
      // 多选选定值
      multiValue: [],
      // 已答ID
      answeredIds: [],
    };
  },
  created() {
    this.examId = localStorage.getItem("examId");
    this.startExam(localStorage.getItem("examId"));
    this.paperId = localStorage.getItem("examId");
    this.fetchData(localStorage.getItem("examId"));
    // if (typeof id !== 'undefined') {
    //   this.paperId = id
    //   this.fetchData(28)
    // }
  },
  mounted() {
    // 监听滚动
    window.addEventListener("scroll", this.handleScroll);
    // 监听浏览器窗口变化
    window.addEventListener("resize", this.getLfetDistance);
    // 监听页面可见性
    window.addEventListener("visibilitychange", this.pageHidden);
    this.$nextTick(function () {
      let body = document.querySelector("body");
      body.style.overflow = "auto";
      this.flexLeft = (body.offsetWidth - 1200) / 2;
    });
  },
  methods: {
    //切换页面检测
    //isReduce 0扣次数 1不扣次数 router 判断是否为路由转跳
    //事件默认参数
    pageHidden(e = null, isReduce = 0, router = false) {
      console.log("e", e);
      console.log("isReduce", isReduce);
      console.log("router", router);
      return new Promise((resolve, reject) => {
        console.log(document.visibilityState);
        if (document.visibilityState === "hidden" || router) {
          examCheat(this.examId).then((res) => {
            console.log("res.code", res.code);
            // let data = res.data;
            if (res.code) {
              this.examMeg = res.msg;
              // this.switchPage = data.data;
              // //remaTimes 可切片次数大于0
              // if (
              //   this.switchPage.remaTimes >= 0 &&
              //   !this.isStop &&
              //   (this.switchPage.remaTimes != this.switchPage.switchPageTimes ||
              //     (this.switchPage.remaTimes != 0 &&
              //       this.switchPage.switchPageTimes != 0)) &&
              //   this.switchPage.switchPageTimes != 1000
              // ) {
              this.tipsFlag = true;
              if (res.data) {
                setTimeout(() => {
                  //
                  getQuestionDetail(this.quList[this.currentQuIndex].quId).then((res) => {
                    this.quDetail = res.data;
                  });
                }, 100);
                this.$router.push({ name: "Textcenter", params: { id: this.paperId } });
              }
              // this.tips = 2;
              // } else if (this.switchPage.remaTimes < 0 && !this.isStop) {
              //   this.submitTest();
              // }
              resolve();
            } else {
              reject();
            }
          });
        }
      });
    },
    // submitTest() {
    //   this.loading = true;
    //   this.axios({
    //     method: "post",
    //     url: "/knowledge/exam/submitPaper",
    //     data: {
    //       pkExam: this.pkExam,
    //       pkPaper: this.testData.pkPaper,
    //       startTime: this.testData.startTime,
    //       endTime: this.testData.endTime,
    //       pkCurExam: this.testData.pkCurExam,
    //     },
    //   }).then((res) => {
    //     let data = res.data;
    //     this.loading = false;
    //     if (data.code == "0") {
    //       this.isStop = true;
    //       this.tipsFlag = false;
    //       this.testResult = data.data;
    //       clearInterval(this.countdownTime);
    //     } else {
    //       this.MixerrorMes(data.message);
    //     }
    //   });
    // },
    destroyed() {
      window.removeEventListener("visibilitychange", this.pageHidden);
      window.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("resize", this.getLfetDistance);
      clearInterval(this.countdownTime); // 计时器
    },
    startExam(examId) {
      examQuList(examId).then((res) => {
        this.paperData = res.data;
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

    // 答题卡样式
    cardItemClass(checkout, quId) {
      if (sessionStorage.getItem("exam_" + quId) == 1 || checkout) {
        return "success";
      }

      if (sessionStorage.getItem("exam_" + quId == 0) || checkout) {
        return "info";
      }
    },

    /**
     * 统计有多少题没答的
     * @returns {number}
     */
    countNotAnswered() {
      let notAnswered = 0;

      this.paperData.radioList.forEach(function (item) {
        if (!item.answered) {
          notAnswered += 1;
        }
      });

      this.paperData.multiList.forEach(function (item) {
        if (!item.answered) {
          notAnswered += 1;
        }
      });

      this.paperData.judgeList.forEach(function (item) {
        if (!item.answered) {
          notAnswered += 1;
        }
      });

      return notAnswered;
    },

    /**
     * 下一题
     */
    handNext() {
      const index = this.cardItem.sort + 1;
      this.handSave(this.allItem[index]);
    },

    /**
     * 上一题
     */
    handPrevious() {
      const index = this.cardItem.sort - 1;
      this.handSave(this.allItem[index]);
    },
    clearSessionStorageByPrefix(prefix) {
      for (var key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key) && key.startsWith(prefix)) {
          sessionStorage.removeItem(key);
        }
      }
    },

    // 使用函数清除以 "exam_" 开头的所有键值对

    doHandler() {
      this.handleText = "正在交卷，请等待...";
      this.loading = true;

      // const params = { id: this.paperId };

      handExam(this.examId).then(() => {
        this.$message({
          message: "试卷提交成功，即将进入试卷详情！",
          type: "success",
        });
        this.clearSessionStorageByPrefix("exam_");
        this.$router.push({ name: "Textcenter", params: { id: this.paperId } });
      });
    },

    // 交卷操作
    handHandExam() {
      const that = this;

      // 交卷保存答案
      this.handSave(this.cardItem, function () {
        const notAnswered = that.countNotAnswered();

        let msg = "确认要交卷吗？";

        if (notAnswered > 0) {
          msg = "您还有" + notAnswered + "题未作答，确认要交卷吗?";
        }

        that
          .$confirm(msg, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            that.doHandler();
          })
          .catch(() => {
            that.$message({
              type: "info",
              message: "交卷已取消，您可以继续作答！",
            });
          });
      });
    },

    // 保存答案
    handSave(item, callback) {
      if (item.id === this.allItem[0].id) {
        this.showPrevious = false;
      } else {
        this.showPrevious = true;
      }

      // 最后一个索引
      const last = this.allItem.length - 1;

      if (item.id === this.allItem[last].id) {
        this.showNext = false;
      } else {
        this.showNext = true;
      }

      const answers = this.multiValue;
      if (this.radioValue !== "") {
        answers.push(this.radioValue);
      }

      const params = {
        examId: this.paperId,
        quId: this.cardItem.questionId,
        answer: item.type == 4 ? this.saqTextarea : answers.join(","),
        // answer: "",
      };
      fillAnswer(params).then((res) => {
        if (res.code) {
          sessionStorage.setItem("exam_" + this.cardItem.questionId, 1);
        } else {
          sessionStorage.setItem("exam_" + this.cardItem.questionId, 0);
        }
        this.saqTextarea = "";
        // 必须选择一个值
        if (answers.length > 0) {
          // 加入已答列表
          this.cardItem.answered = true;
        }

        // 最后一个动作，交卷
        if (callback) {
          callback();
        }

        // 查找详情
        this.fetchQuData(item);
      });
    },

    // 试卷详情
    fetchQuData(item) {
      // 打开
      const loading = Loading.service({
        text: "拼命加载中",
        background: "rgba(0, 0, 0, 0.7)",
      });

      // 获得详情
      this.cardItem = item;
      const examId = localStorage.getItem("examId");
      // 查找下个详情
      const params = { examId: examId, questionId: item.questionId };
      quDetail(params).then((response) => {
        this.quData = response.data;
        this.radioValue = "";
        this.multiValue = [];

        if (response.data.quType === 4 && response.data.answerList != null) {
          this.saqTextarea = response.data.answerList[0].content;
        } else if (
          (response.data.quType === 1,
          response.data.quType === 2,
          response.data.quType === 3)
        ) {
          this.quData.answerList.forEach((item) => {
            if ((this.quData.quType === 1 || this.quData.quType === 3) && item.checkout) {
              this.radioValue = item.id;
            }
            if (this.quData.quType === 2 && item.checkout) {
              this.multiValue.push(item.id);
            }
          });
        }
        // 填充该题目的答案
        // 关闭详情
        loading.close();
      });
    },

    // 试卷详情
    fetchData(examId) {
      examQuList(examId).then((response) => {
        // 试卷内容
        this.paperData = response.data;

        // 获得第一题内容
        if (this.paperData.radioList && this.paperData.radioList.length > 0) {
          this.cardItem = this.paperData.radioList[0];
        } else if (this.paperData.multiList && this.paperData.multiList.length > 0) {
          this.cardItem = this.paperData.multiList[0];
        } else if (this.paperData.judgeList && this.paperData.judgeList.length > 0) {
          this.cardItem = this.paperData.judgeList[0];
        } else if (this.paperData.saqList && this.paperData.saqList.length > 0) {
          this.cardItem = this.paperData.saqList[0];
        }

        const that = this;

        this.paperData.radioList.forEach(function (item) {
          that.allItem.push(item);
        });

        this.paperData.multiList.forEach(function (item) {
          that.allItem.push(item);
        });

        this.paperData.judgeList.forEach(function (item) {
          that.allItem.push(item);
        });
        this.paperData.saqList.forEach(function (item) {
          that.allItem.push(item);
        });

        // 当前选定
        this.fetchQuData(this.cardItem);
      });
    },
  },
};
</script>

<style scoped>
page {
  background: #ebecee;
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
