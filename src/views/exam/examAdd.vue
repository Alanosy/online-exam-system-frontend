<template>
  <div class="app-container">
    <h3>组卷信息</h3>
    <el-card style="margin-top: 20px">
      <div style="float: right; font-weight: bold; color: #ff0000">
        试卷总分：{{ postForm.totalScore }}分
      </div>

      <div>
        <!-- <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="handleAdd">
          添加题库
        </el-button> -->

        <el-table
          :data="repoList"
          :border="false"
          empty-text="请点击上面的`添加题库`进行设置"
          style="width: 100%; margin-top: 15px"
        >
          <el-table-column label="题库" width="200">
            <template v-slot="scope">
              <repo-select
                v-model="scope.row.repoId"
                :multi="false"
                :excludes="excludes"
                @change="repoChange($event, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="单选数量" align="center">
            <template v-slot="scope">
              <el-input-number
                v-model="scope.row.radioCount"
                :min="0"
                :max="scope.row.totalRadio"
                :controls="false"
                style="width: 80px"
              />
              <template v-if="scope.row.totalRadio!= undefined">
                / {{ scope.row.totalRadio }}
              </template>
            </template>
          </el-table-column>

          <el-table-column label="单选分数" align="center">
            <template v-slot="scope">
              <el-input-number
                v-model="scope.row.radioScore"
                :min="0"
                :controls="false"
                style="width: 80px"
              />
            </template>
          </el-table-column>

          <el-table-column label="多选数量" align="center">
            <template v-slot="scope">
              <el-input-number
                v-model="scope.row.multiCount"
                :min="0"
                :max="scope.row.totalMulti"
                :controls="false"
                style="width: 80px"
              />
              <template v-if="scope.row.totalMulti!= undefined">
                / {{ scope.row.totalMulti }}
              </template>
            </template>
          </el-table-column>

          <el-table-column label="多选分数" align="center">
            <template v-slot="scope">
              <el-input-number
                v-model="scope.row.multiScore"
                :min="0"
                :controls="false"
                style="width: 80px"
              />
            </template>
          </el-table-column>

          <el-table-column label="判断题数量" align="center">
            <template v-slot="scope">
              <el-input-number
                v-model="scope.row.judgeCount"
                :min="0"
                :max="scope.row.totalJudge"
                :controls="false"
                style="width: 80px"
              />
              <template v-if="scope.row.totalJudge!= undefined">
                / {{ scope.row.totalJudge }}
              </template>
            </template>
          </el-table-column>

          <el-table-column label="判断题分数" align="center">
            <template v-slot="scope">
              <el-input-number
                v-model="scope.row.judgeScore"
                :min="0"
                :controls="false"
                style="width: 80px"
              />
            </template>
          </el-table-column>
          <el-table-column label="简答题数量" align="center">
            <template v-slot="scope">
              <el-input-number
                v-model="scope.row.saqCount"
                :min="0"
                :max="scope.row.totalSaq"
                :controls="false"
                style="width: 80px"
              />
              <template v-if="scope.row.totalSaq!= undefined">
                / {{ scope.row.totalSaq }}
              </template>
            </template>
          </el-table-column>

          <el-table-column label="简答题分数" align="center">
            <template v-slot="scope">
              <el-input-number
                v-model="scope.row.saqScore"
                :min="0"
                :controls="false"
                style="width: 80px"
              />
            </template>
          </el-table-column>
          <!-- <el-table-column label="删除" align="center" width="80px">
            <template v-slot="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeItem(scope.$index)"
              />
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </el-card>

    <h3>考试配置</h3>
    <el-card style="margin-top: 20px">
      <el-form
        ref="postForm"
        :model="postForm"
        :rules="rules"
        label-position="left"
        label-width="120px"
      >
        <el-form-item label="考试名称" prop="title">
          <el-input v-model="postForm.title" />
        </el-form-item>

        <!-- <el-form-item label="考试描述" prop="content">
          <el-input v-model="postForm.content" type="textarea" />
        </el-form-item> -->

        <el-form-item label="总分数" prop="totalScore">
          <el-input-number :value="postForm.totalScore" disabled />
        </el-form-item>

        <el-form-item label="及格分" prop="passedScore">
          <el-input-number v-model="postForm.passedScore" :max="postForm.totalScore" />
        </el-form-item>

        <el-form-item label="最多切屏次数" prop="maxCount">
          <el-input-number v-model="postForm.maxCount" />
        </el-form-item>
        <el-form-item label="证书" prop="maxCount">
          <CertificateSelect
            v-model="postForm.certificateId"
            is-multiple
            @change="onCertificateChange"
          />
          <!-- <el-input-number v-model="postForm.maxCount"  /> -->
        </el-form-item>
        <el-form-item label="考试时长(分钟)" prop="examDuration">
          <el-input-number v-model="postForm.examDuration" />
        </el-form-item>
        <el-form-item label="考试时间范围" prop="start">
          <el-date-picker
            v-model="postForm.start"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <!--
        <el-form-item label="是否限时">
          <el-checkbox v-model="postForm.timeLimit" />
        </el-form-item> -->

        <el-form-item v-if="postForm.timeLimit" label="考试时间" prop="examDuration">
          <el-date-picker
            v-model="dateValues"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <h3>权限配置</h3>
    <el-card style="margin-top: 20px">
      <div style="display: flex">
        <div style="margin-left: 10px">
          <el-form
            ref="postForm"
            :model="postForm"
            :rules="rules"
            label-position="left"
            label-width="120px"
          >
            <el-form-item label="考试班级" prop="classIds">
              <ClassSelect v-model="postForm.classIds" is-multiple @change="onClassChange" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>

    <div style="margin-top: 20px">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
