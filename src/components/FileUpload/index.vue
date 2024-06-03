<!--
 * @Author: 魏进 3413105907@qq.com
 * @Date: 2024-05-28 12:26:25
 * @LastEditors: 魏进 3413105907@qq.com
 * @LastEditTime: 2024-05-28 20:18:30
 * @FilePath: \online-exam-system-frontend\src\components\FileUpload\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <file-upload-local v-model="fileUrl" :accept="accept" :tips="tips" :list-type="listType" />
  </div>
</template>

<script>

import FileUploadLocal from './local'

export default {
  name: 'FileUpload',
  components: { FileUploadLocal },
  props: {
    value: String,
    accept: {
      type: String,
      default: '*'
    },
    tips: String,
    listType: {
      type: String,
      default: 'picture'
    }
  },
  data() {
    return {
      fileUrl: ''
    }
  },

  watch: {
    // 检测查询变化
    value: {
      handler() {
        this.fillValue()
      }
    },

    // 检测查询变化
    fileUrl: {
      handler() {
        this.$emit('input', this.fileUrl)
      }
    }
  },
  mounted() {

  },

  created() {
    this.fillValue()
  },

  methods: {

    fillValue() {
      this.fileUrl = this.value
    }

  }
}
</script>
