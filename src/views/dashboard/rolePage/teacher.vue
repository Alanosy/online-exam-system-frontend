<template>
  <div class="app-container">
    <div class="luan">
      <div class="df">
        <div class="x">
          <div>
            <svg
              id="mx_n_1715843542811"
              t="1715843542810"
              class="icon"
              style="width: 100px; height: 60px; margin-top: 10px"
              viewBox="0 0 1088 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5791"
              width="48"
              height="48"
            >
              <path
                d="M1024 127.168c0 18.368-14.592 33.28-32.512 33.28h-81.28a32.896 32.896 0 0 1-32.64-33.28v-29.952c0-18.304 14.592-33.216 32.64-33.216h81.28c17.92 0 32.512 14.912 32.512 33.28v29.888zM635.264 954.24L123.52 960c-25.088 0-59.52-26.624-59.52-52.288v-24.96h565.248v24.96c0 16.064 2.112 31.744 6.016 46.528z"
                fill="#36ab60"
                p-id="5792"
              />
              <path
                d="M974.656 0H258.688c-62.592 0-113.344 50.944-113.344 113.856v704.192H0v92.16C0 972.992 50.752 1024 113.344 1024h674.688s7.04-0.128 12.48-0.64a113.664 113.664 0 0 0 100.928-113.216V205.952H1088v-92.16C1088 51.008 1037.248 0 974.656 0zM113.408 957.056a46.848 46.848 0 0 1-46.72-46.912v-25.216h566.208v25.216c0 16.256 2.112 32 6.144 46.912H113.408z m721.344-46.912a46.848 46.848 0 0 1-46.72 46.912h-78.4a113.728 113.728 0 0 1-10.048-46.912v-92.16H211.968V113.92c0-25.92 20.992-46.912 46.72-46.912h576.064V910.08z m186.56-771.072h-119.808v-25.216a46.72 46.72 0 0 1 41.6-46.656l2.688-0.256h28.8c25.792 0 46.72 20.992 46.72 46.912v25.216z"
                fill="#36ab60"
                p-id="5793"
              />
              <path
                d="M282.88 704c-14.784 0-26.88-10.496-26.88-24.576s12.096-24.512 26.88-24.512h243.328c14.784 0 26.88 10.496 26.88 24.512 0 14.08-12.096 24.576-26.88 24.576H282.88z m0-231.424C268.16 472.576 256 462.016 256 448c0-14.08 12.096-24.576 26.88-24.576h458.24c14.784 0 26.88 10.56 26.88 24.576 0 14.08-12.096 24.576-26.88 24.576H282.88z m13.888-224.448c-14.784 0-26.88-14.08-26.88-28.096S281.984 192 296.768 192h430.464c14.784 0 26.88 14.016 26.88 28.032 0 14.08-12.096 28.096-26.88 28.096H296.768z"
                fill="#36ab60"
                p-id="5794"
              />
            </svg>
          </div>
          <div>
            <div class="zt">班级总数</div>
            <div class="sz">{{ classCount }}</div>
          </div>
        </div>

        <div class="x">
          <div>
            <svg
              t="1715843668109"
              class="icon"
              style="width: 100px; height: 60px; margin-top: 10px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10638"
              width="48"
              height="48"
            >
              <path
                d="M264.192 374.784l241.664 116.736 180.224-407.552c0 0 4.096-34.816-26.624-57.344-30.72-22.528-73.728 30.72-73.728 30.72L264.192 374.784zM759.808 649.216l-241.664-116.736-180.224 407.552c0 0-4.096 34.816 26.624 57.344 30.72 22.528 73.728-30.72 73.728-30.72L759.808 649.216zM649.216 264.192l-116.736 241.664 407.552 180.224c0 0 34.816 4.096 57.344-26.624 22.528-30.72-30.72-73.728-30.72-73.728L649.216 264.192zM374.784 759.808l116.736-241.664L83.968 337.92c0 0-34.816-4.096-57.344 26.624s30.72 73.728 30.72 73.728L374.784 759.808z"
                fill="#17abe3"
                p-id="10639"
              />
            </svg>
          </div>
          <div>
            <div class="zt">试题总数</div>
            <div class="sz">{{ quCount }}</div>
          </div>
        </div>

        <div class="x">
          <div>
            <svg
              t="1715843718280"
              class="icon"
              style="width: 100px; height: 60px; margin-top: 10px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11714"
              width="48"
              height="48"
            >
              <path
                d="M955.52 243.68L800 189.6l-5.6-2.08a8.8 8.8 0 0 0-7.84 1.12 8.48 8.48 0 0 0-3.52 7.04v112.8a8.64 8.64 0 0 0 5.76 8l11.2 3.52 43.68 15.04L800 460.8v0.96l-5.28-1.92a8.8 8.8 0 0 0-7.84 1.12 8.48 8.48 0 0 0-3.52 7.04v243.84a8.64 8.64 0 0 0 7.2 8.32h1.44a8.8 8.8 0 0 0 8.16-5.76v-0.96l160-458.88a8.64 8.64 0 0 0-4.64-10.88zM800 661.28V480h2.08a7.68 7.68 0 0 0 2.72 0 8.8 8.8 0 0 0 8.16-5.76L864 333.28a8.64 8.64 0 0 0 0-6.56 8.8 8.8 0 0 0-4.8-4.48L800 302.4V208l141.28 49.28z"
                p-id="11715"
                fill="#73cc79"
              />
              <path
                d="M805.44 481.28a8.48 8.48 0 0 1-2.72 0l-13.28-4.64a8.48 8.48 0 0 1-5.76-8.16v-160a8.48 8.48 0 0 1 3.52-7.04 8.64 8.64 0 0 1 7.84-1.12l63.04 21.92a8.48 8.48 0 0 1 5.28 10.88l-49.6 142.24a8.48 8.48 0 0 1-8.32 5.92zM800 320v140L844.16 336z"
                p-id="11716"
                fill="#73cc79"
              />
              <path
                d="M795.04 187.52a8.8 8.8 0 0 0-7.84 1.12 8.48 8.48 0 0 0-3.52 7.04v516.16a8.64 8.64 0 0 0 7.2 8.32h1.44a8.8 8.8 0 0 0 8.16-5.76V189.6z"
                p-id="11717"
                fill="#73cc79"
              />
              <path
                d="M787.04 188.8a8.8 8.8 0 0 1 7.84-1.12l5.6 2.08v-112a8.48 8.48 0 0 0-8.64-8.64h-640a8.64 8.64 0 0 0-7.84 7.84v848a8.64 8.64 0 0 0 8.64 8.64h566.08a6.72 6.72 0 0 0 3.04 0l1.76-0.8h0.96l73.44-68.8a7.2 7.2 0 0 0 1.92-2.56 7.36 7.36 0 0 0 0-3.2V713.6v0.96a8.8 8.8 0 0 1-8.16 5.76h-1.44a8.64 8.64 0 0 1-7.2-8.32v137.6h-64a7.36 7.36 0 0 0-3.2 0 7.2 7.2 0 0 0-2.88 1.76 8.8 8.8 0 0 0-2.56 6.24v58.4H161.28V85.6H784v110.24a8.48 8.48 0 0 1 3.04-7.04z m-59.68 677.28h42.88l-42.88 38.56z"
                p-id="11718"
                fill="#73cc79"
              />
              <path
                d="M712.16 395.68H237.12a8.48 8.48 0 0 1-8.64-8.64V205.28a8.48 8.48 0 0 1 8.64-8.64h475.2a8.48 8.48 0 0 1 8.64 8.64V387.2a8.48 8.48 0 0 1-8.8 8.48z m-466.56-17.12H704V213.92H245.6zM707.84 573.44H241.28a8.64 8.64 0 1 1 0-17.12h466.56a8.64 8.64 0 1 1 0 17.12zM707.84 695.36H241.28a8.64 8.64 0 1 1 0-17.12h466.56a8.64 8.64 0 1 1 0 17.12z"
                p-id="11719"
                fill="#73cc79"
              />
            </svg>
          </div>
          <div>
            <div class="zt">试卷总数</div>
            <div class="sz">{{ examCount }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="zy">
      <div id="main" class="zyk" />
      <div id="mainx" class="zyk" />
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { classCount, classExamCount, classAllCounts } from '@/api/stat'
export default {
  name: 'Index',
  data() {
    return {
      chartData: [],
      chartDataTitle: [],
      chartData2: [],
      chartDataTitle2: [],
      classCount: 0,
      quCount: 0,
      examCount: 0
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getPie()
      this.getPies()
    })
  },

  async created() {
    try {
      const res0 = await classAllCounts()
      this.classCount = res0.data.classCount
      this.quCount = res0.data.questionCount
      this.examCount = res0.data.examCount
      const res1 = await classCount()
      this.processChartData(res1.data)

      const res2 = await classExamCount()
      this.processChartData2(res2.data)
    } catch (error) {
      console.error('Failed to fetch class count:', error)
    }
  },
  methods: {
    processChartData(data) {
        if (data.length === 0) {
            // 当数据为空时设置默认值
            this.chartData = [{ name: '暂无数据', value: 1 }];
            this.chartDataTitle = ['暂无数据'];
        } else {
            this.chartData = data
               // 可根据需要取消注释这行来过滤 totalStudent 小于等于 0 的数据
               // .filter((item) => item.totalStudent > 0) 
               .map((item) => ({ name: item.gradeName, value: item.totalStudent }));
            this.chartDataTitle = this.chartData.map((item) => item.name);
        }
        this.getPie();
    },
    processChartData2(data) {
        if (data.length === 0) {
            // 当数据为空时设置默认值
            this.chartData2 = [{ name: '暂无数据', value: 1 }];
            this.chartDataTitle2 = ['暂无数据'];
        } else {
            this.chartData2 = data
               // 可根据需要取消注释这行来过滤 total 小于等于 0 的数据
               // .filter((item) => item.total > 0) 
               .map((item) => ({ name: item.gradeName, value: item.total }));
            // 修正这里，应该使用 this.chartData2 而不是 this.chartData
            this.chartDataTitle2 = this.chartData2.map((item) => item.name);
        }
        this.getPies();
    },
    getPie() {
      // 绘制图表
      var myChart = echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      var option = {
        // 标题
        title: {
          text: '班级人数分布',
          x: 'center' // 标题位置
          // textStyle: { //标题内容的样式
          //   color: '#000',
          //   fontStyle: 'normal',
          //   fontWeight: 100,
          //   fontSize: 16 //主题文字字体大小，默认为18px
          // },
        },
        // stillShowZeroSum: true,
        // 鼠标划过时饼状图上显示的数据
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        // 图例
        legend: {
          // 图例  标注各种颜色代表的模块
          // orient: 'vertical',//图例的显示方式  默认横向显示
          bottom: 10, // 控制图例出现的距离  默认左上角
          left: 'center', // 控制图例的位置
          // itemWidth: 16,//图例颜色块的宽度和高度
          // itemHeight: 12,
          textStyle: {
            // 图例中文字的样式
            color: '#000',
            fontSize: 16
          },
          data: this.chartDataTitle // 图例上显示的饼图各模块上的名字
        },
        // 饼图中各模块的颜色
        color: ['#32dadd', '#b6a2de', '#5ab1ef', '#454599'],
        // 饼图数据
        series: {
          // name: 'bug分布',
          type: 'pie', // echarts图的类型   pie代表饼图
          radius: '60%', // 饼图中饼状部分的大小所占整个父元素的百分比
          center: ['50%', '50%'], // 整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: this.chartData,
          itemStyle: {
            normal: {
              label: {
                show: true // 饼图上是否出现标注文字 标注各模块代表什么  默认是true
                // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
              },
              labelLine: {
                show: true // 官网demo里外部标注上的小细线的显示隐藏    默认显示
              }
            }
          }
        }
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },

    getPies() {
      // 绘制图表
      var myCharts = echarts.init(document.getElementById('mainx'))
      // 指定图表的配置项和数据
      var option = {
        // 标题
        title: {
          text: '班级试卷分布',
          x: 'center' // 标题位置
          // textStyle: { //标题内容的样式
          //   color: '#000',
          //   fontStyle: 'normal',
          //   fontWeight: 100,
          //   fontSize: 16 //主题文字字体大小，默认为18px
          // },
        },
        // stillShowZeroSum: true,
        // 鼠标划过时饼状图上显示的数据
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:{c} ({d}%)'
        },
        // 图例
        legend: {
          // 图例  标注各种颜色代表的模块
          // orient: 'vertical',//图例的显示方式  默认横向显示
          bottom: 10, // 控制图例出现的距离  默认左上角
          left: 'center', // 控制图例的位置
          // itemWidth: 16,//图例颜色块的宽度和高度
          // itemHeight: 12,
          textStyle: {
            // 图例中文字的样式
            color: '#000',
            fontSize: 16
          },
          data: this.chartDataTitle2 // 图例上显示的饼图各模块上的名字
        },
        // 饼图中各模块的颜色
        color: [
          'rgb(253, 133, 133)',
          ' rgb(172, 10, 172)',
          ' rgb(70, 35, 194)',
          'rgb(44, 199, 23)'
        ],
        // 饼图数据
        series: {
          // name: 'bug分布',
          type: 'pie', // echarts图的类型   pie代表饼图
          radius: '60%', // 饼图中饼状部分的大小所占整个父元素的百分比
          center: ['50%', '50%'], // 整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: this.chartData2,
          itemStyle: {
            normal: {
              label: {
                show: true // 饼图上是否出现标注文字 标注各模块代表什么  默认是true
                // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
              },
              labelLine: {
                show: true // 官网demo里外部标注上的小细线的显示隐藏    默认显示
              }
            }
          }
        }
      }
      // 使用刚指定的配置项和数据显示图表。
      myCharts.setOption(option)
    }
  }
}
</script>

<style>
.luan {
  margin: auto;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  height: 100%;
  margin-top: 30px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
}
.df {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
}
.x {
  width: 60vh;
  height: 80px;
  display: flex;
  background-color: #fff;
}
.zt {
  font-size: 25px;
  padding: 10px 0 10px 10px;
}
.sz {
  font-size: 15px;
  padding: 0 0 0 50px;
}
.zy {
  width: 100%;
  height: 60vh;

  display: flex;
  margin: auto;
  /* margin-top: 20px; */
  justify-content: space-between;
}

.zyk {
  width: 49%;
  height: 100%;
  padding: 30px;
  margin-top: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
}
</style>
