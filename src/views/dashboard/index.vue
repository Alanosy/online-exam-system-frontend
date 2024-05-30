
<template>
  <div>
    <div>
      <com-admin v-if="url == 0" />
      <com-teacher v-else-if="url == 1" />
      <com-student v-else-if="url == 2" />
    </div>
  </div>
</template>
<script>
import comAdmin from './com/0_com.vue'
import comTeacher from './com/1_com.vue'
import comStudent from './com/2_com.vue'
export default {
  components: {
    comAdmin,
    comTeacher,
    comStudent
  },
  data() {
    return {
      url: 0

    }
  },
  created() {
    // this.url = this.$route.query.url;
    const roles = localStorage.getItem('roles')
    switch (roles) {
      case 'admin': {
        this.url = 0
        break
      }
      case 'teacher': {
        this.url = 1
        break
      }
      case 'student': {
        this.url = 2
        break
      }
    }
  }

}
</script>
<style scoped>

</style>
