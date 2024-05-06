<template>
  <div style="width: 100%; height: 100%; background-color:  #f0f2f5; padding: 20px 0 0;">
    <!-- 开头 -->
    <div class="top">
    <span style="font-weight: 800px;font-size: 20px;margin-left: 30px;margin-top: 13px;">距离考试结束还有：</span>  
    </div>

    <div>
      <div style="display: flex;">
        <div class="left ">
        <div style="background-color: #f0f2f5;;width: 200px;height:30px ;margin: auto;margin-top: 30px;">
        <div style="font-weight: 900;margin-left: 70px;padding-top: 6px;">答题卡</div>
        </div>
        <div style="background-color: #f0f2f5;;width: 200px;height:30px ;margin: auto;margin-top: 50px;">
        <div style="font-weight: 900;margin-left: 70px;padding-top: 6px;">答题卡</div>
        </div>  
        <div style="background-color: #f0f2f5;;width: 200px;height:30px ;margin: auto;margin-top: 50px;">
        <div style="font-weight: 900;margin-left: 70px;padding-top: 6px;">答题卡</div>
        </div> 
        
        <div style="background-color: #f0f2f5;;width: 200px;height:30px ;margin: auto;margin-top: 50px;">
        <div style="font-weight: 900;margin-left: 70px;padding-top: 6px;">答题卡</div>
        </div>  

        <div style="background-color: #f0f2f5;;width: 200px;height:30px ;margin: auto;margin-top: 50px;">
        <div style="font-weight: 900;margin-left: 70px;padding-top: 6px;">答题卡</div>
        </div>  
          
        
        </div>
        <div class="right"> </div>
      </div>


    </div>
  </div>



</template>

<script>
export default {
  setup() {

  },
}
</script>

<style scoped>
page {
  background: #ebecee;
}

.top {

  width: 98%;
  background-color: white;
  height: 50px;
  margin: auto;
  display: flex;
  margin-top: 30px;
  box-shadow: 3px 3px 3px 0px rgb(0, 0, 0, 0.05);
  border: 2px solid white;
  border-radius: 5px;

}

.left {
  width: 30%;
  height: 500px;
  background-color: white;
  margin-left: 15px;
  margin-top: 25px;
  box-shadow: 3px 3px 3px 0px rgb(0, 0, 0, 0.05);
  border: 2px solid white;
  border-radius: 5px;

}

.right {
  width: 65%;
  height: 500px;
  background-color: white;
  margin-left: 40px;
  margin-top: 25px;
  box-shadow: 3px 3px 3px 0px rgb(0, 0, 0, 0.05);
  border: 1px solid whitesmoke;
  border: 2px solid white;
  border-radius: 5px;

}
</style>