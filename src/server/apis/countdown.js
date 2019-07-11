module.exports = (function countdownAPi() {
  const express = require("express");
  const router = express.Router();

  return function countdownRouter(db) {
    const countdownModel = require("./../models/countdownsModel")(
      db.connection
    );

    router.get("/countdown", (req, res) => {
      countdownModel.get((err, dataset) => {
        res.send(dataset);
      }, null);
    });

    router.get("/countdown/:id", (req, res) => {
      countdownModel.getByID((err, countdown) => {
        if (err) return res.status(520).send(err);
        return res.status(200).send(countdown);
      }, req.params.id);
    });

    // router.get('/countdown/keyBrowser/:keyBrowser', (req, res) => {
    //   countdownModel.getByRoom((err, countdown) => {
    //     if (err) return res.status(520).send(err);
    //     return res.status(200).send(countdown);
    //   }, req.params.keyBrowser);
    // });

    router.post("/countdown", (req, res) => {
      countdownModel.create((err, dataset) => {
        res.send(dataset);
      }, req.body); // post datas ici ...
    });

    router.delete("/countdown/:id", (req, res) => {
      countdownModel.remove((err, dataset) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(dataset);
      }, req.params.id); // tableau d'ids ici ...
    });

    router.patch("/countdown", (req, res) => {
      countdownModel.update((err, dataset) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send(dataset);
      }, req.body); // un tableau d'ids ici ...
    });

    return router;
  };
})();
