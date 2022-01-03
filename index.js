const core = require("@actions/core")
const github = require("@actions/github")
const { Octokit } = require("@octokit/core")

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  //   console.log(`The event payload: ${payload}`)

  const github_token = core.getInput("GITHUB_TOKEN")
  const octokit = new Octokit({ auth: github_token })
  let due_date = new Date("30 January 2021")

  octokit
    .request("GET /repos/foretheta/repos/milestones", {
      owner: "foretheta",
      repo: "devops",
      title: "Sprint(9/11)-A",
      due_on: due_date.toISOString(),
    })
    .then((text) => {
      console.log(JSON.stringify(text))
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
    })
} catch (error) {
  core.setFailed(error.message)
}
