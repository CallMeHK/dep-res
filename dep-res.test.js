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

const case3 = ["Cyberportal: Ice", "Ice: Cyberportal"];
// Expected output:
// "KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream"
const case4 = [
  "KittenService: ",
  "Leetmeme: Cyberportal",
  "Cyberportal: Ice",
  "CamelCaser: KittenService",
  "Fraudstream: ",
  "Ice: Leetmeme"
];
// Expected output:
// Error: circular dependencies via Leetmeme -> Cyberportal -> Ice -> Leetmeme

test("Most basic packages case", () => {
  expect(resolveDependencies([])).toBe("");
  expect(resolveDependencies(["Ice: "])).toBe("Ice");
  expect(resolveDependencies(case1)).toBe("CamelCaser, KittenService");
  expect(resolveDependencies(case2)).toBe(
    "KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream"
  );
});

test("Error handling for circular dependencies", () => {
  expect(resolveDependencies(case3)).toBe(
    "Error: circular dependencies via Cyberportal -> Ice -> Cyberportal"
  );
  expect(resolveDependencies(case4)).toBe(
    "Error: circular dependencies via Leetmeme -> Cyberportal -> Ice -> Leetmeme"
  );
});