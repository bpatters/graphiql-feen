require("babel-polyfill");

// A window.fetch JavaScript polyfill.
// Reference: https://github.com/github/fetch
require("whatwg-fetch");
import Perf from "react-addons-perf";

window.Perf = Perf;
