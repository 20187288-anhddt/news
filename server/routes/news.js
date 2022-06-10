const express = require("express");
const NewsModel = require("../models/News");
const router = express.Router();

const app = express();

function sortNewsListByDateFirst(newsList){
	newsList.sort((newsOne, newsTwo) => {
		const dateOne = moment(newsOne.dateCreate).format("DD-MM-YYYY")
		const dateTwo = moment(newsTwo.dateCreate).format("DD-MM-YYYY")
		if(dateOne > dateTwo)
			return -1
		if(dateOne == dateTwo){
			if(newsOne.view > newsTwo.view)
				return -1
			if(newsOne.view < newsTwo.view)
				return 1
		}
		if(dateOne < dateTwo)
			return 1
		return 0
	})
	return newsList;
}

function sortNewsListByViewFirst(newsList){
	return newsList.sort((newsOne, newsTwo) => {
		const dateOne = moment(newsOne.dateCreate).format("DD-MM-YYYY")
		const dateTwo = moment(newsOne.dateCreate).format("DD-MM-YYYY")
		if(newsOne.view > newsTwo.view)
			return -1
		if(newsOne.view == newsTwo.view){
			if(dateOne > dateTwo)
				return -1
			if(dateOne < dateTwo)
				return 1
		}
		if(newsOne.view < newsTwo.view)
			return 1
		return 0
	})
	return newsList;
}

// search
router.get("/q", async function (req, res, next) {
	try {
		const textSearch = req.query.textSearch;
		const News = await NewsModel.find({ $text: { $search: `"${textSearch}"`, $caseSensitive: false }, isDelete: false, status: "published" })
		.limit(10).sort({ view: -1, dateCreate: -1 });
		if (News) {
			return res.json({
				code: 200,
				err: null,
				data: News
			});
		}
	} catch (err) {
		return res.json({
			code: 400,
			err: err.messege,
			data: null
		});
	}
});

// show news of category ( status = "published" )
router.get("/categories/:id", async function (req, res, next) {
	try {
		const id = req.params.id;
		const newsList = await NewsModel.find({ status: 'published', cateNews: { _id: id }, isDelete: false }).sort({dateCreate: -1}).limit(50)
			.populate("cateNews")
			.populate("createdBy");

		return res.json({
			code: 200,
			err: null,
			data: sortNewsListByDateFirst(newsList).slice(0, 20)
		});
	} catch (err) {
		return res.json({
			code: 400,
			err: err.messege,
			data: null
		});
	}
});

// add news
router.post("/", async function (req, res, next) {
	try {
		const body = req.body;
		const file = req.files.file;

		if (file) {
			file.mv(`${__dirname}/../../client/public/uploads/news/${file.name}`);
		}
		const News = new NewsModel({
			title: body.title,
			content: body.content,
			sapo: body.sapo,
			content: body.content,
			cateNews: body.cateNews,
			tag: JSON.parse(body.tags),
			createdBy: body.createdBy,
			articlePicture: file.name,
			originalLink: body.originalLink,
			dateCreate: body.dateCreate,
			status: body.status
		});

		const NewsClass = await News.save();

		return res.json({
			code: 200,
			message: "Gửi yêu cầu thành công",
			data: NewsClass
		});

	} catch (err) {
		return res.json({
			code: 400,
			err: err,
			message: "Thêm thất bại"
		});
	}
});

module.exports = router;