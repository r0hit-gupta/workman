const database = require("../database/database");
const npm = require("../npm/npm");
const github = require("../github/github");

async function updatePackages() {
  // clear the database before adding new packages
  await database.clear();

  try {
    let packages = await npm.getPackages(process.env.KEYWORDS);

    // loop through every package and get more details about it from npm and github
    packages.map(async package => {
      package = package.package;

      // get number of downloads of the package
      package.downloads = await npm.getDownloads(package.name);

      // get repository details of the package
      let data = await github.getRepoInfo(package.links.repository);

      // merge github repository information with the npm registry data
      package = Object.assign(package, data);

      // add package information to the database
      await database.add(package);
    });
  } catch (err) {
    console.error(err);
  }
}

exports.updatePackages = updatePackages;
