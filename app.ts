'use strict'
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as path from 'path';
import * as errorhandler from 'strong-error-handler';
import {urls} from './routes/urls';


export const app = express();
app.use(function(req, res, next) { 
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Expose-Headers", "x-total-count");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
	res.header("Access-Control-Allow-Headers", "Content-Type,authorization");	
    next();
});


app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use('/api/url', urls);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


app.use(errorhandler({
  debug: process.env.ENV !== 'prod',
  log: true,
}));