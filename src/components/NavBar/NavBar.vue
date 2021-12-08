<template>
  <div class="header">
    <div class="logo">
      <img src="../../assets/mylogo.png" height="38" width="289.5"/>
    </div>
    <div style="float:left;position:absolute;left: 400px;">
        <el-menu mode="horizontal" ellipsis=false >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">船舶可视化</el-menu-item>
          <el-menu-item index="3">船舶可视化</el-menu-item>
        </el-menu>
    </div>
    <div style="float:right;position:absolute;right:0px;">
      <el-menu mode="horizontal">
        <el-menu-item index="1">用户</el-menu-item>
      </el-menu>
    </div>
  </div>


</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const activeIndex = ref('1')
    const activeIndex2 = ref('1')
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      activeIndex,
      activeIndex2,
      handleSelect,
    }
  },
})
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  width: 100%;
  height: 60px;
  font-size: 22px;
}
.logo{
  height:60px;
  display: flex;

  align-items: center;
  /*margin-right: 120px;*/
}

</style>
