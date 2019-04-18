const resolveDependencies = require("./dep-res");

// Using nodemon to reload on change, checking cases as I code

const case1 = ["KittenService: CamelCaser", "CamelCaser: "];
const case2 = [
  "KittenService: ",
  "Leetmeme: Cyberportal",
  "Cyberportal: Ice",
  "CamelCaser: KittenService",
  "Fraudstream: Leetmeme",
  "Ice: "
];
const case3 = [
  "Ice: Leetmeme", "KittenService: ",
  "Leetmeme: Cyberportal",
  "Cyberportal: Ice",
  "CamelCaser: KittenService",
  "Fraudstream: ",
];
const case4 = [
    "Hello: You",
    "My: "
]

console.log("case1: ", resolveDependencies(case1));
console.log("case2: ", resolveDependencies(case2));
console.log("case3: ", resolveDependencies(case3));
console.log("case4: ", resolveDependencies(case4));