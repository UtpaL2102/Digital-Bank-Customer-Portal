// reset-homepage.js
const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(__dirname, "package.json");
const packageJson = require(packageJsonPath);

// Reset homepage to default for development
packageJson.homepage = ".";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
