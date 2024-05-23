<template>
  <div
    style="
      width: 100%;
      height: 100%;
      background-color: #f0f2f5;
      padding: 20px 0 0;
    "
  >
    <!-- 开头 -->
    <el-row :gutter="24">
      <el-col :span="24">
        <el-card style="margin-bottom: 10px">
          {{ repoTitle }} 题库
          <!-- <el-button
            :loading="loading"
            style="float: right; margin-top: -10px"
            type="primary"
            icon="el-icon-plus"
            @click="handHandExam()"
          >
            {{ handleText }}
          </el-button> -->
        </el-card>
      </el-col>

      <el-col :span="5" :xs="24" style="margin-bottom: 10px">
        <el-card class="content-h">
          <div class="btn_switch">
            <button
              class="btn_anniu"
              @click="change(0)"
              :class="{ newStyle: 0 === number }"
            >
              按顺序
            </button>
            <button
              class="btn_anniu"
              @click="change(1)"
              :class="{ newStyle: 1 === number }"
            >
              按题型
            </button>
            <div style="height: 20px"></div>
            <el-row :gutter="24" class="card-line" style="padding-left: 10px">
              <el-tag type="success">回答正确</el-tag>
              <el-tag type="danger">回答错误</el-tag>
              <el-tag type="info">未作答</el-tag>
              <el-tag type="warning">当前试题</el-tag>
              <div style="margin-bottom: 15px"></div>
            </el-row>
          </div>
          <!-- <div> -->
          <div v-if="0 === number" >
            <!-- <p>我是题型</p> -->
            <p class="card-title">答题卡</p>
            <el-row :gutter="24" class="card-line" style="padding-left: 10px">
              <el-tag
                style="width: calc(100% / 8); text-align: center"
                v-for="(item, index) in quList"
                :type="cardItemClass(item.exercised, item.quId, item.isRight)"
                @click="selectQuNum(item, index)"
                >{{ index + 1 }}</el-tag
              >
            </el-row>
          </div>

          <div v-if="1 === number">
            <div v-if="paperData.radioList.length > 0">
              <p class="card-title">单选题</p>
              <el-row :gutter="24" class="card-line">
                <el-tag
                  v-for="(item, index) in paperData.radioList"
                  :type="cardItemClass(item.exercised, item.quId, item.isRight)"
                  @click="selectQuId(item)"
                >
                  {{ index + 1 }}</el-tag
                >
              </el-row>
            </div>

            <div
              v-if="
                paperData.multiList !== undefined &&
                paperData.multiList.length > 0
              "
            >
              <p class="card-title">多选题</p>
              <el-row :gutter="24" class="card-line">
                <el-tag
                  v-for="(item, index) in paperData.multiList"
                  :type="cardItemClass(item.exercised, item.quId, item.isRight)"
                  @click="selectQuId(item)"
                  >{{ index + 1 }}</el-tag
                >
              </el-row>
            </div>

            <div
              v-if="
                paperData.judgeList !== undefined &&
                paperData.judgeList.length > 0
              "
            >
              <p class="card-title">判断题</p>
              <el-row :gutter="24" class="card-line">
                <el-tag
                  v-for="(item, index) in paperData.judgeList"
                  :type="cardItemClass(item.exercised, item.quId, item.isRight)"
                  @click="selectQuId(item)"
                  >{{ index + 1 }}</el-tag
                >
              </el-row>
            </div>
          </div>

         
          <!-- </div> -->
        </el-card>
      </el-col>

      <el-col :span="19" :xs="24">
        <el-card class="qu-content content-h">
          <p v-if="quDetail.content">
            {{ currentQuIndex + 1 }}.{{ quDetail.content }}
            {{ shouQuType(quDetail.quType) }}
          </p>
          <p v-if="quDetail.image != null && quDetail.image != ''">
            <el-image :src="quDetail.image" style="max-width: 100%" />
          </p>
          <div v-if="quDetail.quType === '1' || quDetail.quType === '3'">
            <el-radio-group v-model="radioValue">
              <el-radio v-for="item in quDetail.options" :label="item.id"
                >{{ numberToLetter(item.sort + 1) }}.{{ item.content }}
                <div
                  v-if="item.image != null && item.image != ''"
                  style="clear: both"
                >
                  <el-image :src="item.image" style="max-width: 100%" />
                </div>
              </el-radio>
            </el-radio-group>
          </div>

          <div v-if="quDetail.quType === '2'">
            <el-checkbox-group v-model="multiValue">
              <el-checkbox
                v-for="item in quDetail.options"
                :key="item.id"
                :label="item.id"
                >{{ numberToLetter(item.sort + 1) }}.{{ item.content }}
                <div
                  v-if="item.image != null && item.image != ''"
                  style="clear: both"
                >
                  <el-image :src="item.image" style="max-width: 100%" />
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <div v-if="nextText == '下一题'">
            <p>
              回答：<span>{{ rightQuAnswer.msg }}</span>
            </p>
            <p>正确答案：{{ getRightAnswer() }}</p>
            <p>试题分析：{{ rightQuAnswer.data.analysis }}</p>
          </div>

          <div style="margin-top: 20px">
            <el-button
              v-if="showPrevious"
              type="primary"
              icon="el-icon-back"
              @click="handPrevious()"
            >
              {{ preText }}
            </el-button>

            <el-button
              v-if="showNext"
              type="warning"
              icon="el-icon-right"
              @click="handNext()"
            >
              {{ nextText }}
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getQuestion, getQuestionDetail, submitAnswer } from "@/api/exercise";
// import { quDetail } from "@/api/question";
import { Loading } from "element-ui";
import ExamTimer from "@/components/ExamTimer";
// import { examStart, examQuList } from "@/api/exam";
export default {
  name: "ExamProcess",
  components: { ExamTimer },
  data() {
    return {
      repoId: "",
      repoTitle: "",
      //当前试题Id，用于按顺序刷题
      curQuId: "",
      //单题详情
      quDetail: {},
      //试题列表
      quList: [],
      preText: "上一步",
      nextText: "下一步",
      rightQuAnswer: {},
      number: 0,
      receivedRow: null,
      //按题型的当前题号索引
      curTypeIndex:0,
      //索引指向哪个列表
      curListIndex:1,
      // 全屏/不全屏
      isFullscreen: false,
      showPrevious: false,
      showNext: true,
      loading: false,
      handleText: "提交",
      pageLoading: false,
      //当前试题索引
      currentQuIndex: 0,
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
    this.repoId = this.$route.query.repoId;
    this.repoTitle = this.$route.query.repoTitle;

    

    this.getQuestionList();
    this.initCurrentIndex()
      this.getCurrentQuDetial();
   
  },
  methods: {
    //获取试题Id列表
    async getQuestionList() {
      const res = await getQuestion(null, this.repoId);
      this.quList = res.data;
     
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
      this.getQuestionList();
      // alert(this.number)
      //按顺序
      if (this.number == 0) {
        this.paperData.radioList = [];
        this.paperData.multiList = [];
        this.paperData.judgeList = [];
      }
      //按题型
      if (this.number == 1) {
        this.quList.forEach((item) => {
          if (item.quType == 1) {
            this.paperData.radioList.push(item);
          } else if (item.quType == 2) {
            this.paperData.multiList.push(item);
          } else if (item.quType == 3) {
            this.paperData.judgeList.push(item);
          }
        });
        this.quList = [];
        //初始化试题Id
        this.initQuId();
        // alert(this.curQuId)
        
      }
      this.getCurrentQuDetial()
    },

    getRightAnswer() {
      var arr = new Array();
  
      this.rightQuAnswer.data.options.forEach((option) => {
        if (option.isRight) {
          arr.push(this.numberToLetter(option.sort + 1));
        }
      });
      
      console.log("11111111111111");
      console.log(arr.join(","));
      return arr.join(",");
      // },100)
    },
    //按题型选择题号
    selectQuId(item){
      // console.log("111111111111111")
      // console.log(item);
      this.curQuId = item.quId
      this.getCurrentQuDetial()
    },
    async getCurrentQuDetial() {
      const loading = Loading.service({
        text: "拼命加载中",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (this.number == 0) {
        // alert("00000000000"+this.currentQuIndex)
        setTimeout(() => {
          //
          getQuestionDetail(this.quList[this.currentQuIndex].quId).then(
            (res) => {
              this.quDetail = res.data;
            }
          );
        }, 100);
      } else if (this.number == 1) {
        // alert("1111111111111"+this.curQuId);
        getQuestionDetail(this.curQuId).then((res) => {
          this.quDetail = res.data;
        });
      }
      loading.close()
    },

    // 答题卡样式
    cardItemClass(answered, id, isright) {
      if (id === this.quDetail.id) {
        return "warning";
      } else if (isright) {
        return "success";
      } else if (answered) {
        return "danger";
      } else {
        return "info";
      }
    },
    //用户按顺序刷题，初始化试题Id
    initQuId() {
      this.curQuId = this.paperData.radioList[0].quId;
    },

    //用于按顺序刷题，初始化试题顺序
    initCurrentIndex() {
      var exercisedCount = 0;

      setTimeout(() => {
        this.quList.forEach((element) => {
          if (element.exercised) {
            this.currentQuIndex++;
            exercisedCount++;
          }
          if (exercisedCount == this.quList.length) {
            this.currentQuIndex = 0;
          }
        });
        this.showButton();
      }, 100);
    },
    //选择题号
    selectQuNum(item, index) {
      const loading = Loading.service({
        text: "拼命加载中",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.fillAnswer();

      this.currentQuIndex = index;
      this.showButton();
      this.getCurrentQuDetial();
      loading.close();
    },

    //题干显示题型
    shouQuType(type) {
      if (type == 1) {
        return "(单选题)";
      } else if (type == 2) {
        return "(多选题)";
      } else if (type == 3) {
        return "(判断题)";
      } else if (type == 4) {
        return "(简答题)";
      }
    },
    /**
     * 下一题
     */
    handNext() {
      const loading = Loading.service({
        text: "拼命加载中",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (this.nextText == "下一题") {
        this.radioValue = "";
        this.multiValue = [];
       //按顺序点击下一题
        if(this.number == 0){
          if (this.currentQuIndex < this.quList.length - 1) {
          this.currentQuIndex++;
        }}
        // }else if(this.number == 1){
        //   //按题型点击下一题
        //   if(this.curListIndex == 1){
        //     //单选题
        //     this.curTypeIndex++;
        //     if(this.curTypeIndex==this.paperData.radioList.length){
        //       //单选题超出索引，就去多选题
        //       this.curListIndex = 2
        //       this.curTypeIndex = 0
        //       this.curQuId = this.paperData.multiList[this.curTypeIndex].quId
        //     }else{
        //       this.curQuId = this.radioList[this.curTypeIndex].quId
        //     }
        //   }else if(this.curListIndex == 2){
        //     //如果当前列表式多选题
        //     this.curTypeIndex++
        //     if(this.curTypeIndex==this.paperData.multiList.length){
        //       this.curListIndex = 3
        //       this.curTypeIndex = 0
        //       this.curQuId = this.paperData.judgeList[this.curTypeIndex].quId
        //     }else{
        //       this.curQuId = this.paperData.multiList[this.curTypeIndex].quId
        //     }
        //   }else if(this.curListIndex == 3){
        //     //判断题
        //     this.curTypeIndex++
        //     if(this.curTypeIndex==this.paperData.judgeList.length){
        //       this.curListIndex = 1
        //       this.curTypeIndex = 0
        //       this.curQuId = this.paperData.radioList[this.curTypeIndex].quId
        //     }else{
        //       this.curQuId = this.paperData.judgeList[this.curTypeIndex].quId
        //     }
        //   }
          
        // }
        this.getCurrentQuDetial();

        setTimeout(() => (this.nextText = "下一步"), 100);

        // alert(this.nextTxt)
      }

      if (this.nextText == "下一步") {
        this.fillAnswer();
        setTimeout(() => {
          this.nextText = "下一题";
        }, 100);
      }
      this.showButton();
      loading.close();
    },
    //填充答案
    async fillAnswer() {
      if (this.radioValue || this.multiValue.length) {
        if (this.radioValue) {
          var params = {
            repoId: this.quList[this.currentQuIndex].repoId,
            quId: this.quDetail.id,
            answer: this.radioValue,
            quType: parseInt(this.quDetail.quType),
          };
        }
        //多选提交答案
        if (this.multiValue.length) {
          params = {
            repoId: this.quList[this.currentQuIndex].repoId,
            quId: this.quDetail.id,
            answer: this.multiValue.join(","),
            quType: parseInt(this.quDetail.quType),
          };
        }

        const res = await submitAnswer(params);
        this.rightQuAnswer = res;
        console.log(res);
      }

      this.getQuestionList();
    },

    async showButton() {
      // alert(this.currentQuIndex)
      // alert(this.currentQuIndex)
      // alert(this.quList.length)
      // console.log(this.currentQuIndex)
      if (this.currentQuIndex === 0) {
        this.showPrevious = false;
      } else {
        this.showPrevious = true;
      }

      if (
        this.currentQuIndex === this.quList.length - 1 &&
        this.nextText === "下一步"
      ) {
        this.showNext = false;
      } else {
        this.showNext = true;
      }
    },

    /**
     * 上一题
     */
    handPrevious() {
      const loading = Loading.service({
        text: "拼命加载中",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (this.currentQuIndex > 0) {
        this.currentQuIndex--;
        this.showButton();
        this.getCurrentQuDetial();
        loading.close();
      }
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
