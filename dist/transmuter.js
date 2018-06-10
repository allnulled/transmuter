(function() {
	var output = (function() {
		var module = {
			exports: undefined
		};
		// CODE
		// CODE
		// CODE
		// CODE
		// CODE
		// @global.window = TransmuterAPI

		function transmuteValue(value, gateway) {
			const _ = {
				counter: -1,
				hasMatched: false
			};
			GatewayIteration: while (_.counter < gateway.length) {
				_.counter++;
				var gatewayPoint = gateway[_.counter];
				if (_.hasMatched) {
					if (gatewayPoint.command === "gives") {
						return gatewayPoint.operation(value);
					} else {
						continue GatewayIteration;
					}
				} else {
					if (gatewayPoint.command === "when") {
						_.hasMatched = gatewayPoint.operation(value);
						continue GatewayIteration;
					} else if (gatewayPoint.command === "gives") {
						continue GatewayIteration;
					} else {
						// if (gatewayPoint.command === "others") {
						return gatewayPoint.operation(value);
					}
				}
			}
		}

		function Transmuter(value) {
			var chainable = {};
			var gateway = [];
			["when", "gives", "others"].forEach(function(word) {
				chainable[word] = function(arg1) {
					gateway.push({
						command: word,
						operation: arg1
					});
					return chainable;
				};
			});
			chainable.get = function(value, callback) {
				if (typeof callback === "function") {
					return callback(transmuteValue(value, gateway));
				}
				return transmuteValue(value, gateway);
			};
			return chainable;
		}

		module.exports = { Transmuter };

		// CODE
		// CODE
		// CODE
		// CODE
		// CODE
		return module.exports;
	})();
	if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
		module.exports = output;
	} else if (
		typeof define === "function" &&
		typeof define.amd !== "undefined"
	) {
		define([], () => output);
	} else {
		window[arguments[0]] = output;
	}
})("TransmuterAPI");
