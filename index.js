const core = require("@actions/core")
const github = require("@actions/github")

try {
  const github_token = core.getInput("GITHUB_TOKEN")

  const octokit = github.getOctokit(github_token)

  const MID_OF_THE_MONTH = new Date().month == 2 ? 15 : 16
  const MID_OF_THE_MONTH_DATE = new Date(
    new Date().getTime() + MID_OF_THE_MONTH * 24 * 60 * 60 * 1000
  )

  const LAST_DAY_OF_THE_MONTH_DATE = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  )

  let currentYear = new Date().getFullYear().toString().substr(2, 2)

  let currentMonth = new Date().getMonth()

  currentMonth = currentMonth + 1
  currentMonth = currentMonth.toString()

  octokit.rest.issues.createMilestone({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    title: "Sprint(" + currentMonth + "/" + currentYear + ")-a",
    due_on: MID_OF_THE_MONTH_DATE.toISOString(),
  })

  octokit.rest.issues.createMilestone({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    title: "Sprint(" + currentMonth + "/" + currentYear + ")-b",
    due_on: LAST_DAY_OF_THE_MONTH_DATE.toISOString(),
  })
} catch (error) {
  core.setFailed(error.message)
}
