<template>
  <el-card body-style="height:280px;">
    <template #header>
      <div>
        <span>位置信息</span>
      </div>
    </template>
      <el-card id="map" title="Baidu Maps"></el-card>
  </el-card>
</template>

<script>
import BMap from 'BMap'
import {inject} from "vue";

export default {
  name: "BaiduMap",
  setup(){
    const devAddress = inject('address')
    console.log(devAddress)
    return {
      devAddress,
    }
  },
  mounted(){
    const map = new BMap.Map('map',{mapType:BMAP_HYBRID_MAP})
    map.enableScrollWheelZoom();                               //启用滚轮放大缩小
    // 创建地址解析器实例
    const point = new BMap.Point(120.69477, 36.3673842)
    const myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(this.devAddress, function(point) {
      console.log(point)
      if (point) {
        map.centerAndZoom(point, 16);
        map.addOverlay(new BMap.Marker(point));
      } else {
        alert("没有找到地址");
      }
    }, "青岛市");

  }

}

</script>

<style scoped>

#map{
  width:100%;
  height:100%;
}

</style>

<style>
.anchorBL{display:none;}
</style>