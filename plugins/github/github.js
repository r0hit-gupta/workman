const github = require('@octokit/rest')();

async function getRepoInfo(link) {
    return new Promise((resolve, reject) => {

        let x = link.split('/');
        let owner = x[3];
        let repo = x[4];
        github.repos.get({ owner, repo })
            .then(({ data }) => resolve(data))
            .catch(err => reject(err))


    });
}

exports.getRepoInfo = getRepoInfo;