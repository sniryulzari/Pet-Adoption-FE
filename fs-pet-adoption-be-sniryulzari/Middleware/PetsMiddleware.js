function filterQuery(req, res, next) {
  const { name, adoptionStatus, minHeight, maxHeight, minWeight, maxWeight } =
    req.query;

  for (let key in req.query) {
    if (req.query[key] === "") {
    delete req.query[key];
    }
  }
    // console.log("middelware:",req.query);
  if (name) {
    req.query.name = { $regex: name, $options: "i" };
  }

  if (adoptionStatus) {
    req.query.adoptionStatus = adoptionStatus;
  }

  if (minHeight && maxHeight) {
      req.query.height = { $gt: Number(minHeight), $lte: Number(maxHeight) };
  }

  if (minWeight && maxWeight) {
      req.query.weight = { $gt: Number(minWeight), $lte: Number(maxWeight) };
  }


  next();
}

module.exports = { filterQuery };

