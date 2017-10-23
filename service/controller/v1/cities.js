import Cities from '../../models/v1/cities'
import pinyin from 'pinyin'
import AddressComponent from '../../prototype/addressComponent'

class CityHandle extends AddressComponent {
    constructor() {
        super();
        this.getCity = this.getCity.bind(this);//因为这个函数是router调用 所以里面的this就会改变 因为需要bind改变this指向
    }

    async getCity(req, res, next) {
        const type = req.query.type;
        let cityInfo;
        try {
            switch (type) {
                case 'guess':
                    const city = await this.getCityName(req);
                    cityInfo = await Cities.cityGuess(city);
                    break;
                case 'hot':
                    break;
                case 'group':
                    break;
                default:
                    res.json({
                        name: 'ERROR_QUERY_TYPE',
                        message: '参数错误'
                    })
                    return;
            }
            res.send(cityInfo);
        } catch (err) {
            res.send({
                name: 'ERROR_DATA',
                message: '获取数据失败',
            });
        }
    }

    async getCityName(req){
        let cityInfo;
        try{
            cityInfo = await this.guessPosition(req);
        }catch(err){
            console.error('获取IP位置信息失败', err);
            res.send({
                name: 'ERROR_DATA',
                message: '获取数据失败',
            });
            return
        }
        const pinyinArr = pinyin(cityInfo.city, {
            style: pinyin.STYLE_NORMAL,	//普通风格，即不带声调。
        });

        let cityName = '';
        pinyinArr.forEach(item => {
            cityName += item[0];
        })
        return cityName
    }

}

export default new CityHandle()