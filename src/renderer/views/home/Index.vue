<!--
 * @Author: Jack
 * @Date: 2019-04-04 22:12:42
 * @LastEditors: Jack
 * @LastEditTime: 2019-09-06 13:43:44
 * @Description: 
 -->
<template>
  <div class="home-container">
    home page
  </div>
</template>

<script>

import {ipcRenderer} from 'electron'
import {TEST_CHANNEL} from 'src/main/channel/const'
export default {
  name: 'Home',
  mounted(){

    ipcRenderer.on(TEST_CHANNEL, (event, arg) => {
      console.log('Main sent data', arg)
    })

    ipcRenderer.send(TEST_CHANNEL)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
