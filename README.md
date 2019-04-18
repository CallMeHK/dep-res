## Dependency Resolver

Requirements
 - The function should accept an array of strings defining packages and their dependencies. Each string contains the name of a package followed by a colon and space then any dependencies required by that package. For simplicity we’ll assume that a package can have at most one dependency.
 - The function should reject as invalid a dependency specification that contains cycles.
 - The function should output a comma separated string of package names in the order of install, such that a package’s dependency will always precede that package.

### Set Up
 - Clone this repo
 - `cd dep-res`
 - `npm install`

### Start
Run `npm run start` to run the index.js file.  

### Test
Run `npm run test` to run tests with jest.