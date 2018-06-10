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

/**
 *
 * # transmuter
 *
 *
 * ![](https://img.shields.io/badge/trasnmuter-v1.0.0-green.svg) ![](https://img.shields.io/badge/tests-passing-green.svg) ![](https://img.shields.io/badge/coverage-100%25-green.svg)  ![](https://img.shields.io/badge/stable-95%25-green.svg)
 *
 *
 *
 * Transform any value into any other value, in a comfortable, intuitive and fully-functional way. For Node.js or the browser.
 * Minimalistic library.
 *
 * ## 1. Installation
 *
 * ~$ `npm install --save transmuter`
 *
 * ## 2. Usage
 *
 * #### 1. Import the API
 *
 * #### 1.a) For the browser
 *
 * ```html
 * <script src="node_modules/transmuter/dist/transmuter.js"></script>
 * ```
 *
 * And in your javascript:
 *
 * ```js
 * const Transmuter = TransmuterAPI.Transmuter;
 * ```
 *
 * #### 1.b) For Node.js
 *
 * ```js
 * const Transmuter = require("transmuter").Transmuter;
 * ```
 *
 * #### 2. Instantiate a new `Transmuter` and add rules to it:
 *
 * ```js
 * const transmuter = new Transmuter()
 * 	.when(x => typeof x === "number")              // a) if it is a number...
 * 	.gives(x => x + 10)                            // ...add 10 to the number
 * 	.when(x => typeof x === "boolean")             // b) if it is a boolean...
 * 	.gives(x => !x)                                // ...negate it
 * 	.when(x => x instanceof Array && x.length > 0) // c) if it is an array and has more than 1 value...
 * 	.gives(x => x[0])                              // ...return its first value
 * 	.when(x => x instanceof Array) // d) if it is an array
 * 	.when(x => typeof x === "object" && Object.keys(x).length === 0) // d) or if it is an object but has no properties...
 * 	.gives(x => undefined)                         // ...return undefined
 * 	.when(x => typeof x === "object")              // e) if it is an object
 * 	.gives(x => Object.keys(x).join(" "));         // ...return the properties of the object in a string separating them with 1 space
 *  .others(x => x);                               // f) in any other case, return the same value
 *
 * ```
 *
 * #### 3. Use and reuse the generated function:
 *
 * ```js
 * console.log(transmuter.get(0) === 10); // >> true
 * console.log(transmuter.get(10) === 20); // >> true
 * console.log(transmuter.get(15) === 25); // >> true
 *
 * console.log(transmuter.get(true) === false); // >> true
 * console.log(transmuter.get(false) === true); // >> true
 *
 * console.log(transmuter.get([9, 8, 7]) === 9); // >> true
 * console.log(transmuter.get([8, 7]) === 8); // >> true
 * console.log(transmuter.get([7]) === 7); // >> true
 *
 * console.log(transmuter.get([]) === undefined); // >> true
 * console.log(transmuter.get({}) === undefined); // >> true
 *
 * console.log(transmuter.get({ a: 0, bb: 1, ccc: 2 }) === "a bb ccc"); // >> true
 * ```
 *
 *
 *
 *
 *
 */

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

