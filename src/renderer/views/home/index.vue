<!--
 * @Author: Jack
 * @Date: 2019-08-26 11:19:02
 * @LastEditors: Jack
 * @LastEditTime: 2019-11-05 18:20:41
 * @Description:
 -->
<template>
  <div class="home-container">
    <el-row>
      <el-col :span="24">
        <el-input
          v-model="command"
          placeholder="Input your command here"
        ></el-input>
      </el-col>
      <el-col :span="24">
        <el-button @click="runCmd">Exec</el-button>
        <el-button @click="runCmd2">Exec2</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { exec } from 'shelljs'
export default {
  name: 'APP',
  data() {
    return {
      command: '',
    }
  },
  computed: {},
  created() {},
  methods: {
    runCmd2() {
      console.log('cmd2')
    },
    runCmd() {
      exec(this.getcmdLine(this.command), (code, stdout, stderr) => {
        console.log('Exit code:', code)
        console.log('Program output:', stdout)
        console.log('Program stderr:', stderr)
      })
    },
    getcmdLine(cmd) {
      if (process.platform === 'win32') return `start cmd.exe /K ${cmd}`
      return cmd
    },
  },
}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 10px;
  .el-col {
    margin-bottom: 5px;
  }
}
</style>
