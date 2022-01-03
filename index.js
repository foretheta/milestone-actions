const core = require("@actions/core")
const github = require("@actions/github")

try {
  const github_token = core.getInput("GITHUB_TOKEN")
  const requiredLabels = core.getInput("labels").split(",")
  const labelsInIssue = github.context.payload.issue.labels.map((label) => {
    return label.name
  })
  const octokit = github.getOctokit(github_token)

  octokit.rest.issues.createMilestone({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    title: "HEY",
  })
} catch (error) {
  core.setFailed(error.message)
}
