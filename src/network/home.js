import {request} from "./network";

export const BANNER = 'banner'
export const RECOMMEND = 'recommend'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getProductData(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}