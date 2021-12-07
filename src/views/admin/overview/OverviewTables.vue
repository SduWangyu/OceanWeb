<<<<<<< HEAD
<template #default="scope">
=======
<template>

>>>>>>> f418415387bb9f1f8bbefb746097502971d956dd
  <el-card>
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
<<<<<<< HEAD
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="viewDeviceData(scope.$index)">
            数据查看
          </el-button>
        </template>
=======
      <el-table-column  label="操作" >
        <el-button>
          12311231
        </el-button>
>>>>>>> f418415387bb9f1f8bbefb746097502971d956dd
      </el-table-column>
    </el-table>
  </el-card>

<<<<<<< HEAD
=======


>>>>>>> f418415387bb9f1f8bbefb746097502971d956dd
</template>

<script>
import {useStore} from "vuex";
import {reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "OverviewTables",
  setup()
  {
    const store = useStore()
    const router = useRouter()
    let multipleSelection=reactive([])
    const infoShow = ref([])
    watch(() => {
      store.state.infoDevsDetail.length
    },(oldVar, newVar) => {
      const infoDevsDetail = store.state.infoDevsDetail.slice()
      const devNum = store.state.infoDevsDetail.length
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
      }
    },
        {
          deep:true
        }
    );
    function viewDeviceData(idx){
      router.push({name:'devdata',query:{devIdx:idx}})
    }
    function handleSelectionChange(val){
      multipleSelection = val
    }
    return{
      infoShow,
      multipleSelection,
      handleSelectionChange,
      viewDeviceData
    }
  },
}
</script>

<style scoped>

</style>