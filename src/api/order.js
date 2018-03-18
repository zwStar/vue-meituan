import {_get, _post} from './index'

//提交订单
export const submitOrder = (data) => {
  let req = {
    data,
    url: 'v1/order'
  };
  return _post(req);
}

//准备支付
export const initPay = (data) => {
  let req = {
    data,
    url: 'v1/pay'
  }
  return _post(req);
}

//获取订单信息
export const orderInfo = (data) => {
  let req = {
    url: `v1/order/${data.order_id}`
  }
  return _get(req);
}

//获取我的订单
export const orders = (data) => {
  let req = {
    data,
    url: 'v1/orders'
  }
  return _get(req);
}

//订单评论
export const makeComment = (data) => {
  let req = {
    data,
    url: 'v1/comment'
  }
  return _post(req)
}


//请求支付
export const requestPay = (data) => {
  let req = {
    data,
    url: '/https://pay.ispay.cn/core/api/request/pay/'
  }
  return _post(req)
}

//监听扫码支付状态
export const listenStatus = (data) => {
  let req = {
    data,
    url: 'v1/listen_status'
  }
  return _get(req)
}

