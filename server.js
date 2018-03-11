const express = require("express");
const app = express();

const database = require("./plugins/database/database");
const npm = require("./plugins/npm/npm");
const github = require("./plugins/github/github");

// connect to the database with predefined crendentials stored in config
database.connect();

async function cron() {
  await database.clear();
  try {
    let packages = await npm.getPackages();
    for (let package of packages) {
      package = package.package;
    //   console.log(package.name);
      package.downloads = await npm.getDownloads(package.name);
      let data = await github.getRepoInfo(package.links.repository);
      package = Object.assign(package, data);
      await database.add(package);
    }
  } catch (err) {
    console.log(err);
  }
}

cron();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// start server on provided port
app.listen(process.env.PORT, () => {
  console.log("Server up and running at " + process.env.PORT);
});
