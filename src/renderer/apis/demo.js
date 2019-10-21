import request from './request.js'

export function exampleApi(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

