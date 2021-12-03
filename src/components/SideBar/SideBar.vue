<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" fill="#8AAA9F">
    <el-radio-button :label="false" >展开</el-radio-button>
    <el-radio-button :label="true" >收缩</el-radio-button>
  </el-radio-group>
  <el-menu  style="min-height: 100vh;"
      default-active="2" background-color="#8AAA9F"
            active-text-color="#ffd04b" text-color="#fff"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-menu-item index="1">
      <el-icon><location /></el-icon>
      <template #title>

        <span>概览</span>
      </template>

    </el-menu-item>
    <el-sub-menu index="2">

      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>设备管理</span>
      </template>
      <el-menu-item index="2-1">联网设备</el-menu-item>
      <el-menu-item index="2-2">变量模板</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">
      <el-icon><document /></el-icon>
      <template #title>数据中心</template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { defineComponent, ref } from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons'

export default defineComponent({
  components: {
    Location,
    Document,
    Setting,
    IconMenu,
  },
  setup() {
    const isCollapse = ref(true)
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      isCollapse,
      handleOpen,
      handleClose,
    }
  },
})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}


</style>
