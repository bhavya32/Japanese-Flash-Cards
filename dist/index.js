"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.static("html"));
app.get("/getQuestion", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({
        "question": "享",
        "answer": "idk",
        "choices": ["idk", "idk1", "idk2", "idk3"]
    }));
});
app.listen(9234);
