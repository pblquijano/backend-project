import {Router} from 'express';
import * as validUrl from 'valid-url';
import * as shortid  from 'shortid';
import {Url} from '../models/Url';

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