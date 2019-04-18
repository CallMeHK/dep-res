const resolveDependencies = pkgs => {
  const packageMap = pkgs.map(dep => {
    const [name, dependent] = dep.split(": ");
    return { name, dependent };
  });
  let output = [];
  let err;
  for (let pkg of packageMap) {
    const depList = checkDep(pkg, packageMap);
    if (typeof depList === "string") {
      err = depList;
      break;
    }
    depList.forEach(elt => {
      if (!output.includes(elt)) {
        output = [...output, elt];
      }
    });
  }
  return err || output.join(', ');
};

const checkDep = (pkg, packageMap, out = [], checkCirc = []) => {
  if (!!!pkg.dependent) {
    out = [pkg.name, ...out];
    return out;
  }
  out = [pkg.name, ...out];
  const circVal = checkCirc.find(elt => elt.name === pkg.dependent);
  checkCirc = [...checkCirc, pkg];
  if (circVal) {
    let errPath = "";
    checkCirc.forEach((elt, i) =>
      checkCirc.length !== i + 1
        ? (errPath = errPath + `${elt.name} -> `)
        : (errPath = errPath + `${elt.name} -> ${elt.dependent}`)
    );
    return `Error: circular dependencies via ${errPath}`;
  }
  const nextPkg = packageMap.find(elt => elt.name === pkg.dependent);
  return checkDep(nextPkg, packageMap, out, checkCirc);
};

module.exports = resolveDependencies;