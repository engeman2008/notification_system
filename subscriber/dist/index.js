"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = tslib_1.__importDefault(require("cors"));
const index_1 = tslib_1.__importDefault(require("./routes/index"));
const app = express_1.default();
app.use(body_parser_1.json());
app.use(cors_1.default());
// create application/json parser
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
// Configure routes
app.use(index_1.default);
// initialize configuration
dotenv_1.default.config();
// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
