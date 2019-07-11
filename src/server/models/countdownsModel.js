module.exports = function(connection) {
  // CRUD

  const get = function get(clbk, id) {
    var sql;

    sql =
      "SELECT * FROM countdowns INNER JOIN themes ON countdowns.theme = themes.id_theme ORDER BY countdowns.id DESC;";

    connection.query(sql, [id], (error, results, fields) => {
      if (error) return clbk(error, null);
      else return clbk(null, [fields.map(x => x.name), results]);
    });
  };

  const getByID = function getUserByMail(clbk, id) {
    // avec table password mais si pas de password dans la table = requete null!
    // const sql = `SELECT * FROM countdowns INNER JOIN themes ON countdowns.theme = themes.id_theme INNER JOIN passwords ON passwords.countdown_id = countdowns.id WHERE countdowns.id = ?`;
    const sql = `SELECT * FROM countdowns INNER JOIN themes ON countdowns.theme = themes.id_theme WHERE countdowns.id = ?`;
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
  // };

  const create = function createcountdown(clbk, data) {
    const q =
      "INSERT INTO countdowns (name, time, password, theme) VALUES (?, ?, ?, ?)";
    const payload = [data.name, data.time, data.password, data.theme];

    connection.query(q, payload, (err, res, cols) => {
      if (err) return clbk(err, null);
      return clbk(null, res);
    });
  };

  const remove = function deletecountdown(clbk, id) {
    // la clause SQL IN permet de chercher une valeur dans un tableau
    const q = "DELETE FROM countdowns WHERE id = ?";

    connection.query(q, id, function(err, res, fields) {
      // console.log(this.sql); // affiche la dernière requête SQL, pratique pour deboguer
      if (err) return clbk(res, null);
      return clbk(null, res);
    });
  };

  const update = function editcountdown(clbk, data) {
    const q =
      "UPDATE countdowns SET name = ?, time = ?, password = ?, theme = ? WHERE id = ?";
    const payload = [data.name, data.time, data.password, data.theme, data.id];
    connection.query(q, payload, function(err, res, fields) {
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
    update
  };
};
