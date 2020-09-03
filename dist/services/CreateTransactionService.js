"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        this.validarSaldo(value, type);
        var transaction = new Transaction_1.default({ title: title, value: value, type: type });
        this.transactionsRepository.create(transaction);
        return transaction;
    };
    CreateTransactionService.prototype.validarSaldo = function (value, type) {
        var total = this.transactionsRepository.getBalance().total;
        if (type === 'outcome' && total < value) {
            throw new Error('You do not have enough balance');
        }
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
