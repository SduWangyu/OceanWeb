<template>
  <el-table
      ref="multipleTable"
      :data="infoShow"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-if="infoShow.length>0"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="onlineStatus" label="设备状态" width="120" />
    <el-table-column property="name" label="设备名称" width="120" />
    <el-table-column property="deviceId" label="SN" show-overflow-tooltip />
    <el-table-column property="productModelName" label="设备型号" show-overflow-tooltip />
    <el-table-column property="projectName" label="所属组织" show-overflow-tooltip />
    <el-table-column property="address" label="设备地址地址" show-overflow-tooltip />
    <el-table-column property="status" label="启用状态" />
    <el-table-column  label="操作" >
      <el-button>
        12311231
      </el-button>
    </el-table-column>
  </el-table>

</template>

<script>
import {useStore} from "vuex";
import {reactive, ref, watch} from "vue";

export default {
  name: "OverviewTables",
  setup()
  {
    const store = useStore()
    let multipleSelection=reactive([])
    const infoShow = ref([])
    watch(() => {
      store.state.infoDevsDetail.length
    },(oldVar, newVar) => {
      const infoDevsDetail = store.state.infoDevsDetail.slice()
      const devNum = store.state.infoDevsDetail.length
      console.log(infoDevsDetail)
      let i = 0
      for (i;i<devNum;i++)
      {
        infoShow.value.push(Object.assign({
          'idx':i,
          'name':infoDevsDetail[i].device.name,
          'deviceId':infoDevsDetail[i].device.deviceId,
          'projectName':infoDevsDetail[i].device.projectName,
          'productModelName':infoDevsDetail[i].device.productModelName,
          'address':infoDevsDetail[i].device.address,
          'onlineStatus':infoDevsDetail[i].device.onlineStatus,
          'status':infoDevsDetail[i].device.status
        }))
        console.log(i)
        console.log(infoShow.value)
      }

    },
        {
          deep:true
        }

    );
    function handleSelectionChange(val){
      multipleSelection = val
    }
    return{
      infoShow,
      multipleSelection,
      handleSelectionChange
    }
  },
}
</script>

<style scoped>

</style>