// import { fetchDetail } from '@/api/exam'
import RepoSelect from '@/components/RepoSelect'
import ClassSelect from '@/components/ClassSelect'
import CertificateSelect from '@/components/CertificateSelect'
import { saveData } from '@/api/exam'
export default {
  name: 'ExamDetail',

  components: { RepoSelect, ClassSelect, CertificateSelect },
  data() {
    return {
      input: '',
      treeData: [],
      defaultProps: {
        label: 'deptName'
      },
      filterText: '',
      treeLoading: false,
      dateValues: [],
      // 题库
      repoList: [
        {
          id: '',
          rowId: 0,
          radioCount: 0,
          radioScore: 0,
          multiCount: 0,
          multiScore: 0,
          judgeCount: 0,
          judgeScore: 0,
          saqCount: 0,
          saqScore: 0
        }
      ],
      // 已选择的题库
      excludes: [],
      postForm: {
        // 总分数
        totalScore: 0,
        // 题库列表
        repoList: [],
        // 开放类型
        openType: 1,
        // 考试班级列表
        departIds: [],
        // 初始化班级列表
        classIds: []
      },
      rules: {
        title: [{ required: true, message: '考试名称不能为空！' }],

        // content: [{ required: true, message: '考试描述不能为空！' }],

        open: [{ required: true, message: '考试权限不能为空！' }],

        totalScore: [{ required: true, message: '考试分数不能为空！' }],

        passedScore: [{ required: true, message: '及格分不能为空！' }],

        examDuration: [{ required: true, message: '考试时间不能为空！' }],

        start: [{ required: true, message: '考试时间范围不能为空！' }],

        maxCount: [{ required: false, message: '最多切屏次数' }],
        classIds: [{ required: true, message: '请选择考试班级！', type: 'array', min: 1 }]
      }
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },

    dateValues: {
      handler() {
        this.postForm.startTime = this.dateValues[0]
        this.postForm.endTime = this.dateValues[1]
      }
    },

    // 题库变换
    repoList: {
      handler(val) {
        let totalScore = 0
        this.excludes = []
        for (let i = 0; i < val.length; i++) {
          const item = val[i]
          if (item.radioCount > 0 && item.radioScore > 0) {
            totalScore += item.radioCount * item.radioScore
          }

          if (item.multiCount > 0 && item.multiScore > 0) {
            totalScore += item.multiCount * item.multiScore
          }

          if (item.judgeCount > 0 && item.judgeScore > 0) {
            totalScore += item.judgeCount * item.judgeScore
          }
          if (item.saqCount > 0 && item.saqScore > 0) {
            totalScore += item.saqCount * item.saqScore
          }
          this.excludes.push(item.id)
        }

        // 赋值
        this.postForm.totalScore = totalScore
        this.postForm.repoList = val
        this.$forceUpdate()
      },
      deep: true
    }
  },
  methods: {
    handleSave() {
      this.$refs.postForm.validate((valid) => {
        if (!valid) {
          return
        }

        if (this.postForm.totalScore === 0) {
          this.$notify({
            title: '提示信息',
            message: '考试规则设置不正确，请确认！',
            type: 'warning',
            duration: 2000
          })

          return
        }

        // 验证班级是否选择
        if (!this.postForm.classIds || this.postForm.classIds.length === 0) {
          this.$notify({
            title: '提示信息',
            message: '请选择考试班级！',
            type: 'warning',
            duration: 2000
          })
          return
        }

        for (let i = 0; i < this.postForm.repoList.length; i++) {
          const repo = this.postForm.repoList[i]
          if (!repo.repoId) {
            this.$notify({
              title: '提示信息',
              message: '考试题库选择不正确！',
              type: 'warning',
              duration: 2000
            })
            return
          }

          if (
            (repo.radioCount > 0 && repo.radioScore === 0) ||
            (repo.radioCount === 0 && repo.radioScore > 0)
          ) {
            this.$notify({
              title: '提示信息',
              message: '题库第：[' + (i + 1) + ']项存在无效的单选题配置！',
              type: 'warning',
              duration: 2000
            })

            return
          }

          if (
            (repo.multiCount > 0 && repo.multiScore === 0) ||
            (repo.multiCount === 0 && repo.multiScore > 0)
          ) {
            this.$notify({
              title: '提示信息',
              message: '题库第：[' + (i + 1) + ']项存在无效的多选题配置！',
              type: 'warning',
              duration: 2000
            })

            return
          }

          if (
            (repo.judgeCount > 0 && repo.judgeScore === 0) ||
            (repo.judgeCount === 0 && repo.judgeScore > 0)
          ) {
            this.$notify({
              title: '提示信息',
              message: '题库第：[' + (i + 1) + ']项存在无效的判断题配置！',
              type: 'warning',
              duration: 2000
            })
            return
          }

          if (
            (repo.saqCount > 0 && repo.saqScore === 0) ||
            (repo.saqCount === 0 && repo.saqScore > 0)
          ) {
            this.$notify({
              title: '提示信息',
              message: '题库第：[' + (i + 1) + ']项存在无效的简答题配置！',
              type: 'warning',
              duration: 2000
            })
            return
          }
        }

        this.$confirm('确实要提交保存吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitForm()
        })
      })
    },

    handleCheckChange() {
      const that = this
      // 置空
      this.postForm.departIds = []
      const nodes = this.$refs.tree.getCheckedNodes()
      nodes.forEach(function(item) {
        that.postForm.departIds.push(item.id)
      })
    },

    // 添加子项
    handleAdd() {
      this.repoList.push()
    },

    removeItem(index) {
      this.repoList.splice(index, 1)
    },
    formatDateToISOString(date) {
      // 确保输入是一个Date对象
      if (!(date instanceof Date)) {
        throw new TypeError('Expected a Date object')
      }

      // 格式化为ISO 8601格式，注意这里的时区会自动调整为UTC
      let isoString = date.toISOString()

      // 截取并重新组合字符串，去除毫秒部分并替换T为大写
      // 这一步是根据你的需求调整，通常ISO 8601格式包含毫秒且T是小写
      isoString = isoString.split('.')[0].replace('T', 'T')

      return isoString
    },

    submitForm() {
      // 校验和处理数据
      let cerTemp = ''
      if (this.postForm.certificateId != null && this.postForm.certificateId != '') {
        console.log(this.postForm.certificateId)
        cerTemp = this.postForm.certificateId.join(',')
      }
      this.postForm.repoList = this.repoList
      const params = {
        title: this.postForm.title,
        // content: this.postForm.content, // 添加考试描述字段
        examDuration: this.postForm.examDuration,
        maxCount: this.postForm.maxCount,
        passedScore: this.postForm.passedScore,
        startTime: this.formatDateToISOString(this.postForm.start[0]),
        endTime: this.formatDateToISOString(this.postForm.start[1]),
        gradeIds: this.postForm.classIds.join(','),
        repoId: this.postForm.repoList[0].id,
        certificateId: cerTemp,
        radioCount: this.postForm.repoList[0].radioCount,
        radioScore: this.postForm.repoList[0].radioScore,
        multiCount: this.postForm.repoList[0].multiCount,
        multiScore: this.postForm.repoList[0].multiScore,
        judgeCount: this.postForm.repoList[0].judgeCount,
        judgeScore: this.postForm.repoList[0].judgeScore,
        saqCount: this.postForm.repoList[0].saqCount,
        saqScore: this.postForm.repoList[0].saqScore
      }
      saveData(params).then((res) => {
        if (res.code) {
          this.$notify({
            title: '成功',
            message: '考试保存成功！',
            type: 'success',
            duration: 2000
          })

          this.$router.push({ name: 'exam-management' })
        } else {
          this.$notify({
            title: '失败',
            message: res.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },

    filterNode(value, data) {
      if (!value) return true
      return data.deptName.indexOf(value) != -1
    },
    onCertificateChange() {
      // 方法实现...
    },
    onClassChange() {

    },
    repoChange(e, row) {
      // 赋值ID
      row.id = e.id
      if (e != null) {
        row.totalRadio = e.radioNum
        row.totalMulti = e.multiNum
        row.totalJudge = e.judgeNum
        row.totalSaq = e.saqNum
      } else {
        row.totalRadio = 0
        row.totalMulti = 0
        row.totalJudge = 0
        row.totalSaq = 0
      }
    }
  }
}
</script>
