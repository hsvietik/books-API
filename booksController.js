const createError = require("http-errors");

let booksList = [];
let idno = 0;

exports.index = function (req, res) {
	res.send(booksList);
};

exports.create = function (req, res, next) {
	if (!req.body.title) {
		return next(createError(400, "title is required"));
	}
	if (!req.body.author) {
		return next(createError(400, "author is required"));
	}
	if (!(req.body.read === false || req.body.read === true)) {
		return next(createError(400, "read (true/false) is required"));
	}
	if (!req.body.link) {
		return next(createError(400, "Link is required"));
	}
	booksList.push({
		id: idno,
		title: req.body.title,
		author: req.body.author,
		read: req.body.read,
		link: req.body.link,
	});
	res.send({ result: true });
	idno++;
};

exports.show = function (req, res, next) {
	const bookItem = booksList.find((book) => book.id == req.params.id);
	if (!bookItem) {
		return next(createError(404, "no book with that id"));
	}
	res.send(bookItem);
};

exports.searchByTitle = function (req, res, next) {
	// 	const bookItem = booksList.find((book) => book.title.includes(req.params.title));
	const bookItem = booksList.filter((book) => {
		return book.title.includes(req.params.title);
	});
	if (!bookItem) {
		return next(createError(404, "No book with that title"));
	}
	res.send(bookItem);
};

exports.delete = function (req, res, next) {
	const bookItem = booksList.find((book) => book.id == req.params.id);
	if (!bookItem) {
		return next(createError(404, "No book with that id"));
	}
	booksList = booksList.filter((book) => book.id != req.params.id);
	res.send({ result: true });
};

exports.deleteAll = function (req, res, next) {
	booksList = [];
	idno = 0;
	res.send({ result: true });
};

// exports.deleteAll = function (req, res, next)

exports.update = function (req, res, next) {
	const bookItem = booksList.find((book) => book.id == req.params.id);
	if (!req.body.title) {
		return next(createError(400, "title is required"));
	}
	if (!req.body.author) {
		return next(createError(400, "author is required"));
	}
	if (!(req.body.read === true || req.body.read === false)) {
		return next(createError(400, "read (True/false) is required"));
	}
	if (!req.body.link) {
		return next(createError(400, "Link has not been assigned"));
	}
	if (!bookItem) {
		return next(createError(404, "no book with that id"));
	}
	booksList = booksList.map((book) => {
		if (book.id == req.params.id) {
			book.title = req.body.title;
			book.author = req.body.author;
			book.read = req.body.read;
			book.link = req.body.link;
		}
		return book;
	});
	res.send({ result: true });
};
