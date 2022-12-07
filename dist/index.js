"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
require('dotenv').config();
const Model = require('./db');
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const mongoString = process.env.DATABASE_URL;
console.log(mongoString);
mongoose_1.default.connect(String(mongoString));
const database = mongoose_1.default.connection;
database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database Connected');
});
app.use(express_1.default.json());
app.use('/users', router);
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.listen(3000, () => {
    console.log(`Server started at ${3000}`);
});
router.post('/addUser', addUser);
router.get('/getAll', getAll);
router.get('/:id', user);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
app.get('/', (req, res) => {
    res.send("Hello from express and typescript");
});
function addUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Within AddUser", req.body);
        const data = new Model({
            name: req.body.name,
            emailId: req.body.emailId,
            dob: req.body.dob
        });
        const user = yield data.save();
        res.status(200).json(user);
    });
}
function user(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        const user = yield Model.findById(id);
        res.json(user);
    });
}
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        const data = yield Model.findByIdAndDelete(id);
        res.send(`User ${id} has been deleted`);
    });
}
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("within getall api");
        const users = yield Model.find();
        console.log(users);
        res.json(users);
    });
}
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        const user = yield Model.findById(id);
        if (!user)
            throw 'User not found';
        const data = req.body;
        const updatedUser = yield Model.findByIdAndUpdate(id, {
            name: req.body.name,
            emailId: req.body.emailId,
            dob: req.body.dob
        });
        res.json(updatedUser);
    });
}
