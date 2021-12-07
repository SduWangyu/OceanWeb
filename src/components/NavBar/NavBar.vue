<template>
  <div class="header">
    <div class="logo">
      <img src="../../assets/mylogo.png" height="38" width="289.5"/>
    </div>
    <div style="float: left;">
        <el-menu mode="horizontal">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">船舶可视化</el-menu-item>
        </el-menu>
    </div>
  </div>
<!--  <el-menu-->
<!--      :default-active="activeIndex2"-->
<!--      class="el-menu-demo"-->
<!--      mode="horizontal"-->
<!--      @select="handleSelect"-->
<!--  >-->

<!--    <el-menu-item index="1">首页</el-menu-item>-->
<!--    <el-sub-menu index="2">-->
<!--      <template #title>Workspace</template>-->
<!--      <el-menu-item index="2-1">item one</el-menu-item>-->
<!--      <el-menu-item index="2-2">item two</el-menu-item>-->
<!--      <el-menu-item index="2-3">item three</el-menu-item>-->
<!--      <el-sub-menu index="2-4">-->
<!--        <template #title>item four</template>-->
<!--        <el-menu-item index="2-4-1">item one</el-menu-item>-->
<!--        <el-menu-item index="2-4-2">item two</el-menu-item>-->
<!--        <el-menu-item index="2-4-3">item three</el-menu-item>-->
<!--      </el-sub-menu>-->
<!--    </el-sub-menu>-->
<!--    <el-menu-item index="3">Info</el-menu-item>-->
<!--    <el-menu-item index="4">Orders</el-menu-item>-->
<!--  </el-menu>-->


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
  width: 100%;
  height: 60px;
  font-size: 22px;
}
.logo{
  height:60px;
  display: flex;
  align-items: center;
}

</style>
