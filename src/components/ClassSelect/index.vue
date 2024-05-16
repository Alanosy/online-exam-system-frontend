<template>
  <el-select
    v-model="selectedClassIds"
    :multiple="isMultiple"
    :remote-method="fetchClasses"
    filterable
    remote
    reserve-keyword
    clearable
    automatic-dropdown
    placeholder="选择或搜索班级"
    class="class-selector"
    @change="handleClassChange"
  >
    <el-option
      v-for="cls in classList"
      :key="cls.id"
      :label="cls.gradeName"
      :value="cls.id"
    />
  </el-select>
</template>

<script>
import { fetchClasses } from '@/api/class_' // 假设这是获取班级列表的API

export default {
  name: 'ClassSelect',
  props: {
    isMultiple: {
      type: Boolean,
      default: false
    },
    value: [String, Array],
    excludes: Array // 如果有需要排除的班级ID，可以传入此参数
  },
  data() {
    return {
      classList: [], // 存储班级列表
      selectedClassIds: [] // 当前选中的班级ID
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.selectedClassIds = newValue
      },
      immediate: true // 确保在组件创建时立即设置初始值
    }
  },
  created() {
    this.fetchClasses()
  },
  methods: {
    fetchClasses(query = '') {
      // 使用query参数进行过滤，如果需要可以根据props.excludes进一步过滤
      fetchClasses({ pageNum: 1, pageSize: 1000, name: query }).then(response => {
        this.classList = response.data || [] // 假设API响应包含一个records字段
      })
    },
    handleClassChange(selectedIds) {
      // 根据需要处理选中班级的逻辑，比如查找选中班级的详细信息
      const selectedClasses = this.classList.filter(cls => selectedIds.includes(cls.id))
      this.$emit('change', selectedClasses) // 发送选中的班级对象数组到父组件
      this.$emit('input', selectedIds) // 更新v-model绑定的值
    }
  }
}
</script>