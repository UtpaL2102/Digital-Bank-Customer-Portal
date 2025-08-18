// env.js
const fs = require("fs");
const path = require("path");

const packageJsonPath = path.join(__dirname, "package.json");
const packageJson = require(packageJsonPath);

if (process.env.NODE_ENV === "production") {
  // For GitHub Pages deployment
  packageJson.homepage = "https://UtpaL2102.github.io/Digital-Bank-Customer-Portal-";
} else {
  // For local development
  packageJson.homepage = ".";
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
