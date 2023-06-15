const dogController = require("../controllers/dogController");

const router = require("express").Router();

router.post("/dog", dogController.addDog);

router.get("/dog", dogController.getDogs);

module.exports = router;
