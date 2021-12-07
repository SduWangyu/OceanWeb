<template>
  <overview-info-block/>
  <overview-tables/>
</template>

<script>
import OverviewInfoBlock from "./OverviewInfoBlock";
import OverviewTables from "./OverviewTables";
import {useStore} from "vuex";

export default {
  name: "overview",
  components:{
    OverviewInfoBlock,
    OverviewTables
  },
  setup(){

  }
}
</script>

<style scoped>

</style>