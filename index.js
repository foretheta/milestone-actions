const core = require("@actions/core")
import * as github from "@actions/github"
const { Octokit } = require("@octokit/rest")
import { createActionAuth } from "@octokit/auth-action"

async function run() {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  const github_token = core.getInput("GITHUB_TOKEN")

  let due_date = new Date("30 January 2021")

  const auth = createActionAuth()
  const authentication = await auth()

  await console.log(authentication)
}

run().catch((error) => {
  core.setFailed(error.message)
})
