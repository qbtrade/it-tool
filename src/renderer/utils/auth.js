/*
 * @Author: Jack
 * @Date: 2019-01-30 10:40:01
 * @LastEditors: Jack
 * @LastEditTime: 2019-01-30 10:59:14
 * @Description: 使用与通过本地cookie管理登录状态的情况，里面使用了js-cookie
 */

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
