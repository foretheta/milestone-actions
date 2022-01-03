const core = require("@actions/core")
const github = require("@actions/github")
const { Octokit } = require("@octokit/action")

async function run() {
  try {
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event payload: ${payload}`)

    const octokit = new Octokit()

    let due_date = new Date("30 January 2021")

    const { data } = await octokit.request(
      "POST /repos/foretheta/required-labels/milestones",
      {
        owner: github.context.repo.owner,
        repo: "required-labels",
        title: "Sprint(9/11)-A",
        due_on: due_date.toISOString(),
      }
    )

    console.log("Milestone Created: %s", data)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
