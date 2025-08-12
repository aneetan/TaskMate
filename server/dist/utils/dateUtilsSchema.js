"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartOfToday = void 0;
const getStartOfToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
};
exports.getStartOfToday = getStartOfToday;
