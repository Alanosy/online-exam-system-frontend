<template>
  <div>
    <div style="display: flex; justify-content: center; margin-top: 3em">
      <div class="left">
        <el-card class="box-card">
          登录时长
          <div ref="charts" class="chart-div" />
        </el-card>
      </div>
      <div class="right">
        <el-card class="box-card">
          最新公告
          
          <div v-infinite-scroll="load" style="overflow: auto">
    
           <el-collapse v-model="activeNames"  accordion>
             <div v-for="(item, index) in noticePage.records">
                <el-collapse-item v-if="item!=null" :title="item.title" :name="index">
                  <div v-html="item.content"></div>
                  <div class="noticeContent">
                    <div>{{ item.realName }}</div>
                    <div>{{ item.createTime }}</div>
                  </div>
                </el-collapse-item>
              </div>
            </el-collapse> 
          </div>

          <!-- <div>
            <el-pagination small layout="prev, pager, next" :total="50"> </el-pagination>
          </div> -->
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { noticeGetNew } from "@/api/notice";
import { getDaily } from "@/api/stat";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      noticePage: {},
      dateArray: [],
      formattedData: [],
      option: {
        // title: { text: '登录时长' },
        tooltip: {},
        xAxis: {
          data: [], // 初始化为空，稍后用dateArray填充
        },
        yAxis: {},
        series: [
          {
            name: "登录时长(分钟)", // 更新系列名称以匹配单位变更
            type: "bar",
            data: [], // 初始化为空，稍后用转换后的分钟数据填充
          },
        ],
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  created() {
    this.getDailyFun();

    this.getNotice(this.pageNum, this.pageSize);
  },

  mounted() {
    this.initCharts();
  },

  methods: {
    //   获取登录时长
    getDailyFun() {
      getDaily().then((res) => {
        if (res.code === 1) {
          const currentDate = new Date();
          // 计算15天前的日期
          const fifteenDaysAgo = new Date(
            currentDate.getTime() - 15 * 24 * 60 * 60 * 1000
          );

          // 生成从今天往回15天的日期数组
          for (let i = 0; i <= 14; i++) {
            const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
            this.dateArray.push(date.toISOString().split("T")[0]);
          }
          // 确保dateArray是倒序的
          this.dateArray.reverse();

          // 整理原始数据，确保每个日期都有记录，没有的补0
          const dataMap = res.data.reduce((acc, item) => {
            acc[item.loginDate] = item.totalSeconds;
            return acc;
          }, {});

          this.formattedData = this.dateArray.map((date) => {
            const secondsOnDate = dataMap[date] || 0;
            return secondsOnDate / 60; // 转换秒为分钟
          });

          // 更新图表配置
          this.option.xAxis.data = this.dateArray;
          this.option.series[0].data = this.formattedData;
          this.$nextTick(() => {
            this.initCharts(); // 确保DOM已更新后再初始化图表
          });
        }
      });
    },

    // 分页查询
    async getNotice(pageNum, pageSize) {
      const params = { pageNum: pageNum, pageSize: pageSize };
      const res = await noticeGetNew(params);
      this.noticePage = res.data;
      // this.transformData(res);
    },
    initCharts() {
      const myChart = this.$echarts.init(this.$refs.charts);
      // 绘制图表
      myChart.setOption(this.option);
    },
    handleNodeClick(data) {
      // console.log(data);
    },
  },
};
</script>
<style>
.luang {
  margin: auto;
  width: 1100px;
  height: 100vh;
  /* 100px */
  background-color: rgb(241, 218, 221);
  margin-top: 30px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}

.box-card {
  margin-top: 50px;
  width: 60vh;
  height: 60vh;
  margin-left: 85px;
}
.chart-div {
  margin-top: 10px;
  /* width: 450px;
  height: 300px; */
  width: 100%;
  height: 50vh;
  border: solid black 1px;
}
.i {
  margin-top: 10px;
  height: 60vh;
  /* 添加滚动条样式 */
  overflow-y: auto; /* 启用垂直滚动条 */
  max-height: 300px; /* 指定最大高度，根据需要调整 */
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
.noticeContent {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-left: 20px;
}
</style>
