<template>
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
</template>

<script>
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "devDataView",
  setup(){
    const route = useRoute()
    const store = useStore()
    if (sessionStorage.getItem('store')) {
      store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(store.state))
    })

    const devIdx = route.query.devIdx
    console.log(devIdx)
    const infoDevsDetail = store.state.infoDevsDetail[devIdx]
    console.log(infoDevsDetail)
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

    return{
      devInfoShow
    }
  }
}
</script>

<style scoped>

</style>