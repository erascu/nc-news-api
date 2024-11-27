exports.psqlErr = (err, req, res, next) => {
  //   console.log(err);
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

exports.newErr = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
