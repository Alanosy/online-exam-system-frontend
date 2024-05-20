<!--
 * @Author: st 2946594574@qq.com
 * @Date: 2024-03-04 15:23:49
 * @LastEditors: st 2946594574@qq.com
 * @LastEditTime: 2024-05-16 14:01:17
 * @FilePath: \com-project\src\views\dashboard\com\2_com.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
<<<<<<< HEAD
    <div class="luang">
我是学生
    </div>
    <div style="display: flex">
=======
     <div class="luang">
      我是学生
    </div>
       <div style="display: flex">
>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74
      <div class="left">
        <el-card class="box-card">
          登录时长
          <div ref="charts" class="chart-div"></div>
        </el-card>
      </div>
      <div class="right">
        <el-card class="box-card">
          最新公告
          <div class="i">
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
              style="height: 36px; margin-top: 20px"
            ></el-tree>
          </div>
        </el-card>
      </div>
    </div>
  </div>
<<<<<<< HEAD
  
=======
>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74
</template>

<script>
export default {
<<<<<<< HEAD
  data() {
    return {
      url: 0,
=======
   data() {
    return {
     
>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74
      option: {
        title: { text: "" },
        tooltip: {},
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        yAxis: {},
        series: [
          {
            name: "点赞数",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
          },
        ],
      },
      data: [
        {
          label: "公告 1",
          children: [
            {
              label: "二级 1-1",
            },
          ],
        },
        {
          label: "公告 2",
          children: [
            {
              label: "二级 2-1",
            },
          ],
        },
        {
          label: "公告 3",
          children: [
            {
              label: "二级 3-1",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
<<<<<<< HEAD
  // components: {
  //   comAdmin,
  //   comTeacher,
  //   comStudent,
  // },
=======
 
>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74
  methods: {
    initCharts() {
      let myChart = this.$echarts.init(this.$refs.charts);
      // 绘制图表
      myChart.setOption(this.option);
    },
    handleNodeClick(data) {
      console.log(data);
    },
  },
<<<<<<< HEAD
mounted() {
    this.initCharts();
  },
};
=======

  mounted() {
    this.initCharts();
  },
>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74


</script>

<style>
<<<<<<< HEAD
.luang {
=======
.luang{
 
>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74
  margin: auto;
  width: 1100px;
  height: 100px;
  background-color: rgb(241, 218, 221);
  margin-top: 30px;
<<<<<<< HEAD
  box-shadow: 3px 3px 3px 3px whitesmoke;
}
.box-card {
  margin-top: 50px;
  width: 500px;
  margin-left: 85px;
}
.chart-div {
  margin-top: 10px;
  width: 450px;
  height: 300px;

=======
  box-shadow: 3px 3px 3px 3px whitesmoke ;
}

.box-card {
  margin-top: 50px;
  width: 500px;
  margin-left: 85px;
}
.chart-div {
  margin-top: 10px;
  width: 450px;
  height: 300px;

>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74
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