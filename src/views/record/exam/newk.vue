<template>
    <el-container style="height: 700px; border: 1px solid #eee">
    <div class="q">
  
   </div>
  
  <el-container>
    <el-main>
        <div class="z">
            单选题
            <div class="t">
                <div class="tim">
                    1.sdhiuhuifiuwfue()
                    <div class="x"><el-radio-group v-model="radio">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group></div>
                </div>

            </div>
        </div>         
    </el-main>
  </el-container>
</el-container>




</template>
<script>
  export default {
     data () {
      return {
        radio: 3
      };
    }
  };
</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
 
  .q{
      height: 700px;
      width: 200px;
      background-color: rgb(59, 29, 29);
  }
  .z{
      font-size: 20px;
  }
  .t{
      width: 100%;
      height: 300px;
      background-color: rgb(165, 64, 64);
  }
  .tim{
      width: 100%;
      height: 20px;
      margin-top: 50px;
  }
  
</style>