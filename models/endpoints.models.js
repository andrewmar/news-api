const fs = require("fs/promises");
const path = require("path");

const endpointsFilePath = path.join(__dirname, "..", "endpoints.json");

exports.selectAllEndpoints = () => {
  return fs.readFile(endpointsFilePath).then((result) => {
    return JSON.parse(result.toString());
  });
};
