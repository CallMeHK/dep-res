const resolveDependencies = require("./dep-res");
// Jest tests for dep-res

// Test to make sure the most basic inputs and inputs givin in the 
// assignment work.
test("Most basic packages case", () => {
  const basicCase = ["KittenService: CamelCaser", "CamelCaser: "];
  const basicCaseLong = [
    "KittenService: ",
    "Leetmeme: Cyberportal",
    "Cyberportal: Ice",
    "CamelCaser: KittenService",
    "Fraudstream: Leetmeme",
    "Ice: "
  ];

  // Most basic inputs
  expect(resolveDependencies([])).toBe("");
  expect(resolveDependencies(["Ice: "])).toBe("Ice");

  // Inputs from assignment
  expect(resolveDependencies(basicCase)).toBe("CamelCaser, KittenService");
  expect(resolveDependencies(basicCaseLong)).toBe(
    "KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream"
  );
});

// Test to check that dep-res is handling circular dependencies properly.  
// These should return a string with the error path.
test("Error handling for circular dependencies", () => {
  const basicCircCase = ["Cyberportal: Ice", "Ice: Cyberportal"];
  const deepCircCase = [
    "KittenService: ",
    "Leetmeme: Cyberportal",
    "Cyberportal: Ice",
    "CamelCaser: KittenService",
    "Fraudstream: ",
    "Ice: Leetmeme"
  ];

  // Check the most basic case
  expect(resolveDependencies(basicCircCase)).toBe(
    "Error: circular dependencies via Cyberportal -> Ice -> Cyberportal"
  );

  // Check a case that has a deeper path
  expect(resolveDependencies(deepCircCase)).toBe(
    "Error: circular dependencies via Leetmeme -> Cyberportal -> Ice -> Leetmeme"
  );
});

// Test to check that dependencies are listed as packages.  If they are not, 
// make sure dep-res lets us know the package that was not included.
test("Error handling for invalid inputs", () => {
  const missingDepCase = [
    "KittenService: ",
    "Leetmeme: Cyberportal",
    "Cyberportal: Ice",
    "CamelCaser: KittenService",
    "Fraudstream: Leetmeme"
  ];
  // Most basic case, single package with dependency, dependency is not
  // listed in packages
  expect(resolveDependencies(["Ice: Leetmeme"])).toBe(
    "Error: Package 'Leetmeme' not found in package list"
  );
  // Longer list with missing dependency
  expect(resolveDependencies(missingDepCase)).toBe(
    "Error: Package 'Ice' not found in package list"
  );
});
