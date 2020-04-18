"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = require("./Role");
class researcher extends Role_1.role {
    constructor(player, targets) {
        super(player);
        this.matrix = targets;
    }
}
exports.researcher = researcher;
//# sourceMappingURL=researcher.js.map