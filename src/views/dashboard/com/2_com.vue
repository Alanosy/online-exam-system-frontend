<!--
 * @Author: st 2946594574@qq.com
 * @Date: 2024-03-04 15:23:49
 * @LastEditors: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @LastEditTime: 2024-05-30 15:57:22
 * @FilePath: \com-project\src\views\dashboard\com\2_com.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div style="display: flex; justify-content: center; margin-top: 3em">
      <div class="left">
        <el-card class="box-card">
          登录时长
          <div ref="charts" class="chart-div" />
        </el-card>
      </div>
      <div
        class="right"
        :style="{'max-height': this.timeLineHeight + 'px' }"
        style="overflow-y:scroll;"
      >
        <el-card class="box-card">
          最新公告
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div> <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div> <div>最新公告</div>
          <div>最新公告</div>
          <div>最新公告</div>
          <div class="i">
            <el-tree
              :data="data"
              :props="defaultProps"
              style="height: 36px; margin-top: 20px"
              @node-click="handleNodeClick"
            >
              <template slot-scope="{ node, data }">
                <div @click="node.expand()" v-html="data.label" />
                <!-- 确保data.label是已经处理过的安全HTML字符串 -->
              </template>
            </el-tree>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { noticeGetNew } from '@/api/notice'
import { getDaily } from '@/api/stat'
export default {
  data() {
    return {
      timeLineHeight: '',
      pageNum: 1,
      pageSize: 10,
      data: {},
      dateArray: [],
      formattedData: [],
      option: {
        title: { text: '登录时长' },
        tooltip: {},
        xAxis: {
          data: [] // 初始化为空，稍后用dateArray填充
        },
        yAxis: {},
        series: [
          {
            name: '登录时长(分钟)', // 更新系列名称以匹配单位变更
            type: 'bar',
            data: [] // 初始化为空，稍后用转换后的分钟数据填充
          }
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getDailyFun()

    this.getNotice(this.pageNum, this.pageSize)
  },

  mounted() {
    this.initCharts()
    this.timeLineHeight = document.documentElement.clientHeight - 210
    window.onresize = () => {
      this.timeLineHeight = document.documentElement.clientHeight - 210
    }
  },
  methods: {
    getDailyFun() {
      getDaily().then((res) => {
        if (res.code === 1) {
          const currentDate = new Date()
          // 计算15天前的日期
          const fifteenDaysAgo = new Date(
            currentDate.getTime() - 15 * 24 * 60 * 60 * 1000
          )

          // 生成从今天往回15天的日期数组
          for (let i = 0; i <= 14; i++) {
            const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000)
            this.dateArray.push(date.toISOString().split('T')[0])
          }
          // 确保dateArray是倒序的
          this.dateArray.reverse()

          // 整理原始数据，确保每个日期都有记录，没有的补0
          const dataMap = res.data.reduce((acc, item) => {
            acc[item.loginDate] = item.totalSeconds
            return acc
          }, {})

          this.formattedData = this.dateArray.map((date) => {
            const secondsOnDate = dataMap[date] || 0
            return secondsOnDate / 60 // 转换秒为分钟
          })

          // 更新图表配置
          this.option.xAxis.data = this.dateArray
          this.option.series[0].data = this.formattedData
          this.$nextTick(() => {
            this.initCharts() // 确保DOM已更新后再初始化图表
          })
        }
      })
    },

    transformData(originalData) {
      if (originalData.data && originalData.data.records) {
        return originalData.data.records.map((record, index) => ({
          label: ` ${record.title}`,
          children: [
            {
              label: ` ${record.content}`
            }
          ]
        }))
      } else {
        console.error("Invalid data format or missing 'records' key.")
        return []
      }
    },

    // 分页查询
    async getNotice(pageNum, pageSize) {
      const params = { pageNum: pageNum, pageSize: pageSize }
      const res = await noticeGetNew(params)
      this.data = this.transformData(res)
      // console.log("this.data", this.data);
    },
    initCharts() {
      const myChart = this.$echarts.init(this.$refs.charts)
      // 绘制图表
      myChart.setOption(this.option)
    },
    handleNodeClick(data) {
      // console.log(data);
    }
  }

}
</script>
<style>
.luang {
  margin: auto;
  width: 1100px;
  height: 100px;
  background-color: rgb(241, 218, 221);
  margin-top: 30px;
  box-shadow: 3px 3px 3px 3px whitesmoke;
}

.right{
   width: 500px;
   height: 450px;
}

.box-card {
  margin-top: 50px;
  width: 500px;
  margin-left: 85px;
    overflow-y: scroll;

}
.chart-div {
  margin-top: 10px;
  width: 450px;
  height: 300px;
  border: solid black 1px;
}
.i {
  height: 290px;
}

.el-tree-node__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 47px;
  cursor: pointer;
}
</style>
