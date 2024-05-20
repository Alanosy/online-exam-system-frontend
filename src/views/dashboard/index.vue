<!--
 * @Author: yangiiiiii 14122140+yangiiiiiii@user.noreply.gitee.com
 * @Date: 2024-02-29 18:01:42
<<<<<<< HEAD
 * @LastEditors: st 2946594574@qq.com
 * @LastEditTime: 2024-05-16 15:40:38
=======
 * @LastEditors: 暮安 14122148+muanananan@user.noreply.gitee.com
<<<<<<< HEAD
 * @LastEditTime: 2024-05-20 10:04:48
=======
 * @LastEditTime: 2024-05-16 15:19:21
>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74
>>>>>>> a707502114d2c2f06a777a19ab80198ca239a51c
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

<<<<<<< HEAD
    
=======
>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74
  </div>
</template>
<script>
import comAdmin from "./com/0_com.vue";
import comTeacher from "./com/1_com.vue";
import comStudent from "./com/2_com.vue";
export default {
  data() {
    return {
<<<<<<< HEAD
      url: 0,
=======
<<<<<<< HEAD
      url: 0,
  
=======
      url: 2,
>>>>>>> a707502114d2c2f06a777a19ab80198ca239a51c
      
>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74
    };
  },
  components: {
    comAdmin,
    comTeacher,
    comStudent,
  },
 
<<<<<<< HEAD
  
=======
>>>>>>> eb37f9a995080a0ff7c91014bfc35511e93bde74
};
</script>
<style scoped>

</style>