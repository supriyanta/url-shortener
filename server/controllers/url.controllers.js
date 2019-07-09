const shortId = require("shortid");
const validUrl = require("valid-url");
const config = require("config");
const Url = require("../models/url");

module.exports = {
	getShortUrl: async (req, res) => {
		const { longUrl } = req.body;

		if (!validUrl.isUri(longUrl)) {
			return res.status(401).json({ error: `not a valid URL` });
		}

		try {
			const urlExist = await Url.findOne({ longUrl });
			if (urlExist) {
				return res.status(200).json({ urlExist });
			}

			const ssid = shortId.generate();
			const shortUrl = `${config.get("BASE_URL")}${ssid}`;

			const newUrl = new Url({
				longUrl,
				shortUrl,
				ssid,
				date: Date.now()
			});

			const url = await newUrl.save();
			return res.status(200).json({ url });
		} catch (err) {
			console.log(err);
			return res.status(500).json(`Server busy`);
		}
	},
	getActualUrl: async (req, res) => {
		const ssid = req.params.ssid;
		try {
			const url = await Url.findOne({ ssid });
			if (url) {
				return res.redirect(`${url.longUrl}`);
			} else {
				return res.status(404);
			}
		} catch (err) {
			console.err(err);
			return res.status(500).json(`Server Busy`);
		}
	}
};
