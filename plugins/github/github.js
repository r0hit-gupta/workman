const github = require("@octokit/rest")();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (GITHUB_TOKEN) {
  github.authenticate({
    type: "token",
    token: GITHUB_TOKEN
  });
}

async function getRepoInfo(link) {
  if (!link) return {};
  let x = link.split("/"); // split github repository link
  let owner = x[3]; // get user or organisation name from given link
  let repo = x[4]; // get repository name from given link

  // fetch repository info from github
  let { data } = await github.repos.get({ owner, repo });
  return data;
}

exports.getRepoInfo = getRepoInfo;
