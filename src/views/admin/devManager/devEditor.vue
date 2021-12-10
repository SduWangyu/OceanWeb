<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <h1>设备信息</h1>
      </div>
    </template>
    <div v-for="(value, key, index) in devInfoShow">
      {{arrInfoShowCN[index]}}<el-input v-model="devInfoShow[key]"></el-input>
    </div>
  </el-card>
  <div>
    <el-button @click="subMitEdit(devInfoShow)">
      提交
    </el-button>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "devEditor",
  setup(){
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })

    const devIdx = route.query.devIdx
    const infoDevsDetail = store.state.infoDevsDetail[devIdx].device
    const devInfoShow = ref({})
    const arrInfoShow = [
      'projectId','name', 'templateId','deviceId',
      'type','pass','funcCloud',
      'funcMonitor', 'isTransProtocol'
      ,'positionType','address', 'position'
    ]
    const arrInfoShowCN = [
        '组织 id','设备名称','设备模板 id',
        '设备的SN','设备类型','设备密码',
        '云组态开关','云监测开关','是否为透传协议设备',
        '定位类型','设备定位地址描述','设备定位经纬度'
    ]
    arrInfoShow.forEach((item)=>{
      devInfoShow.value[item] = infoDevsDetail[item]
    })
    function subMitEdit(postData){
      axios({
        url: 'https://openapi.mp.usr.cn/usrCloud/dev/editDevice',
        method: 'post',
        data: JSON.stringify({
          "relUserIds": [],
          "device":postData,
          "tags":[],
          "token":store.state.token
        }),
        headers:
            {
              'Content-Type': 'application/json'
            }
      }).then((res)=>{
        const status = res.data.status
        switch (status){
          case 0:
            alert("修改成功");
            router.push({name:'overview'})
            break;
          default:
            alert("修改失败")
            break
        }
      })
    }


    return{
      devInfoShow,
      arrInfoShowCN,
      subMitEdit
    }




  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>