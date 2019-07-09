const { Router } = require("express");
const { getActualUrl } = require("../controllers/url.controllers");

const router = Router();

router.get("/:ssid", getActualUrl);

module.exports = router;
