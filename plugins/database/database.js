const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    name: String,
    version: String,
    author: Object,
    date: { type: Date },
    description: String,
    keywords: [String],
    links: Object,
    stars: String,
    downloads: String,
    watchers: String,
    commits: String,
    modified: { type: Date },
    created: { type: Date },
    openIssues: String
}, { strict: true });

const Package = mongoose.model('Package', packageSchema);

function connect() {

    // Attempt connection to the database
    mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

    // On successful connection
    mongoose.connection.on('connected', () => {
        console.log('Connection to database established successfully');
    });

    // If connection fails
    mongoose.connection.on('error', err => {
        console.error('Error connecting to database: ' + err);
        console.error('Server has been stopped');
        process.exit(1);
    });

    // On database disconnection
    mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected');
    });

}


function add(package) {
    let x = new Package(package);
    x.save()
        .then(pkg => console.log("Added Package"))
        .catch(err => console.log(err))
}

function clear() {
    Package.remove({}, () => console.log("Database cleared"));
}

function get() {

}

exports.connect = connect;
exports.add = add;
exports.clear = clear;