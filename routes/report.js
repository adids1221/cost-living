const Cost = require("../models/cost");
const express = require('express');
const { getUserById } = require("../utils/userUtils");
const { isValidDate, getReport } = require('../utils/reportUtils')
const router = express.Router();

/* GET - report page. */
router.get("/:user_id/:year/:month", async function (req, res) {
  // Retrieve the user_id, check if the user exsits
  const { user_id, year } = req.params;
  let { month } = req.params;

  //Check for valid user ID
  const user = await getUserById(user_id);
  if (!user) {
    res.status(404).json({ error: `User  with ID - ${user_id} doesn\'t exists!` });
  }

  // Check for valid date
  if (!isValidDate(month, year)) {
    res.status(400).send({ error: "Invalid date parameters" });
  }

  //Refactor the month string ny adding 0 if the month is between 1-9
  const month_number = Number(month);
  if (month_number < 10 && month.length === 1) {
    const monthPre = "0"
    month = monthPre.concat(month)
  }

  const result = await getReport(year, month, user_id);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(200).json({ message: `The user did\'nt made any purchase in ${month} of ${year}.` });
  }
});

module.exports = router;