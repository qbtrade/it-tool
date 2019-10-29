<!--
 * @Author: Jack
 * @Date: 2019-08-26 11:19:02
 * @LastEditors: Jack
 * @LastEditTime: 2019-08-26 12:11:17
 * @Description:
 -->
<template>
  <div class="app-wrapper">
    <navbar />
    <div class="app-main">
      <router-view/>
    </div>
    <div>
      <button style='margin-left:5px;padding:3px' v-for="(tool,idx) in tools" @click='runCmd(tool.cmd)' :key='idx'>{{tool.key}}</button>
    </div>
    <div>outputs</div>
    <div v-for='(output,idx) in outputs' :key='idx'>
      {{output}}
    </div>
    <!-- <foot /> -->
  </div>
</template>

<script>
import Foot from './components/Foot'
import Navbar from './components/Navbar'
import * as yaml from 'js-yaml'
import * as path from 'path'
import * as fs from 'fs'
import {exec} from 'shelljs'
// import ResizeMixin from './mixin/resizeHandler'
import cmd from 'node-cmd'
import {ipcRenderer,remote} from 'electron'
export default {
  name: 'APP',
  components: {
    Foot,
    Navbar
  },
  data(){
    return {
      outputs:[],
      tools: []
    }
  },
  // mixins: [ResizeMixin],
  computed: {
  },
  methods: {
    runEcho(){
      cmd.get(
        'echo hello',
        function(err, data, stderr){
            console.log(err,data);
        }
    );
    },
    runCmd(cmdLine){
     exec(this.getcmdLine(cmdLine), (code, stdout, stderr)=> {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
    })
    },
    getcmdLine(cmd){
      if(process.platform==='win32') return `start cmd.exe /K ${cmd}`
      return cmd
    }
  },
  created(){
    document.addEventListener('keydown', event => {
          if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.code === 'KeyK') {
            console.log('sending opendevtools')
            ipcRenderer.send('openDevTools', remote.getCurrentWindow().id)
          }
        })
        // remote.getCurrentWindow().webContents.openDevTools()
    let filePath = process.env.NODE_ENV === 'production' ? path.join(__dirname, '../src/renderer/assets/configs/tools.yml') : path.join(__dirname, '../assets/configs/tools.yml')
    console.log(filePath)
    let tools = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
    for(let key in tools){
      this.tools.push({key,cmd:tools[key]})
    }
    
    // ipcRenderer.send('openDevTools',remote.getCurrentWindow().id)
    
  }
}
</script>

<style lang="scss" scoped>
</style>
