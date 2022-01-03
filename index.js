const core = require("@actions/core")
const github = require("@actions/github")

try {
  const github_token = core.getInput("GITHUB_TOKEN")

  const octokit = github.getOctokit(github_token)

  octokit.rest.issues.createMilestone({
    owner: "foretheta",
    repo: "devops",
    title: "HEY",
  })
} catch (error) {
  core.setFailed(error.message)
}
