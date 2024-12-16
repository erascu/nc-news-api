exports.psqlErr = (err, req, res, next) => {
  console.log(err, "<--- psql");
  if (
    err.code === "22P02" ||
    err.code === "23502" ||
    err.code === "42703" ||
    err.code === "42601"
  ) {
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
