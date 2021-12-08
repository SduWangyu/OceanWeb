<template>
  <el-row :gutter="12" style="margin-bottom: 10px;">
    <el-col :span="6" v-for="info in infoOverview" :key="info">
      <el-card shadow="hover" :color="info.color">
        <p style="font-weight: 700;">{{info.title}}</p>
        <p>{{info.value}}</p>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
import {reactive} from "vue";
import {useStore} from "vuex";
import axios from "axios";
export default {
  name: "OverviewInfoBlock",
  setup(){
    const infoOverview = reactive([
      {
        title:"联网设备数",
        value:0,
        color: "#3d9209"
      },
      {
        title: "产品/场景数",
        value: 0,
        color: "#e42222"
      },
      {
        title: "用户数",
        value: 0,
        color: "#2c82e0"
      },
      {
        title: "在线设备数",
        value: 0,
        color: "#2c82e0"
      }
    ])
    const store = useStore()
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })
    let devNum = 0
    let onlineDev = 0
    let i =0,j=0;
    let infoDevsBasic = []
    const infoDevsDetailed = []
    axios({
      url: 'https://openapi.mp.usr.cn/usrCloud/vn/dev/getDevsForVn',
      method: 'post',
      data: JSON.stringify({'uid': store.state.uid, 'token':store.state.token}),
      headers:
          {
            'Content-Type': 'application/json'
          }
    }).then((responseData)=>{
      infoDevsBasic = responseData.data.data.devices
      devNum = responseData.data.data.devices.length
      infoOverview[0].value = devNum
      for (i=0;i<devNum;i++){
        axios({
          url: 'https://openapi.mp.usr.cn/usrCloud/dev/getDevice',
          method: 'post',
          data: JSON.stringify({'deviceId': infoDevsBasic[i].devid, 'token':store.state.token}),
          headers:
              {
                'Content-Type': 'application/json'
              }
        }).then((responseData1)=>{
          infoDevsDetailed.push(responseData1.data.data)
          onlineDev += Number(infoDevsDetailed[j].device.onlineStatus)
          j++;
          if (j==devNum)
          {
            infoDevsDetailed.sort(function (a,b){
              return b.device.createTime-a.device.createTime
            })
            store.commit('getInfoDevDetail',infoDevsDetailed)
            infoOverview[3].value = onlineDev
          }
        })
      }
    })
    return{
      infoOverview
    }
  }
}
</script>

<style scoped>

</style>