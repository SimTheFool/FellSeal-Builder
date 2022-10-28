"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var queries_exports = {};
__export(queries_exports, {
  queries: () => queries
});
module.exports = __toCommonJS(queries_exports);
var import_readService = require("@adapters/readService");
var import_getAllCharacters = require("applicative/queries/getAllCharacters");
const getAllCharacters = () => {
  const get = () => (0, import_getAllCharacters.getAllCharacters)(import_readService.readService);
  return {
    get
  };
};
const queries = {
  getAllCharacters
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  queries
});
