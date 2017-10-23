import fetch from 'node-fetch';
import path from 'path'
import fs from 'fs'
import Ids from '../models/ids'

export default class BaseComponent{
    constructor(){
        this.idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];
    }
    //获取id列表
    async getId(type){
        if (!this.idList.includes(type)) {
            console.log('id类型错误');
            throw new Error('id类型错误');
            return
        }
        try{
            const idData = await Ids.findOne();
            idData[type] ++ ;
            await idData.save();
            return idData[type]
        }catch(err){
            console.log('获取ID数据失败');
            throw new Error(err)
        }
    }
    async fetch(url='',data={},type='GET',resType='JSON'){
        type = type.toUpperCase();
        resType = resType.toUpperCase();
        if (type == 'GET') {
            let dataStr = ''; //数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&';
            });

            if (dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr;
            }
        }
        let requestConfig = {
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
        if (type == 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        let responseJson;
        try {
            const response = await fetch(url, requestConfig);
            if (resType === 'TEXT') {
                responseJson = await response.text();
            }else{
                responseJson = await response.json();
            }
        } catch (err) {
            console.log('获取http数据失败', err);
            throw new Error(err)
        }
        return responseJson
    }
}