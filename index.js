const resolveDependencies = require("./dependency-resolver");

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
// "KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream"
console.log("final: ", resolveDependencies(case3));