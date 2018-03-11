const mongoose = require("mongoose");

// Package schema to add only the following properties to the database.
const packageSchema = mongoose.Schema({
  name: String,
  version: String,
  author: Object,
  description: String,
  keywords: [String],
  links: Object,
  stargazers_count: Number,
  downloads: Number,
  subscribers_count: Number,
  commits: Number,
  updated_at: { type: Date },
  created_at: { type: Date },
  open_issues: Number,
  forks: Number
});

// Create a mongo model using the above package schema
const Package = mongoose.model("Package", packageSchema);

function connect() {
  // Attempt connection to the database
  mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
      process.env.DB_HOST
    }:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );

  // On successful connection
  mongoose.connection.on("connected", () => {
    console.log("Connection to database established successfully");
  });

  // If connection fails
  mongoose.connection.on("error", err => {
    console.error("Error connecting to database: " + err);
    console.error("Server has been stopped");
    process.exit(1);
  });

  // On database disconnection
  mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected");
  });
}

// add package to the database
async function add(package) {
  let pkg = new Package(package);
  await pkg.save()
    .then(pkg => console.log("Added Package - " + pkg.name))
    .catch(err => console.error(err));
}

// clear the database
async function clear() {
  await Package.remove({}, () => console.log("Database cleared"));
}

// get all packages from the database
async function getAllPackages() {
  let packages = await Package.find({}, (err, packages) => {
    if (err) {
      console.error("Error fetching all packages");
      throw new Error(err);
    }
    resolve(packages);
  });
  return packages;
}

async function getPackageByName(name) {
    let package = await Package.find({name}, (err, package) => {
      if (err) {
        console.error("Error fetching package - " + name);
        throw new Error(err);
        reject(err)
      }
    //   return package;
    //   resolve(package);
    });
    return package;
  }



exports.connect = connect;
exports.add = add;
exports.clear = clear;
exports.getAllPackages = getAllPackages;
exports.getPackageByName = getPackageByName;
