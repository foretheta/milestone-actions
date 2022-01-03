const core = require("@actions/core")
const github = require("@actions/github")
const { Octokit } = require("@octokit/action")

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  //   console.log(`The event payload: ${payload}`)

  const octokit = new Octokit()

  let due_date = new Date("30 January 2021")

  const { data } = octokit
    .request("POST /repos/foretheta/devops/milestones", {
      owner: github.context.repo.owner,
      repo: "devops",
      title: "Sprint(9/11)-A",
      due_on: due_date.toISOString(),
    })
    .then(() => {
      console.log("Milestone Created: %s", data.html_url)
    })
    .error(() => {
      console.log("error")
    })
} catch (error) {
  core.setFailed(error.message)
}
