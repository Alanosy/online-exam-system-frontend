<template>
  <div style="width: 100%; height: 100%; background-color: #f0f2f5; padding: 20px 0 0">
    <!-- Header区域 -->
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
            @click="handHandExamPre()"
          >
            {{ handleText }}
          </el-button>
        </el-card>
      </el-col>

      <!-- 答题卡区域 -->
      <el-col :span="5" :xs="24" style="margin-bottom: 10px">
        <el-card class="content-h">
          <p class="card-title">答题卡</p>
          <el-row :gutter="24" class="card-line" style="padding-left: 10px">
            <el-tag type="info">未作答</el-tag>
            <el-tag type="success">已作答</el-tag>
            <el-tag type="warning">当前题目</el-tag>
          </el-row>

          <!-- 单选题答题卡 -->
          <question-card-section
            v-if="hasQuestions(paperData.radioList)"
            title="单选题"
            :questions="paperData.radioList"
            :current-item="cardItem"
            @select-question="handSave"
          />

          <!-- 多选题答题卡 -->
          <question-card-section
            v-if="hasQuestions(paperData.multiList)"
            title="多选题"
            :questions="paperData.multiList"
            :current-item="cardItem"
            @select-question="handSave"
          />

          <!-- 判断题答题卡 -->
          <question-card-section
            v-if="hasQuestions(paperData.judgeList)"
            title="判断题"
            :questions="paperData.judgeList"
            :current-item="cardItem"
            @select-question="handSave"
          />

          <!-- 简答题答题卡 -->
          <question-card-section
            v-if="hasQuestions(paperData.saqList)"
            title="简答题"
            :questions="paperData.saqList"
            :current-item="cardItem"
            @select-question="handSave"
          />
        </el-card>
      </el-col>

      <!-- 单题区域 -->
      <el-col :span="19" :xs="24">
        <el-card class="qu-content content-h">
          <!-- 题干 -->
          <p v-if="quData.content">{{ quData.sort + 1 }}.{{ quData.content }}</p>
          <p v-if="quData.image">
            <el-image :src="quData.image" style="max-width: 200px" />
          </p>

          <!-- 单选和判断题选项区域 -->
          <div v-if="quData.quType === 1 || quData.quType === 3">
            <el-radio-group v-model="radioValue">
              <el-radio
                v-for="item in quData.answerList"
                :key="item.id"
                :label="item.id"
              >
                {{ numberToLetter(item.sort) }}.{{ item.content }}
                <div v-if="item.image" style="clear: both">
                  <el-image :src="item.image" style="max-width: 200px" />
                </div>
              </el-radio>
            </el-radio-group>
          </div>

          <!-- 多选题区域 -->
          <div v-if="quData.quType === 2">
            <el-checkbox-group v-model="multiValue">
              <el-checkbox
                v-for="item in quData.answerList"
                :key="item.id"
                :label="item.id"
              >
                {{ numberToLetter(item.sort) }}.{{ item.content }}
                <div v-if="item.image" style="clear: both">
                  <el-image :src="item.image" style="max-width: 200px" />
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </div>

          <!-- 简答题区域 -->
          <div v-if="quData.quType === 4">
            <el-input
              v-model="saqTextarea"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
            />
          </div>

          <!-- 提交前汇总对话框 -->
          <exam-summary-dialog
            :visible.sync="examPreVisible"
            :record-data="recordData"
            @close="handleClose"
            @confirm="doHandler"
          />

          <!-- 导航按钮 -->
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

            <!-- 添加最后一题的提交按钮 -->
            <el-button
              v-if="!showNext && cardItem.sort === allItem.length - 1"
              type="success"
              icon="el-icon-check"
              @click="submitLastAnswer()"
            >
              提交答案
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
    </el-dialog>
  </div>
</template>

<script>
import {
  quDetail,
  handExam,
  fillAnswer,
  examCollect,
  examCheat,
  examQuList
} from '@/api/exam'
import { Loading } from 'element-ui'
import ExamTimer from '@/components/ExamTimer'
import QuestionCardSection from './components/QuestionCardSection'
import ExamSummaryDialog from './components/ExamSummaryDialog'

