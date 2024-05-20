<template>icon="el-icon-back"
  <div style="width: 100%; height: 100%; background-color: #f0f2f5; padding: 20px 0 0">
    <!-- 开头 -->
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card style="margin-bottom: 10px">
          {{ repoTitle }} 题库
          <el-button :loading="loading" style="float: right; margin-top: -10px" type="primary" icon="el-icon-plus"
            @click="handHandExam()">
            {{ handleText }}
          </el-button>
        </el-card>
      </el-col>

      <el-col :span="5" :xs="24" style="margin-bottom: 10px">
        <el-card class="content-h">
          <div class="btn_switch">
            <button class="btn_anniu" @click="change(0)" :class="{ newStyle: 0 === number }">按顺序</button>
            <button class="btn_anniu" @click="change(1)" :class="{ newStyle: 1 === number }">按题型</button>
          </div>
          <div>
            <div v-show="0 === number">
              <!-- <p>我是题型</p> -->
              <p class="card-title">答题卡</p>
              <el-row :gutter="24" class="card-line" style="padding-left: 10px">
                <el-tag type="info">未作答</el-tag>
                <el-tag type="success">已作答</el-tag><div style="margin-bottom: 15px;"></div>
                <el-tag style="width: calc(100% / 8); text-align: center;" v-for="(item, index) in quList" :type="cardItemClass(item.answered, item.quId)"
                  @click="handSave(item)">{{ index + 1  }}</el-tag>
               
              </el-row>

              <div v-if="paperData.radioList !== undefined && paperData.radioList.length > 0">
                <p class="card-title">单选题</p>
                <el-row :gutter="24" class="card-line">
                  <el-tag v-for="item in paperData.radioList" :type="cardItemClass(item.answered, item.quId)"
                    @click="handSave(item)">
                    {{ item.sort + 1 }}</el-tag>
                </el-row>
              </div>

              <div v-if="paperData.multiList !== undefined && paperData.multiList.length > 0">
                <p class="card-title">多选题</p>
                <el-row :gutter="24" class="card-line">
                  <el-tag v-for="item in paperData.multiList" :type="cardItemClass(item.answered, item.quId)"
                    @click="handSave(item)">{{ item.sort + 1 }}</el-tag>
                </el-row>
              </div>

              <div v-if="paperData.judgeList !== undefined && paperData.judgeList.length > 0">
                <p class="card-title">判断题</p>
                <el-row :gutter="24" class="card-line">
                  <el-tag v-for="item in paperData.judgeList" :type="cardItemClass(item.answered, item.quId)"
                    @click="handSave(item)">{{ item.sort + 1 }}</el-tag>
                </el-row>
              </div>
            </div>
            <div v-show="1 === number">
              <!-- <p>我是顺序</p> -->
              <p class="card-title">答题卡</p>
            </div>
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
              <el-radio v-for="item in quData.answerList" :label="item.id">{{ numberToLetter(item.sort + 1) }}.{{
      item.content }}
                <div v-if="item.image != null && item.image != ''" style="clear: both">
                  <el-image :src="item.image" style="max-width: 100%" />
                </div>
              </el-radio>
            </el-radio-group>
          </div>

          <div v-if="quData.quType === 2">
            <el-checkbox-group v-model="multiValue">
              <el-checkbox v-for="item in quData.answerList" :key="item.id" :label="item.id">{{ item.abc }}.{{
      item.content }}
                <div v-if="item.image != null && item.image != ''" style="clear: both">
                  <el-image :src="item.image" style="max-width: 100%" />
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <div style="margin-top: 20px">
            <el-button v-if="showPrevious" type="primary"  @click="handPrevious()">
              上一题
            </el-button>

            <el-button v-if="showNext" type="warning" icon="el-icon-right" @click="handNext()">
              下一题
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getQuestion, } from "@/api/exercise";
import { Loading } from "element-ui";
import ExamTimer from "@/components/ExamTimer";
// import { examStart, examQuList } from "@/api/exam";
export default {
  name: "ExamProcess",
  components: { ExamTimer },
  data() {
    return {
      repoId: '',
      repoTitle: '',
      //试题列表
      quList: [],
      number: 0,
      receivedRow: null,
      // 全屏/不全屏
      isFullscreen: false,
      showPrevious: false,
      showNext: true,
      loading: false,
      handleText: "提交",
      pageLoading: false,
      // 试卷ID
      paperId: "",
      // 当前答题卡
      cardItem: {},
      allItem: [],
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
      // 单选选定值
      radioValue: "",
      // 多选选定值
      multiValue: [],
      // 已答ID
      answeredIds: [],
    };
  },
  created() {
    this.repoId = this.$route.query.repoId
    this.repoTitle = this.$route.query.repoTitle
    // this.receivedRow = this.$route.query.zhi;
    this.getQuestionList()
    // const id =  this.$route.query.zhi.id;
    // this.paperId = 28;
    // this.fetchData(28);
    // if (typeof id !== 'undefined') {
    //   this.paperId = id
    //   this.fetchData(28)
    // }
  },
  methods: {
    async getQuestionList() {

      const res = await getQuestion(null, this.repoId)
      this.quList = res.data
      // // alert(res)
      console.log("-----------------");
      console.log(res);
      // console.log(this.quList);
    },
    numberToLetter(sort) {
      switch (sort) {
        case 1:
          return "A";
        case 2:
          return "B";
        case 3:
          return "C";
        case 4:
          return "D";
        case 5:
          return "E";
        case 6:
          return "F";
        default:
          return ""; // 默认值，或者可以处理其他情况
      }
    },
    change: function (index) {
      this.number = index; //重要处
    },
    startExam(examId) {
      examStart(examId);
      examQuList(28).then((res) => {
        this.paperData = res.data;
        console(this.paperData);
      });
    },
    // 答题卡样式
    cardItemClass(answered, quId) {
      if (quId === this.cardItem.quId) {
        return "warning";
      }

      if (answered) {
        return "success";
      }

      if (!answered) {
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

    doHandler() {
      this.handleText = "正在交卷，请等待...";
      this.loading = true;

      // const params = { id: this.paperId };
      handExam(this.paperId).then(() => {
        this.$message({
          message: "试卷提交成功，即将进入试卷详情！",
          type: "success",
        });

        this.$router.push({ name: "ShowExam", params: { id: this.paperId } });
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
      console.log("1a");
      console.log(this.cardItem);
      const params = {
        examId: this.paperId,
        quId: this.cardItem.questionId,
        answer: answers.join(","),
        // answer: "",
      };
      fillAnswer(params).then(() => {
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

      // 查找下个详情
      const params = { examId: this.paperId, questionId: item.questionId };
      quDetail(params).then((response) => {
        // console.log(response);
        console.log("=================");
        console.log(response.data);
        console.log("=================");
        this.quData = response.data;
        this.radioValue = "";
        this.multiValue = [];

        // 填充该题目的答案
        this.quData.answerList.forEach((item) => {
          if ((this.quData.quType === 1 || this.quData.quType === 3) && item.checked) {
            this.radioValue = item.id;
          }

          if (this.quData.quType === 2 && item.checked) {
            this.multiValue.push(item.id);
          }
        });

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
