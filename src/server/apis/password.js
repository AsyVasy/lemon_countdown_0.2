module.exports = (function passwordAPi() {
	const express = require('express');
	const router = express.Router();

	return function passwordRouter(db) {
		const passwordModel = require('./../models/passwordModel')(db.connection);

		router.get('/password', (req, res) => {
			console.log('ca get');

			passwordModel.get((err, dataset) => {
				res.send(dataset);
			}, null);
		});

		// router.get('/password/:id', (req, res) => {
		//   passwordModel.getByID((err, password) => {
		//     if (err) return res.status(520).send(err);
		//     console.log(password);
		//     return res.status(200).send(password);
		//   }, req.params.id);
		// });

		// router.get('/password/keyBrowser/:keyBrowser', (req, res) => {
		//   passwordModel.getByRoom((err, password) => {
		//     if (err) return res.status(520).send(err);
		//     return res.status(200).send(password);
		//   }, req.params.keyBrowser);
		// });

		router.post('/password', (req, res) => {
			passwordModel.create((err, dataset) => {
				console.log(dataset);
				res.send(dataset);
			}, req.body); // post datas ici ...
		});

		router.delete('/password', (req, res) => {
			passwordModel.remove((err, dataset) => {
				if (err) return res.status(500).send(err);
				return res.status(200).send(dataset);
			}, req.body.id); // tableau d'ids ici ...
		});

		router.patch('/password', (req, res) => {
			passwordModel.update((err, dataset) => {
				if (err) return res.status(500).send(err);
				else return res.status(200).send(dataset);
			}, req.body); // un tableau d'ids ici ...
		});

		return router;
	};
})();
