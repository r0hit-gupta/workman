const express = require("express");
const app = express();

const database = require("./plugins/database/database");
const cronjob = require('./plugins/cronjob/cronjob');

// connect to the database with predefined crendentials stored in config
async function init() {
  await database.connect();
  // await cronjob.updatePackages();
}

init();

app.get("/", async (req, res) => {
  let packages = await database.getAllPackages();
  res.json(packages);
});

app.get("/package/:name", async (req, res) => {
  let name = req.params.name || null;
  console.log(name);
  if(name){
    let package = await database.getPackageByName();
    res.json(package);
  }
  else {
    res.json({"error": "Package not found"});
  }
})

// start server on provided port
app.listen(process.env.PORT, () => {
  console.log("Server up and running at " + process.env.PORT);
});
