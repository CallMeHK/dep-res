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
  "Ice: Leetmeme", "KittenService: ",
  "Leetmeme: Cyberportal",
  "Cyberportal: Ice",
  "CamelCaser: KittenService",
  "Fraudstream: ",
  
];
// Expected output:
// "KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream"
console.log("case1: ", resolveDependencies(case1));
console.log("case2: ", resolveDependencies(case2));
console.log("case3: ", resolveDependencies(case3));