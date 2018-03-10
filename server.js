const express = require('express');
const app = express();

const database = require('./plugins/database/database');
const npm = require('./plugins/npm/npm');
const github = require('./plugins/github/github');

// connect to the database with predefined crendentials stored in config
database.connect();

// database.add();

// npm.getDownloads('cytoscape');
// github.getRepoInfo("https://github.com/cytoscape/cytoscape.js").then()

async function cron() {
    database.clear();
    npm.getPackages().then(packages => {
        for(let x of packages) {
            console.log(x.package.name)
            npm.getDownloads(x.package.name)
            .then(downloads => {
                x.package.downloads = downloads;
                github.getRepoInfo(x.package.links.repository).then(data => {
                    x.package.forks = data.forks_count;
                    x.package.openIssues = data.open_issues_count;
                    x.package.stars = data.stargazers_count;
                    x.package.watchers = data.subscribers_count;
                    x.package.created = data.created_at;
                    x.package.updated = data.updated_at;
                    return x.package;
                }).then(data => database.add(data))
            })
        }
    })

}

cron();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// start server on provided port
app.listen(process.env.PORT, () => {
    console.log('Server up and running at ' + process.env.PORT);
});

