<template>
  <el-container>
    <el-aside width="200px">
      <side-bar/>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <overview/>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
  <side-bar/>

</template>

<script>
import SideBar from "../components/SideBar/SideBar";
import Overview from "../views/admin/overview/Overview";
export default {
  name: "AdminLayout",
  components:{
    SideBar,
    Overview
  }
}
</script>

<style scoped>

</style>