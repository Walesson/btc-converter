#!/usr/bin/env node
const program = require("commander");
const pkg = require("../package.json");
const convertBTC = require("./ConvertBTC");

program
  .version(pkg.version)
  .description("Convert Bitcoin to any current defined")
  .option(
    "-C, --currency <currency>",
    "Currency to be converted; (Default: USD)"
  )
  .option("-A, --amount <amount>", "Value in bitcoin to convert. (Default: 1)")
  .parse(process.argv);

convertBTC(program._optionValues.currency, program._optionValues.amount).then(
  (res) => console.log(res)
);
