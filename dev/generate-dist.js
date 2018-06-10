const fs = require("fs");
const path = require("path");
const srcFile = __dirname + "/../src/transmuter.js";
const srcContents = fs.readFileSync(srcFile);
const dstFile = __dirname + "/../dist/transmuter.js";
const dstGlobal = (function() {
  const regexGlobalName = /(^|\n)\/\/ *\@global\.window *\= *([^\n]+)/g;
  const matched = regexGlobalName.exec(srcContents);
  if (matched.length > 1) {
    return matched[2];
  } else {
    return path.resolve(srcFile);
  }
})();
const dstContents = `(function() {
  var output = (function() {
    var module = {
      exports: undefined
    };
    // CODE
    // CODE
    // CODE
    // CODE
    // CODE
    ${srcContents}
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
})(${JSON.stringify(dstGlobal)});`;

fs.writeFileSync(dstFile, dstContents, "utf8");
