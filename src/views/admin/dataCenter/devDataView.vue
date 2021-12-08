<template #default="scope">
    <el-card class="box-card">
      <template #header>
        <div>
          <span>设备信息</span>
        </div>
      </template>
      <div class="content-column" v-for="(val, key) in devInfoShow" :key="key">
        <span class="content-title">{{key}}：</span>
        <span class="content-words">{{val}}</span>
      </div>
    </el-card>
    <el-card>
      <el-table
          ref="multipleTable"
          :data="dataInfoShow"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          v-if="dataInfoShow.length>0"
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
import {reactive} from "vue";
export default {
  name: "devDataView",
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
    const numSlaves = infoDevsDetail.slaveTotal
    let dataPostNeed = []
    let infoSlave = []
    let numSlaveData = 0
    const dataInfoShow = reactive([])
    let i = 0
    let j = 0
    let dataNum = 0
    axios({
          url: 'https://openapi.mp.usr.cn/usrCloud/datadic/getDataPointInfoByDevice',
          method: 'post',
          data: JSON.stringify({
            'deviceIds': [devInfoShow.deviceId],
            'token': store.state.token,
          }),
          headers:
              {
                'Content-Type': 'application/json'
              }
        }
    ).then((responseData)=>{
      for (i;i<numSlaves;i++){
        numSlaveData = responseData.data.data[0].slaves[i].iotDataDescription.length
        infoSlave.push(Object.assign(responseData.data.data[0].slaves[i]))
        for (j = 0;j<numSlaveData;j++ ){
          dataPostNeed.push(Object.assign({
            'deviceNo':devInfoShow.deviceId,
            'slaveIndex':infoSlave[i].slaveIndex,
            'dataPointId':infoSlave[i].iotDataDescription[j].id,
            'itemId':j+1
          }))
          dataInfoShow.push(Object.assign({
            'id':infoSlave[i].iotDataDescription[j].id,
            'name':infoSlave[i].iotDataDescription[j].name,
            'unit':infoSlave[i].iotDataDescription[j].unit,
            'slaveName':infoSlave[i].slaveName,
            'value':0,
            'updateTime':0,
          }))
          dataNum++
        }
      }
      axios({
        url: 'https://openapi.mp.usr.cn/usrCloud/vn/ucloudSdk/getLastDataHistory',
        method: 'post',
        data: JSON.stringify({
          'devDatapoints':dataPostNeed,
          'token': store.state.token,
        }),
        headers:
            {
              'Content-Type': 'application/json'
            }
      }).then((responseData1)=>{
        responseData1.data.data.list.sort(function (a,b){
          return a.dataPointId-b.dataPointId
        })
        dataInfoShow.sort(function (a,b){
          return a.id-b.id
        })
        for (i=0;i<dataNum;i++){
          dataInfoShow[i].valueShow = responseData1.data.data.list[i].value.toString()+dataInfoShow[i].unit
          dataInfoShow[i].value = responseData1.data.data.list[i].value
          dataInfoShow[i].updateTime = new Date(responseData1.data.data.list[i].time).toLocaleString().replace(/:\d{1,2}$/,' ')
        }

      })
    })

    function viewHistoryData(idx){
      console.log(dataPostNeed[idx])
      router.push({name:'devhistorydata',query:{infoPost:JSON.stringify(dataPostNeed[idx]),infoVar:JSON.stringify(dataInfoShow[idx])}})
    }
    return{
      devInfoShow,
      dataInfoShow,
      viewHistoryData
    }
  }
}
</script>

<style scoped>

</style>