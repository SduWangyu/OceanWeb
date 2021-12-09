<template>
<!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" fill="#8AAA9F">-->
<!--    <el-radio-button :label="false" >展开</el-radio-button>-->
<!--    <el-radio-button :label="true" >收缩</el-radio-button>-->
<!--  </el-radio-group>-->
  <el-menu  style="min-height: calc(100vh - 60px);"
      default-active="2" background-color="#8AAA9F"
            active-text-color="#ffd04b" text-color="#fff"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :default-openeds="state.defaultOpen"
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
    <el-sub-menu index="3">
      <template #title>
        <el-icon><document /></el-icon>
        <span>数据中心</span>
      </template>
      <el-menu-item index="3-1">数据统计</el-menu-item>
      <el-menu-item index="3-2" @click="clickTransRoute">历史记录</el-menu-item>
      <el-menu-item index="3-3">设备上下线</el-menu-item>
      <el-menu-item index="3-4">设备报警记录</el-menu-item>
      <el-menu-item index="3-5">联动记录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue'
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
    const isCollapse = ref(false)
    const state = reactive({
      defaultOpen: ['2','3'],
    })
    return {
      isCollapse,
      state
    }
  },
  methods:{
    clickTransRoute(){
      this.$router.push({name:'devhistorydata'})
    }
  }
})
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}


</style>
