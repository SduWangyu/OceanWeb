<template>
  <overview-info-block/>
  <overview-tables/>
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