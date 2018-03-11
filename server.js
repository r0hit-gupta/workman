const express = require("express");
const app = express();

const database = require("./plugins/database/database");
const cronjob = require("./plugins/cronjob/cronjob");

// connect to the database with predefined crendentials stored in config
async function init() {
  await database.connect();
  // await cronjob.updatePackages();
}

init();

// get all packages
app.get("/", (req, res) => {
  database
    .getAllPackages()
    .then(packages => res.json(packages))
    .catch(error => res.json({ error }));
});

// get package details by name
app.get("/package/:name", (req, res) => {
  let name = req.params.name;
  if (name) {
    database
      .getPackageByName(name)
      .then(package => res.json(package))
      .catch(error => res.json({ error }));
  }
});

// start server on provided port
app.listen(process.env.PORT, () => {
  console.log("Server up and running at " + process.env.PORT);
});