export default {
  name: 'ExamProcess',
  components: {
    ExamTimer,
    QuestionCardSection,
    ExamSummaryDialog
  },
  data() {
    return {
      examId: '',
      receivedRow: null,
      // 全屏/不全屏
      isFullscreen: false,
      showPrevious: false,
      showNext: true,
      loading: false,
      handleText: '交卷',
      saqTextarea: '',
      pageLoading: false,
      // 试卷ID
      paperId: '',
      // 当前答题卡
      cardItem: {},
      allItem: [],
      tipsFlag: false,
      examPreVisible: false,
      // 当前题目内容
      quData: {
        answerList: []
      },
      testData: {},
      pkExam: null,
      examMeg: '',
      // 试卷信息
      paperData: {
        leftSeconds: 99999,
        radioList: [],
        multiList: [],
        judgeList: [],
        saqList: []
      },
      // 单选选定值
      radioValue: '',
      // 多选选定值
      multiValue: [],
      // 已答ID
      answeredIds: [],
      recordData: null,
      //
      submittedAnswers: {}
    }
  },
  created() {
    this.examId = localStorage.getItem('examId')
    this.paperId = this.examId
    this.startExam(this.examId)
    this.fetchData(this.examId)
  },
  mounted() {
    document.addEventListener('visibilitychange', this.pageHidden)
    this.$nextTick(() => {
      const body = document.querySelector('body')
      body.style.overflow = 'auto'
    })
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.pageHidden)
    clearInterval(this.countdownTime)
  },
  methods: {
    // 检查问题列表是否存在
    hasQuestions(list) {
      return list && list.length > 0
    },

    // 检查选项是否被选中
    isCheck(myOption, sort) {
      if (!myOption) return false
      const arr = myOption.split(',').map(Number)
      return arr.includes(sort)
    },

    // 处理对话框关闭
    handleClose() {
      this.examPreVisible = false
    },
    // 将0-5转换为A-F
    numberToLetter(input) {
      if (input === null || input === undefined) return ''

      const numberToCharMap = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E',
        5: 'F'
      }

      // 处理单个数字
      if (typeof input === 'number' || /^\d+$/.test(input)) {
        return numberToCharMap[parseInt(input, 10)] || ''
      }

      // 处理逗号分隔的数字
      if (/^\d+(,\d+)*$/.test(input)) {
        return input.split(',')
          .map(num => numberToCharMap[parseInt(num.trim(), 10)] || '')
          .join(',')
      }

      return ''
    },

    // 交卷前预览
    handHandExamPre() {
      this.handSave(this.cardItem)
      examCollect(this.examId).then((res) => {
        // 按答题卡排序
        this.recordData = this.allItem.map(item =>
          res.data.find(d => d.id === item.questionId)
        )

        this.examPreVisible = true
      })
    },
    // 切换页面检测
    pageHidden(e = null) {
      if (document.visibilityState === 'hidden') {
        examCheat(this.examId).then((res) => {
          if (res.code) {
            this.examMeg = res.msg
            this.tipsFlag = true
            if (res.data) {
              this.$router.push({
                name: 'text-center',
                params: { id: this.paperId }
              })
            }
          }
        })
      }
    },

    // 开始考试
    startExam(examId) {
      examQuList(examId).then((res) => {
        this.paperData = res.data
      })
    },
    /**
     * 统计有多少题没答的
     * @returns {number}
     */
    countNotAnswered() {
      let notAnswered = 0
      const checkList = (list) => {
        if (list) {
          list.forEach(item => {
            if (!item.checkout) {
              notAnswered += 1
            }
          })
        }
      }

      checkList(this.paperData.radioList)
      checkList(this.paperData.multiList)
      checkList(this.paperData.judgeList)
      checkList(this.paperData.saqList)

      return notAnswered
    },

    /**
     * 下一题
     */
    handNext() {
      const index = this.cardItem.sort + 1
      if (index < this.allItem.length) {
        this.handSave(this.allItem[index])
      }
    },

    /**
     * 上一题
     */
    handPrevious() {
      const index = this.cardItem.sort - 1
      if (index >= 0) {
        this.handSave(this.allItem[index])
      }
    },
    // 清空Session
    // 使用函数清除以 "exam_" 开头的所有键值对
    clearSessionStorageByPrefix(prefix) {
      Object.keys(sessionStorage)
        .filter(key => key.startsWith(prefix))
        .forEach(key => sessionStorage.removeItem(key))
    },

    // 交卷
    doHandler() {
      const notAnswered = this.countNotAnswered()
      const msg = notAnswered > 0
        ? `您还有${notAnswered}题未作答，确认要交卷吗?`
        : '确认要交卷吗？'

      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.handleText = '正在交卷，请等待...'
          this.loading = true
          // 删除当前标签页
          this.$store.commit('menu/REMOVE_TAG', {
            title: this.$route.meta.title, // 从路由元数据中获取标题
            path: this.$route.path,
            name: this.$route.name // 添加路由名称
          })
          handExam(this.examId).then(() => {
            this.$message({
              message: '试卷提交成功，即将进入试卷详情！',
              type: 'success'
            })
            this.clearSessionStorageByPrefix('exam_')
            this.$router.push({ name: 'text-center', params: { id: this.paperId }})
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '交卷已取消，您可以继续作答！'
          })
        })
    },

    // 保存答案
    handSave(item, callback) {
      // 更新上一题/下一题按钮状态
      this.showPrevious = item.sort > 0
      this.showNext = item.sort < this.allItem.length - 1

      // 保存当前题目的引用，以便在回调中更新其状态
      const currentItem = this.cardItem

      // 获取题目ID
      const questionId = this.cardItem.questionId
      // 判断题目类型
      const isSimpleAnswer = this.allItem[this.cardItem.sort]?.type === 4

      // 准备答案数据
      let answerContent = ''
      if (isSimpleAnswer) {
        ('简答题');
        (this.saqTextarea)
        // 简答题答案
        answerContent = this.saqTextarea
        // 清空输入框
        this.saqTextarea = ''
      } else {
        ('单选、多选、判断题')
        // 单选、多选、判断题答案
        const answers = [...this.multiValue]
        if (this.radioValue  != '') {
          answers.push(this.radioValue)
        }
        answerContent = answers.join(',')
      }

      // 检查是否有答案，如果没有答案且不是强制提交（如交卷前），则不提交
      const hasAnswer = isSimpleAnswer ? !!answerContent.trim() : answerContent  != '';
      ('hasAnswer:', hasAnswer)
      // 检查是否已经提交过相同的答案
      const previousAnswer = this.submittedAnswers[questionId]
      const answerUnchanged = previousAnswer === answerContent

      // 如果答案已提交且未更改，且不是强制提交（callback不存在），则跳过提交
      if (answerUnchanged && !callback && sessionStorage.getItem('exam_' + questionId) === '1') {
        ('答案未更改，跳过提交')
        // 直接加载下一题
        this.fetchQuData(item)
        return
      }

      // 如果有答案或者是强制提交（callback存在），则提交答案
      if (hasAnswer || callback) {
        const params = {
          examId: this.paperId,
          quId: questionId,
          answer: answerContent
        }
        // 对于多选题，需要对答案进行排序
        if (this.quData.quType === 2 && answerContent) {
        // 将答案ID转为数组，排序后再转回字符串
          const sortedAnswers = answerContent.split(',')
            .map(id => parseInt(id))
            .sort((a, b) => {
            // 查找对应选项的sort值进行排序
              const itemA = this.quData.answerList.find(item => item.id === a)
              const itemB = this.quData.answerList.find(item => item.id === b)
              return (itemA?.sort || 0) - (itemB?.sort || 0)
            })
            .join(',')

          params.answer = sortedAnswers
        }
        fillAnswer(params).then((res) => {
          if (res.code) {
            // 标记为已答
            sessionStorage.setItem('exam_' + currentItem.questionId, '1')

            // 保存已提交的答案，用于后续比较
            this.submittedAnswers[questionId] = answerContent

            // 更新当前题目的状态
            this.updateQuestionStatus(currentItem.questionId, 1)
          } else {
            // 标记为未答
            sessionStorage.setItem('exam_' + currentItem.questionId, '0')
            this.updateQuestionStatus(currentItem.questionId, 0)
          }

          // 最后一个动作，交卷
          if (callback) {
            callback()
          }
          // 查找详情
          this.fetchQuData(item)
        })
      } else {
        // 确保不标记为已答题
        sessionStorage.setItem('exam_' + currentItem.questionId, '0')
        this.updateQuestionStatus(currentItem.questionId, 0)

        // 查找详情
        this.fetchQuData(item)
      }
    },

    // 更新题目状态
    updateQuestionStatus(questionId, status) {
      // 在所有题型列表中查找并更新状态
      const updateListStatus = (list) => {
        if (list && list.length > 0) {
          const question = list.find(q => q.questionId === questionId)
          if (question) {
            question.checkout = status
          }
        }
      }

      updateListStatus(this.paperData.radioList)
      updateListStatus(this.paperData.multiList)
      updateListStatus(this.paperData.judgeList)
      updateListStatus(this.paperData.saqList)
    },

    // 提交最后一题答案
    submitLastAnswer() {
      // 获取题目ID
      const questionId = this.cardItem.questionId
      // 判断题目类型
      const isSimpleAnswer = this.allItem[this.cardItem.sort]?.type === 4

      // 准备答案数据
      let answerContent = ''
      if (isSimpleAnswer) {
        // 简答题答案
        answerContent = this.saqTextarea
      } else {
        // 单选、多选、判断题答案
        const answers = [...this.multiValue]
        if (this.radioValue  != '') {
          answers.push(this.radioValue)
        }
        answerContent = answers.join(',')
      }

      // 检查是否有答案
      const hasAnswer = isSimpleAnswer ? !!answerContent.trim() : answerContent  != ''

      if (hasAnswer) {
        const params = {
          examId: this.paperId,
          quId: questionId,
          answer: answerContent
        }

        // 对于多选题，需要对答案进行排序
        if (this.quData.quType === 2 && answerContent) {
          // 将答案ID转为数组，排序后再转回字符串
          const sortedAnswers = answerContent.split(',')
            .map(id => parseInt(id))
            .sort((a, b) => {
              // 查找对应选项的sort值进行排序
              const itemA = this.quData.answerList.find(item => item.id === a)
              const itemB = this.quData.answerList.find(item => item.id === b)
              return (itemA?.sort || 0) - (itemB?.sort || 0)
            })
            .join(',')

          params.answer = sortedAnswers
        }

        fillAnswer(params).then((res) => {
          if (res.code) {
            // 标记为已答
            sessionStorage.setItem('exam_' + questionId, '1')

            // 保存已提交的答案，用于后续比较
            this.submittedAnswers[questionId] = answerContent

            // 更新当前题目的状态
            this.updateQuestionStatus(questionId, 1)

            this.$message({
              message: '答案提交成功！',
              type: 'success'
            })
          } else {
            // 标记为未答
            sessionStorage.setItem('exam_' + questionId, '0')
            this.updateQuestionStatus(questionId, 0)

            this.$message({
              message: '答案提交失败，请重试！',
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '请先填写答案再提交！',
          type: 'warning'
        })
      }
    },

    // 试卷详情
    fetchQuData(item) {
      // 打开
      const loading = Loading.service({
        text: '拼命加载中',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 获得详情
      this.cardItem = item
      const examId = localStorage.getItem('examId')
      // 查找下个详情
      const params = { examId: examId, questionId: item.questionId }
      quDetail(params).then((response) => {
        this.quData = response.data
        this.radioValue = ''
        this.multiValue = []

        // 根据题目类型设置答案
        if (response.data.quType === 4 && response.data.answerList != null) {
          // 简答题
          this.saqTextarea = response.data.answerList[0].content

          // 记录当前加载的答案
          if (sessionStorage.getItem('exam_' + item.questionId) === '1') {
            this.submittedAnswers[item.questionId] = this.saqTextarea
          }
        } else if (
          response.data.quType === 1 ||
          response.data.quType === 2 ||
          response.data.quType === 3
        ) {
          // 单选、多选、判断题
          this.quData.answerList.forEach((item) => {
            if ((this.quData.quType === 1 || this.quData.quType === 3) && item.checkout) {
              this.radioValue = item.id
            }
            if (this.quData.quType === 2 && item.checkout) {
              this.multiValue.push(item.id)
            }
          })
        }

        // 关闭加载提示
        loading.close()
      }).catch(() => {
        // 出错时也要关闭加载提示
        loading.close()
      })
    },

    // 试卷详情
    fetchData(examId) {
      examQuList(examId).then((response) => {
        // 试卷内容
        this.paperData = response.data
        this.allItem = []

        // 获得第一题内容
        this.setFirstQuestion()

        // 合并所有题目到allItem数组
        this.mergeAllQuestions()

        // 当前选定
        this.fetchQuData(this.cardItem)
      })
    },

    // 设置第一个题目
    setFirstQuestion() {
      if (this.paperData.radioList && this.paperData.radioList.length > 0) {
        this.cardItem = this.paperData.radioList[0]
      } else if (this.paperData.multiList && this.paperData.multiList.length > 0) {
        this.cardItem = this.paperData.multiList[0]
      } else if (this.paperData.judgeList && this.paperData.judgeList.length > 0) {
        this.cardItem = this.paperData.judgeList[0]
      } else if (this.paperData.saqList && this.paperData.saqList.length > 0) {
        this.cardItem = this.paperData.saqList[0]
      }
    },

    // 合并所有题目
    mergeAllQuestions() {
      const addQuestionsToAllItems = (questionList) => {
        if (questionList && questionList.length > 0) {
          questionList.forEach(item => this.allItem.push(item))
        }
      }

      addQuestionsToAllItems(this.paperData.radioList)
      addQuestionsToAllItems(this.paperData.multiList)
      addQuestionsToAllItems(this.paperData.judgeList)
      addQuestionsToAllItems(this.paperData.saqList)
    },

    // 处理滚动事件
    handleScroll() {
      // 实现滚动逻辑
    },

    // 获取左侧距离
    getLfetDistance() {
      const body = document.querySelector('body')
      this.flexLeft = (body.offsetWidth - 1200) / 2
    }
  }
}
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
  display: flex;
  flex-wrap: wrap;
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

/* 考试记录 */
.content {
  width: 97%;
  height: 60px;
  border: 1px solid #0a84ff;
  margin-top: 8px;
  margin-left: 10px;
  padding: 10px;
  font-weight: 200;
}
.sj {
  margin-top: 10px;
  margin-left: 10px;
  line-height: 22px;
}
.fk {
  width: 200px;
  height: 100%;
  box-shadow: 0 0 15px rgb(197, 197, 197);
  margin: auto;
  margin-top: 20px;
  margin-left: 15px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.left {
  width: 250px;
  height: 100%;
}
.right {
  width: 70%;
  height: 100%;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 95%;
  margin: 24px 0;
}
.type_tag {
  margin-right: 5px;
  margin-top: 10px;
}

/* // 试题内容样式 */
.qu_list {
  height: 100%;
  width: 100%;
  overflow: auto;
  page-break-after: always;

  .qu_num {
    display: inline-block;
    /* // background: url('~@/assets/images/tkxl/btbj.png') no-repeat 100% 100%; */
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

  .qu_content {
    padding-left: 10px;
  }

  /* // 选项组 */
  .qu_choose_group {
    width: 100%;

    /* 单个选项 */
    .qu_choose {
      display: block;
      margin: 10px;
      .el-radio__label {
        line-height: 20px;
      }
      /* // 去除前面的radio */
      ::v-deep .el-radio__input .el-radio__inner {
        display: none;
      }

      /* // 单个选项内容样式 */
      .qu_choose_tag {
        display: inline-flex;
        width: 90%;
        /* // 选项标签 */
        .qu_choose_tag_type {
          font-weight: bold;
          /* // color: #0a84ff; */
          width: 10px;
        }
        /* // 选项内容 */
        .qu_choose_tag_content {
          padding: 0 10px 10px 10px;
        }

        .qu_choose_tag_el_image {
          clear: both;
          padding-top: 10px;
        }
      }
      /* // 选项答案 */
      .qu_choose_answer {
        float: right;
      }
    }
  }

  /* // 试题解析 */
  .qu_analysis {
    padding: 10px;

    .qu_analysis_content {
      padding-top: 10px;
    }
  }

  /* // 试题赋分 */
  .qu_assign_score {
    background: #f5f5f5;
    height: 100px;
    padding-top: 35px;

    .qu_assign_score_content {
      width: 80px;
    }
  }
}
.current {
  background: #f5f5f5;
}
.imgC{
  height:150px
}
.qu_choose_tag_img {
          height: auto;
          display: block;
          margin: 10px;
        }
</style>
