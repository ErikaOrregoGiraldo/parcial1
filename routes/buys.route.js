const { Router } = require("express");
const express = require("express");
const routes = express.Router();
const buySchema = require("../models/buy");

//POST http://localhost:3000/api/v1/buys/buy
routes.post("/buy", (req, res) => {
  const buy = buySchema(req.body);
  buy
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

routes.get("/", (req, res) => {
  buySchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

routes.get("/:buyRef", (req, res) => {
  const { buyRef } = req.params;
  buySchema
    .find({'Line.ExpenseDetail.Customer.Ref.value': buyRef})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

routes.get("/:detailType", (req, res) => {
  const { detailType } = req.params;
  buySchema
    .find({'Line.DetailType': detailType})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

routes.delete("/:buyId", (req, res) => {
  const { buyId } = req.params;
  buySchema
    .remove( {_id: buyId })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
})

routes.put("/:buyId", (req, res) => {
  const { buyId } = req.params;
  const { DueDate, DocNum, Status, Line=({Amount,DetailType,ExpenseDetail,Account,LineStatus}), Vendor, TotalAmt } = req.body;
  buySchema
    .updateOne(
      { _id: buyId },
      { $set: { DueDate, DocNum, Status, Line, Vendor, TotalAmt }}
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

})
module.exports = routes;
