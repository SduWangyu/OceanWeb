<template>
  <div>
    <el-select v-model="devOpNow"
               placeholder="请选择联网设备"
               @change="getSlaveFromDevOp(devOpNow)"
    >
      <el-option
          v-for="item in devOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <el-select v-model="slaveOpNow" placeholder="请选择从机设备" @change="getVarsFromSlvOp(devOpNow,slaveOpNow)">
      <el-option
          v-for="item in slaveOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <el-select v-model="varOpNow" multiple placeholder="请选择变量" collapse-tags>
      <el-option
          v-for="item in varOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>

    <el-date-picker
        v-model="searchTime"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="截止日期"
    >
    </el-date-picker>
    <el-button @click="getHistoryDataSet()">查询</el-button>
  </div>
  <div><el-empty v-if="isDataEmpty" description="暂无数据"></el-empty></div>
  <el-card>
    <div class="main" id="main"></div>
  </el-card>
</template>

<script>

import * as echarts from 'echarts'
import {onMounted, markRaw, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {useStore} from "vuex";
export default {
  name: "historyDataView",
  setup() {
    const route = useRoute()
    const store = useStore()
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })


    const infoDevsDetail = store.state.infoDevsDetail
    const infoVars = store.state.infoVars
    const devOptions = ref([])
    const slaveOptions = ref([])
    const varOptions = ref([])
    let getHistoryPostData = {}
    let devDatapointsPost = []
    let varNumPost = 0
    const setOptions = {}
    const devOpNow = ref()
    const slaveOpNow = ref()
    const varOpNow = ref([])
    const searchTime = ref([])
    const isDataEmpty = ref(true)
    const infoSlaveLst = []
    const infoVarLst = []
    const devNum = infoDevsDetail.length


    searchTime.value.push(new Date())
    searchTime.value.unshift(new Date(new Date().getTime()- 7200 * 1000)) //默认查询两个小时
    let historyDataPostRes = []
    infoDevsDetail.forEach((item,index)=>{
      let obj = item
      devOptions.value.push({
        value:index,
        label:obj.device.name
      })
    })
    getSlaveLst()
    getVarLst()


    if (Object.keys(route.query).length){
      devOpNow.value = Number(route.query.idxDev)
      getSlaveFromDevOp(devOpNow.value)
      slaveOpNow.value = Number(route.query.idxSlaves)
      getVarsFromSlvOp(devOpNow.value,slaveOpNow.value)
      varOpNow.value.push(Number(route.query.idxVar))
      getHistoryDataSet()
    }

    let myChart = ''
    onMounted(()=>{
      myChart = markRaw(echarts.init(document.getElementById("main"))) ;

      window.addEventListener("resize",function(){
        myChart.resize();
      });
    })


    function getHistoryDataSet(){
      varNumPost = varOpNow.value.length
      devDatapointsPost = []
      let i = 0
      setOptions.legend = Object.assign({
        data:[]
      })
      for (i;i<varNumPost;i++){
        devDatapointsPost.push(Object.assign({
          "deviceNo":infoVars[devOpNow.value].deviceId,
          "slaveIndex":infoVars[slaveOpNow.value].slaves[slaveOpNow.value].slaveIndex,
          "dataPointId":infoVars[devOpNow.value].slaves[slaveOpNow.value].iotDataDescription[varOpNow.value[i]].id,
          "itemId":varOpNow[i]+1
        }))
        setOptions.legend.data.push(infoVars[devOpNow.value].slaves[slaveOpNow.value].iotDataDescription[varOpNow.value[i]].name)
      }
      getHistoryPostData.token = store.state.token
      getHistoryPostData.devDatapoints = devDatapointsPost
      getHistoryPostData.pageNo = "1"
      getHistoryPostData.start = searchTime.value[0].getTime()
      getHistoryPostData.end = searchTime.value[1].getTime()
      getHistoryPostData.pageSize = Math.ceil((searchTime.value[1].getTime()-searchTime.value[0].getTime())/360)
      getHistoryDataAndShow(getHistoryPostData)
    }
    function getHistoryDataAndShow(postData){
      isDataEmpty.value = false
      historyDataPostRes = []
      console.log(postData)
      axios({
        url: 'https://openapi.mp.usr.cn/usrCloud/dev/getDeviceDataPointHistory',
        method: 'post',
        data: JSON.stringify(postData),
        headers:
            {
              'Content-Type': 'application/json'
            }
      }).then((responseData)=> {
        console.log(responseData)
        historyDataPostRes = responseData.data.data.list
        let i = 0
        setOptions.series = []
        setOptions.xAxis = {}
        setOptions.yAxis = {}
        for (i; i < varNumPost; i++) {
          setOptions.series.push(Object.assign({
            "name": setOptions.legend.data[i],
            "type": "line",
            "data": historyDataPostRes[i].list.map(obj => {
              return Number(obj.value)
            }),
            "smooth":true
          }))
        }
        setOptions.xAxis.data = historyDataPostRes[0].list.map(obj => {
          return new Date(parseInt(obj.time)).toLocaleString('chinese',{hour12:false}).replace(/:\d{1,2}$/,'')
        })
        setOptions.xAxis.type = 'category'
        setOptions.xAxis.boundaryGap = false
        setOptions.yAxis.type = 'value'
        setMychart(setOptions)
      })

    }
    function getSlaveLst() {
      let i = 0
      for (i;i<devNum;i++){
        infoSlaveLst.push([])
        if (infoDevsDetail[i].deviceSlaves){
          infoDevsDetail[i].deviceSlaves.forEach((item,index)=>{
            let obj = item
            infoSlaveLst[i].push({
              label:obj.slaveName,
              slaveIndex:obj.slaveIndex,
              value:index
            })
          })
        }
      }
    }
    function getVarLst(){
      let i = 0
      let j = 0
      let devSlavesNum = 0
      for (i;i<devNum;i++){
        infoVarLst.push([])
        devSlavesNum = infoSlaveLst[i].length
        for (j=0;j<devSlavesNum;j++){
          infoVarLst[i].push([])
          infoVars[i].slaves[j].iotDataDescription.forEach((item,index)=>{
            let obj = item
            infoVarLst[i][j].push({
              label:obj.name,
              slaveIndex:j,
              value:index
            })
          })

        }
      }
    }

    function getSlaveFromDevOp(idx){
      slaveOptions.value = infoSlaveLst[idx]
      slaveOpNow.value = ""
      varOpNow.value = []
      varOptions.value = []
    }
    function getVarsFromSlvOp(devIdx,slvIdx){
      varOpNow.value = []
      varOptions.value = infoVarLst[devIdx][slvIdx]
    }

    function setMychart(stOptns){
      myChart.setOption({
        title: {text: "曲线趋势图"},
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10
          }
        ],
        legend:stOptns.legend,
        xAxis:stOptns.xAxis,
        yAxis:stOptns.yAxis,
        series: stOptns.series
      },true)
    }
    return{
      searchTime,
      isDataEmpty,
      devOptions,
      devOpNow,
      slaveOptions,
      slaveOpNow,
      infoDevsDetail,
      varOptions,
      varOpNow,
      infoVars,
      myChart,
      getVarsFromSlvOp,
      getSlaveFromDevOp,
      getHistoryDataSet
    }
  },

  methods:{
  }
}
</script>

<style>
.main{
  height: 400px;
  width: 100%;
}

</style>

