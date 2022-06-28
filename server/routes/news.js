const express = require("express");
const fileUpload = require("express-fileupload");
const NewsModel = require("../models/News");
const router = express.Router();
const auth = require("../middleware/auth");
const moment = require("moment")
/* GET users listing. */

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

// get trash ( isDelete = true )
router.get("/trash", async function (req, res, next) {
	try {
		const News = await NewsModel.find({ isDelete: true })
			.populate("cateNews")
			.populate("createdBy");

		return res.json({
			code: 200,
			err: null,
			data: News
		});
	} catch (err) {
		console.log(err)
		return res.json({
			code: 400,
			err: err.messege,
			data: null
		});
	}
});

// get news entertainment
router.get("/newsEntertainments", async function (req, res, next) {
	try {
		let newsList = await NewsModel.find({ status: 'published', cateNews: "5dd4e90432e5ba1e1770a95f", isDelete: false }).limit(100).sort({ dateCreate:-1, view: -1})
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

// news other
router.get("/other", async function (req, res, next) {
	try {
		const number = +req.query.number;
		const News = await NewsModel.find({ status: 'published', isDelete: false })
		.sort({ view: 1, dateCreate: -1})
		.limit(number)
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

// news ( status = "published" )
router.get("/featuredNews", async function (req, res, next) {
	try {
		const News = await NewsModel.find({ status: 'published', isDelete: false }).limit(5).sort({ view: -1, dateCreate:-1})
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

// news ( isDelete = false ) by id user
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


// news ( isDelete = true )
router.get("/trash/:id", async function (req, res, next) {
	try {
		const id = req.params.id;
		const News = await NewsModel.find({ createdBy: { _id: id }, isDelete: true })
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

// show news of users ( status = "published" )
router.get("/users/:id", async function (req, res, next) {
	try {
		const id = req.params.id;
		const News = await NewsModel.find({ status: 'published', createdBy: { _id: id }, isDelete: false }).limit(40)
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

// tin tức tương tự
router.get("/similar/:id", async function (req, res, next) {
	try {
		const id = req.params.id;
		const News = await NewsModel.find({ status: 'published', cateNews: { _id: id }, isDelete: false}).limit(8)
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

router.get("/:_idNews", async function (req, res, next) {
	try {
		const idNews = req.params._idNews;
		const News = await NewsModel.find({
			_id: idNews,
			isDelete: false
		})
			.populate("cateNews")
			.populate("createdBy");

		const news = News[0];
		const data = {
			title: news.title,
			content: news.content,
			categoryId: news.cateNews._id,
			categoryName: news.cateNews.name,
			tags: news.tag,
			articlePicture: news.articlePicture
		};

		return res.json({
			code: 200,
			err: null,
			data: data
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

// add news crawler
router.post("/crawled_news", async function (req, res, next) {
	try {
		const body = req.body;
		const result = await NewsModel.findOne({ title: body.title }).exec();
		if (result != null) {
			const newsClass = await NewsModel.findOneAndUpdate(
				{ _id: result._id },
				{
					$set: {
						content: body.content,
						tag: body.tags,
						cateNews: body.cateNews,
						createdBy: body.createdBy,
						articlePicture: body.articlePicture,
						originalLink: body.originalLink,
						// dateCreate: body.dateCreate,
						sapo: body.sapo,
						source: body.source,
						status: body.status
					}
				})
			return res.json({
				code: 200,
				message: "Update thành công bài báo " + body.title,
				data: newsClass
			});
		}

		const News = new NewsModel({
			title: body.title,
			content: body.content,
			tag: body.tags,
			cateNews: body.cateNews,
			createdBy: body.createdBy,
			articlePicture: body.articlePicture,
			originalLink: body.originalLink,
			dateCreate: body.dateCreate,
			sapo: body.sapo,
			source: body.source,
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

// add news ( upload anh )
router.post("/upload", function (req, res, next) {
	try {
		const file = req.files.upload;

		file.mv(`${__dirname}/../../client/public/uploads/news/${file.name}`);
	} catch (err) {
		return res.json({
			code: 400,
			err: err,
			message: "Upload thất bại"
		});
	}
});

router.put("/:_id", async function (req, res, next) {
	try {
		const _id = req.params._id;
		const newExist = await NewsModel.findOne({ _id: _id });

		if (newExist) {
			const body = req.body;
			const files = req.files;

			if (files) {
				files.file.mv(`${__dirname}/../../client/public/uploads/news/${files.file.name}`);

				const news = {
					title: body.title,
					content: body.content,
					sapo: body.sapo,
					content: body.content,
					cateNews: body.cateNews,
					tag: JSON.parse(body.tags),
					articlePicture: files.file.name,
					originalLink: body.originalLink,
					dateCreate: body.dateCreate,
					status: body.status
				};

				if (news) {
					await NewsModel.findOneAndUpdate({ _id: _id }, news);

					return res.json({
						code: 200,
						message: "Sửa bài viết thành công"
					});
				}
			} else {
				const news = {
					title: body.title,
					content: body.content,
					sapo: body.sapo,
					content: body.content,
					cateNews: body.cateNews,
					tag: JSON.parse(body.tags),
					originalLink: body.originalLink,
					dateCreate: body.dateCreate,
					status: body.status
					//    title: body.title,
					//    content: body.content,
					//    cateNews: body.categoryId,
					//    tag: JSON.parse(body.tags)
				};

				if (news) {
					await NewsModel.findOneAndUpdate({ _id: _id }, news);

					return res.json({
						code: 200,
						message: "Sửa bài viết thành công"
					});
				}
			}
		}
	} catch (err) {
		console.log(err);
		return res.json({
			code: 400,
			message: "Sửa bài viết thất bại",
			err: err,
			data: null
		});
	}
});

// increase views
router.put("/views/:_id", async function (req, res, next) {
	try {
		const _id = req.params._id;
		const newExist = await NewsModel.findOne({ _id: _id });

		if (newExist) {
			const views = req.body.views;
			const increaseViews = await NewsModel.findOneAndUpdate(
				{ _id: _id },
				{ view: views }
			);

			const news = await NewsModel.find({
				_id: _id,
				isDelete: false
			})
				.populate("createdBy");

			if (increaseViews) {
				res.json({
					code: 200,
					data: news
				});
			}
		}
	} catch (err) {
		return res.json({
			code: 400,
			err: err,
			data: null
		});
	}
});

// move a new to trash
router.put("/trash/:_id", async function (req, res, next) {
	try {
		const _id = req.params._id;
		const newExist = await NewsModel.findOne({ _id: _id });

		if (newExist) {
			const moveToTrash = await NewsModel.findOneAndUpdate(
				{ _id: _id },
				{ isDelete: true }
			);
			const news = await NewsModel.find({})
				.populate("createdBy");

			if (moveToTrash) {
				res.json({
					code: 200,
					message: "Đã thêm vào giỏ rác",
					data: news
				});
			}
		}
	} catch (err) {
		return res.json({
			code: 400,
			message: "Thêm vào giỏ rác thất bại",
			err: err,
			data: null
		});
	}
});

// restore from trash
router.put("/restore/:_id", async function (req, res, next) {
	try {
		const _id = req.params._id;
		const newExist = await NewsModel.findOne({ _id: _id });

		if (newExist) {
			const restoreFromTrash = await NewsModel.findOneAndUpdate(
				{ _id: _id },
				{ isDelete: false }
			);
			const news = await NewsModel.find({ isDelete: true })
				.populate("createdBy");

			if (restoreFromTrash) {
				res.json({
					code: 200,
					message: "Restore thành công",
					data: news
				});
			}
		}
	} catch (err) {
		return res.json({
			code: 400,
			message: "Restore thất bại",
			err: err,
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

module.exports = router;
