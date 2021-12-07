<template>
  <el-button type="text" @click="dialogVisible = true"
  >click to open the Dialog</el-button
  >

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
  >
    <span>{{dialogMsg}}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {inject, ref} from 'vue'
import { ElMessageBox } from 'element-plus'

export default {
  name:'Dialog',


  setup() {
    const dialogVisible = inject("isShow")
    const dialogMsg = inject("msg")
    const handleClose = (done) => {

    }
    return {
      dialogVisible,
      handleClose,
      dialogMsg
    }
  },
}
</script>
