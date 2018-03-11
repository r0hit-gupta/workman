const github = require("@octokit/rest")();

async function getRepoInfo(link) {
  let x = link.split("/"); // split github repository link
  let owner = x[3]; // get user or organisation name from given link
  let repo = x[4];  // get repository name from given link

  // fetch repository info from github
  let { data } = await github.repos.get({ owner, repo });
  return data;
}

exports.getRepoInfo = getRepoInfo;
