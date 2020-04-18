"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("./role");
class virus extends role_1.role {
    constructor(player, targets) {
        super(player);
        this.matrix = targets;
    }
}
exports.virus = virus;
//# sourceMappingURL=virus.js.map