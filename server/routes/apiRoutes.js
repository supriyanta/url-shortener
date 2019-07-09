const { Router } = require("express");
const { getShortUrl } = require("../controllers/url.controllers");

const router = Router();

router.post("/url", getShortUrl);

module.exports = router;
