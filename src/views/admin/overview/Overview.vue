<template>
  <el-card>
    <overview-info-block/>
    <overview-tables/>
  </el-card>
</template>

<script>
import OverviewInfoBlock from "./OverviewInfoBlock";
import OverviewTables from "./OverviewTables";
<<<<<<< HEAD
import {useStore} from "vuex";
=======
>>>>>>> ed2d22290249f379a5fe8429e2ae4ea35045881e

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