module.exports = function(connection) {
	// CRUD

	const get = function get(clbk, id) {
		var sql;

		sql = 'SELECT * FROM themes;';

		connection.query(sql, [id], (error, results, fields) => {
			// return console.log(this.sql);
			if (error) return clbk(error, null);
			else return clbk(null, [fields.map(x => x.name), results]);
		});
	};

	// const getBytheme_ID = function getUserByMail (clbk, theme_id) {
	//   const sql = `SELECT * FROM theme WHERE theme_id = ?`;
	//   const q = connection.query(sql, theme_id, (err, theme) => {
	//     if (err) return clbk(err, null);
	//     return clbk(null, ...theme);
	//   });
	//   console.log(q.sql);
	// };

	// const getByRoom = function getByRoom (clbk, keyBrowser) {
	//   const sql = 'SELECT * FROM `theme` WHERE `keyBrowser` = ?';
	//   const q = connection.query(sql, keyBrowser, (err, theme) => {
	//     if (err) return clbk(err, null);
	//     return clbk(null, theme);
	//   });
	//   console.log(q.sql);
	// };

	const create = function createtheme(clbk, data) {
		const q =
			'INSERT INTO themes (background, typeface, color1, color2, success_sound, penalty_sound,failure_sound, success_message, penalty_message,failure_message) VALUES (?,?,?,?,?,?,?,?,?,?)';
		const payload = [
			data.background,
			data.typeface,
			data.color1,
			data.color2,
			data.success_sound,
			data.penalty_sound,
			data.failure_sound,
			data.success_message,
			data.penalty_message,
			data.failure_message,
		];

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

	const remove = function deletetheme(clbk, theme) {
		// la clause SQL IN permet de chercher une valeur dans un tableau
		const q = 'DELETE FROM themes WHERE id = ?';

		connection.query(q, theme, function(err, res, fields) {
			console.log(q);
			console.log(theme);
			// console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
			if (err) return clbk(res, null);
			return clbk(null, res);
		});
	};

	const update = function edittheme(clbk, data) {
		const q =
			'UPDATE themes SET background =?, typeface=?, color1=?, color2=?, success_sound=?, penalty_sound=?,failure_sound=?, success_message=?, penalty_message=?,failure_message = ? WHERE id = ?';
		const payload = [
			data.background,
			data.typeface,
			data.color1,
			data.color2,
			data.success_sound,
			data.penalty_sound,
			data.failure_sound,
			data.success_message,
			data.penalty_message,
			data.failure_message,
			data.id,
		];
		connection.query(q, payload, function(err, res, fields) {
			// console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
			if (err) return clbk(err, null);
			return clbk(null, res);
		});
	};

	return {
		get,
		// getBytheme_ID,
		// getByRoom,
		create,
		remove,
		update,
	};
};
