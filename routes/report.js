const Cost = require("../models/cost");
const express = require('express');
const { getUserById } = require("../utils/userUtils");
const { isValidDate, monthFormat, getReport } = require('../utils/reportUtils')
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

  // month format
  const fixedMonth = monthFormat(month)
  const result = await getReport(year, fixedMonth, user_id);

  if (result) {
    // If the user made any purchase at the date was given
    res.status(200).json(result);
  } else {
    // If the user didn't made any purchase at the date was given
    res.status(400).json({ message: `The user did\'nt made any purchase in ${fixedMonth} of ${year}.` });
  }
});

module.exports = router;