<template>
  <div class="collection">
    <v-head title_head="我的收藏" goBack="true" bgColor="#f4f4f4"></v-head>
    <div class="info_container">
      <img src="../../../assets/nothing.png">
      <span class="text">没有收藏的你一定是个假吃货</span>
    </div>
    <label for="file" class="upload_container">
      <input id="file" type="file" @change="fileUpload($event)" style="display: none;">
    </label>
  </div>
</template>

<script>
  import {upload_token, upload} from '@/api/upload'

  export default {
    methods: {
      fileUpload(event) {
        let data = {
          file: event.target.files[0],
          token: 'FHE4n02irVv87MUjy6v3NRCTdxSF7Oz3NwFT7Cop:TQP96GN_zV3e0L2J6TGFQUGIQks=:eyJkZWxldGVBZnRlckRheXMiOjcsInNjb3BlIjoibWVpdHVhbiIsImRlYWRsaW5lIjoxNTIxMjkyMzIzfQ=='
        }
        upload(data).then((response) => {
          console.log('upload response', response)
        })
      }

     /* fileUpload(event) {

        let file = event.target.files[0];
        const xhr = new XMLHttpRequest();
        const action = 'https://upload-z2.qiniup.com/'
        const formData = new FormData();
        formData.append('token',"FHE4n02irVv87MUjy6v3NRCTdxSF7Oz3NwFT7Cop:TQP96GN_zV3e0L2J6TGFQUGIQks=:eyJkZWxldGVBZnRlckRheXMiOjcsInNjb3BlIjoibWVpdHVhbiIsImRlYWRsaW5lIjoxNTIxMjkyMzIzfQ==")
        formData.append('file', file);
        xhr.onload = function onload() {
          if (xhr.status < 200 || xhr.status >= 300) {
            console.log('上传失败')
          }
          console.log('上传成功')
          let text = xhr.responseText || xhr.response;
          text = JSON.parse(text);
          console.log('上传结果',text)
        };
        xhr.open('post', action, true);
        xhr.send(formData);*/

       /* upload_token().then((response) => {
//          const data = {token: response.data.uptoken}
          const xhr = new XMLHttpRequest();
//        const action = 'http://127.0.0.1:3000/v1/uploadtest';
          const action = 'https://upload-z2.qiniup.com/'

          const formData = new FormData();
//          formData.append('token', response.data.uptoken);
          formData.append('token',"FHE4n02irVv87MUjy6v3NRCTdxSF7Oz3NwFT7Cop:TQP96GN_zV3e0L2J6TGFQUGIQks=:eyJkZWxldGVBZnRlckRheXMiOjcsInNjb3BlIjoibWVpdHVhbiIsImRlYWRsaW5lIjoxNTIxMjkyMzIzfQ==")
          formData.append('img', file);
          xhr.onload = function onload() {
            if (xhr.status < 200 || xhr.status >= 300) {
              console.log('上传失败')
            }
            console.log('上传成功')
            let text = xhr.responseText || xhr.response;
            text = JSON.parse(text);
            console.log('上传结果',text)
          };
          xhr.open('post', action, true);
          xhr.withCredentials = true;
          xhr.send(formData);
        })*/
    //  }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .collection {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    .info_container {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 3rem;
        height: 3rem;
      }
      .text {
        display: block;
        font-size: 0.35rem;

      }
    }
    .upload_container{
      display: inline-block;
      width:200px;
      height:200px;
      background: #333;
    }
  }
</style>
