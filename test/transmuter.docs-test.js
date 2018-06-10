const { Transmuter } = require(__dirname + "/../src/transmuter.js");
const transmuter = new Transmuter()
	.when(x => typeof x === "number") // a) if it is a number...
	.gives(x => x + 10) // ...add 10 to the number
	.when(x => typeof x === "boolean") // b) if it is a boolean...
	.gives(x => !x) // ...negate it
	.when(x => x instanceof Array && x.length > 0) // c) if it is an array and has more than 1 value
	.gives(x => x[0]) // ...return its first value
	.when(x => x instanceof Array) // d) if it is an array
	.when(x => typeof x === "object" && Object.keys(x).length === 0) // d) or if it is an object but has no properties
	.gives(x => undefined) // ...return undefined
	.when(x => typeof x === "object") // e) if it is an object
	.gives(x => Object.keys(x).join(" ")); // ...return the properties of the object in a string separating them with 1 space

console.log(transmuter.get(0) === 10); // >> true
console.log(transmuter.get(10) === 20); // >> true
console.log(transmuter.get(15) === 25); // >> true

console.log(transmuter.get(true) === false); // >> true
console.log(transmuter.get(false) === true); // >> true

console.log(transmuter.get([9, 8, 7]) === 9); // >> true
console.log(transmuter.get([8, 7]) === 8); // >> true
console.log(transmuter.get([7]) === 7); // >> true

console.log(transmuter.get([]) === undefined); // >> true
console.log(transmuter.get({}) === undefined); // >> true

console.log(transmuter.get({ a: 0, bb: 1, ccc: 2 }) === "a bb ccc"); // >> true
