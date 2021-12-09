<template>
  <el-row :gutter="12" style="margin-bottom: 30px;">
    <el-col :span="4" v-for="info in infoOverview" :key="info">
      <el-card shadow="hover" :class="info.class">
        <p style="line-height: 1; color: white;">{{info.title}}</p>
        <p style="font-weight: 700;line-height: 1;font-size: 2.5rem; color: white;line-height: 1;">{{info.value}}</p>
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
        class: 'class1'
      },
      {
        title: "产品数",
        value: 0,
        class: 'class2'
      },
      {
        title: "用户数",
        value: 0,
        class: 'class3'
      },
      {
        title: "在线设备数",
        value: 0,
        class: 'class4'
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
            let infoDevIds = []
            infoDevsDetailed.forEach((item)=> {
              let obj = item
              infoDevIds.push(obj.device.deviceId)
            })
            axios({
              url: 'https://openapi.mp.usr.cn/usrCloud/datadic/getDataPointInfoByDevice',
              method: 'post',
              data: JSON.stringify({"deviceIds": infoDevIds, 'token':store.state.token}),
              headers:
                  {
                    'Content-Type': 'application/json'
                  }
            }).then((responseData2)=>{
              store.commit('getInfoVars', responseData2.data.data)
            })
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
p {
  border: 0;
  box-sizing: border-box;
  font-size: 100%;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
}
.el-card{

  margin: 0 10px 0 10px;
}
.el-card .class1{
  background-color: #165184;
}
.el-card .class2{
  background-color: #8AAA9F;
}
.el-card .class3{
  background-color: #8bb035;
}
.el-card .class4{
  background-color: #ecb13c;
}

</style>
<style>

</style>