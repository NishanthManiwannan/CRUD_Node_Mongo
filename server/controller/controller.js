const { MongoExpiredSessionError } = require("mongodb");
const Userdb = require("../model/model");

//------- create new user
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "can not be empty" });
  }

  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save in DB
  user
    .save(user)
    .then((data) => {
    //   res.send(data);
    res.redirect()
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error",
      });
    });
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: `user not found in following id : ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: `Error on retrive user id with : ${id}` });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message || "error occured" });
      });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `User with user id ${id} was not found` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.send(500).send({ message: "error on update" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete user with id : ${id}` });
      } else {
        res.send({
          message: "deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `could not delete user with id : ${id}`,
      });
    });
};
