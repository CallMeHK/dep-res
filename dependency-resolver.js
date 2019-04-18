const resolveDependencies = packages => {
    const packageMap = packages.map(dep => {
      const [package, dependent] = dep.split(": ");
      return { package, dependent };
    });
    let output = [];
    packageMap.forEach(pkg => {
      console.log("checkDep: ", checkDep(pkg, packageMap));
      checkDep(pkg, packageMap).forEach(elt => {
        if (!output.includes(elt)) {
          output = [...output, elt];
        }
      });
    });
    return output;
  };
  
  const checkDep = (pkg, packageMap, out = []) => {
    if (!!!pkg.dependent) {
      out = [pkg.package, ...out];
      return out;
    }
    out = [pkg.package, ...out];
    return checkDep(
      packageMap.find(elt => elt.package === pkg.dependent),
      packageMap,
      out
    );
  };
  
  module.exports = resolveDependencies;