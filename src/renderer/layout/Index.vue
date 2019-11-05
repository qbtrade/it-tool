<!--
 * @Author: Jack
 * @Date: 2019-08-26 11:19:02
 * @LastEditors: Jack
 * @LastEditTime: 2019-11-05 18:36:04
 * @Description:
 -->
<template>
  <div class="app-wrapper">
    <navbar />
    <div class="app-main">
      <router-view />
    </div>
    <foot />
  </div>
</template>

<script>
import Foot from './components/Foot'
import Navbar from './components/Navbar'
import { ipcRenderer, remote } from 'electron'
export default {
  name: 'APP',
  components: {
    Foot,
    Navbar,
  },
  data() {
    return {}
  },
  computed: {},
  created() {
    this.registerDevToolShortcut()
  },
  methods: {
    registerDevToolShortcut() {
      document.addEventListener('keydown', event => {
        if (
          (event.metaKey || event.ctrlKey) &&
          event.shiftKey &&
          event.code === 'KeyK'
        ) {
          ipcRenderer.send('openDevTools', remote.getCurrentWindow().id)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
