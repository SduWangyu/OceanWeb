<template>
  <div class="block">
    <el-date-picker
        v-model="searchTime"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="截止日期"
    >
    </el-date-picker>
  </div>
  <el-card>
    <div class="main" id="main"></div>
  </el-card>

</template>

<script>

import * as echarts from 'echarts'
import {onMounted, reactive, watch} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {useStore} from "vuex";
export default {
  name: "historyDataView",
  setup() {
    const route = useRoute()
    const dataPost = JSON.parse(route.query.infoPost)
    const store = useStore()
    const infoVar = JSON.parse(route.query.infoVar)
    let historyDataValue = reactive([])
    let historyDataTime = reactive([])
    const searchTime = reactive([])
    searchTime.push(Date.parse(new Date()))
    searchTime.unshift(searchTime[0]-3600000)
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })
    onMounted(()=> {
      axios({
        url: 'https://openapi.mp.usr.cn/usrCloud/dev/getDeviceDataPointHistory',
        method: 'post',
        data: JSON.stringify({
          "devDatapoints": [dataPost],
          "pageNo": 1,
          "pageSize": 10,
          "start": searchTime[0],
          "end": searchTime[1],
          "token": store.state.token
        }),
        headers:
            {
              'Content-Type': 'application/json'
            }
      }).then((responseData) => {
        console.log(responseData)
        const historyData = responseData.data.data.list[0].list
        historyDataValue = historyData.map(obj => {
          return Number(obj.value)
        })
        historyDataTime = historyData.map(obj => {
          return new Date(parseInt(obj.time)).toLocaleString('chinese',{hour12:false}).replace(/:\d{1,2}$/,' ')
        });
        console.log(historyDataTime)
        let myChart = reactive(echarts.init(document.getElementById("main")));
        myChart.setOption({
          title: {text: "总用户量"},
          tooltip: {},
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              alignWithLabel: true
            },
            data: historyDataTime,
          },
          yAxis: {
            type: 'value',
            yAxisIndex: 0,
            name: infoVar.name,
          },
          series: [
            {
              type: "line",
              data: historyDataValue,
              smooth: true
            },
          ],
        })
      })
    })
    return{
      searchTime
    }
  },
}
</script>

<style>
.main{
  height: 400px;
  width: 100%;
}

</style>

