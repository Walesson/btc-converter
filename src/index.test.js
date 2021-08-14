const child_process = require("child_process");
const pkg = require("../package.json");
const exec = child_process.exec;
const path = "./src/index.js";

describe("Main", () => {
  test("should return version of btc-converter", (done) => {
    exec(`${path} --version`, (err, stdout, stderror) => {
      if (err) throw err;
      expect(stdout.replace("\n", "")).toEqual(pkg.version);
      done();
    });
  });

  test("should return description when btc-converter --help", (done) => {
    exec(`${path} --help`, (err, stdout, stderror) => {
      if (err) throw err;
      expect(
        stdout.includes("Convert Bitcoin to any current defined")
      ).toBeTruthy();
      done();
    });
  });
});
