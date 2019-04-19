// resolveDependencies sets up the array of packages, then invokes the recursive method
// checkDep to walk throught the list and add dependencies.
const resolveDependencies = pkgs => {
  // converts array of strings to array of objects
  const packageMap = pkgs.map(dep => {
    const [name, dependent] = dep.split(": ");
    return { name, dependent };
  });
  // set up output and err vars to set up return
  let output = [];
  let err;
  // use for over forEach so we can break on error
  for (let pkg of packageMap) {
    // invoke recursive method to get either a list of packages
    // or an error detailing the circular dependency
    const depList = checkDep(pkg, packageMap);
    // depList only returns string if there was an error
    if (typeof depList === "string") {
      err = depList;
      break;
    }
    // Add dependencies in list if they arent there
    depList.forEach(elt => {
      if (!output.includes(elt)) {
        output = [...output, elt];
      }
    });
  }
  // return error if there is an error, otherwise return
  // list of dependencies
  return err || output.join(', ');
};

// checkDep returns the package name if it has no dependencies.  if the 
// package has dependencies, it adds the package name to the out array
// and pkg to checkCirc, then invokes checkDep again. This function 
// returns a list of dependencies.  
const checkDep = (pkg, packageMap, out = [], checkCirc = []) => {
  // if there is no dependent package, add pkg.name to out and return
  out = [pkg.name, ...out];
  if (!!!pkg.dependent) {
    return out;
  }
  // if there is a dependent package
  // check if the dependency is circular based on previous checkDep 
  const circVal = checkCirc.find(elt => elt.name === pkg.dependent);
  checkCirc = [...checkCirc, pkg];
  // set up error message and return
  if (circVal) {
    let errPath = "";
    checkCirc.forEach((elt, i) =>
      checkCirc.length !== i + 1
        ? (errPath = errPath + `${elt.name} -> `)
        : (errPath = errPath + `${elt.name} -> ${elt.dependent}`)
    );
    return `Error: circular dependencies via ${errPath}`;
  }
  // find the next package in the list to run through checkDep
  const nextPkg = packageMap.find(elt => elt.name === pkg.dependent);
  // recursion with next package 
  if(!nextPkg){
    return `Error: Package '${pkg.dependent}' not found in package list`
  }
  return checkDep(nextPkg, packageMap, out, checkCirc);
};

module.exports = resolveDependencies;
