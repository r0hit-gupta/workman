const request = require('request');

const DOWNLOADS_ENDPOINT = 'https://api.npmjs.org/downloads/point/'
const REGISTRY_ENDPOINT = 'https://registry.npmjs.org/-/v1/search?size=20&text=keywords:'

function getDownloads(packageName) {
    return new Promise((resolve, reject) => {
        // log an error if no package name is provided
        if (!packageName) {
            reject("Please provide a package name.");
        }

        let startDate = "2000-01-01"; // set initial date
        let endDate = new Date().toISOString().split('T')[0]; // get today's date in YYYY-MM-DD format

        // create date range in format YYYY-MM-DD:YYYY-MM-DD
        let dateRange = startDate + ':' + endDate;

        // create new endpoint for data request using the parameters provided
        let endpoint = DOWNLOADS_ENDPOINT + dateRange + '/' + packageName;

        request.get(endpoint, (err, res, body) => {
            if (err) {
                console.log("Error getting details for " + packageName);
                reject(err);
            }
            try {
                body = JSON.parse(body);
            }
            catch (err) {
                console.log("Error parsing details for package " + packageName);
                reject(err);
            }

            // return the total number of downloads
            resolve(body.downloads);
        });
    })
}


function getPackages(keywords) {
    return new Promise((resolve, reject) => {

        request.get(REGISTRY_ENDPOINT + keywords, (err, res, body) => {
            if (err) {
                console.log("Error getting details for " + packageName);
                reject(err);
            }
            try {
                body = JSON.parse(body);
            }
            catch (err) {
                console.log("Error parsing details for package " + packageName);
                reject(err);
            }
            // ignore scoped npm packages 
            let data = body.objects.filter(obj => obj.package.scope === "unscoped")
            resolve(data);
        });
    })
}

exports.getDownloads = getDownloads;
exports.getPackages = getPackages;