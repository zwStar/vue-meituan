import BaseComponent from './baseComponent'

class AddressComponent extends BaseComponent{
    constructor(){
        super();
        this.tencentkey = 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL';
    }
    async guessPosition(req){
        return new Promise(async(resolve,reject)=>{
            let ip = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;

            const ipArr = ip.split(':');
            ip = ipArr[ipArr.length -1];
            if (process.env.NODE_ENV == 'development') {
                ip = '116.226.184.83';
            }
            try{
                let result;
                result = await this.fetch('http://apis.map.qq.com/ws/location/v1/ip', {
                    ip,
                    key: this.tencentkey,
                });

                if (result.status == 0) {
                    const cityInfo = {
                        lat: result.result.location.lat,
                        lng: result.result.location.lng,
                        city: result.result.ad_info.city,
                    }
                    cityInfo.city = cityInfo.city.replace(/市$/, '');
                    resolve(cityInfo)
                }else{
                    console.log('定位失败', result)
                    reject('定位失败');
                }
            }catch (err){
                reject(err);
            }
        })
    }

}
export default AddressComponent