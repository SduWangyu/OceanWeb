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
    <span>{{msg}}</span>
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
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

export default {
  name:'Dialog',
  props:{
    msg:'',
    isShow: false,
  },

  setup(props) {
    const dialogVisible = ref(props.isShow)
    console.log(props.isShow)
    const handleClose = (done) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
          .then(() => {
            done()
          })
          .catch(() => {
            // catch error
          })
    }
    return {
      dialogVisible,
      handleClose,
    }
  },
}
</script>
