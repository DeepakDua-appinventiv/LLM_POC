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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const natural_1 = require("natural");
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
class Tokenize {
    tokenizing_data() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create a tokenizer instance
            const tokenizer = new natural_1.WordTokenizer();
            // Function to tokenize a single description
            function tokenizeDescription(description) {
                if (!description) {
                    return []; // Return an empty array if description is undefined or empty
                }
                const tokens = tokenizer.tokenize(description);
                return tokens.map(token => token.toLowerCase());
            }
            // Function to process a single line of data
            function processLine(line) {
                const [, _, __, ___, ____, _____, ______, _______, ________, _________, description,] = line.split(",");
                // Tokenize the description
                const tokens = tokenizeDescription(description);
                return tokens;
            }
            // Function to process the entire dataset file
            function processDatasetFile(filename) {
                var _a, e_1, _b, _c;
                return __awaiter(this, void 0, void 0, function* () {
                    const inputStream = fs.createReadStream(`/home/appinventiv/Desktop/llm/netflix_titles.csv`);
                    // console.log("---------->input stream",inputStream)
                    const lineReader = readline.createInterface({ input: inputStream });
                    const tokensList = [];
                    try {
                        for (var _d = true, lineReader_1 = __asyncValues(lineReader), lineReader_1_1; lineReader_1_1 = yield lineReader_1.next(), _a = lineReader_1_1.done, !_a; _d = true) {
                            _c = lineReader_1_1.value;
                            _d = false;
                            const line = _c;
                            const tokens = processLine(line);
                            tokensList.push(tokens);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (!_d && !_a && (_b = lineReader_1.return)) yield _b.call(lineReader_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return tokensList;
                });
            }
            // Usage example
            const datasetFilename = "netflix_titles.csv";
            processDatasetFile(datasetFilename)
                .then((tokensList) => {
                // tokensList contains an array of tokenized descriptions for each line in the dataset
                console.log("-------->", tokensList);
            })
                .catch((error) => {
                console.error("Error processing dataset:", error);
            });
        });
    }
}
exports.token = new Tokenize();
