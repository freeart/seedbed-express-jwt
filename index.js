const assert = require("assert"),
	jsonwebtoken = require('jsonwebtoken'),
	jwt = require('express-jwt'),
	__secret = Symbol('secret');

class JWT {
	constructor (secret) {
		this[__secret] = secret;
		this.protect = jwt({secret: this[__secret]});
	}

	create (data, expiresIn) {
		return jsonwebtoken.sign(data, this[__secret], { expiresIn: expiresIn || '1h'});
	}

	verify (token, cb) {
		return jsonwebtoken.verify(token, this[__secret], cb);
	}
}

module.exports = function () {
	assert(!this.jwt, "field exists");
	this.jwt = new JWT(this.config.get("project.jwt_secret"));

	return Promise.resolve();
}