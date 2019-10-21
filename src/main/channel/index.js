/*
 * @Author: Jack
 * @Date: 2019-09-06 12:07:00
 * @LastEditors: Jack
 * @LastEditTime: 2019-09-06 13:46:17
 * @Description: 
 */
import {ipcMain} from 'electron'
import {TEST_CHANNEL} from './const'

ipcMain.on(TEST_CHANNEL, (event, arg) => {
  console.log('got data', arg)
  event.reply(TEST_CHANNEL, 'Jack')
})
