<!--
 * @Author: 魏进 3413105907@qq.com
 * @Date: 2024-05-28 12:26:25
 * @LastEditors: 魏进 3413105907@qq.com
 * @LastEditTime: 2024-06-03 21:51:15
 * @FilePath: \online-exam-system-frontend\src\components\RepoSelect\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-select
    v-model="currentValue"
    :multiple="multi"
    :remote-method="fetchData"
    filterable
    remote
    reserve-keyword
    clearable
    automatic-dropdown
    placeholder="选择或搜索题库"
    class="filter-item"
    @change="handlerChange"
  >
    <el-option
      v-for="item in dataList"
      :key="item.id"
      :label="item.title"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { fetchPaging } from "@/api/repo";

export default {
  name: "RepoSelect",
  props: {
    multi: {
      type: Boolean,
      default: false,
    },
    value: String | Array,
    excludes: Array,
  },
  data() {
    return {
      
      // 下拉选项值
      dataList: [],
      currentValue: [],
    };
  },

  watch: {
    // 检测查询变化
    value: {
      handler() {
        this.currentValue = this.value;
      },
    },
  },
  created() {
    this.currentValue = this.value;
    this.fetchData();
  },
  methods: {

    fetchData(q) {
      // , title: q, excludes: this.excludes
      fetchPaging({ pageNum: 1, pageSize: 1000 }).then((res) => {
        this.dataList = res.data;
      });
    },
    handlerChange(e) {
      const obj = this.dataList.find((item) => {
        return item.id === e;
      });

      this.$emit("change", obj);
      this.$emit("input", e);
    },
  },
};
</script>
