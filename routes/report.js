const Cost = require("../models/cost");
const express = require('express');
const { getUserById } = require("../utils/userUtils");
const router = express.Router();


router.get("/:id/:year/:month", async function (req, res) {
  // Retrieve the user_id, year, and month from the request parameters
  const user_id = req.params.id;
  const user = await getUserById(user_id)

  if (!user) {
    return res.status(404).render('error', { title: "to make report.", error: `User  with ID - ${user_id} doesn\'t exists!` });
  }

  const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const year = req.params.year;
  let month = req.params.month;
  const month_number = Number(req.params.month)

  if (month_number < 10 && month.length === 1) {
    const monthPre = "0"
    month = monthPre.concat(month)
  }

  if ((month_number >= 1) && (month_number <= 12)) {
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
        {
          $group: {
            _id: "$category.name",
            costs: { $push: { day: "$day", description: "$description", sum: "$sum" } },

          }
        }
      ],
      async function (err, result) {
        if (err) {
          res.send(err);
        } else {
          if (result.length) {
            res.status(200).render('report', { result, year, month: mL[month_number - 1], userId: user_id, user });
          } else {
            res.status(200).render('report', { message: `The user did\'nt made any purchase in ${month} of ${year}.` });
          }
        }
      });
  } else {
    res.status(403).render('error', { title: "to make report.", error: 'Date - month is not valid!' });
  }
});

module.exports = router;