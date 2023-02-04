const express = require("express");
const router = express.Router();

/* GET - about page. */
router.get('/', function(req, res, next) {
    const aboutJson = {
        "developer1": {
            "firstname": "Adi",
            "lastname": "Mordo",
            "id": "313531634",
            "email": "adids1221@gmail.com",
        },
        "developer2": {
            "firstname": "Stav",
            "lastname": "Gallula",
            "id": "205969868",
            "email": "stavgallula@gmail.com",
        },
    };
    res.json(aboutJson);
});

module.exports = router;