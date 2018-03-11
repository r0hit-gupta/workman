const github = require("@octokit/rest")();

async function getRepoInfo(link) {
  let x = link.split("/");
  let owner = x[3];
  let repo = x[4];
  let { data } = await github.repos.get({ owner, repo });
  return data;
}

exports.getRepoInfo = getRepoInfo;
