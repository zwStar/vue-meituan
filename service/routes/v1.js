import CityHandle from '../controller/v1/cities'
import express from 'express'
const router = express.Router();

router.get('/cities', CityHandle.getCity);

export default router