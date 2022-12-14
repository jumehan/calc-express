/** Simple demo Express app. */

const express = require("express");
const app = express();
const { convertStrNums } = require("./utils");
const {
  findMean,
  findMedian,
  findMode,
} = require("./stats");

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");



/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  const strNums = req.query.nums;

  const nums = convertStrNums(strNums);

  const mean = findMean(nums);

  return res.send({
    operation: "mean",
    value: mean
  });``
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  const strNums = req.query.nums;

  const nums = convertStrNums(strNums);

  const median = findMedian(nums);

  return res.send({
    operation: "median",
    value: median
  });
});


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {
  const strNums = req.query.nums;

  const nums = convertStrNums(strNums);

  const mode = findMode(nums);

  return res.send({
    operation: "mode",
    value: mode
  });
});



/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;