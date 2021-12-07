<template>
  <el-card>
    <overview-info-block/>
    <overview-tables/>
  </el-card>
</template>

<script>
import OverviewInfoBlock from "./OverviewInfoBlock";
import OverviewTables from "./OverviewTables";

export default {
  name: "overview",
  components:{
    OverviewInfoBlock,
    OverviewTables
  }
}
</script>

<style scoped>

</style>