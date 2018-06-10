const { expect } = require("chai");
const { Transmuter } = require(__dirname + "/../src/transmuter.js");

describe("Transmuter function", function() {
	var transmuter = undefined;
	before(function() {
		transmuter = new Transmuter()
			.when(x => x instanceof Array && x.length === 10)
			.gives(x => x[5])
			.when(x => x instanceof Array && x.length < 3)
			.when(x => x instanceof Array && x.length > 4)
			.gives(x => x[0])
			.when(x => x instanceof Array)
			.gives(x => x[1])
			.when(x => typeof x === "boolean")
			.gives(x => !x)
			.when(x => typeof x === "string" && x.startsWith("::"))
			.gives(x => x.substr(2))
			.when(x => typeof x === "string")
			.gives(x => x.substr(0, 5))
			.when(x => typeof x === "number")
			.gives(x => x + 5)
			.others(x => x);
	});
	it("it works as expected", function() {
		expect(transmuter.get(800)).to.equal(805);
		expect(transmuter.get(0)).to.equal(5);
		expect(transmuter.get(true)).to.equal(false);
		expect(transmuter.get([100, 200])).to.equal(100);
		expect(transmuter.get([100, 200, 300])).to.equal(200);
		expect(transmuter.get([100, 200, 300, 400])).to.equal(200);
		expect(transmuter.get([100, 200, 300, 400, 500])).to.equal(100);
		expect(transmuter.get("0123456789".split(""))).to.equal("5");
		expect(transmuter.get("::1234567890")).to.equal("1234567890");
		expect(transmuter.get("::Texto entero")).to.equal("Texto entero");
		expect(transmuter.get("1234567890")).to.equal("12345");
		expect(transmuter.get("abcdefghij")).to.equal("abcde");
		expect(transmuter.get(transmuter)).to.equal(transmuter);
		expect(transmuter.get(100, x => x + 1)).to.equal(106);
	});
});
