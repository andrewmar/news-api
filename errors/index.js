exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "22003") {
    res.status(400).send({ msg: "Invalid input" });
  }
  if (err.code === "23502") {
    res.status(400).send({ msg: "Missing required fields" });
  } else next(err);
};

exports.handleNonExistentEndpoints = (req, res, next) => {
  res.status(404).send("Not found");
};
