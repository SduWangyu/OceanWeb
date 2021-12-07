<template>
  <el-card>
    <el-table
        ref="multipleTable"
        :data="infoShow"
        style="width: 100%"
        @selection-change="handleSelectionChange"
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
          asdasdas
        </el-button>
      </el-table-column>
    </el-table>
  </el-card>


</template>

<script>
import {useStore} from "vuex";
import {reactive} from "vue";

export default {
  name: "OverviewTables",
  setup()
  {
    const store = useStore()
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })

    let multipleSelection=reactive([])
    function handleSelectionChange(val){
      multipleSelection = val
    }
    let infoShow = reactive([])
    const infoDevsDetail = store.state.infoDevsDetail.slice()
    const devNum = infoDevsDetail.length
    let i= 0;
    for (i;i<devNum;i++)
    {
      infoShow.push(Object.assign({
        'idx':i,
        'name':infoDevsDetail[i].device.name,
        'deviceId':infoDevsDetail[i].device.deviceId,
        'projectName':infoDevsDetail[i].device.projectName,
        'productModelName':infoDevsDetail[i].device.productModelName,
        'address':infoDevsDetail[i].device.address,
        'onlineStatus':infoDevsDetail[i].device.onlineStatus,
        'status':infoDevsDetail[i].device.status
      }))
    }
    return{
      infoShow,
      multipleSelection,
      handleSelectionChange,
    }
  }
}
</script>

<style scoped>

</style>