import {Router} from 'express';
import * as validUrl from 'valid-url';
import * as shortid  from 'shortid';
import {Url} from '../models/Url';

export const urls = Router();

urls.post('/',  async (req, res, next) => {
	try {

		if (req.body.realURL) {
			if (validUrl.isUri(req.body.realURL)) {
				const item = {
					realURL : req.body.realURL,
					codeURL : shortid.generate()
				}
				const url = await Url.create(item);
				console.log("item", item);
				console.log("Response", url);
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