<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-02-29 18:01:42
 * @LastEditors: 暮安 14122148+muanananan@user.noreply.gitee.com
 * @LastEditTime: 2024-05-20 10:04:48
 * @FilePath: \video-manager\src\views\charts\BarChart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div>
      <com-admin v-if="url == 0"></com-admin>
      <com-teacher v-else-if="url == 1"></com-teacher>
      <com-student v-else-if="url == 2"></com-student>
    </div>

  </div>
</template>
<script>
import comAdmin from "./com/0_com.vue";
import comTeacher from "./com/1_com.vue";
import comStudent from "./com/2_com.vue";
export default {
  data() {
    return {
      url: 0,
      
    };
  },
  components: {
    comAdmin,
    comTeacher,
    comStudent,
  },
 
};
</script>
<style scoped>

</style>