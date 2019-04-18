const resolveDependencies = require("./dependency-resolver");

const case1 = ["KittenService: CamelCaser", "CamelCaser: "];
const case2 = [
  "KittenService: ",
  "Leetmeme: Cyberportal",
  "Cyberportal: Ice",
  "CamelCaser: KittenService",
  "Fraudstream: Leetmeme",
  "Ice: "
];

console.log(resolveDependencies());