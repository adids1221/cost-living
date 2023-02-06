const express = require("express");
const router = express.Router();

/* GET - about page. */
router.get('/', function (req, res) {
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
    // The response will be a JSON object containing the aboutJson object.
    res.json(aboutJson);
});

module.exports = router;