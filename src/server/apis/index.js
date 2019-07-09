/**
 * generates random string of characters i.e salt
 * @function
 * @tutorial https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
 * @param {number} length - Length of the random string.
 * @return {function} a wrapper function
 */
module.exports = (function APIIndex() {
	/**
	 * boots up api submodules
	 * @function
	 * @param {Object} db - a database object (mysql@npm) containing a valid connection to mysql
	 * @param {Array} apis - an array containing name(s) of existing api file(s) (minus .js extension)
	 * @return {Object}
	 */
	const APIWrapper = function APIWrapper(db, apis) {
		const routers = [];
		const APIVersion = 1;

		for (let api of apis) {
			routers.push(require('./' + api)(db));
		}

		return { routers, version: APIVersion };
	};

	return APIWrapper;
})();
