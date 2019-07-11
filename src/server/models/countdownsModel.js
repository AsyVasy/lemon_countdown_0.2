module.exports = function(connection) {
	// CRUD

	const get = function get(clbk, id) {
		var sql;

		sql = 'SELECT * FROM countdowns;';

		connection.query(sql, [id], (error, results, fields) => {
			// return console.log(this.sql);
			if (error) return clbk(error, null);
			else return clbk(null, [fields.map(x => x.name), results]);
		});
	};

	const getByID = function getUserByMail(clbk, id) {
		const sql = `SELECT * FROM countdowns WHERE id = ?`;
		const q = connection.query(sql, id, (err, countdown) => {
			if (err) return clbk(err, null);
			return clbk(null, ...countdown);
		});
		console.log(q.sql);
	};

	// const getByRoom = function getByRoom (clbk, keyBrowser) {
	//   const sql = 'SELECT * FROM `countdown` WHERE `keyBrowser` = ?';
	//   const q = connection.query(sql, keyBrowser, (err, countdown) => {
	//     if (err) return clbk(err, null);
	//     return clbk(null, countdown);
	//   });
	//   console.log(q.sql);
	// };

	const create = function createcountdown(clbk, data) {
		const q = 'INSERT INTO countdowns (name, time, password, theme) VALUES (?, ?, ?, ?)';
		const payload = [data.name, data.time, data.password, data.theme];

		connection.query(q, payload, (err, res, cols) => {
			console.log(q);
			console.log(payload);
			console.log(cols);

			console.log(this.sql);
			// affiche la dernière requête SQL, pratique pour deboguer
			if (err) return clbk(err, null);
			return clbk(null, res);
		});
	};

	const remove = function deletecountdown(clbk, countdown) {
		// la clause SQL IN permet de chercher une valeur dans un tableau
		const q = 'DELETE FROM countdowns WHERE id = ?';

		connection.query(q, countdown, function(err, res, fields) {
			console.log(q);
			console.log(countdown);
			// console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
			if (err) return clbk(res, null);
			return clbk(null, res);
		});
	};

	const update = function editcountdown(clbk, data) {
		const q = 'UPDATE countdowns SET name = ?, time = ?, password = ?, theme = ? WHERE id = ?';
		const payload = [data.name, data.time, data.password, data.theme, data.id];
		connection.query(q, payload, function(err, res, fields) {
			// console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
			if (err) return clbk(err, null);
			return clbk(null, res);
		});
	};

	return {
		get,
		getByID,
		// getByRoom,
		create,
		remove,
		update,
	};
};
