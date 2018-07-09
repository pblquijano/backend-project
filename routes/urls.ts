import {Router} from 'express';

import * as validUrl from 'valid-url';
import * as shortid  from 'shortid';
import * as fs from 'fs';
import * as lineReader  from 'readline';
import {Url} from '../models/Url';
import * as fileUpload from 'express-fileupload';
var fu = fileUpload();

export const urls = Router();

//Shorten the url and save it
urls.post('/',  async (req, res, next) => {
	try {
		//Validate if exist the variable
		if (req.body.realURL) {
			//Validate the url
			if (validUrl.isUri(req.body.realURL)) {
				const item = {
					realURL : req.body.realURL,
					codeURL : shortid.generate()
				}
				const url = await Url.create(item);
				res.status(201).json(url);
			}else{
				res.status(401).json({
		          "message" : "Invalid Url."
		        });
			}
		}else{
			res.status(400).json({
	          "message" : "Missing required fields."
	        });
		}		
	} catch (e) {
		next(e);
	}
});


urls.post('/bulk/', [fu], async (req, res, next) => {
	try {
		
		var path = __dirname +'/'+new Date().getTime()+'.txt';
		await req.files.file.mv(path);
		let urls:any[] = [];
		const myInterface = lineReader.createInterface({
		  input: fs.createReadStream(path)
		});

	  	myInterface.on('line',  function (line) {
			if (validUrl.isUri(line)) {
				const item = {
					realURL : line,
					codeURL : shortid.generate()
				}
				urls.push(item);
				console.log(item);
			}
		}).on('close', async function() {
		    for(const url_object of urls){
				await Url.create(url_object);
			}
			fs.exists(path, (exists) => {
	            if (exists) {
	              fs.unlink(path, function(err){
	              });
	            }

	        });		
		  	res.status(201).json(urls);
		});
				
	} catch (e) {
		next(e);
	}
});


//Get list of urls sorted by creation date
urls.get('/',  async (req, res, next) => {
	try {
		const urls = await Url.scope(req.query['scope']).findAll({order: [['CreatedAt', 'DESC']]});
		res.status(200).json(urls);
	} catch (e) {
		next(e);
	}
});

//Get the url by means of the code
urls.get('/:code',  async (req, res, next) => {
	try {		  
      const url = await Url.scope(req.query['scope']).findOne({where: {codeURL: req.params.code}});
      res.status(200).json(url);
	} catch (e) {
		next(e);
	}
});