const Cost = require("../models/cost");
const express = require('express');
const { getUserById } = require("../utils/userUtils");
const { isValidDate, monthFormat, getReport } = require('../utils/reportUtils');
const router = express.Router();

/* GET - report page. */
router.get("/", async function (req, res) {
  // Retrieve the user_id, check if the user exits

  // Destructure the year, month, and user_id parameters from the query
  const { year, user_id } = req.query;
  let { month } = req.query;

  // If any of the required parameters is missing, return an error
  if (!year || !month || !user_id) {
    return res.status(400).send({ error: "Invalid query parameters" });
  }

  //Check for valid user ID
  const user = await getUserById(user_id);
  if (!user) {
    return res.status(404).json({ error: `User  with ID - ${user_id} doesn\'t exists!` });
  }

  // Check for valid date
  if (!isValidDate(month, year)) {
    return res.status(400).send({ error: "Invalid date parameters" });
  }

  // month format
  const fixedMonth = monthFormat(month);
  const result = await getReport(year, fixedMonth, user_id);

  if (result) {
    // If the user made any purchase at the date was given
    return res.status(200).json(result);
  } else {
    // If the user didn't make any purchase at the date was given
    return res.status(400).json({ message: `The user didn\'t made any purchase in ${fixedMonth} of ${year}.` });
  }
});

module.exports = router;