"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class Logging {
}
_a = Logging;
// tslint:disable-next-line:no-console
Logging.log = (args) => _a.info(args);
Logging.info = (args) => {
    // tslint:disable-next-line:no-console
    console.log(args);
};
Logging.warning = (args) => {
    // tslint:disable-next-line:no-console
    console.log(args);
};
Logging.error = (args) => {
    // tslint:disable-next-line:no-console
    console.log(args);
};
exports.default = Logging;
