import {_get, _postNoWithCredentials} from './index'
//获取七牛云上次凭证
export const uploadToken = (data) => {
  let req = {
    data,
    url: 'service/uploadtoken'
  };
  return _get(req);
}

//上传
export const upload = (data) => {
  let formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })
  let req = {
    data: formData,
    url: '/upload-z2.qiniup.com/'
  }
  return _postNoWithCredentials(req);
}
