<template>
  <div class="header">
    <div class="logo">
      <img src="../../assets/mylogo.png" height="38" width="289.5"/>
    </div>
    <div style="float: left; margin-left: 50px;">
      <el-menu :default-active="activeIndex"  mode="horizontal" collapse-transition=false>

          <el-menu-item v-for="item in items" :index="item.index" :key="item.index">
              <span slot="title">{{ item.title }}</span>
          </el-menu-item>

      </el-menu>
    </div>
    <div class="header-right">
        <div class="header-user-con">
            <div class="user-avator"><img src="../../assets/header.jpg"></div>
            <el-dropdown class="user-name" trigger="click" @command="handleSelect">
              <span class="el-dropdown-link">
<!--                        {{ username }}-->
                        admin
                        <i class="el-icon-caret-bottom"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>用户信息</el-dropdown-item>
                  <el-dropdown-item>登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
        </div>
    </div>
  </div>
</template>

<script>

import {ref} from "vue";

export default{
  setup(){
    const activeIndex = ref('Home')
    return {
      activeIndex,
      items: [
        {index: 'Home', title:'首页'},
        {index: 'Ship', title:'船舶可视化'},
        {index: 'LOT', title:'物联网'}
      ]
    }
  }
}
</script>

<style scoped>
.header{
  width:100%;
  height: 60px;
  position: relative;
  box-sizing: border-box;
}
.header .logo{
    float: left;
    height:60px;
    display: flex;
    align-items: center;
}

/* -------------- */
.header-right{
  float: right;
  padding-right: 50px;
}
.header-user-con{
  display: flex;
  height: 60px;
  align-items: center;
}

.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-menu.el-menu--horizontal {
  background-color: #165184;
}

.user-name {
  margin-left: 10px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}

/* --------------- 水平一级菜单栏的样式--------------------- */
.el-menu.el-menu--horizontal {
  border-bottom: none !important;
  float: left;
  margin-left: 50px;
  --el-menu-hover-bg-color: #C3FCF2;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #8aaa9f;
  color: #8AAA9F;
  font-weight: 700;
}

 .el-menu--horizontal>.el-menu-item.is-active {
   border-bottom: 2px solid #ecb13c;
   color: #ecb13c!important;
 }
.el-menu--horizontal > .el-menu-item {
  font-size: 16px;
  margin: 0 15px;
  color: #8AAA9F;
}
.el-dropdown{
  color:#8aaa9f;
}
</style>
