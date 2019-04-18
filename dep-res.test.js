const resolveDependencies = require("./dep-res");

const case1 = ["KittenService: CamelCaser", "CamelCaser: "];
// Expected output:
// "CamelCaser, KittenService"
const case2 = [
  "KittenService: ",
  "Leetmeme: Cyberportal",
  "Cyberportal: Ice",
  "CamelCaser: KittenService",
  "Fraudstream: Leetmeme",
  "Ice: "
];
// Expected output:
// "KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream"
const case3 = [
  "KittenService: ",
  "Leetmeme: Cyberportal",
  "Cyberportal: Ice",
  "CamelCaser: KittenService",
  "Fraudstream: ",
  "Ice: Leetmeme"
];
// Expected output:
// Error: circular dependencies via Leetmeme -> Cyberportal -> Ice -> Leetmeme
// console.log("case1: ", resolveDependencies(case1));
// console.log("case2: ", resolveDependencies(case2));
// console.log("case3: ", resolveDependencies(case3));

test("Most basic packages case", () => {
  expect(resolveDependencies(case1)).toBe("CamelCaser, KittenService");
  expect(resolveDependencies(case2)).toBe(
    "KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream"
  );
});