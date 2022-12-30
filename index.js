const express = require("express");
const router = express.Router();

router.post("/addcost", (req, res) => {
  console.log("Add Cost Route");
});

router.get("/report", (req, res) => {
  console.log("Get Report Route");
});

router.get("/about", (req, res) => {
  console.log("About Route");
});
