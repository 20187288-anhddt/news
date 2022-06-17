const express = require("express");
const fileUpload = require("express-fileupload");
const NewsModel = require("../models/News");
const router = express.Router();
const auth = require("../middleware/auth");
const moment = require("moment")

const app = express();
app.use(fileUpload());

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

// get latestnews
router.get("/latestNews", async function (req, res, next) {
	try {
		const News = await NewsModel.find({ status: 'published', isDelete: false})
		.limit(10).sort({ dateCreate: -1 })
			.populate("createdBy");

		return res.json({
			code: 200,
			err: null,
			data: News
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

router.get("/:id", async function (req, res, next) {
	try {
		const id = req.params.id;
		const news = await NewsModel.find({ createdBy: { _id: id }, isDelete: false })
			.populate("cateNews")
			.populate("createdBy");
		return res.json({
			code: 200,
			err: null,
			data: news
		});
	} catch (err) {
		return res.json({
			code: 400,
			err: err.messege,
			data: null
		});
	}
});

router.get("/new/:id", async function (req, res, next) {
	try {
		const id = req.params.id;
		const News = await NewsModel.find({ _id: id })
			.populate("cateNews")
			.populate("createdBy");
		return res.json({
			code: 200,
			err: null,
			data: News
		});
	} catch (err) {
		return res.json({
			code: 400,
			err: err.messege,
			data: null
		});
	}
});

router.delete("/:_id", async function (req, res, next) {
	try {
		const _id = req.params._id;
		const newExist = await NewsModel.findOne({ _id: _id });

		if (newExist) {
			const newDelete = await NewsModel.findOneAndDelete({ _id: _id });
			const news = await NewsModel.find({ isDelete: true })
				.populate("createdBy");

			if (newDelete) {
				res.json({
					code: 200,
					message: "Xóa thành công",
					data: news
				});
			}
		}
	} catch (err) {
		return res.json({
			code: 400,
			message: "Xóa thất bại",
			err: err,
			data: null
		});
	}
});

// get news Reel
router.get("/newsReels", async function (req, res, next) {
	try {
		let newsList = await NewsModel.find({ status: 'published', cateNews: "5dbe935fd84e1413ac50c2bc", isDelete: false}).limit(100).sort({dateCreate: -1, view: -1})
			.populate("createdBy");
		newsList = sortNewsListByDateFirst(newsList).slice(0, 20)
		return res.json({
			code: 200,
			err: null,
			data: newsList
		});
	} catch (err) {
		return res.json({
			code: 400,
			err: err.messege,
			data: null
		});
	}
});

// news ( isDelete = false )
router.get("/", async function (req, res, next) {
	try {
		const News = await NewsModel.find({ isDelete: false })
			.populate("cateNews")
			.populate("createdBy");
		return res.json({
			code: 200,
			err: null,
			data: News
		});
	} catch (err) {
		return res.json({
			code: 400,
			err: err.messege,
			data: null
		});
	}
});
// get news detail
router.get("/details/:_idNews", async function (req, res, next) {
	try {
		const idNews = req.params._idNews;
		const News = await NewsModel.find({
			_id: idNews,
			isDelete: false
		})
			.populate("createdBy");

		if (News.length > 0 && News[0].status === "unpublished")
			return res.json({
				code: 200,
				err: null,
				data: [null]
			});
		return res.json({
			code: 200,
			err: null,
			data: News
		});
	} catch (err) {
		return res.json({
			code: 400,
			err: err.messege,
			data: null
		});
	}
});
module.exports = router;