/**
 *
 * ## 3. API Reference
 *
 *
 * ### `require("transmuter").Transmuter`
 *
 * @type `{Function}`
 *
 * @description This function generates a new transmuter.
 *
 * A `Transmuter` instance is an object that can add rules to it, and use them to
 * transform any data into other thing (or the same thing).
 *
 * A `Transmuter rule` is composed by a `matcher` and a `transformer`.
 *
 * A `matcher` is a function that receives a value, and returns `true` or `false`.
 *
 * A `transformer` is a function that receives a value, and returns the new value we want instead.
 *
 * In the `Transmuter` API, the `matchers` are defined by the method `when`. Also, the method `others`,
 * that will match any value that reaches that point of the transmuter.
 *
 * In the `Transmuter` API, the `transformers` are defined by the method `gives`. Also, the method `others`,
 * that will accept a transformer function as unique parameter.
 *
 * The rules are registered and executed one after the other. When a `matcher` returns `true`, the next
 * transformer will end the execution, and return the proper value.
 *
 * Finally, to transmute a value, use the method `get(x)`.
 *
 * Also, if you want to wrap the value returned by any of the returned values, use the second parameter of the
 * `get` method, and return the new value you want to return instead. This mecanism can be useful if you want to
 * wrap into a `Promise`, for example, all the values previously defined.
 *
 *
 *
 * @returns `{Object:Transmuter}`. Object like:
 *
 * ```js
 * {
 *   when: [Function],
 *   gives: [Function],
 *   others: [Function],
 *   get: [Function]
 * }
 * ```
 *
 * About each property:
 *
 *   · **`when`**: accepts a `{Function}` that returns `true` or `false`. Returns the same `{Object:Transmuter}`.
 *
 *   · **`gives`**: accepts a `{Function}` that returns any value. Returns the same `{Object:Transmuter}`.
 *
 *   · **`others`**: accepts a `{Function}` that returns any value. Returns the same `{Object:Transmuter}`.
 *
 *   · **`get`**: accepts any value. Accepts a second value, a `{Function}` that can modify the finally
 * returned value (passed to it as its first parameter) just returning the new desired value.
 * Returns the final (transmuted) value or, when provided, the value returned by the second parameter passed to this `get` method.
 *
 * @usage
 *
 * ```js
 * const Transmuter = require("transmuter").Transmuter;
 * const transmuter = new Transmuter()
 *  ///// a:
 * 	.when(x => typeof x === "number") // a) if it is a number...
 * 	.gives(x => x + 10) // ...add 10 to the number
 *  ///// b:
 * 	.when(x => typeof x === "boolean") // b) if it is a boolean...
 * 	.gives(x => !x) // ...negate it
 *  ///// c:
 * 	.when(x => x instanceof Array && x.length > 0) // c) if it is an array and has more than 1 value
 * 	.gives(x => x[0]) // ...return its first value
 *  ///// d:
 * 	.when(x => x instanceof Array) // d) if it is an array
 * 	.when(x => typeof x === "object" && Object.keys(x).length === 0) // d) or if it is an object but has no properties
 * 	.gives(x => undefined) // ...return undefined
 *  ///// e:
 * 	.when(x => typeof x === "object") // e) if it is an object
 * 	.gives(x => Object.keys(x).join(" ")); // ...return the properties of the object in a string separating them with 1 space
 *  ///// f:
 *  .others(x => x)
 *
 * ///// a:
 * console.log(transmuter.get(0) === 10); // >> true
 * console.log(transmuter.get(10) === 20); // >> true
 * console.log(transmuter.get(15) === 25); // >> true
 *
 * ///// b:
 * console.log(transmuter.get(true) === false); // >> true
 * console.log(transmuter.get(false) === true); // >> true
 *
 * ///// c:
 * console.log(transmuter.get([9, 8, 7]) === 9); // >> true
 * console.log(transmuter.get([8, 7]) === 8); // >> true
 * console.log(transmuter.get([7]) === 7); // >> true
 *
 * ///// d:
 * console.log(transmuter.get([]) === undefined); // >> true
 * console.log(transmuter.get({}) === undefined); // >> true
 *
 * ///// e:
 * console.log(transmuter.get({ a: 0, bb: 1, ccc: 2 }) === "a bb ccc"); // >> true
 *
 * ///// f:
 * console.log(transmuter.get(transmuter.get) === transmuter.get); // >> true
 *
 * ///// 2nd get value:
 * console.log(transmuter.get(transmuter.get, x => 100) === 100); // >> true
 *
 * ```
 *
 *
 *
 *
 *
 *
 *
 *
 */
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

/**
 *
 * # 4. Tests, coverage, documentation and exportation.
 *
 * There are command defined in the `package.json` for each of these purposes.
 *
 * ~$ `npm run test # pass tests and generate coverage`
 *
 * ~$ `npm run test-nocov # pass tests (without coverage)`
 *
 * ~$ `npm run export # generate distribution files`
 *
 * ~$ `npm run docs # generate documentation`
 *
 * # 5. Conclusion
 *
 * This is a very simple module that can improve code readability and extensibility,
 * and it is usable by Node.js and browser environments.
 *
 */

    // CODE
    // CODE
    // CODE
    // CODE
    // CODE
    return module.exports;
  })();
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = output;
  } else if (typeof define === "function" && typeof define.amd !== "undefined") {
    define([], () => output);
  } else {
    window[arguments[0]] = output;
  }
})("TransmuterAPI");