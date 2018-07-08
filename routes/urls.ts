import {Router} from 'express';
import {validUrl } from 'valid-url';
import {shortid} from 'shortid';
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