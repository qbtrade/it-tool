<!--
 * @Author: Jack
 * @Date: 2019-08-26 11:19:02
 * @LastEditors: Jack
 * @LastEditTime: 2019-11-05 18:02:44
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
  created() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
</style>
