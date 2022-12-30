const router = require("express").Router();
const Cost = require("../models/cost");

router.get("/report/:selectedYear/:selectedMonth", function (req, res) {
  const requestedYear = req.params.selectedYear;
  const requestedMonth = req.params.selectedMonth;
  Cost.aggregate(
    [
      {
        $match: {
          date: {
            $gte: new Date(requestedYear, requestedMonth - 1, 1),
            $lt: new Date(requestedYear, requestedMonth, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            user: "$userId",
          },

          total: {
            $sum: "$price",
          },
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/report/:selectedYear", function (req, res) {
  const requestedYear = req.params.selectedYear;

  Cost.aggregate(
    [
      {
        $match: {
          date: {
            $gte: new Date(requestedYear, 0, 1),
            $lt: new Date(requestedYear + 1, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },

            user: "$userId",
          },
          total: {
            $sum: "$price",
          },
        },
      },
    ],
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;