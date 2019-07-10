module.exports = (function themeAPi() {
	const express = require('express');
	const router = express.Router();

	return function themeRouter(db) {
		const themeModel = require('./../models/themeModel')(db.connection);

		router.get('/theme', (req, res) => {
			console.log('ca get');

			themeModel.get((err, dataset) => {
				res.send(dataset);
			}, null);
		});

		// router.get('/theme/:id', (req, res) => {
		//   themeModel.getByID((err, theme) => {
		//     if (err) return res.status(520).send(err);
		//     console.log(theme);
		//     return res.status(200).send(theme);
		//   }, req.params.id);
		// });

		// router.get('/theme/keyBrowser/:keyBrowser', (req, res) => {
		//   themeModel.getByRoom((err, theme) => {
		//     if (err) return res.status(520).send(err);
		//     return res.status(200).send(theme);
		//   }, req.params.keyBrowser);
		// });

		router.post('/theme', (req, res) => {
			themeModel.create((err, dataset) => {
				console.log(dataset);
				res.send(dataset);
			}, req.body); // post datas ici ...
		});

		router.delete('/theme', (req, res) => {
			themeModel.remove((err, dataset) => {
				if (err) return res.status(500).send(err);
				return res.status(200).send(dataset);
			}, req.body.id); // tableau d'ids ici ...
		});

		router.patch('/theme', (req, res) => {
			themeModel.update((err, dataset) => {
				if (err) return res.status(500).send(err);
				else return res.status(200).send(dataset);
			}, req.body); // un tableau d'ids ici ...
		});

		return router;
	};
})();
