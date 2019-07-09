const mongoose = require("mongoose");
const config = require("config");

const mongoUri = config.get("MONGO_URI");

module.exports.connectDb = () => {
	mongoose
		.connect(mongoUri, { useNewUrlParser: true })
		.then(() => console.log(`Database connected...!!!`))
		.catch(err => {
			console.error(err);
			process.exit(1);
		});
};
