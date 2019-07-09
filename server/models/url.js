const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
	date: { type: Date, default: Date.now },
	longUrl: { type: String, required: true },
	shortUrl: { type: String, required: true },
	ssid: { type: String, required: true }
});

module.exports = mongoose.model("Url", UrlSchema);
