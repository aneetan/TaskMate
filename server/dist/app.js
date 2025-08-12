"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbconfig_1 = require("./config/dbconfig");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
const ioredis_1 = __importDefault(require("ioredis"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const task_route_1 = __importDefault(require("./routes/task.route"));
require('dotenv').config();
exports.redis = new ioredis_1.default(process.env.REDIS_URL);
const app = (0, express_1.default)();
const PORT = 3000;
// Swagger docs
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
//Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, dbconfig_1.connectToDatabase)()
    .then(() => {
    //routes
    app.use('/api/auth', auth_route_1.default);
    app.use('/api/task', task_route_1.default);
    app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
})
    .catch((e) => {
    console.log("Failed to initialize application", e);
});
