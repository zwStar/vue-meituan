import {_get, _post, _put} from './index'

//获取地址
export const submit_order = (data) => {
  let req = {
    data,
    url: 'v1/order'
  };
  return _post(req);
}

//准备支付
export const init_pay = (data) => {
  let req = {
    data,
    url: 'v1/pay'
  }
  return _post(req);
}

//获取订单信息
export const order_info = (data) => {
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

//请求支付
export const request_pay = (data) => {
  let req = {
    data,
    url: '/https://pay.ispay.cn/core/api/request/pay/'
  }
  return _post(req)
}

//监听扫码支付状态
export const listen_status = (data) =>{
  let req = {
    data,
    url:'v1/listen_status'
  }
  return _get(req)
}
