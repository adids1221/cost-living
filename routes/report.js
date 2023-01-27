//const router = require("express").Router();
const Cost = require("../models/cost");
const express = require('express');
const {getUserById} = require("../utils/userUtils");
const router = express.Router();


router.get("/:id/:year/:month", function (req, res) {
  // Retrieve the user_id, year, and month from the request parameters
  const user_id = req.params.id;
  const year = req.params.year;
  const month = req.params.month;

  // Use the Cost model to query for the detailed report
  Cost.aggregate(
      [
        {
          $match: {
            year: {
              $eq: year
            },
            month: {
              $eq: month
            },
            userId: {
              $eq: user_id
            }
          },
        },
      ],
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.render('report', {title:result}); // HTML option
          //res.json(result); // JSON option
        }
      });
});

module.exports = router;