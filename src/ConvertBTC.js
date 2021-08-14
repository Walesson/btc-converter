const axios = require("axios");
const chalk = require("chalk");
const ora = require("ora");

const spinner = ora({
  text: "Retrieving Bitcoin data...",
  color: "cyan",
});

const convertBTC = async (current = "USD", amount = 1) => {
  spinner.start();
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${current.toLowerCase()}`
    );
    const total = data.bitcoin[current.toLowerCase()] * amount;
    return `${chalk.red(amount)} BTC to ${chalk.cyan(current)} = ${total}`;
  } catch (error) {
    console.log("Someting went wrong in the API. Try again in a minutes");
    throw error;
  } finally {
    spinner.stop();
  }
};

module.exports = convertBTC;
