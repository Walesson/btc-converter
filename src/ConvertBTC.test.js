const chalk = require("chalk");
const convertBTC = require("./ConvertBTC");
const axios = require("axios");

jest.mock("axios");

const mockBtc = {
  bitcoin: {
    usd: 200,
    brl: 400,
  },
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("ConvertBTC", () => {
  test("should return USD as currenty and 1 as amount default", async () => {
    axios.get.mockResolvedValue({ data: mockBtc });
    const resp = await convertBTC();
    expect(resp).toEqual(`${chalk.red("1")} BTC to ${chalk.cyan("USD")} = 200`);
  });

  test("should return BRL as currenty and 10 as amount when defined", async () => {
    const resp = await convertBTC("BRL", 10);
    axios.get.mockResolvedValue({ data: mockBtc });
    expect(resp).toEqual(
      `${chalk.red("10")} BTC to ${chalk.cyan("BRL")} = 4000`
    );
  });

  test("should fail request", async () => {
    axios.get.mockRejectedValueOnce(new Error("Async error"));
    try {
      const resp = await convertBTC("BRL", 10);
    } catch (error) {
      expect(error).toEqual(new Error("Async error"));
    }
  });
});
