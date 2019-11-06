<template>
  <div class="home-container">
    <el-row>
      <el-col>
        <el-button @click="loadConfigs">载入配置</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="(command,idx) in commands" :key="idx">
        <el-button @click="runCmd(command.cmd)">{{command.name}}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { exec } from 'shelljs'
import { remote } from 'electron'
import yaml from 'js-yaml'
import fs from 'fs'
export default {
  name: 'APP',
  data() {
    return {
      command: '',
      commands: [],
    }
  },
  computed: {},
  created() {
    this.initConfigs()
  },
  methods: {
    runCmd(command) {
      exec(this.getcmdLine(command), (code, stdout, stderr) => {
        console.log('Exit code:', code)
        console.log('Program output:', stdout)
        console.log('Program stderr:', stderr)
      })
    },
    getcmdLine(cmd) {
      if (process.platform === 'win32') return `start cmd.exe /K ${cmd}`
      return cmd
    },
    loadConfigs() {
      remote.dialog
        .showOpenDialog({
          filters: [{ name: 'All Files', extensions: ['yml'] }],
        })
        .then(res => {
          let files = res.filePaths
          if (files.length > 0) {
            let content = fs.readFileSync(files[0])
            // debugger
            this.loadContent(content)
            localStorage.setItem('it-tool-configs', content)
          }
        })
    },
    initConfigs() {
      let content = localStorage.getItem('it-tool-configs')
      this.loadContent(content)
    },
    loadContent(content) {
      let configs = yaml.load(content)
      // localStorage.setItem('it-tool-configs', content)
      for (let key in configs) {
        this.commands.push({ name: key, cmd: configs[key] })
      }
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
