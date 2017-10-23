import express from 'express';
import db from './mongodb/db.js';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser'
import router from './routes'
import winston from 'winston';

import expressWinston from 'express-winston';
import Statistic from './middlewares/statistic'
const app = express();

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", '3.2.1')
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});
app.use(Statistic.apiRecord)
const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
    name: "element",
    secret: "zwStar",
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 1000
    },
    store: new MongoStore({
        url: "mongodb://127.0.0.1:27017/vms-session"
    })
}))

app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));
app.use(express.static('./public'));
router(app);
app.listen(3000);