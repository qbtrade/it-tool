/*
 * @Author: Jack
 * @Date: 2019-08-20 16:30:48
 * @LastEditors: Jack
 * @LastEditTime: 2019-08-23 10:50:20
 * @Description: 
 */
const builder = require('electron-builder')

const Platform = builder.Platform
const { name, productName } = require('../package.json')

// jack: electron-builder settings
const config = {
  appId: `com.xxxxx.${name}`,
  copyright: 'Copyright ©2019 xxxxx',
  productName,
  directories: {
    output: 'build/',
  },
  files: [
    '_icons/icon.*',
    '!**/node_modules/**/*',
    'dist/**/*',
    'src/data/**/*',
  ],
  dmg: {
    contents: [
      {
        path: '/Applications',
        type: 'link',
        x: 410,
        y: 230,
      },
      {
        type: 'file',
        x: 130,
        y: 230,
      },
    ],
    window: {
      height: 380,
      width: 540,
    },
  },
  linux: {
    icon: '_icons/icon.png',
    target: ['deb', 'snap', 'AppImage'],
  },
  mac: {
    category: 'public.app-category.utilities',
    icon: '_icons/icon.icns',
    target: ['dmg', 'zip'],
    type: 'distribution',
  },
  win: {
    icon: '_icons/icon.ico',
    target: ['nsis', 'zip', 'portable'],
  },
  nsis: {
    allowToChangeInstallationDirectory: true,
    oneClick: false,
  },
}

builder
  .build({
    targets: Platform.WINDOWS.createTarget(),
    config,
  })
  .then(m => {
    console.log(m)
  })
  .catch(e => {
    console.error(e)
  })
