
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
  created() {
    // this.url = this.$route.query.url;
    const roles = localStorage.getItem("roles")
    switch(roles){
      case "admin":{
        this.url = 0;
        break
      }
      case "teacher":{
        this.url = 1;
        break
      }
      case "student":{
        this.url = 2;
        break
      }
    }
  },
 
};
</script>
<style scoped>

</style>