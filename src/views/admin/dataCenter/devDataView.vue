<template #default="scope">

  <el-row>
    <el-col :span="12">
      <el-card class="box-card" body-style="height:280px;">
        <template #header>
          <div>
            <span>设备信息</span>
          </div>
        </template>
        <div class="content-column text item" v-for="(val, key) in devInfoShow" :key="key">
          <span class="content-title">{{title[key]}}：</span>
          <span class="content-words">{{val}}</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <BaiduMap></BaiduMap>
    </el-col>
  </el-row>
  <el-card>
      <el-table
          ref="multipleTable"
          :data="varInfoShow"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          v-if="varInfoShow.length>0"
      >
        <el-table-column property="id" label="变量id" width="120" />
        <el-table-column property="name" label="变量名称" width="120" />
        <el-table-column property="slaveName" label="从机名称" show-overflow-tooltip />
        <el-table-column property="updateTime" label="更新时间" show-overflow-tooltip />
        <el-table-column property="valueShow" label="当前值" show-overflow-tooltip />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="viewHistoryData(scope.$index)">
              历史数据查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
</template>


<script>
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import axios from "axios";
import {reactive,provide} from "vue";
import BaiduMap from "../../../components/Map/BaiduMap";
export default {
  name: "devDataView",
  components: {BaiduMap},
  setup(){
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })


    const devIdx = route.query.devIdx
    const infoDevsDetail = store.state.infoDevsDetail[devIdx]
    const infoVar = store.state.infoVars[devIdx]
    console.log(infoVar)
    const devInfoShow = {
      'name':infoDevsDetail.device.name,
      'deviceId':infoDevsDetail.device.deviceId,
      'projectName':infoDevsDetail.device.projectName,
      'productModelName':infoDevsDetail.device.productModelName,
      'version':infoDevsDetail.device.deviceStatus.version,
      'address':infoDevsDetail.device.address,
      'status':infoDevsDetail.device.status,
      'devTag':infoDevsDetail.deviceTags
    }

    const title = {
      'name':'设备名称',
      'deviceId':"设备ID",
      'projectName' : '所属组织',
      'productModelName': '设备型号',
      'version':'固件版本',
      'address':'设备地址',
      'status':"启用状态",
      'devTag':"标签"
    }

    provide("address",devInfoShow.address)
    const numSlaves = infoDevsDetail.slaveTotal
    console.log("numSlaves:",numSlaves)
    let numSlaveVar = 0
    const varInfoShow = reactive([])
    let i = 0
    let j = 0
    let varNum = 0

    const devDatapointsPost = []
    for (i;i<numSlaves;i++){
      numSlaveVar = infoVar.slaves[i].iotDataDescription.length
      console.log("numSlaveVar",numSlaveVar)
      for (j;j<numSlaveVar;j++){
        varInfoShow.push(Object.assign({
          "id":infoVar.slaves[i].iotDataDescription[j].id,
          "name":infoVar.slaves[i].iotDataDescription[j].name,
          "slaveName":infoVar.slaves[i].slaveName,
          "unit":infoVar.slaves[i].iotDataDescription[j].unit,
          "valueShow":'',
          "value":'',
          "idxSlaves":i,
          "updateTime":''
        }))
        devDatapointsPost.push(Object.assign(
            {
              "deviceNo": infoVar.deviceId,
              "slaveIndex":infoVar.slaves[i].slaveIndex,
              "dataPointId": infoVar.slaves[i].iotDataDescription[j].id,

            }
        ))
        varNum ++
      }
    }

    axios({
      url: 'https://openapi.mp.usr.cn/usrCloud/vn/ucloudSdk/getLastDataHistory',
      method: 'post',
      data: JSON.stringify({
        'devDatapoints':devDatapointsPost,
        'token': store.state.token,
      }),
      headers:
          {
            'Content-Type': 'application/json'
          }
    }).then((responseData)=>{
      responseData.data.data.list.sort(function (a,b){
        return a.dataPointId-b.dataPointId
      })
      for (i=0;i<varNum;i++){
        varInfoShow[i].valueShow = responseData.data.data.list[i].value.toString()+varInfoShow[i].unit
        varInfoShow[i].value = responseData.data.data.list[i].value
        varInfoShow[i].updateTime = new Date(responseData.data.data.list[i].time).toLocaleString().replace(/:\d{1,2}$/,' ')
      }
    })

    function viewHistoryData(idx){
      router.push({name:'devhistorydata',query:{idxDev:devIdx,idxSlaves:varInfoShow[idx].idxSlaves,idxVar:idx}})
    }
    return{
      devInfoShow,
      varInfoShow,
      viewHistoryData,
      title
    }
  }
}
</script>

<style scoped>

.box-card{
  margin-bottom: 30px;
}
.text{
  font-size: 14px;
}
.item{
  margin-bottom: 10px;
  color: #606266;
}
.content-title{
  display:-moz-inline-box;
  display:inline-block;
  width:100px;
}

</style>