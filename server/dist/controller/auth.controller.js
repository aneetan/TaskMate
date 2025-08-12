"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_middleware_1 = require("../middleware/validate.middleware");
const user_schema_1 = require("../schemas/user.schema");
const user_repository_1 = __importDefault(require("../repository/user.repository"));
const http_errors_1 = require("../errors/http.errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const app_1 = require("../app");
const jwtToken_1 = require("../utils/jwtToken");
const errorMessage_1 = require("../helpers/errorMessage");
class AuthController {
    constructor() {
        // array syntax is used to chain multiple middleware functions before final request handler
        this.register = [
            (0, validate_middleware_1.validateSchema)(user_schema_1.registerUserSchema),
            //Request<Params, Query, Body>
            (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const userDto = req.body;
                    //validate password match
                    if (userDto.password !== userDto.confirmPassword) {
                        throw new http_errors_1.BadRequestError("Password doesn't match");
                    }
                    const existingUser = yield user_repository_1.default.findByEmail(userDto.email);
                    if (existingUser) {
                        throw new http_errors_1.BadRequestError("Email already in use");
                    }
                    const userData = {
                        fullName: userDto.fullName,
                        email: userDto.email,
                        password: userDto.password
                    };
                    const newUser = yield user_repository_1.default.createUser(userData);
                    const plainUser = newUser.get({ plain: true }); // .get({ plain: true }) returns only the raw data
                    const { password } = plainUser, userWithoutPassword = __rest(plainUser, ["password"]);
                    res.status(201).json(userWithoutPassword);
                }
                catch (e) {
                    (0, errorMessage_1.errorResponse)(e, res, "Error while registering user");
                    next(e);
                }
            })
        ];
        this.login = [
            (0, validate_middleware_1.validateSchema)(user_schema_1.loginUserSchema),
            (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { email, password } = req.body;
                    const user = yield user_repository_1.default.findByEmailAndPassword(email, password);
                    if (!user) {
                        return res.status(401).json({ error: "Authentication failed" });
                    }
                    const accessToken = (0, jwtToken_1.generateJwtToken)({ user }, '1h');
                    const refreshToken = (0, jwtToken_1.generateJwtToken)({ user }, '7d');
                    //store refresh token in redis
                    yield app_1.redis.set(`refreshToken:${user.id}`, refreshToken, "EX", jwtToken_1.ONE_WEEK_SECONDS);
                    res
                        .status(200)
                        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" })
                        .json({ "message": "User logged in successfully", accessToken, id: user.id });
                }
                catch (e) {
                    (0, errorMessage_1.errorResponse)(e, res, "Invalid email or password");
                    next(e);
                }
            })
        ];
        this.refresh = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
                return res.status(401).json({ error: "No refresh token" });
            const user = req.body;
            const storedToken = yield app_1.redis.get(`refreshToken:${user.id}`);
            if (storedToken !== refreshToken)
                return res.status(403).json({ error: "Invalid refresh token" });
            const newAccessToken = (0, jwtToken_1.generateJwtToken)({ user, jti: user.id }, "1h");
            const newRefreshToken = (0, jwtToken_1.generateJwtToken)({ user }, "7d");
            // Update redis
            yield app_1.redis.set(`refresh:${user.id}`, newRefreshToken, "EX", jwtToken_1.ONE_WEEK_SECONDS);
            res
                .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: "strict" })
                .json({ accessToken: newAccessToken, id: user.id });
            next();
        });
        this.logout = [
            auth_middleware_1.verifyAccessToken,
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const userId = req.body.userId;
                const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                const decoded = jsonwebtoken_1.default.decode(token);
                // 1. Delete refresh Token
                yield app_1.redis.del(`refreshToken:${userId}`);
                // 2. Blacklist access token
                const expInSeconds = (decoded === null || decoded === void 0 ? void 0 : decoded.exp) - Math.floor(Date.now() / 1000);
                if (expInSeconds > 0) {
                    yield app_1.redis.set(`blacklist:${decoded.jti}`, "true", "EX", expInSeconds);
                }
                // 3. Clear Cookie
                res.clearCookie("refreshToken").json({ message: "Logged out" });
            })
        ];
    }
}
exports.default = new AuthController();
