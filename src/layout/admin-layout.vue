<template>
  <side-bar/>
  <overview/>
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