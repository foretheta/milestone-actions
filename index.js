const core = require("@actions/core")
const github = require("@actions/github")

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)

  const github_token = core.getInput("GITHUB_TOKEN")
  const octokit = github.getOctokit(github_token)

  let due_date = new Date("30 January 2021")

  octokit.rest.issues
    .createMilestone({
      owner: "muhaddimu",
      repo: "foretheta/devops",
      title: "Sprint(9/11)-a",
      due_on: due_date.toISOString(),
    })
    .then((data) => {
      console.log("Done")
    })
    .catch((error) => {
      core.setFailed(error.message)
    })
} catch (error) {
  core.setFailed(error.message)
}
